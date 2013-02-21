describe "Instajam", ->

  API = null
  CLIENT_ID = 'INSTAGRAM_CLIENT_ID'
  REDIRECT_URI = 'http://instajam.dev'

  ###########################################
  # SETUP
  ###########################################

  beforeEach ->

    # Create an API object for each test
    API = Instajam.init
      client_id: CLIENT_ID
      redirect_uri: REDIRECT_URI
      scope: ['basic', 'likes']

  ###########################################
  # INITIALIZATION
  ###########################################

  it "should require both a client ID and redirect URI to initialize", ->

    expect ->
      Instajam.init()
    .toThrow()

    expect ->
      Instajam.init({
        client_id: 'XXX'
      })
    .toThrow()

    expect ->
      Instajam.init({
        redirect_uri: 'XXX'
      })
    .toThrow()

    expect ->
      Instajam.init({
        client_id: 'XXX',
        redirect_uri: 'XXX'
      })
    .not.toThrow()

  it "should an accept an array of scope permissions", ->

    expect ->
      Instajam.init({
        client_id: 'XXX',
        redirect_uri: 'XXX'
        scope: 5
      })
    .toThrow()

    expect ->
      Instajam.init({
        client_id: 'XXX',
        redirect_uri: 'XXX'
        scope: 'string'
      })
    .toThrow()

    expect ->
      Instajam.init({
        client_id: 'XXX',
        redirect_uri: 'XXX'
        scope: ['basic', 'likes']
      })
    .not.toThrow()

    expect(API.scope).toEqual('&scope=basic+likes')

  ###########################################
  # AUTHENTICATION
  ###########################################

  it "should return a proper authentication URL", ->

    auth_url = API.getAuthUrl()

    expect(auth_url).toEqual("https://instagram.com/oauth/authorize/?client_id=#{CLIENT_ID}&redirect_uri=#{REDIRECT_URI}&response_type=token&scope=basic+likes")