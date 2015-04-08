<!doctype html>
<html lang="en">
<head>
  <link href='http://fonts.googleapis.com/css?family=Droid+Sans|Playfair+Display:900italic' rel='stylesheet' type='text/css'>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
  <title>Instajam</title>
  <meta name="description" content="Instajam is a wrapper for the Instagram API.">
  <meta name="keywords" content="instajam, instagram, javascript, api, mike fowler">
  <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/7.3/styles/github.min.css">
  <link rel="stylesheet" href="css/vendor/ladda.min.css"></script>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <header role="banner" class="masthead">
    <h1 class="masthead__branding">Instajam</h1>
  </header>

  <div id="main" class="container" role="main"></div>

  <footer role="contentinfo" class="footer container">A thing made by <a href="http://mikefowler.me">Mike Fowler</a>.</footer>

  <div class="overlay js-overlay"></div>

  <script name="main" type="text/template">

    <div class="auth-hero">
      <h2>Instajam is a wrapper for the Instagram API.</h2>
      <% if (!authenticated) { %>
        <p>Log in with your Instagram account to try it out.</p>
        <a class="ladda-button" data-size="large" data-color="purple" data-style="expand-right" href="<%= authUrl %>"><span class="ladda-label">Authenticate</span></a>
      <% } else { %>
        <p>Click the “Try Me” buttons below to give it a spin. Once you're sold we can <a class="js-logout" href="#">log you out.</a>.</p>
      <% } %>
    </div>

    <hr>

    <p class="centered"><iframe src="http://ghbtns.com/github-btn.html?user=mikefowler&repo=instajam&type=watch&count=true&size=large"
  allowtransparency="true" frameborder="0" scrolling="0" width="140" height="30"></iframe><iframe src="http://ghbtns.com/github-btn.html?user=mikefowler&type=follow&size=large"
  allowtransparency="true" frameborder="0" scrolling="0" width="200" height="30"></iframe></p>

    <hr>

    <h2>Initialize</h2>

    <p>Initialize Instajam, passing in your client ID and redirect URI, obtained from Instagram. Optionally pass in an array of <a href="http://instagram.com/developer/authentication/" target="_blank">permissions</a>.</p>

    <pre><code class="javascript">var API = Instajam.init({
  clientId: 'CLIENT ID',
  redirectUri: 'REDIRECT URI',
  scope: ['basic', 'comments']
});</code></pre>

    <h2>Dependencies</h2>

    <p>None*. Behind the scenes, Instajam uses simple JSONP calls to retrieve data. Call the endpoint you want and pass it a callback method.</p>

    <p><small>*We use localStorage to store the authenticated user's access token, so your user's browser will at least have to support that.</small></p>

    <h2>Authenticating</h2>

    <p>To authenticate a user, you'll want to direct them to Instagram's OAuth URL. Instajam takes care of constructing this URL for you, and you can access it via “API.authUrl” (using the above code as an example).</p>

    <p>When you first initialize Instajam, as above, it will immediately try to "authenticate" a user by checking to see if an access token exists in localStorage. If a token <i>does</i> exist, a user is authenticated as far as Instajam is concerned. Keep in mind that this does not account for Instagram expiring access tokens, so you may want to do a status check, hitting an endpoint like user.self.profile() when your app starts up.</p>

    <h2>Fetching Data</h2>

    <p>All endpoints accept, at the least, a callback method. Callback methods are passed a single parameter containing the exact* API response from Instagram. Some endpoints will require additional parameters, and occassionally an optional options object as well. For details about the available options for certain endpoints, please refer to <a href="http://instagram.com/developer/endpoints/" target="_blank">Instagram's documentation</a>.</p>

    <small>*For certain endpoints, we modify the response slightly as a convenience.</small>

    <h3>Users</h3>

    <h4>Fetching the authenticated user's profile</h4>

    <pre><code class="javascript">API.user.self.profile(callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'user.self.profile' }) %>
    <% } %>

    <h4>Fetching the authenticated user's media</h4>

    <pre><code class="javascript">API.user.self.media([options,] callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'user.self.media' }) %>
    <% } %>

    <h4>Fetching the authenticated user's activity feed</h4>

    <pre><code class="javascript">API.user.self.feed([options,] callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'user.self.feed' }) %>
    <% } %>

    <h4>Fetching the authenticated user's favorites</h4>

    <pre><code class="javascript">API.user.self.favorites([options,] callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'user.self.favorites' }) %>
    <% } %>

    <h4>Fetching the profile of a user by ID or username</h4>

    <pre><code class="javascript">API.user.get(id/username, callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'user.get' }) %>
    <% } %>

    <h4>Fetching the media of a user by ID or username</h4>

    <pre><code class="javascript">API.user.media(id/username, [options,] callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'user.media' }) %>
    <% } %>

    <h4>Searching for users by username</h4>

    <pre><code class="javascript">API.user.search(term, [options,] callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'user.search' }) %>
    <% } %>

    <h4>Fetching the users followed by another user, by user ID

    <pre><code class="javascript">API.user.follows(id, callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'user.follows' }) %>
    <% } %>

    <h4>Fetching the users following another user, by user ID

    <pre><code class="javascript">API.user.following(id, callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'user.following' }) %>
    <% } %>

    <h4>Fetching the authenticated user's follow requests</h4>

    <pre><code class="javascript">API.user.requests(callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'user.requests' }) %>
    <% } %>

    <h4>Fetching the relationship between the authenticated user and another user ID</h4>

    <pre><code class="javascript">API.user.relationshipWith(id, callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'user.relationshipWith' }) %>
    <% } %>

    <h3>Media</h3>

    <h4>Fetching media by ID</h4>

    <pre><code class="javascript">API.media.get(id, callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'media.get' }) %>
    <% } %>

    <h4>Searching for media in a geographic region, by latitude/longitude</h4>

    <pre><code class="javascript">API.media.search(options, callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'media.search' }) %>
    <% } %>

    <h4>Fetching popular media</h4>

    <pre><code class="javascript">API.media.popular(callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'media.popular' }) %>
    <% } %>

    <h4>Fetching comments on a piece of media, by media ID</h4>

    <pre><code class="javascript">API.media.comments(id, callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'media.comments' }) %>
    <% } %>

    <h4>Fetching likes on a piece of media, by media ID</h4>

    <pre><code class="javascript">API.media.likes(id, callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'media.likes' }) %>
    <% } %>

    <h3>Tags</h3>

    <h4>Fetching information about a tag</h4>

    <pre><code class="javascript">API.tag.get(name, callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'tag.get' }) %>
    <% } %>

    <h4>Fetching a list of recent media with a given tag</h4>

    <pre><code class="javascript">API.tag.media(name, [options,] callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'tag.media' }) %>
    <% } %>

    <h4>Searching for tags by name</h4>

    <pre><code class="javascript">API.tag.search(term, callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'tag.search' }) %>
    <% } %>

    <h3>Locations</h3>

    <h4>Fetching location information by location ID</h4>

    <pre><code class="javascript">API.location.get(id, callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'location.get' }) %>
    <% } %>

    <h4>Fetching a list of recent media at a given location ID</h4>

    <pre><code class="javascript">API.location.media(id, [options,] callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'location.media' }) %>
    <% } %>

    <h4>Searching for locations by latitude and longitude OR by Foursquare Place ID</h4>

    <pre><code class="javascript">API.location.search(options, callback);</code></pre>

    <% if (authenticated) { %>
      <%= partial('button', { method: 'location.search' }) %>
    <% } %>

    <h3>Geographies</h3>

    <h4>Fetching recent media from a custom Geography ID</h4>

    <p>Read more about creating geography subscriptions <a href="http://instagram.com/developer/endpoints/geographies/" target="_blank">here</a> and <a href="http://instagram.com/developer/realtime/" target="_blank">here</a>. There's no test case for this endpoint, but the method exists nonetheless to help you fetch data from your subscriptions.</p>

    <pre><code class="javascript">API.geography.media(id, [options,] callback);</code></pre>

  </script>

  <script name="button" type="text/template">
    <p class="clear"><button class="ladda-button align-right js-try-it" data-method="<%= method %>" data-size="small" data-style="expand-right" data-color="purple"><span class="ladda-label">Try it!</span></button></p>
  </script>

  <a class="github-ribbon" href="http://github.com/mikefowler/instajam"><img src="images/github.png" alt="Fork me on Github" /></a>

  <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min.js"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/7.3/highlight.min.js"></script>
  <script>hljs.initHighlightingOnLoad();</script>
  <script src="js/vendor/spin.min.js"></script>
  <script src="js/vendor/ladda.min.js"></script>

  <script src="src/instajam.js"></script>
  <script src="js/app.js"></script>

  <script type="text/javascript">

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-10512170-10']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

  </script>

</body>
</html>
