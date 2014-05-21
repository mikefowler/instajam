var Instajam = require('../src/instajam.js');
var Self = require('../src/self.js');
var User = require('../src/user.js');
var Tag = require('../src/tag.js');
var Media = require('../src/media.js');
var Geography = require('../src/geography.js');
var Location = require('../src/location.js');
var helpers = require('../src/helpers.js');

describe('Instajam:', function () {

	var clientID = 'e9c4567d05174f47827a022e31aeffd4';
	var redirectURI = 'http://my.app.com';

	describe('initializing', function () {

		beforeEach(function () {
			this.client = new Instajam({
				clientID: clientID,
				redirectURI: redirectURI
			});	
		});

		it('requires a client ID', function () {
			expect(Instajam).to.throw('client ID is required');
		});

		it('sets a redirect URI', function () {
			expect(this.client.options.redirectURI).to.equal(redirectURI);
		});

		it('sets a default scope', function () {
			expect(this.client.options.scope).to.be.an('array');
			expect(this.client.options.scope).to.eql(['basic']);
		});

		it('sets a default localStorage key', function () {
			expect(this.client.options.key).to.equal('instajam_access_token');
		});

		it('creates an interface for querying "User" endpoints', function () {
			expect(this.client.user).to.be.an.instanceof(User);
		});

		it('creates an interface for querying "Self" endpoints', function () {
			expect(this.client.self).to.be.an.instanceof(Self);
		});

		it('creates an interface for querying "Tag" endpoints', function () {
			expect(this.client.tag).to.be.an.instanceof(Tag);
		});

		it('creates an interface for querying "Media" endpoints', function () {
			expect(this.client.media).to.be.an.instanceof(Media);
		});

		it('creates an interface for querying "Geography" endpoints', function () {
			expect(this.client.geography).to.be.an.instanceof(Geography);
		});

		it('creates an interface for querying "Location" endpoints', function () {
			expect(this.client.location).to.be.an.instanceof(Location);
		});

		after(function () {
			this.client = null;
			delete this.client;
		});

	});

	describe('initializing with options', function () {

		var localStorageKey = 'test-key';

		beforeEach(function () {
			this.client = new Instajam({
				clientID: clientID,
				redirectURI: redirectURI,
				key: localStorageKey
			});
		});

		it('sets a custom localStorage key', function () {
			expect(this.client.options.key).to.equal(localStorageKey);
		});

		afterEach(function () {
			this.client = null;
			delete this.client;
		});

	});

	describe('authenticating', function () {

		var oauthURL = 'https://instagram.com/oauth/authorize';

		beforeEach(function () {
			this.client = new Instajam({
				clientID: clientID,
				redirectURI: redirectURI
			});
		});

		it('should require a redirect URI in order to generate an authentication URL', function () {
			var getAuthURL = this.client.getAuthURL.bind(this.client);
			delete this.client.options.redirectURI;
			expect(getAuthURL).to.throw('redirect URI is required');
		});

		it('should return an authentication URL', function () {
			var url = this.client.getAuthURL();

			expect(url).to.contain(oauthURL);
			expect(url).to.contain('client_id=' + clientID);
			expect(url).to.contain('redirect_uri=' + encodeURIComponent(redirectURI));
			expect(url).to.contain('response_type=token');
			expect(url).to.contain('scope=basic');
		});

		it('should authenticate with an access token', function () {
			var key = this.client.options.key;

			expect(localStorage.getItem(key)).to.not.exist;
			this.client.authenticate('xxx');
			expect(this.client.options.accessToken).to.equal('xxx');
			expect(localStorage.getItem(key)).to.equal('xxx');
		});

		it('should authenticate by redirecting the browser to Instagram', function () {
			var stub = sinon.stub(helpers, 'setLocation');
			var url = this.client.getAuthURL();
			
			this.client.authenticate();
			
			expect(stub).to.have.been.calledWith(url);
			stub.restore();
		});

		it('should authenticate by opening Instagram in a popup', function () {
			var stub = sinon.stub(helpers, 'openWindow').returns({});
			var url = this.client.getAuthURL();

			var popup = this.client.authenticate({ popup: true });

			expect(stub).to.have.been.calledWith(url);
			expect(popup._instajam).to.exist;
			stub.restore();
		});

		it('should indicate whether a user has been authenticated', function () {
			expect(this.client.isAuthenticated()).to.be.false;
			this.client.authenticate('xxx');
			expect(this.client.isAuthenticated()).to.be.true;
		});

		it('should log a user out by removing their access token from localStorage', function () {
			var key = this.client.options.key;

			this.client.authenticate('xxx');
			expect(localStorage.getItem(key)).to.equal('xxx');
			this.client.logout();
			expect(localStorage.getItem(key)).to.not.exist;
		});

		afterEach(function () {
			this.client.logout();
			this.client = null;
			delete this.client;
		});

	});

});
