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

  * __Description__: Returns basic information about the authenticated user.
  * __Endpoint__: users/self
  * __Arguments__:
    * _callback(result, error)_: A callback function.

#### Instajam.user.feed([options], callback)

  * __Description__: Returns the home feed of the authenticated user.
  * __Endpoint__: [users/self/feed](http://instagram.com/developer/endpoints/users/#get_users_feed)
  * __Arguments__:
    * _options_: A JSON object of options.
      - access_token
      - count
      - min_id
      - max_id
    * _callback(result, error)_: A callback function. 

#### Instajam.user.liked(options, callback)

  * __Description__: Returns a list of media recently liked by the authenticated user.
  * __Endpoint__: [users/self/media/liked](http://instagram.com/developer/endpoints/users/#get_users_feed_liked)
  * __Arguments__:
    * _options (optional)_: A JSON object of options
      - count
      - max_like_id
    * _callback_: A callback function.

#### Instajam.user.get(user_id, callback)

  * __Description__: Returns basic information about a user.
  * __Endpoint__: [users/[user-id]](http://instagram.com/developer/endpoints/users/#get_users)
  * __Arguments__:
    * _user_id_: The user ID to fetch information for.
    * _callback(result, error)_: A callback function.

#### Instajam.user.getRecent(user_id, options, callback)

  * __Description__: Returns images recently uploaded by a user.
  * __Endpoint__: [users/[user-id]/media/recent](http://instagram.com/developer/endpoints/users/#get_users_media_recent)
  * __Arguments__:
    * _user_id_: The user ID to fetch information for.
    * _options_: A JSON object of options
      - count
      - max_timestamp
      - min_timestamp
      - max_id
      - min_id
    * _callback(result, error)_: A callback function.

#### Instajam.user.search(term, options, callback)

  * __Description__: Returns a list of user results for a given search term.
  * __Endpoint__: [users/search](http://instagram.com/developer/endpoints/users/#get_users_search)
  * __Arguments__:
    * _term_: The search term string
    * _options_: A JSON object of options
      * count
    * _callback(result, error)_: A callback function

#### Instajam.user.lookup(username, callback)

  * __Description__: Returns basic information for the given username.
  * __Arguments__:
    * _username_: The username string to look up.
    * _callback(result, error)_: A callback function.

#### Instajam.user.follows(user_id, callback)

  * __Description__: Returns a list of users the currently authenticated user follows.
  * __Endpoint__: [users/[user-id]/follows](http://instagram.com/developer/endpoints/relationships/#get_users_follows)
  * __Arguments__:
    * _user_id_: The user ID to fetch information for.
    * _callback(result, error)_: A callback function.

#### Instajam.user.following(user_id, callback)

  * __Description__: Returns a list of users followed by the currently authenticated user.
  * __Endpoint__: [users/[user-id]/followed-by](http://instagram.com/developer/endpoints/relationships/#get_users_followed_by)
  * __Arguments__:
    * _user_id_: The user ID to fetch information for.
    * _callback(result, error): A callback function.

#### Instajam.user.requests(callback)

  * __Description__: Returns a list of pending follow requests for the currently authenticated user.
  * __Endpoint__: [users/self/requested-by](http://instagram.com/developer/endpoints/relationships/#get_incoming_requests)
  * __Arguments__:
    * _callback(result, error)_: A callback function.

#### Instajam.user.getRelationship(user_id, callback)

  * __Description__: Returns information about the relationship between the currently authenticated user and the given user ID
  * __Endpoint__: [users/[user-id]/relationship](http://instagram.com/developer/endpoints/relationships/#get_relationship)
  * __Arguments__:
    * _user_id_: The user ID to fetch relationship information for.
    * _callback(result, error)

#### Instajam.user.setRelationship(user_id, action, callback)

  * __Description__: Sets the relationship between the currently authenticated user and the provided user ID.
  * __Endpoint__: [users/[user-id]/relationship](http://instagram.com/developer/endpoints/users/#post_relationship)
  * __Arguments__:
    * _user_id_: The user ID to set the relationship for.
    * _action_: The relationship action: 'follow', 'unfollow', 'block', 'unblock', 'approve' or 'deny'
    * _callback(result, error)_: A callback function.

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