# **Instajam** is a JavaScript wrapper for the Instajam API.
#
# # Initialization

window.Instajam = do ->

  auth_url = null

  # Initialize the library by calling init() and passing in your client ID and redirect URI
  
  init = (options) ->

    options = options ||= {}

    # Throw an error if either the client ID or the 
    # redirect URI isn't provided.
    if not options.client_id or not options.redirect_uri
      throw new InstajamError "Client ID and redirect URI are required."

    # If the app is requesting additional scopes, build a string
    # to append to the auth URL.
    if options.scope and typeof options.scope is 'object'
      @scope = "&scope=" + options.scope.join('+')
    else if options.scope and typeof options.scope isnt 'object'
      throw new InstajamError "Scope should be an array of requested scopes"

    # Build an authentication URL using constructor
    # parameters.
    auth_url = "https://instagram.com/oauth/authorize/?client_id=#{options.client_id}&redirect_uri=#{options.redirect_uri}&response_type=token#{@scope || ''}"

    # Try to authenticate the user
    authenticate.call(this)

    @

  # # Endpoints

  # ## User Endpoints

  # Create an empty function for attaching user methods
  User =->




  # ### user.self( [,callback] )
  #
  # Retrieves information about the currently
  # authenticated user.

  User.prototype.self = (callback)  ->

    # Make the request
    request
      url: "users/self"
      success: callback




  # ### user.feed( [,options] [,callback] )
  #
  # Retrieves the image feed for the currently
  # authenticated user.

  User.prototype.feed = (options, callback) ->

    # Make the options argument optional
    if typeof options is 'function'
      callback = options
      options = null

    # Make the request
    request
      url: "users/self/feed"
      data: options
      success: callback




  # ### user.liked( [,options] [,callback] )
  #
  # Retrieves a list of the media the 
  # authenticated user has liked

  User.prototype.liked = (options, callback) ->

    # Make the options argument optional
    if typeof options is 'function'
      callback = options
      options = null

    # Make the request
    request
      url: "users/self/media/liked"
      data: options
      success: callback




  # ### user.get( id [,callback] )
  #
  # Get information for a user by ID.

  User.prototype.get = (id, callback) ->

    # Fail if ID is not provided
    if not id
      throw new InstajamError "A user's ID is required for user.get()"

    # Make the request
    request
      url: "users/#{id}"
      success: callback




  # ### user.getRecent( id [,options] [,callback] )
  #
  # Retrieves media recently published by a given
  # user ID.

  User.prototype.getRecent = (id, options, callback) ->

    # Fail if ID is not provided
    if not id
      throw new InstajamError "A user's ID is required for user.getRecent()"

    # Make the options argument optional
    if typeof options is 'function'
      callback = options
      options = null

    # Make the request
    request
      url: "users/#{id}/media/recent"
      data: options
      success: callback




  # ### user.search( term [,options] [,callback] )
  #
  # Perform a string search for users.

  User.prototype.search = (term, options, callback) ->

    # Fail if a search term isn't provided
    if not term
      throw new InstajamError "A search term is required for user.search()"

    # Make the options argument optional
    if typeof options is 'function'
      callback = options
      options = {}

    # Add the search term to the options object
    options.q = term

    # Make the request
    request
      url: "users/search"
      data: options
      success: callback




  # ### user.lookup( username [,callback] )
  #
  # Lookup a user by username, if the username exists.

  User.prototype.lookup = (username, callback) ->

    # Fail if username is not provided
    if not username
      throw new InstajamError "A username is required for user.lookup()"

    # Make the request
    User.prototype.search.call(this, username, {}, (result) ->
      if result.data and result.data.length is 1 then result = result.data[0]
      callback(result) if typeof callback is 'function'
    )




  # ### user.follows( id [,callback] )
  #
  # Retrieves a list of users followed by a given
  # user ID
  
  User.prototype.follows = (id, callback) ->

    # Make the request
    request
      url: "users/#{id}/follows"
      success: callback




  # ### user.following( id [,callback] )
  #
  # Retrieves a list of users following a given
  # user ID

  User.prototype.following = (id, callback) ->

    # Make the request
    request
      url: "users/#{id}/followed-by"
      success: callback




  # ### user.requests( [callback] )
  #
  # Returns a list of pending follow requests
  # for the currently authenticated user.

  User.prototype.requests = (callback) ->

    # Make the request
    request
      url: "users/self/requested-by"
      success: callback




  # ### user.getRelationship( id [,callback] )
  #
  # Returns information about the relationship between
  # the currently authenticated user and the given
  # user ID.

  User.prototype.getRelationship = (id, callback) ->

    # Make the request
    request
      url: "users/#{id}/relationship"
      success: callback




  # ## Media Endpoints

  # Create an empty function for attaching media methods
  Media =->




  # ### media.get( id [,callback] )
  #
  # Gets information for a given media ID

  Media.prototype.get = (id, callback) ->

    # Make the request
    request
      url: "media/#{id}"
      success: callback

  # ### media.search( options [,callback] )
  #
  # Search for media with the specified 
  # parameters. Accepted options: 'lat' (required), 
  # 'lng' (required), 'min_timestamp', 
  # 'max_timestamp' and 'distance'.

  Media.prototype.search = (options, callback) ->

    if not options.lat and not options.lng
      throw new InstajamError "'lat' and 'lng' parameters are required."

    # Make the request
    request
      url: "media/search"
      data: options
      success: callback




  # ### media.popular( [,callback] )
  #
  # Retrieves popular media.

  Media.prototype.popular = (callback) ->

    # Make the request
    request
      url: "media/popular"
      success: callback




  # ### media.comments( id [,callback] )
  #
  # Retrieves comments for a given media ID

  Media.prototype.comments = (id, callback) ->

    # Make the request
    request
      url: "media/#{id}/comments"
      success: callback




  # ### media.likes( id [,callback] )
  #
  # Retrieves users who have liked a given media ID

  Media.prototype.likes = (id, callback) ->

    # Make the request
    request
      url: "media/#{id}/likes"
      success: callback




  # ## Tag Endpoints

  # Create an empty function for attaching tag methods
  Tag =->




  # ### tag.meta( tag [,callback] )
  #
  # Retrieves meta information for a given tag name

  Tag.prototype.meta = (tag, callback) ->

    # Make the request
    request
      url: "tags/#{tag}"
      success: callback




  # ### tag.get( tag [,options] [,callback] )
  # 
  # Gets recent media for a given tag name

  Tag.prototype.get = (tag, options, callback) ->

    # Make the options argument optional
    if typeof options is 'function'
      callback = options
      options = null

    # Make the request
    request
      url: "tags/#{tag}/media/recent"
      data: options
      success: callback




  # ### tag.search( term [,callback] )
  #
  # Perform a string search for tags

  Tag.prototype.search = (term, callback) ->

    # Make the request
    request
      url: "tags/search"
      data:
        q: term
      success: callback




  # ## Location Endpoints

  # Create an empty function for attaching location methods
  Location =->




  # ### location.meta( id [,callback] )
  #
  # Retrieves meta information for a given location ID

  Location.prototype.meta = (id, callback) ->

    # Make the request
    request
      url: "locations/#{id}"
      success: callback




  # ### location.get( id [,options] [,callback] )
  #
  # Retrieves recent media for a given location ID    
  
  Location.prototype.get = (id, options, callback) ->

    # Make the request
    request
      url: "locations/#{id}/media/recent"
      data: options
      success: callback




  # ### location.search( options [,callback] )
  #
  # Search for locations with the specified parameters.
  # Requires at least lat/lng or a Foursquare location ID.
  # 
  # Accepted options:
  #   * lat
  #   * lng
  #   * min_timestamp 
  #   * max_timestamp
  #   * distance  

  Location.prototype.search = (options, callback) ->

    # Make the request
    request
      url: "locations/search"
      data: options
      success: callback




  # ## Geography Endpoints

  # Create an empty function for attaching geography methods
  Geography =->




  # ### geography.get( id [,options] [,callback] )
  # 
  # Retrieves recent media from a geography subscription.
  # Geography IDs are app-specific, and must be
  # created by your application.

  Geography.prototype.get = (id, options, callback) ->

    # Make the request
    request
      url: "geographies/#{id}/media/recent"
      data: options
      success: callback




  # # Authentication
  
  # ## Authenticate
  # 
  # Attempts to authenticate a user via localStorage data
  # or by parsing data from the URL hash.

  authenticate =->

    # First, check if a localStorage key exists for the access_token...
    if localStorage.getItem 'access_token'
      # ...and if there is, set the authenticated property to true. 
      @authenticated = yes
    # If there is no localStorage key...
    else
      # ...then check if there's a match for access_token in the URL hash.
      if hashParam 'access_token'
        # If we can parse the access_token from the URL hash, set the localStorage param...
        localStorage.setItem( 'access_token', hashParam('access_token', yes) )
        # ...and set the authenticated property to true
        @authenticated = yes
      else
        # Otherwise, if there is no localStorage key and there
        # is nothing to parse from the hash, set the authenticated
        # property to false
        @authenticated = no

  # ## De-authenticate
  #
  # Effectively de-authenticates the current user by removing
  # their access token from localStorage and setting the authenticated
  # property to false. This does **not** revoke your app's permissions
  # on the server.

  deauthenticate =->
    localStorage.removeItem 'access_token'
    @authenticated = no

  # # Utilities

  # ## Get the Authentication URL
  # 
  # Returns the client-specific authentication URL that is 
  # created upon initialization.

  getAuthUrl =->
    return auth_url

  # ## Retrieve parameters from URL hash
  #
  # Parses a given parameter from the browsers hash. Optionally,
  # the parameter can be removed from the URL upon successful
  # matching.

  hashParam = (param, remove) ->

    # Create a RegExp object for parsing params
    regex = new RegExp("(?:&|#)" + param + "=([a-z0-9._-]+)", "i")

    # Look for matches in the windows hash
    matches = window.location.hash.match(regex)

    # If matches are found...
    if matches

      # ...then remove the parameter if specified
      if remove
        removeRegex = new RegExp("(?:&|#)" + param + "=" + matches[1], "i")
        window.location.hash = window.location.hash.replace(removeRegex, '')

      # ...and return the first matching param
      return matches[1]

    # Otherwise return false if no matching params are found
    return false

  # ## Test for localStorage support
  #
  # Returns yes/no based on whether or not the client's 
  # browser supports storing the access_token via localStorage

  supportsLocalStorage =->
    # Define a string to test localStorage with
    test = 'instajam'

    # Try to set/remove localStorage items
    try
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return yes
    catch error
      return no

  # ## Perform a request to the API
  #
  # Makes JSONP requests to the Instajam servers.
  #
  #  * options: An object containing request parameters.

  request = (options) ->

    # Define the API base URL
    url_base = "https://api.instagram.com/v1/"

    # Generate a unique name for the JSONP request callback
    callbackName = "instajam" + Math.round(new Date().getTime() / 1000)

    # If no data parameters are passed in, initialize it as an empty object
    options.data ||= {}

    # Build a query string using the provided data parameters
    options.data.access_token = localStorage.getItem 'access_token'
    options.data.callback = callbackName
    queryString = serializeParams(options.data)

    # Build the URL for the request and append the query string
    unless options.url
      options.url = null
    else
      options.url = "#{url_base}#{options.url}?#{queryString}"

    # If we have a valid request URL...
    if options.url

      # ...then generate our JSONP callback function
      window[callbackName] = (data) ->
        options.success(data) if typeof options.success is 'function'
        script.parentNode.removeChild(script)
        delete window[callbackName]

      # and inject the script that will make the cross-domain request
      script = document.createElement 'script'
      script.type = 'text/javascript'
      script.src = options.url
      document.getElementsByTagName('body')[0].appendChild(script)

    # Otherwise...
    else

      # ...throw an error for a missing request URL
      throw new InstajamError "Instajam:: Missing request URL"

  # ## Serialize an object of request parameters
  #
  # Given a JavaScript object, return a string suitable for
  # passing in a URL
  
  serializeParams = (obj) ->
    str = []
    for p of obj
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
    return str.join("&")

  # ## A custom exception type
  #
  # Throws exceptions with useful messages for debugging. The
  # InstajamError object uses the same prototype chain
  # as a native JavaScript Error() object.

  InstajamError = (message) ->
    @name = "InstajamError"
    @message = message ||= ''
  InstajamError.prototype = Error.prototype

  # # Public Methods
  #
  # Returns an object of methods that should be accessible
  # to you, the developer!

  return {
    init: init
    logout: deauthenticate
    getAuthUrl: getAuthUrl
    user: new User
    media: new Media
    tag: new Tag
    location: new Location
    geography: new Geography
  }

# Define the wrapper as a module for script loaders

if typeof define is 'function' and define.amd
  define( 'Instajam', [], -> return window.Instajam )