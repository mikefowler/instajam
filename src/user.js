'use strict';

// -----------------------------------------------------------------------------
// Public Class
// -----------------------------------------------------------------------------

function User (client) {
	this.client = client;
}

// ### Fetching a list of relationship requests for the currently authenticated user

User.prototype.requests = function(callback) {
  
  // Make a request to the API
  this.client.request({
    url: 'users/self/requested-by',
    success: callback
  });

};

// ### Getting a relationship information for the currently authenciated user and a given user ID

User.prototype.relationshipWith = function(id, callback) {
  
  // Make a request to the API
  this.client.request({
    url: 'users/' + id + '/relationship',
    success: callback
  });

};

// ### Fetching the profile of a user by ID or username

User.prototype.get = function(id, callback) {
  
  // Require that an ID or username be passed
  if (!id) {
    throw new Error('Instajam: A user\'s ID or username is required for User.get()');
  }

  if (typeof id === 'number') {
    
    // Make a request to the API
    this.client.request({
      url: 'users/' + id,
      success: callback
    });
  
  } else if (typeof id === 'string') {

    // Make a request to the API
    this.search(id, function(result) {

      // If the initial user search yields any
      // results, then just return the first, but
      // otherwise return nothing.
      if (result.data && result.data.length === 1) {
        result = result.data[0];
      } else {
        result = false;
      }

      // Call the initial callback, passing the result
      if (typeof callback === 'function') {
        callback(result);
      }

    });

  }

};

// ### Fetching the media of a user ID or username

User.prototype.media = function(id, options, callback) {

  // Require that an ID be passed
  
  if (!id) {
    throw new Error('Instajam: A user\'s ID or username is required for User.media()');
  }

  // Make the options argument optional
  
  if (typeof options === 'function' && !callback) {
    callback = options;
    options = null;
  }

  // If we're looking up the user by ID...
  
  if (typeof id === 'number') {
    
    // Make a request to that API
    this.client.request({
      url: 'users/' + id + '/media/recent',
      data: options,
      success: callback
    });
  
  }

  // Or rather looking up the user by username...

  else if (typeof id === 'string') {

    // ...then first search for the username...
   this.search(id, function(result) {

      // If the initial user search yields any
      // results, then just return the first, but
      // otherwise return nothing.
      if (result.data && result.data.length > 0) {
        result = result.data[0];
      } else {
        result = false;
      }

      if (result) {

        // Make a request to that API
        this.client.request({
          url: 'users/' + result.id + '/media/recent',
          data: options,
          success: callback
        });

      } else {

        if (typeof callback === 'function') {
          callback(result);
        }

      }

    });

  }

};

// ### Searching for users by username

User.prototype.search = function(term, options, callback) {
  
  // Require that a search term be passed
  if (!term) {
    throw new Error('Instajam: A search term is required for User.search()');
  }

  // Make the options argument optional
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  // Add the search term to the options object
  options.q = term;

  // Make a request to the API
  this.client.request({
    url: 'users/search',
    data: options,
    success: callback
  });

};

// ### Fetching a list of users that user [id] follows

User.prototype.follows = function(id, callback) {
  
  // Make a request to the API
  this.client.request({
    url: 'users/' + id + '/follows',
    success: callback
  });

};

// ### Fetching a list of followers of user [id]

User.prototype.following = function(id, callback) {
  
  // Make a request to the API
  this.client.request({
    url: 'users/' + id + '/followed-by',
    success: callback
  });

};

module.exports = User;
