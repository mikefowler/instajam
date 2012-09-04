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

### Users and Relationships

#### Instajam.user.self(callback)

  * __Description__: Returns basic information about the authenticated user.
  * __Endpoint__: users/self
  * __Arguments__:
    * _callback(result, error)_: A callback function.

#### Instajam.user.feed(options, callback)

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
  * __Endpoint__: [users/[user-id]/relationship](http://instagram.com/developer/endpoints/relationships/#post_relationship)
  * __Arguments__:
    * _user_id_: The user ID to set the relationship for.
    * _action_: The relationship action: 'follow', 'unfollow', 'block', 'unblock', 'approve' or 'deny'
    * _callback(result, error)_: A callback function.

### Media

#### Instajam.media.get(media_id, callback)

  * __Description__: Returns information for a given media ID
  * __Endpoint__: [media/[media-id]](http://instagram.com/developer/endpoints/media/#get_media)
  * __Arguments__:
    * _media_id_: The ID of the media to fetch information for.
    * __callback(result, error)__: A callback function.

#### Instajam.media.search(options, callback)

  * __Description__: Returns media matching the provided search parameters.
  * __Endpoint__: [media/search](http://instagram.com/developer/endpoints/media/#get_media_search)
  * __Arguments__:
    * _options_: A JSON object of options.
      - lat (required)
      - lng (required)
      - min_timestamp
      - max_timestamp
      - distance (in meters. max is 5000)
    * _callback(result, error)_: A callback function.

#### Instajam.media.popular(callback)

  * __Description__: Returns media that is currently popular on Instagram.
  * __Endpoint__: [media/popular](http://instagram.com/developer/endpoints/media/#get_media_popular)
  * __Arguments__:
    * _callback(result, error)_: A callback function.

#### Instajam.media.comments(media_id, callback)

  * __Description__: Returns a list of comments for a piece of media.
  * __Endpoint__: [media/[media-id]/comments](http://instagram.com/developer/endpoints/comments/#get_media_comments)
  * __Arguments__:
    * _media_id_: The ID of the media to fetch comments for.
    * _callback(result, error)_: A callback function.

#### Instajam.media.addComment(media_id, comment, callback)

  * __Description__: Adds a comment to a piece of media.
  * __Endpoint__: [media/[media-id]/comments](http://instagram.com/developer/endpoints/comments/#post_media_comments)
  * __Arguments__:
    * _media_id_: The ID of the media to add a comment to.
    * _comment_: The text content of the comment to add.
    * _callback(result, error)_: A callback function.
    
#### Instajam.media.removeComment(media_id, comment_id, callback)

  * __Description__: Removes a comment from a piece of media.
  * __Endpoint__: [media/[media-id]/comments](http://instagram.com/developer/endpoints/media/#delete_media_comments)
  * __Arguments__:
    * _media_id_: The ID of the media to remove a comment from.
    * _comment_id_: The ID of the comment to remove from the media.
    * _callback(result, error)_: A callback function.

#### Instajam.media.likes(media_id, callback)

#### Instajam.media.like(media_id, callback)

#### Instajam.media.unlike(media_id, callback)

### Tags

#### Instajam.tag.meta(tag_name, callback)

#### Instajam.tag.get(tag_name, options, callback)

#### Instajam.tag.search(search_term, callback)

### Locations

#### Instajam.location.meta(location_id, callback)

#### Instajam.location.get(location_id, options, callback)

#### Instajam.location.search(options, callback)

### Geographies

#### Instajam.geography.get(geography_id, options, callback)