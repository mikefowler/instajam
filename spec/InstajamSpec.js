
describe("Instajam", function() {
  var API, CLIENT_ID, REDIRECT_URI;
  API = null;
  CLIENT_ID = 'INSTAGRAM_CLIENT_ID';
  REDIRECT_URI = 'http://instajam.dev';
  beforeEach(function() {
    return API = Instajam.init({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: ['basic', 'likes']
    });
  });
  it("should require both a client ID and redirect URI to initialize", function() {
    expect(function() {
      return Instajam.init();
    }).toThrow();
    expect(function() {
      return Instajam.init({
        client_id: 'XXX'
      });
    }).toThrow();
    expect(function() {
      return Instajam.init({
        redirect_uri: 'XXX'
      });
    }).toThrow();
    return expect(function() {
      return Instajam.init({
        client_id: 'XXX',
        redirect_uri: 'XXX'
      });
    }).not.toThrow();
  });
  it("should an accept an array of scope permissions", function() {
    expect(function() {
      return Instajam.init({
        client_id: 'XXX',
        redirect_uri: 'XXX',
        scope: 5
      });
    }).toThrow();
    expect(function() {
      return Instajam.init({
        client_id: 'XXX',
        redirect_uri: 'XXX',
        scope: 'string'
      });
    }).toThrow();
    expect(function() {
      return Instajam.init({
        client_id: 'XXX',
        redirect_uri: 'XXX',
        scope: ['basic', 'likes']
      });
    }).not.toThrow();
    return expect(API.scope).toEqual('&scope=basic+likes');
  });
  return it("should return a proper authentication URL", function() {
    var auth_url;
    auth_url = API.getAuthUrl();
    return expect(auth_url).toEqual("https://instagram.com/oauth/authorize/?client_id=" + CLIENT_ID + "&redirect_uri=" + REDIRECT_URI + "&response_type=token&scope=basic+likes");
  });
});
