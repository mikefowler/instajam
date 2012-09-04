/**
 * Instajam
 * © 2012 Mike Fowler
 * Instajam may be freely distributed under the MIT license.
 */

(function() {

  var Instajam;
  var INSTAGRAM_API_BASE = 'https://api.instagram.com/v1';

  Instajam = window.Instajam = function(options) {

    options = options || {};

    /**
     * Performs a request to an Instagram API
     * endpoint.
     * @param  {String}   method   GET/POST
     * @param  {String}   path     API Endpoint
     * @param  {Object}   data     JSON object of options
     * @param  {Function} callback A callback function.
     */
    function _request(method, path, data, callback, chain) {

      var request;

      function getURL() {
        return path.indexOf("http") === 0 ? path : INSTAGRAM_API_BASE + path;
      }

      data = data || {};

      // Send the client ID and access token if they are set.
      if(options.auth == "oauth" && options.access_token) {
        data.access_token = options.access_token;
      }
      if(options.client_id) {
        data.client_id = options.client_id;
      }

      // Handle PUT and DELETE methods.
      switch(method) {
        case "PUT":
          data._method = "PUT";
          method = "POST";
          break;
        case "DELETE":
          data._method = "DELETE";
          method = "POST";
          break;
      }

      // Create an AJAX request...
      request = $.ajax({
        type: method,
        url: getURL(),
        dataType: 'jsonp',
        data: data
      });

      // If the request is part of a chain, return the request object...
      if(chain && typeof chain === "boolean") {
        return request;
      }
      // ... and otherwise just run the callbacks...
      else {

        request.done(function(data) {
          if(data.meta.code == 400) {
            throw new Error('Endpoint "' + path + '": ' + data.meta.error_message);
          } else {
            callback(data, null);
          }
        });

        request.fail(function(request, status) {
          callback(null, { code: request.status });
        });

      }

    }

    /**
     * Users
     */

    this.user = {

      /**
       * Retrieves information about the currently authenticated user
       * @param  {Function} callback A callback function.
       */
      self: function(callback) {
        _request("GET", "/users/self", null, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Retrieves the image feed for the currently authenticated user.
       * @param  {Object}   options  A JSON array of options. Accepts: 'count', 'min_id' and 'max_id'
       * @param  {Function} callback A callback function.
       */
      feed: function(options, callback) {

        if(typeof options === "function") {
          callback = options;
          options = null;
        } else {
          options = options || {};
        }

        _request("GET", "/users/self/feed", options, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Returns a list of the media the authenticated user has 'liked', in the by which
       * the media was 'liked'.
       * @param  {Object}   options  A JSON array of options. Accepts: 'count' and 'max_like_id'
       * @param  {Function} callback A callback function.
       */
      liked: function(options, callback) {

        if(typeof options === "function") {
          callback = options;
          options = null;
        } else {
          options = options || {};
        }

        _request("GET", "/users/self/media/liked", options, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Gets information for a user by ID.
       * @param  {Integer}   user_id  The ID of the user to fetch information for.
       * @param  {Function} callback A callback function.
       */
      get: function(user_id, callback) {
        _request("GET", "/users/" + user_id, null, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Gets recently published media for a given user ID.
       * @param  {Integer}   user_id  The ID of the user to fetch media for.
       * @param  {Object}   options  A JSON array of options. Accepts: 'count', 'max_timestamp', 'min_timestamp', 'min_id' and 'max_id'
       * @param  {Function} callback A callback function.
       */
      getRecent: function(user_id, options, callback) {

        if(typeof options === "function") {
          callback = options;
          options = null;
        } else {
          options = options || {};
        }

        _request("GET", "/users/" + user_id + "/media/recent", options, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Searches for users given a search string.
       * @param  {String}   term     The term to search for.
       * @param  {Object}   options  A JSON array of options. Accepts: 'count'.
       * @param  {Function} callback A callback function.
       */
      search: function(term, options, callback) {

        if(typeof options === "function") {
          callback = options;
          options = null;
        } else {
          options = options || {};
        }

        options.q = term;

        _request("GET", "/users/search", options, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Returns a user profile for a given username string.
       * @param  {String}   username The username to look up.
       * @param  {Function} callback [description]
       * @return {[type]}            [description]
       */
      lookup: function(username, callback) {
        this.search(username, null, function(result, error) {
          xcallback(result.data[0], error);
        });
      },

      /**
       * Given a user's ID, returns a list of users they follow.
       * @param  {Integer}   user_id  The user ID to display data for.
       * @param  {Function} callback A callback function.
       */
      follows: function(user_id, callback) {
        _request("GET", "/users/" + user_id + "/follows", null, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Given a user's ID, returns a list of users that follow the given user.
       * @param  {Integer}   user_id  The user ID to display data for.
       * @param  {Function} callback A callback function.
       */
      following: function(user_id, callback) {
        _request("GET", "/users/" + user_id + "/followed-by", null, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Returns a list of pending follow requests for the current user.
       * @param  {Function} callback A callback function.
       */
      requests: function(callback) {
        _request("GET", "/users/self/requested-by", null, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Returns information about the relationship between the current user and the provided user ID
       * @param  {Integer}   user_id  The user ID to retrieve relationship information about.
       * @param  {Function} callback A callback function.
       */
      getRelationship: function(user_id, callback) {
        _request("GET", "/users/" + user_id + "/relationship", null, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Sets the relationship of the current user to a given user ID
       * @param {Integer}   user_id  The user ID to set the relationship for.
       * @param {String}   action   The relationship action to set. Accepts: 'follow', 'unfollow', 'block', 'unblock', 'approve' and 'deny'.
       * @param {Function} callback [description]
       */
      setRelationship: function(user_id, action, callback) {
        options = options || {};
        options.action = action;

        if(user_id && action) {
          _request("POST", "/users/" + user_id + "/relationship", options, function(result, error) {
            if(typeof callback === "function") callback(result, error);
          });
        } else {
          throw new Error('Endpoint "/users/[user_id]/relationship": user_id and action are required.');
        }
      }

    };

    /**
     * Media
     */

    this.media = {

      /**
       * Gets information for a given media ID
       * @param  {Integer}   media_id The ID of the piece of media to fetch meta for.
       * @param  {Function} callback A callback function.
       */
      get: function(media_id, callback) {
        _request("GET", "/media/" + media_id, null, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Searchs for media given, at minimum, a longitude and latitude.
       * @param  {Ojbect} options A JSON object of options. Accepts: 'lat' (required), 'lng' (required), 'min_timestamp', 'max_timestamp' and 'distance'.
       * @param  {Function} callback A callback function.
       */
      search: function(options, callback) {

        if(typeof options === "function") {
          callback = options;
          options = null;
        } else {
          options = options || {};
        }

        if(options.lat && options.lng) {
          _request("GET", "/media/search", options, function(result, error) {
            callback(result, error);
          });
        } else {
          throw new Error('Endpoint "/media/search": "lat" and "lng" options are required.');
        }
      },

      /**
       * Returns popular media.
       * @param  {Function} callback A callback function.
       */
      popular: function(callback) {
        _request("GET", "/media/popular", null, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Retrieves comments for a given media ID
       * @param  {Integer}   media_id The media ID to retrieve comments for.
       * @param  {Function} callback A callback function.
       */
      comments: function(media_id, callback) {
        _request("GET", "/media/" + media_id + "/comments", null, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Adds a new comment for a given media ID and comment text.
       * @param {Integer}   media_id The ID of the media to add a comment for.
       * @param {String}   comment  The text of the comment to add.
       * @param {Function} callback A callback function.
       */
      addComment: function(media_id, comment, callback) {
        options = {};
        options.text = comment;

        _request("POST", "/media/" + media_id + "/comments", options, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Removes a given comment ID from a given media ID
       * @param  {Integer}   media_id   The media ID to remove the comment from.
       * @param  {Integer}   comment_id The ID of the comment to remove.
       * @param  {Function} callback   A callback function.
       */
      removeComment: function(media_id, comment_id, callback) {
        _request("DELETE", "/media/" + media_id + "/comments/" + comment_id, null, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Retrieves 'likes' for a given media ID
       * @param  {Integer}   media_id The media ID to retrieve likes for.
       * @param  {Function} callback A callback function.
       */
      likes: function(media_id, callback) {
        _request("GET", "/media/" + media_id + "/likes", null, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Sets the 'like' flag for a given media ID.
       * @param {Integer}   media_id The ID of the media to like.
       * @param {Function} callback A callback function.
       */
      like: function(media_id, callback) {
        _request("POST", "/media/" + media_id + "/likes", null, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Unsets the 'like' flag for a given media ID
       * @param  {Integer}   media_id   The media ID to unset the 'like' from.
       * @param  {Function} callback   A callback function.
       */
      unlike: function(media_id, callback) {
        _request("DELETE", "/media/" + media_id + "/likes", null, function(result, error) {
          callback(result, error);
        });
      }

    };

    /**
     * Tags
     */

    this.tag = {

      /**
       * Requests meta about a given tag name.
       * @param  {String}   tag_name The tag name to request meta for.
       * @param  {Function} callback A callback function.
       */
      meta: function(tag_name, callback) {
        _request("GET", "/tags/" + tag_name, null, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Gets recent media for a given tag name.
       * @param  {String}   tag_name The tag name to request media for.
       * @param  {Object}   options  A JSON object of options.
       * @param  {Function} callback A callback function.
       */
      get: function(tag_name, options, callback) {

        if(typeof options === "function") {
          callback = options;
          options = null;
        } else {
          options = options || {};
        }

        _request("GET", "/tags/" + tag_name + "/media/recent", options, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Searches for tags given a search term.
       * @param  {String}   search_term The search term to look up tags with.
       * @param  {Function} callback    A callback function.
       */
      search: function(search_term, callback) {
        var options = {};
        options.q = search_term || "";

        _request("GET", "/tags/search", options, function(result, error) {
          callback(result, error);
        });
      }

    };

    /**
     * Locations
     */

    this.location = {

      /**
       * Retrieves meta for a given location ID.
       * @param  {Integer}   location_id The location ID to fetch meta for.
       * @param  {Function} callback    A callback function.
       */
      meta: function(location_id, callback) {
        _request("GET", "/locations/" + location_id, null, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Retrieves recent media for a given location's ID.
       * @param  {Integer}   location_id The location ID to fetch media for.
       * @param  {Object} options A JSON object of options. Accepts: 'min_id', 'max_id', 'min_timestamp' and 'max_timestamp'.
       * @param  {Function} callback    A callback function.
       */
      get: function(location_id, options, callback) {
        if(typeof options === "function") {
          callback = options;
          options = null;
        } else {
          options = options || {};
        }

        _request("GET", "/locations/" + location_id + "/media/recent", options, function(result, error) {
          callback(result, error);
        });
      },

      /**
       * Search for locations given, at a minimum, a lat/lng or a Foursquare location ID.
       * @param  {Object}   options  A JSON object of options. Accepts: 'lat' (required), 'lng' (required), 'distance', 'foursquare_v2_id' (if used, lat and lng are not required).
       * @param  {Function} callback A callback function.
       */
      search: function(options, callback) {
        options = options || {};

        if((options.lat !== null && options.lng !== null) || options.foursquare_v2_id !== null) {
          _request("GET", "/locations/search", options, function(result, error) {
            callback(result, error);
          });
        } else {
          throw new Error('Endpoint "/locations/search": Either "lat" and "lng", or "foursquare_v2_id" are required.');
        }
      }

    };

    /**
     * Geographies
     */

    this.geography = {

      /**
       * Gets recent media from a geography subscription created by YOUR APP.
       * @param  {String}   geo_id   The ID of the geography to get media for.
       * @param  {Object}   options  A JSON object of options. Accepts: 'count' and 'min_id'.
       * @param  {Function} callback A callback function.
       */
      get: function(geo_id, options, callback) {
        if(typeof options === "function") {
          callback = options;
          options = null;
        } else {
          options = options || {};
        }

        _request("GET", "/geographies/" + geo_id + "/media/recent", options, function(result, error) {
          callback(result, error);
        });
      }

    };

    /**
     * Helpers Functions
     */
    this.nextPage = function(url, callback) {
      _request("GET", url, null, function(result, error) {
        callback(result, error);
      });
    };

    this.chain = function(method, path, options) {
      return _request(method, path, options, null, true);
    };

  };

}).call(this);