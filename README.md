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

Instajam doesn't care how you do OAuth authentication. Want to handle it server-side and just pass the access token in? Cool. Would you rather do client-side authentication and pull your access token from a cookie or localStorage? Legit, brah. Regardless of how you do it, initialize Instajam like this:

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

The [official list of Instagram API endpoints](http://instagram.com/developer/endpoints/) has descriptions as well as sample return data, so this documentation will not go into those details. Below you will find the endpoints that Instajam provides and how to call them.

Each of the code samples assumes that you have initialized a variable, INSTAJAM, as demonstrated above.

### Users

__/users/self__

_Instajam.user.self(callback)_

__/users/self/feed__

_ Instajam.user.feed([options], callback)_

__/users/self/media/liked__

_Instajam.liked([options], callback)_

__/users/[user-id]__

_Instajam.get(user_id, callback)_

__/users/[user-id]/media/recent__

_Instajam.getRecent(user_id, [options], callback)_

__/users/search__

_Instajam.search(term, [options], callback)_

### Media

__@TODO__

### Locations

__@TODO__