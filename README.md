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

  * __callback(result, error)__: A callback function.

__Description__: Returns basic information about the authenticated user.
__Endpoint__: users/self

#### Instajam.user.feed([options], callback)

  * __options__: A JSON object of options.
    * access_token
    * count
    * min_id
    * max_id

__Description__: Returns the home feed of the authenticated user.
__Endpoint__: users/self/feed

[Instagram Documentation](http://instagram.com/developer/endpoints/users/#get_users_feed)

#### Instajam.user.liked([options], callback)

  * Returns: a list of media recently liked by the authenticated user.
  * Endpoint: users/self/media/liked

#### Instajam.user.get(user_id, callback)

  * Returns: basic information about a user.
  * Endpoint: users/[user-id]

#### Instajam.user.getRecent(user_id, [options], callback)

  * Returns: images recently uploaded by a user.
  * Endpoint: users/[user-id]/media/recent

#### Instajam.user.search(term, [options], callback)

  * Returns: a list of user results for a given search term.
  * Endpoint: users/search

#### Instajam.user.lookup(username, callback)

  * Returns: basic information for the given username.

#### Instajam.user.follows(user_id, callback)

  * Returns: a list of users the currently authenticated user follows.
  * Endpoint: users/[user-id]/follows

#### Instajam.user.following(user_id, callback)

  * Returns: a list of users followed by the currently authenticated user.
  * Endpoint: users/[user-id]/followed-by

#### Instajam.user.requests(callback)

  * Returns: a list of pending follow requests for the currently authenticated user.
  * Endpoint: users/self/requested-by

#### Instajam.user.getRelationship(user_id, callback)

  * Returns: information about the relationship between the currently authenticated user and the given user ID
  * Endpoint: users/[user-id]/relationship

#### Instajam.user.setRelationship(user_id, action, callback)

  * Sets: the relationship between the currently authenticated user and the provided user ID.
  * Endpoint: users/[user-id]/relationship

### Media

#### Instajam.media.get(media_id, callback)

  * Returns: information for a given media ID
  * Endpoint: media/[media-id]

#### Instajam.media.search(options, callback)

  * Returns: media matching the provided search parameters.
  * Endpoint: media/search

#### Instajam.media.popular(callback)

  * Returns: media that is currently popular on Instagram
  * Endpoint: media/popular

#### Instajam.media.comments(media_id, callback)

  * Returns: a list of comments for a given media ID
  * Endpoing: media/[media-id]/comments

#### Instajam.media.addComment(media_id, comment, callback)

  * Sets: a new comment for the given media ID

### Locations

####@TODO####