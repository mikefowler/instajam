'use strict';

function Media (client) {
	this.client = client;
}

Media.prototype.get = function(id, callback) {

  // Make a request to the API
  this.client.request({
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
  this.client.request({
    url: 'media/search',
    data: options,
    success: callback
  });

};

Media.prototype.popular = function(callback) {

  // Make a request to the API
  this.client.request({
    url: 'media/popular',
    success: callback
  });

};

Media.prototype.comments = function(id, callback) {

  if (!id) {
    throw new Error('Instajam: A media ID is required for Media.comments()');
  }

  // Make a request to the API
  this.client.request({
    url: 'media/' + id + '/comments',
    success: callback
  });

};

Media.prototype.likes = function(id, callback) {

  if (!id) {
    throw new Error('Instajam: A media ID is required for Media.likes()');
  }

  // Make a request to the API
  this.client.request({
    url: 'media/' + id + '/likes',
    success: callback
  });

};

module.exports = Media;
