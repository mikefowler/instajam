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
  }

};
