(function(sandbox) {

  sandbox.init = function() {

    console.log(window.Instajam);

    this.api = Instajam.init({
      clientId: 'e9c4567d05174f47827a022e31aeffd4',
      redirectUri: 'http://mikefowler.me/instajam/',
      scope: ['basic', 'comments', 'relationships', 'likes']
    });

    this.$window = $(window);
    this.$body = $('body');
    this.$main = $('#main');
    this.$overlay = $('.js-overlay');
    this.template = _.template( $('script[name="main"]').html() );

    this.render();

    this.$window.on('resize', onWindowResize);

  };

  sandbox.render = function() {

    var that = this;

    that.$main.html(that.template(that.api));

    $('.js-logout').on('click', function(e) {
      e.preventDefault();
      that.api.deauthenticate();
      that.render();
    });

    Ladda.bind( '.js-try-it', { timeout: 5000 });

    $('.js-try-it').on('click', function(e) {
      e.preventDefault();
      var method = $(this).data('method');

      if (method) {
        sandbox.test(method);
      }

    });

  };

  sandbox.test = function(method) {

    switch(method) {

    case 'user.self.profile':
      this.api.user.self.profile(function(data) {
        showResults(data);
      });
      break;

    case 'user.self.media':
      this.api.user.self.media(function(data) {
        showResults(data);
      });
      break;

    case 'user.self.feed':
      this.api.user.self.feed(function(data) {
        showResults(data);
      });
      break;

    case 'user.self.favorites':
      this.api.user.self.favorites(function(data) {
        showResults(data);
      });
      break;

    case 'user.requests':
      this.api.user.requests(function(data) {
        showResults(data);
      });
      break;

    case 'user.relationshipWith':
      this.api.user.relationshipWith('306837613', function(data) {
        showResults(data);
      });
      break;

    case 'user.get':
      this.api.user.get('michaelrichardfowler', function(data) {
        showResults(data);
      });
      break;

    case 'user.media':
      this.api.user.media('michaelrichardfowler', function(data) {
        showResults(data);
      });
      break;

    case 'user.search':
      this.api.user.search('mike', function(data) {
        showResults(data);
      });
      break;

    case 'user.follows':
      this.api.user.follows('306837613', function(data) {
        showResults(data);
      });
      break;

    case 'user.following':
      this.api.user.following('306837613', function(data) {
        showResults(data);
      });
      break;

    case 'media.get':
      this.api.media.get('575841188878801878_306837613', function(data) {
        showResults(data);
      });
      break;

    case 'media.search':
      this.api.media.search({
        lat: 37.774929,
        lng: -122.419416
      }, function(data) {
        showResults(data);
      });
      break;

    case 'media.popular':
      this.api.media.popular(function(data) {
        showResults(data);
      });
      break;

    case 'media.comments':
      this.api.media.comments('540843828331469702_306837613', function(data) {
        showResults(data);
      });
      break;

    case 'media.likes':
      this.api.media.likes('575841188878801878_306837613', function(data) {
        showResults(data);
      });
      break;

    case 'tag.get':
      this.api.tag.get('summer', function(data) {
        showResults(data);
      });
      break;

    case 'tag.media':
      this.api.tag.media('summer', function(data) {
        showResults(data);
      });
      break;

    case 'tag.search':
      this.api.tag.search('summer', function(data) {
        showResults(data);
      });
      break;

    case 'location.get':
      this.api.location.get('34998', function(data) {
        showResults(data);
      });
      break;

    case 'location.media':
      this.api.location.media('34998', function(data) {
        showResults(data);
      });
      break;

    case 'location.search':
      this.api.location.search({
        lat: 37.774929,
        lng: -122.419416
      }, function(data) {
        showResults(data);
      });
      break;

    }

  };

  function showResults(data) {

    Ladda.stopAll();

    var results = JSON.stringify(data, null, '  ');

    sandbox.$overlay.removeClass('overlay--visible');

    setTimeout(function() {
      sandbox.$body.addClass('has-overlay').on('click', hideResultsOnClick);
      centerOverlay();
      sandbox.$overlay.html('<code><pre>' + results + '</pre></code>').addClass('overlay--visible');
    }, 500);

  }

  function hideResultsOnClick(e) {
    if (!sandbox.$overlay.has($(e.target)).length) {
      hideResults();
    }
  }

  function hideResults() {
    sandbox.$body.removeClass('has-overlay').off('click', hideResultsOnClick);
    sandbox.$overlay.removeClass('overlay--visible');

    setTimeout(function() {
      sandbox.$overlay.html('');
    }, 500);

  }

  function centerOverlay() {
    sandbox.$overlay.css({
      width: sandbox.$window.outerWidth() * 0.8,
      height: sandbox.$window.outerHeight() * 0.8
    });

    sandbox.$overlay.css({
      top: sandbox.$window.outerHeight() * 0.5,
      left: sandbox.$window.outerWidth() * 0.5,
      marginLeft: sandbox.$overlay.outerWidth() * -0.5,
      marginTop: sandbox.$overlay.outerHeight() * -0.5
    });

  }

  function onWindowResize() {
    if (sandbox.$overlay.is(':visible')) {
      centerOverlay();
    }
  }

}(window.sandbox = window.sandbox || {}));

$(function() {
  window.sandbox.init();
});

window.partial = function(name, data) {
  return _.template( $('script[name="' + name + '"]').html(), data);
};
