var Instajam = require('../src/instajam.js');
var User = require('../src/user.js');
var helpers = require('../src/helpers.js');

describe('Instajam#User', function () {

	var clientID = 'e9c4567d05174f47827a022e31aeffd4';
	var userID = 306837613;
	var username = 'michaelrichardfowler';

	beforeEach(function () {
		this.client = new Instajam({
			clientID: clientID
		});
		this.stub = sinon.stub(helpers, 'jsonp');
	});

	it('can get a user profile by user ID', function () {
		this.client.user.get(userID);
		expect(this.stub).to.have.been.calledOnce;
		expect(this.stub.lastCall.args[0].url).to.contain('/users/' + userID);
	});

	it('can get a user profile by username', function () {
		this.client.user.get(username);
		expect(this.stub).to.have.been.calledOnce;
		expect(this.stub.lastCall.args[0].url).to.contain('/users/search');
		expect(this.stub.lastCall.args[0].url).to.contain('q=' + username);
	});

	it('can get a user\'s media by user ID', function () {
		this.client.user.media(userID);
		expect(this.stub).to.have.been.calledOnce;
		expect(this.stub.lastCall.args[0].url).to.contain('/users/' + userID + '/media/recent');
	});

	it('can get a user\'s media by username', function () {
		var searchSpy, searchResponse;

		searchResponse = {
			data: [{
				id: 42
			}]
		};
		
		searchSpy = sinon.stub(this.client.user, 'search');
		
		this.client.user.media(username);
		expect(searchSpy).to.have.been.calledOnce;
		searchSpy.lastCall.args[1].call(this.client, searchResponse);
		expect(this.stub).to.have.been.calledOnce;
	});

	afterEach(function () {
		this.stub.restore();
		this.client = null;
		delete this.client;
	});

});