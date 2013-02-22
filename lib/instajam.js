(function() {

  window.Instajam = (function() {
    var Geography, InstajamError, Location, Media, Tag, User, auth_url, authenticate, deauthenticate, getAuthUrl, hashParam, init, request, serializeParams, supportsLocalStorage;
    auth_url = null;
    init = function(options) {
      options = options || (options = {});
      if (!options.client_id || !options.redirect_uri) {
        throw new InstajamError("Client ID and redirect URI are required.");
      }
      if (options.scope && typeof options.scope === 'object') {
        this.scope = "&scope=" + options.scope.join('+');
      } else if (options.scope && typeof options.scope !== 'object') {
        throw new InstajamError("Scope should be an array of requested scopes");
      }
      auth_url = "https://instagram.com/oauth/authorize/?client_id=" + options.client_id + "&redirect_uri=" + options.redirect_uri + "&response_type=token" + (this.scope || '');
      authenticate.call(this);
      return this;
    };
    User = function() {};
    User.prototype.self = function(callback) {
      return request({
        url: "users/self",
        success: callback
      });
    };
    User.prototype.feed = function(options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = null;
      }
      return request({
        url: "users/self/feed",
        data: options,
        success: callback
      });
    };
    User.prototype.liked = function(options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = null;
      }
      return request({
        url: "users/self/media/liked",
        data: options,
        success: callback
      });
    };
    User.prototype.get = function(id, callback) {
      if (!id) {
        throw new InstajamError("A user's ID is required for user.get()");
      }
      return request({
        url: "users/" + id,
        success: callback
      });
    };
    User.prototype.getRecent = function(id, options, callback) {
      if (!id) {
        throw new InstajamError("A user's ID is required for user.getRecent()");
      }
      if (typeof options === 'function') {
        callback = options;
        options = null;
      }
      return request({
        url: "users/" + id + "/media/recent",
        data: options,
        success: callback
      });
    };
    User.prototype.search = function(term, options, callback) {
      if (!term) {
        throw new InstajamError("A search term is required for user.search()");
      }
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      options.q = term;
      return request({
        url: "users/search",
        data: options,
        success: callback
      });
    };
    User.prototype.lookup = function(username, callback) {
      if (!username) {
        throw new InstajamError("A username is required for user.lookup()");
      }
      return User.prototype.search.call(this, username, {}, function(result) {
        if (result.data && result.data.length === 1) {
          result = result.data[0];
        }
        if (typeof callback === 'function') {
          return callback(result);
        }
      });
    };
    User.prototype.follows = function(id, callback) {
      return request({
        url: "users/" + id + "/follows",
        success: callback
      });
    };
    User.prototype.following = function(id, callback) {
      return request({
        url: "users/" + id + "/followed-by",
        success: callback
      });
    };
    User.prototype.requests = function(callback) {
      return request({
        url: "users/self/requested-by",
        success: callback
      });
    };
    User.prototype.getRelationship = function(id, callback) {
      return request({
        url: "users/" + id + "/relationship",
        success: callback
      });
    };
    Media = function() {};
    Media.prototype.get = function(id, callback) {
      return request({
        url: "media/" + id,
        success: callback
      });
    };
    Media.prototype.search = function(options, callback) {
      if (!options.lat && !options.lng) {
        throw new InstajamError("'lat' and 'lng' parameters are required.");
      }
      return request({
        url: "media/search",
        data: options,
        success: callback
      });
    };
    Media.prototype.popular = function(callback) {
      return request({
        url: "media/popular",
        success: callback
      });
    };
    Media.prototype.comments = function(id, callback) {
      return request({
        url: "media/" + id + "/comments",
        success: callback
      });
    };
    Media.prototype.likes = function(id, callback) {
      return request({
        url: "media/" + id + "/likes",
        success: callback
      });
    };
    Tag = function() {};
    Tag.prototype.meta = function(tag, callback) {
      return request({
        url: "tags/" + tag,
        success: callback
      });
    };
    Tag.prototype.get = function(tag, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = null;
      }
      return request({
        url: "tags/" + tag + "/media/recent",
        data: options,
        success: callback
      });
    };
    Tag.prototype.search = function(term, callback) {
      return request({
        url: "tags/search",
        data: {
          q: term
        },
        success: callback
      });
    };
    Location = function() {};
    Location.prototype.meta = function(id, callback) {
      return request({
        url: "locations/" + id,
        success: callback
      });
    };
    Location.prototype.get = function(id, options, callback) {
      return request({
        url: "locations/" + id + "/media/recent",
        data: options,
        success: callback
      });
    };
    Location.prototype.search = function(options, callback) {
      return request({
        url: "locations/search",
        data: options,
        success: callback
      });
    };
    Geography = function() {};
    Geography.prototype.get = function(id, options, callback) {
      return request({
        url: "geographies/" + id + "/media/recent",
        data: options,
        success: callback
      });
    };
    authenticate = function() {
      if (localStorage.getItem('access_token')) {
        return this.authenticated = true;
      } else {
        if (hashParam('access_token')) {
          localStorage.setItem('access_token', hashParam('access_token', true));
          return this.authenticated = true;
        } else {
          return this.authenticated = false;
        }
      }
    };
    deauthenticate = function() {
      localStorage.removeItem('access_token');
      return this.authenticated = false;
    };
    getAuthUrl = function() {
      return auth_url;
    };
    hashParam = function(param, remove) {
      var matches, regex, removeRegex;
      regex = new RegExp("(?:&|#)" + param + "=([a-z0-9._-]+)", "i");
      matches = window.location.hash.match(regex);
      if (matches) {
        if (remove) {
          removeRegex = new RegExp("(?:&|#)" + param + "=" + matches[1], "i");
          window.location.hash = window.location.hash.replace(removeRegex, '');
        }
        return matches[1];
      }
      return false;
    };
    supportsLocalStorage = function() {
      var test;
      test = 'instajam';
      try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (error) {
        return false;
      }
    };
    request = function(options) {
      var callbackName, queryString, script, url_base;
      url_base = "https://api.instagram.com/v1/";
      callbackName = "instajam" + Math.round(new Date().getTime() / 1000);
      options.data || (options.data = {});
      options.data.access_token = localStorage.getItem('access_token');
      options.data.callback = callbackName;
      queryString = serializeParams(options.data);
      if (!options.url) {
        options.url = null;
      } else {
        options.url = "" + url_base + options.url + "?" + queryString;
      }
      if (options.url) {
        window[callbackName] = function(data) {
          if (typeof options.success === 'function') {
            options.success(data);
          }
          script.parentNode.removeChild(script);
          return delete window[callbackName];
        };
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = options.url;
        return document.getElementsByTagName('body')[0].appendChild(script);
      } else {
        throw new InstajamError("Instajam:: Missing request URL");
      }
    };
    serializeParams = function(obj) {
      var p, str;
      str = [];
      for (p in obj) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
      return str.join("&");
    };
    InstajamError = function(message) {
      this.name = "InstajamError";
      return this.message = message || (message = '');
    };
    InstajamError.prototype = Error.prototype;
    return {
      init: init,
      logout: deauthenticate,
      getAuthUrl: getAuthUrl,
      user: new User,
      media: new Media,
      tag: new Tag,
      location: new Location,
      geography: new Geography
    };
  })();

  if (typeof define === 'function' && define.amd) {
    define('Instajam', [], function() {
      return window.Instajam;
    });
  }

}).call(this);
