'use strict';

// -----------------------------------------------------------------------------
// Public Class
// -----------------------------------------------------------------------------

function Self (client) {
	this.client = client;
}

// ### Fetching the authenticated users's profile

Self.prototype.profile = function (callback) {
	this.client.request({
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
  this.client.request({
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
  this.client.request({
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
  this.client.request({
    url: 'users/self/media/liked',
    data: options,
    success: callback
  });

};

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

module.exports = Self;
