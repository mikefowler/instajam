'use strict';

var instajam;

// -----------------------------------------------------------------------------
// Public Class
// -----------------------------------------------------------------------------

function Tag (client) {
	instajam = client;
}

Tag.prototype.get = function(name, callback) {
    
  // We need at least a tag name to get information for
  if (!name) {
    throw new Error('Instajam: A tag name is required for Tag.get()');
  }

  // Make a request to the API
  instajam.request({
    url: 'tags/' + name,
    success: callback
  });

};

Tag.prototype.media = function(name, options, callback) {
    
  // We need at least a tag name to work with
  if (!name) {
    throw new Error('Instajam: A tag name is required for Tag.media()');
  }

  // Make the options argument optional
  if (typeof options === 'function' && !callback) {
    callback = options;
    options = {};
  }

  // Make a request to the API
  instajam.request({
    url: 'tags/' + name + '/media/recent',
    data: options,
    success: callback
  });

};

Tag.prototype.search = function(term, callback) {
  
  // We need at least a tag string to search for
  if (!term) {
    throw new Error('Instajam: A tag name is required for Tag.search()');
  }

  var options = {
    q: term
  };

  // Make a request to the API
  instajam.request({
    url: '/tags/search',
    data: options,
    success: callback
  });

};

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

module.exports = Tag;
