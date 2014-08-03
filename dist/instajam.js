!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Instajam=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var instajam;

function Geography (client) {
	instajam = client;
}

Geography.prototype.media = function(id, options, callback) {
      
  // We need at least a Geography ID to work with
  if (!id) {
    throw new Error('Instajam: A geography ID is required for Geography.get()');
  }

  // The options argument defaults to an empty object
  options = options || {};

  // Make a request to the API
  instajam.request({
    url: 'geographies/' + id + '/media/recent',
    data: options,
    success: callback
  });

};

module.exports = Geography;

},{}],2:[function(_dereq_,module,exports){
'use strict';

module.exports = {

	// Parses a given parameter from the browsers hash. 
  // Optionally, the parameter can be removed from 
  // the URL upon successful matching.

 	hashParam: function (param, remove) {

    // Create a RegExp object for parsing params
    var regex = new RegExp("(?:&|#)" + param + "=([a-z0-9._-]+)", "i");

    // Look for matches in the windows hash
    var matches = window.location.hash.match(regex);

    // If matches are found...
    if (matches) {

      // ...then remove the parameter if specified
      if (remove) {
        var removeRegex = new RegExp("(?:&|#)" + param + "=" + matches[1], "i");
        window.location.hash = window.location.hash.replace(removeRegex, '');
      }

      // ...and return the first matching param
      return matches[1];

    }

    // Otherwise return false if no matching params are found
    return false;

  },

  // Given a JavaScript object, return a 
  // string suitable for passing in a URL

  serializeParams: function (obj) {
    var str = [];
    for (var p in obj) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
    return str.join('&');
  },

  // Opens a popup window at the provided URL. Optionally provide
  // a string of options to pass into window.open
  
  openWindow: function (url, options) {
    options = options || 'width=600,height=400';
    return window.open(url, '', options);
  },

  // Set the location of the current browser window to the provided URL
  
  setLocation: function (url) {
    window.location = url;
  },

  // Makes a JSONP request, given an object of options
  
  jsonp: function (options) {
    var script;

    if (!options.url || !options.data.callback) {
      throw new Error('A URL and callback method name are required to perform a JSONP request');
    }

    options = options || {};

    window[options.data.callback] = function(data) {
      if (typeof options.success === 'function') {
        options.success(data);
      }
      script.parentNode.removeChild(script);
      delete window[options.data.callback];
    };

    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = options.url;
    document.getElementsByTagName('body')[0].appendChild(script);
  }

};

},{}],3:[function(_dereq_,module,exports){
'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var helpers = _dereq_('./helpers.js');

var Self = _dereq_('./self.js');
var User = _dereq_('./user.js');
var Media = _dereq_('./media.js');
var Tag = _dereq_('./tag.js');
var Location = _dereq_('./location.js');
var Geography = _dereq_('./geography.js');

// -----------------------------------------------------------------------------
// Public Class
// -----------------------------------------------------------------------------

function Instajam (options) {

	options = options || {};

	// If a client ID isn't provided, immediately throw an error.
  if (!options.clientID) {
  	throw new Error('Instajam: A client ID is required.');
  }

	// Set default options, and attach them to the instance
 	options.scope = options.scope || ['basic'];
 	options.key = options.key || 'instajam_access_token';
 	this.options = options;

 	// Before we go ahead and initialize the rest, see if
	// we just need to redirect with the returned access token
	this.checkForAccessToken();

  // Create child classes for each endpoint resource
  this.self = new Self(this);
  this.user = new User(this);
  this.media = new Media(this);
  this.tag = new Tag(this);
  this.location = new Location(this);
  this.geography = new Geography(this);

}

// Check for an access token in the URL. If one is present, and this
// window is a popup with a reference to our Instajam instance
// then pass back the access token and close the popup.

Instajam.prototype.checkForAccessToken = function () {
	var token = helpers.hashParam('access_token', true);
	
	if (token) {
		if (window.opener && window._instajam) {
			window._instajam.authenticate(token);
			return window.close();
		} else {
			this.authenticate(token);
		}
	} else {
		token = window.localStorage.getItem(this.options.key);

		if (token) {
			this.authenticate(token);
		}
	}
};

// Returns a URL to the Instagram OAuth authorization page.

Instajam.prototype.getAuthURL = function () {

	var authURL = 'https://instagram.com/oauth/authorize';
	var params = {};

	if (!this.options.redirectURI) {
		throw new Error('Instajam: A redirect URI is required for authentication.');
	}

	params['client_id'] = this.options.clientID;
	params['redirect_uri'] = this.options.redirectURI;
	params['response_type'] = 'token';
	params['scope'] = this.options.scope.join('+');

	return authURL + '?' + helpers.serializeParams(params);
};

Instajam.prototype.authenticate = function (tokenOrOptions) {

	var options;
	var url;
	var token = typeof tokenOrOptions === 'string' ? tokenOrOptions : false;
	
	if (token) {
		
		window.localStorage.setItem(this.options.key, token);
		this.options.accessToken = token;
	
	} else {
		
		options = tokenOrOptions || {};
		url = this.getAuthURL();

		if (options.popup) {
			var popup = helpers.openWindow(url);
			popup._instajam = this;
			return popup;
		} else {
			helpers.setLocation(url);
		}

	}

};

Instajam.prototype.isAuthenticated = function () {
	return !!this.options.accessToken;
};

Instajam.prototype.logout = function () {
	this.options.accessToken = null;
	window.localStorage.removeItem(this.options.key);
};

Instajam.prototype.request = function (options) {

	var urlBase = 'https://api.instagram.com/v1/';
  var callbackName = 'instajam' + Math.round(new Date().getTime() / 1000) + Math.floor(Math.random() * 100);

  options || (options = {});
  options.data || (options.data = {});
  options.data['client_id'] = this.options.clientID;
  options.data.callback = callbackName;

  if (this.options.accessToken) {
  	options.data['access_token'] = this.options.accessToken;
  }
  
  var queryString = helpers.serializeParams(options.data);

  if (!options.url) {
  	throw new Error('Instajam: Method "request" needs a URL.');
  }
  
  options.url = urlBase + options.url + '?' + queryString;

  helpers.jsonp(options);

};

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

module.exports = Instajam;

},{"./geography.js":1,"./helpers.js":2,"./location.js":4,"./media.js":5,"./self.js":6,"./tag.js":7,"./user.js":8}],4:[function(_dereq_,module,exports){
'use strict';

var instajam;

function Location (client) {
	instajam = client;
}

Location.prototype.get = function(id, callback) {
    
  // We need at least a location ID to work with
  if (!id) {
    throw new Error('Instajam: An ID is required for Location.get()');
  }

  // Make a request to the API
  instajam.request({
    url: 'locations/' + id,
    success: callback
  });

};

Location.prototype.media = function(id, options, callback) {
  
  // We need at least a location ID to work with
  if (!id) {
    throw new Error('Instajam: An ID is required for Location.get()');
  }

  // Make the options argument optional
  if (typeof options === 'function' && !callback) {
    callback = options;
    options = {};
  }

  // Make a request to the API
  instajam.request({
    url: 'locations/' + id + '/media/recent',
    success: callback
  });

};

Location.prototype.search = function(options, callback) {

  options = options || {};

  // We need at LEAST a lat/lng pair, or a Foursquare ID to work with
  if ( (!options.lat || !options.lng) && !options.foursquare_v2_id) {
    throw new Error('Instajam: A latitude and longitude OR a Foursquare place ID is required for Location.search()');
  }

  // Make a request to the API
  instajam.request({
    url: 'locations/search',
    data: options,
    success: callback
  });

};

module.exports = Location;

},{}],5:[function(_dereq_,module,exports){
'use strict';

var instajam;

function Media (client) {
	instajam = client;
}

Media.prototype.get = function(id, callback) {

  // Make a request to the API
  instajam.request({
    url: 'media/' + id,
    success: callback
  });

};

Media.prototype.search = function(options, callback) {

  options = options || {};

  // Require that a latitude and longitude are
  // passed in, at a minimum.
  if (!options.lat || !options.lng) {
    throw new Error('Instajam: A latitude AND a longitude are required for Media.search()');
  }

  // Make a request to the API
  instajam.request({
    url: 'media/search',
    data: options,
    success: callback
  });

};

Media.prototype.popular = function(callback) {

  // Make a request to the API
  instajam.request({
    url: 'media/popular',
    success: callback
  });

};

Media.prototype.comments = function(id, callback) {

  if (!id) {
    throw new Error('Instajam: A media ID is required for Media.comments()');
  }

  // Make a request to the API
  instajam.request({
    url: 'media/' + id + '/comments',
    success: callback
  });

};

Media.prototype.likes = function(id, callback) {

  if (!id) {
    throw new Error('Instajam: A media ID is required for Media.likes()');
  }

  // Make a request to the API
  instajam.request({
    url: 'media/' + id + '/likes',
    success: callback
  });

};

module.exports = Media;

},{}],6:[function(_dereq_,module,exports){
'use strict';

var instajam;

// -----------------------------------------------------------------------------
// Public Class
// -----------------------------------------------------------------------------

function Self (client) {
	instajam = client;
}

// ### Fetching the authenticated users's profile

Self.prototype.profile = function (callback) {
	instajam.request({
    url: 'users/self',
    success: callback
  });
};

// ### Fetching the authenticated user's media

Self.prototype.media = function (options, callback) {

	// Make the options argument optional
  if (typeof options === 'function') {
    callback = options;
    options = null;
  }

  // Make a request to the API
  instajam.request({
    url: 'users/self/media/recent',
    data: options,
    success: callback
  });

};

// ### Fetching the authenticated user's activity feed

Self.prototype.feed = function (options, callback) {

	// Make the options argument optional
  if (typeof options === 'function') {
    callback = options;
    options = null;
  }

  // Make a request to the API
  instajam.request({
    url: 'users/self/feed',
    data: options,
    success: callback
  });

};

// ### Fetching the authenticated user's favorites.

Self.prototype.favorites = function (options, callback) {

	// Make the options argument optional
  if (typeof options === 'function') {
    callback = options;
    options = null;
  }

  // Make a request to the API
  instajam.request({
    url: 'users/self/media/liked',
    data: options,
    success: callback
  });

};

// ### Fetching a list of relationship requests for the currently authenticated user

Self.prototype.requests = function(callback) {
  
  // Make a request to the API
  instajam.request({
    url: 'users/self/requested-by',
    success: callback
  });

};

// ### Getting a relationship information for the currently authenciated user and a given user ID

Self.prototype.relationshipWith = function(id, callback) {
  
  // Make a request to the API
  instajam.request({
    url: 'users/' + id + '/relationship',
    success: callback
  });

};

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

module.exports = Self;

},{}],7:[function(_dereq_,module,exports){
'use strict';

var instajam;

// -----------------------------------------------------------------------------
// Public Class
// -----------------------------------------------------------------------------

function Tag (client) {
	instajam = client;
}

Tag.prototype.get = function(name, callback) {
    
  // We need at least a tag name to get information for
  if (!name) {
    throw new Error('Instajam: A tag name is required for Tag.get()');
  }

  // Make a request to the API
  instajam.request({
    url: 'tags/' + name,
    success: callback
  });

};

Tag.prototype.media = function(name, options, callback) {
    
  // We need at least a tag name to work with
  if (!name) {
    throw new Error('Instajam: A tag name is required for Tag.media()');
  }

  // Make the options argument optional
  if (typeof options === 'function' && !callback) {
    callback = options;
    options = {};
  }

  // Make a request to the API
  instajam.request({
    url: 'tags/' + name + '/media/recent',
    data: options,
    success: callback
  });

};

Tag.prototype.search = function(term, callback) {
  
  // We need at least a tag string to search for
  if (!term) {
    throw new Error('Instajam: A tag name is required for Tag.search()');
  }

  var options = {
    q: term
  };

  // Make a request to the API
  instajam.request({
    url: '/tags/search',
    data: options,
    success: callback
  });

};

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

module.exports = Tag;

},{}],8:[function(_dereq_,module,exports){
'use strict';

var instajam;

// -----------------------------------------------------------------------------
// Public Class
// -----------------------------------------------------------------------------

function User (client) {
	instajam = client;
}

// ### Fetching the profile of a user by ID or username

User.prototype.get = function(id, callback) {
  
  // Require that an ID or username be passed
  if (!id) {
    throw new Error('Instajam: A user\'s ID or username is required for User.get()');
  }

  if (typeof id === 'number') {
    
    // Make a request to the API
    instajam.request({
      url: 'users/' + id,
      success: callback
    });
  
  } else if (typeof id === 'string') {

    // Make a request to the API
    this.search(id, function(result) {

      // If the initial user search yields any
      // results, then just return the first, but
      // otherwise return nothing.
      if (result.data && result.data.length === 1) {
        result = result.data[0];
      } else {
        result = false;
      }

      // Call the initial callback, passing the result
      if (typeof callback === 'function') {
        callback(result);
      }

    });

  }

};

// ### Fetching the media of a user ID or username

User.prototype.media = function(id, options, callback) {

  // Require that an ID be passed
  
  if (!id) {
    throw new Error('Instajam: A user\'s ID or username is required for User.media()');
  }

  // Make the options argument optional
  
  if (typeof options === 'function' && !callback) {
    callback = options;
    options = null;
  }

  // If we're looking up the user by ID...
  
  if (typeof id === 'number') {
    
    // Make a request to that API
    instajam.request({
      url: 'users/' + id + '/media/recent',
      data: options,
      success: callback
    });
  
  }

  // Or rather looking up the user by username...

  else if (typeof id === 'string') {

    // ...then first search for the username...
   this.search(id, function(result) {

      // If the initial user search yields any
      // results, then just return the first, but
      // otherwise return nothing.
      if (result.data && result.data.length > 0) {
        result = result.data[0];
      } else {
        result = false;
      }

      if (result) {

        // Make a request to that API
        instajam.request({
          url: 'users/' + result.id + '/media/recent',
          data: options,
          success: callback
        });

      } else {

        if (typeof callback === 'function') {
          callback(result);
        }

      }

    });

  }

};

// ### Searching for users by username

User.prototype.search = function(term, options, callback) {
  
  // Require that a search term be passed
  if (!term) {
    throw new Error('Instajam: A search term is required for User.search()');
  }

  // Make the options argument optional
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  // Add the search term to the options object
  options.q = term;

  // Make a request to the API
  instajam.request({
    url: 'users/search',
    data: options,
    success: callback
  });

};

// ### Fetching a list of users that user [id] follows

User.prototype.follows = function(id, callback) {
  
  // Make a request to the API
  instajam.request({
    url: 'users/' + id + '/follows',
    success: callback
  });

};

// ### Fetching a list of followers of user [id]

User.prototype.following = function(id, callback) {
  
  // Make a request to the API
  instajam.request({
    url: 'users/' + id + '/followed-by',
    success: callback
  });

};

module.exports = User;

},{}]},{},[3])
(3)
});