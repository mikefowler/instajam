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
