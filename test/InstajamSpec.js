var Instajam = require('../src/instajam.js');
var Self = require('../src/self.js');
var User = require('../src/user.js');
var Tag = require('../src/tag.js');
var Media = require('../src/media.js');
var Geography = require('../src/geography.js');
var Location = require('../src/location.js');

describe('Instajam', function () {

	var clientID = 'e9c4567d05174f47827a022e31aeffd4';
	var redirectURI = 'http://my.app.com';

	describe('Initialize', function () {

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

	describe('Initialize with options', function () {

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

	});

	describe('Authentication', function () {

		var oauthURL = 'https://instagram.com/oauth/authorize';

		beforeEach(function () {
			this.client = new Instajam({
				clientID: clientID
			})
		});

		it('should require a redirect URI in order to generate an authentication URL', function () {
			var getAuthURL = this.client.getAuthURL.bind(this.client);
			expect(getAuthURL).to.throw('redirect URI is required');
		});

		it('should return an authentication URL', function () {
			this.client.options.redirectURI = redirectURI;
			var url = this.client.getAuthURL();

			expect(url).to.contain(oauthURL);
			expect(url).to.contain('client_id=' + clientID);
			expect(url).to.contain('redirect_uri=' + encodeURIComponent(redirectURI));
			expect(url).to.contain('response_type=token');
			expect(url).to.contain('scope=basic');
		});

	});

});
