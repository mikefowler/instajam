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
