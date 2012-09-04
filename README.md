Instajam
========

Instajam is a JavaScript wrapper for the Instagram API. You provide the access token, we provide the jam.

(And Instagram provides the gram. Or the pictures. Or... whatever.)

## Getting Started

To use Instajam, just include it in your page. For now, Instajam also requires jQuery to facilitate JSONP requests.

```
<script src="lib/jquery.js"></script>
<script src="lib/instajam.js"></script>
```

### Authentication

Instajam doesn't care how you do OAuth authentication. Want to handle it server-side and just pass the access token in? Cool. Would you rather do client-side authentication and pull your access token from a cookie or localStorage? Legit, brah. Instagram has [documentation on their developer site](http://instagram.com/developer/authentication/) to help you out. Regardless of how you do it, initialize Instajam like this:

```
<script type="text/javascript">
  $(function() {

    var INSTAJAM = new Instajam({
      access_token: 'ACCESS TOKEN',
      client_id: 'CLIENT ID'
    });

  });
</script>
```

Keep in mind, ```client_id``` is optional if you pass in ```access_token```. However, if you just want to do some basic retrieval of media, like getting popular images (see below), then just the ```client_id``` will do. Awesome.

## Endpoints

The [official list of Instagram API endpoints](http://instagram.com/developer/endpoints/) has detailed descriptions as well as sample return data, so this documentation will not go into those details. Below you will find the endpoints that Instajam provides and how to call them.

### Users

#### Instajam.user.self(callback)

  Returns basic information about the authenticated user.

  Endpoint: users/self

#### Instajam.user.feed([options], callback)

  Returns the home feed of the authenticated user.

  Endpoint: /users/self/feed

#### Instajam.liked([options], callback)

  Returns a list of media recently liked by the authenticated user.

  Endpoint: users/self/media/liked

#### Instajam.get(user_id, callback)

  Returns basic information about a user.

  Endpoint: users/[user-id]

#### Instajam.getRecent(user_id, [options], callback)

  Returns images recently uploaded by a user.

  Endpoint: users/[user-id]/media/recent

#### Instajam.search(term, [options], callback)

  Returns a list of user results for a given search term.

  Endpoint: users/search

#### Instajam.lookup(username, callback)

  Returns basic information for the given username.

### Media

####@TODO####

### Locations

####@TODO####