'use strict';

function Location (client) {
	this.client = client;
}

Location.prototype.get = function(id, callback) {
    
  // We need at least a location ID to work with
  if (!id) {
    throw new Error('Instajam: An ID is required for Location.get()');
  }

  // Make a request to the API
  this.client.request({
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
  this.client.request({
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
  this.client.request({
    url: 'locations/search',
    data: options,
    success: callback
  });

};

module.exports = Location;
