'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var helpers = require('./helpers.js');

var Self = require('./self.js');
var User = require('./user.js');
var Media = require('./media.js');
var Tag = require('./tag.js');
var Location = require('./location.js');
var Geography = require('./geography.js');

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
