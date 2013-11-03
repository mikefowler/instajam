(function(Instajam) {

  'use strict';

  // # Initialization

  Instajam.init = function(options) {

    options = options || {};

    // Throw an error if either the client ID or the 
    // redirect URI isn't provided.

    if (!options.clientId || !options.redirectUri) {
      throw new InstajamError("Client ID and Redirect URI are required.");
    }

    // If the app is requesting additional 
    // scopes, build a string to append to
    // the auth URL.
    if (options.scope && typeof options.scope === 'object') {
      this.scope = '&scope=' + options.scope.join('+');
    } else {
      this.scope = '&scope=basic';
    }

    // Build an authentication URL using
    // constructor parameters.
    this.authUrl = 'https://instagram.com/oauth/authorize/?client_id=' + options.clientId + '&redirect_uri=' + options.redirectUri + '&response_type=token' + (this.scope || '');

    // When the library is initialized, verify whether
    // a user is currently authenticated.
    this.authenticate();

    return this;

  };

  // # Authentication

  // Attempts to authenticate a user via 
  // localStorage data or by parsing data 
  // from the URL hash.

  Instajam.authenticate = function() {

    // First, check if a localStorage key 
    // exists for the access_token...
    
    if (localStorage.getItem('instagram_access_token')) {
      
      // ...and if there is, set the
      // authenticated property to true. 
      this.authenticated = true;
    
    // If there is no localStorage key...
    
    } else {
      
      // ...then check if there's a match
      // for access_token in the URL hash.
      if (hashParam('access_token')) {
        
        // If we can parse the access_token from
        // the URL hash, set the localStorage param...
        localStorage.setItem('instagram_access_token', hashParam('access_token', true));
        
        // ...and set the authenticated property to true
        this.authenticated = true;

      } else {
        
        // Otherwise, if there is no localStorage
        // key and there is nothing to parse from
        // the hash, set the authenticated 
        // property to false
        this.authenticated = false;

      }

    }

  };

  // Effectively de-authenticates the current 
  // user by removing their access token from 
  // localStorage and setting the authenticated 
  // property to false. This does **not** 
  // revoke your app's permissions on the server.

  Instajam.deauthenticate = function() {
    localStorage.removeItem('instagram_access_token');
    this.authenticated = false;
  };

  // # Endpoints

  // ## Users

  var User = function() {};
  var Self = function() {};
  User.prototype.self = new Self();

  // ### Fetching the authenticated users's profile

  Self.prototype.profile = function(callback) {
    request({
      url: 'users/self',
      success: callback
    });
  };

  // ### Fetching the authenticated user's media

  Self.prototype.media = function(options, callback) {

    // Make the options argument optional
    if (typeof options === 'function') {
      callback = options;
      options = null;
    }

    // Make a request to the API
    request({
      url: 'users/self/media/recent',
      data: options,
      success: callback
    });

  };

  // ### Fetching the authenticated user's activity feed

  Self.prototype.feed = function(options, callback) {
    
    // Make the options argument optional
    if (typeof options === 'function') {
      callback = options;
      options = null;
    }

    // Make a request to the API
    request({
      url: 'users/self/feed',
      data: options,
      success: callback
    });

  };

  // ### Fetching the authenticated user's favorites.

  Self.prototype.favorites = function(options, callback) {

    // Make the options argument optional
    if (typeof options === 'function') {
      callback = options;
      options = null;
    }

    // Make a request to the API
    request({
      url: 'users/self/media/liked',
      data: options,
      success: callback
    });

  };

  // ### Fetching a list of relationship requests for the currently authenticated user

  User.prototype.requests = function(callback) {
    
    // Make a request to the API
    request({
      url: 'users/self/requested-by',
      success: callback
    });

  };

  // ### Getting a relationship information for the currently authenciated user and a given user ID

  User.prototype.relationshipWith = function(id, callback) {
    
    // Make a request to the API
    request({
      url: 'users/' + id + '/relationship',
      success: callback
    });

  };

  // ### Fetching the profile of a user by ID or username

  User.prototype.get = function(id, callback) {
    
    // Require that an ID or username be passed
    if (!id) {
      throw new InstajamError('A user\'s ID or username is required for user.get()');
    }

    if (typeof id === 'number') {
      
      // Make a request to the API
      request({
        url: 'users/' + id,
        success: callback
      });
    
    } else if (typeof id === 'string') {

      // Make a request to the API
      User.prototype.search.call(this, id, {}, function(result) {

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
      throw new InstajamError('A user\'s ID or username is required for user.media()');
    }

    // Make the options argument optional
    
    if (typeof options === 'function' && !callback) {
      callback = options;
      options = null;
    }

    // If we're looking up the user by ID...
    
    if (typeof id === 'number') {
      
      // Make a request to that API
      request({
        url: 'users/' + id + '/media/recent',
        data: options,
        success: callback
      });
    
    }

    // Or rather looking up the user by username...

    else if (typeof id === 'string') {

      // ...then first search for the username...
      User.prototype.search.call(this, id, {}, function(result) {

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
          request({
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
      throw new InstajamError('A search term is required for user.search()');
    }

    // Make the options argument optional
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    // Add the search term to the options object
    options.q = term;

    // Make a request to the API
    request({
      url: 'users/search',
      data: options,
      success: callback
    });

  };

  // ### Fetching a list of users that user [id] follows

  User.prototype.follows = function(id, callback) {
    
    // Make a request to the API
    request({
      url: 'users/' + id + '/follows',
      success: callback
    });

  };

  // ### Fetching a list of followers of user [id]

  User.prototype.following = function(id, callback) {
    
    // Make a request to the API
    request({
      url: 'users/' + id + '/followed-by',
      success: callback
    });

  };

  // ## Media

  var Media = function() {};

  Media.prototype.get = function(id, callback) {

    // Make a request to the API
    request({
      url: 'media/' + id,
      success: callback
    });

  };

  Media.prototype.search = function(options, callback) {

    options = options || {};

    // Require that a latitude and longitude are
    // passed in, at a minimum.
    if (!options.lat || !options.lng) {
      throw new InstajamError('A latitude AND a longitude are required for media.search()');
    }

    // Make a request to the API
    request({
      url: 'media/search',
      data: options,
      success: callback
    });

  };

  Media.prototype.popular = function(callback) {

    // Make a request to the API
    request({
      url: 'media/popular',
      success: callback
    });

  };

  Media.prototype.comments = function(id, callback) {

    if (!id) {
      throw new InstajamError('A media ID is required for media.comments()');
    }

    // Make a request to the API
    request({
      url: 'media/' + id + '/comments',
      success: callback
    });

  };

  Media.prototype.likes = function(id, callback) {

    if (!id) {
      throw new InstajamError('A media ID is required for media.likes()');
    }

    // Make a request to the API
    request({
      url: 'media/' + id + '/likes',
      success: callback
    });

  };

  // ## Tags

  var Tag = function() {};

  Tag.prototype.get = function(name, callback) {
    
    // We need at least a tag name to get information for
    if (!name) {
      throw new InstajamError('A tag name is required for tag.get()');
    }

    // Make a request to the API
    request({
      url: 'tags/' + name,
      success: callback
    });

  };

  Tag.prototype.media = function(name, options, callback) {
      
    // We need at least a tag name to work with
    if (!name) {
      throw new InstajamError('A tag name is required for tag.media()');
    }

    // Make the options argument optional
    if (typeof options === 'function' && !callback) {
      callback = options;
      options = {};
    }

    // Make a request to the API
    request({
      url: 'tags/' + name + '/media/recent',
      data: options,
      success: callback
    });

  };

  Tag.prototype.search = function(term, callback) {
    
    // We need at least a tag string to search for
    if (!term) {
      throw new InstajamError('A tag name is required for tag.search()');
    }

    var options = {
      q: term
    };

    // Make a request to the API
    request({
      url: '/tags/search',
      data: options,
      success: callback
    });

  };

  // ## Locations

  var Location = function() {};

  Location.prototype.get = function(id, callback) {
    
    // We need at least a location ID to work with
    if (!id) {
      throw new InstajamError('An ID is required for location.get()');
    }

    // Make a request to the API
    request({
      url: 'locations/' + id,
      success: callback
    });

  };

  Location.prototype.media = function(id, options, callback) {
    
    // We need at least a location ID to work with
    if (!id) {
      throw new InstajamError('An ID is required for location.get()');
    }

    // Make the options argument optional
    if (typeof options === 'function' && !callback) {
      callback = options;
      options = {};
    }

    // Make a request to the API
    request({
      url: 'locations/' + id + '/media/recent',
      success: callback
    });

  };

  Location.prototype.search = function(options, callback) {
  
    options = options || {};

    // We need at LEAST a lat/lng pair, or a Foursquare ID to work with
    if ( (!options.lat || !options.lng) && !options.foursquare_v2_id) {
      throw new InstajamError('A latitude and longitude OR a Foursquare place ID is required for location.search()');
    }

    // Make a request to the API
    request({
      url: 'locations/search',
      data: options,
      success: callback
    });

  };

  // ## Geographies

  var Geography = function() {};

  Geography.prototype.media = function(id, options, callback) {
      
    // We need at least a Geography ID to work with
    if (!id) {
      throw new InstajamError('A Geography ID is required for geography.get()');
    }

    // The options argument defaults to an empty object
    options = options || {};

    // Make a request to the API
    request({
      url: 'geographies/' + id + '/media/recent',
      data: options,
      success: callback
    });

  };

  // # Helpers

  // Returns the client-specific authentication URL that is created upon initialization.

  // Parses a given parameter from the browsers hash. 
  // Optionally, the parameter can be removed from 
  // the URL upon successful matching.

  function hashParam (param, remove) {

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

  }

  // Makes JSONP requests to the Instagram API

  function request (options) {

    var urlBase = 'https://api.instagram.com/v1/',
        callbackName = 'instajam' + Math.round(new Date().getTime() / 1000) + Math.floor(Math.random() * 100);

    options = options || {};
    options.data = options.data || {};
    options.data.access_token = localStorage.getItem('instagram_access_token');
    options.data.callback = callbackName;
    
    var queryString = serializeParams(options.data);

    if (options.url) {
      options.url = urlBase + options.url + '?' + queryString;

      window[callbackName] = function(data) {
          
        if (typeof options.success === 'function') {
          options.success(data);
        }
        
        script.parentNode.removeChild(script);
        delete window[callbackName];
      };

      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = options.url;
      document.getElementsByTagName('body')[0].appendChild(script);

    } else {
      throw new InstajamError("Instajam:: Missing request URL");
    }

  }

  // Given a JavaScript object, return a 
  // string suitable for passing in a URL

  function serializeParams (obj) {
    var str = [];
    for (var p in obj) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
    return str.join('&');
  }

  // Define a custom error object

  function InstajamError (message) {
    this.name = "InstajamError";
    this.message = message || '';
  }

  InstajamError.prototype = Error.prototype;

  // Return new instances of the endpoint 
  // helpers as top-level keys

  Instajam.user = new User();
  Instajam.media = new Media();
  Instajam.tag = new Tag();
  Instajam.location = new Location();
  // Instajam.geography = new Geography();

}(window.Instajam = window.Instajam || {}));