Instajam
========

Instajam is a JavaScript wrapper for the Instagram API. You provide the access token, we provide the jam.

(And Instagram provides the gram. Or the pictures. Or... whatever.)

## Version History

  * 2012/9/10 - Version 1.0, initial release. Supports all GET endpoints (does NOT include adding/removing comments or likes, or setting relationships)

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
    * _callback(result)_: A callback function.

#### Instajam.user.feed(options, callback)

  * __Description__: Returns the home feed of the authenticated user.
  * __Endpoint__: [users/self/feed](http://instagram.com/developer/endpoints/users/#get_users_feed)
  * __Arguments__:
    * _options_: A JSON object of options.
      - access_token
      - count
      - min_id
      - max_id
    * _callback(result)_: A callback function.

#### Instajam.user.liked(options, callback)

  * __Description__: Returns a list of media recently liked by the authenticated user.
  * __Endpoint__: [users/self/media/liked](http://instagram.com/developer/endpoints/users/#get_users_feed_liked)
  * __Arguments__:
    * _options (optional)_: A JSON object of options
      - count
      - max_like_id
    * _callback(result)_: A callback function.

#### Instajam.user.get(user_id, callback)

  * __Description__: Returns basic information about a user.
  * __Endpoint__: [users/[user-id]](http://instagram.com/developer/endpoints/users/#get_users)
  * __Arguments__:
    * _user_id_: The user ID to fetch information for.
    * _callback(result)_: A callback function.

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
    * _callback(result)_: A callback function.

#### Instajam.user.search(term, options, callback)

  * __Description__: Returns a list of user results for a given search term.
  * __Endpoint__: [users/search](http://instagram.com/developer/endpoints/users/#get_users_search)
  * __Arguments__:
    * _term_: The search term string
    * _options_: A JSON object of options
      * count
    * _callback(result)_: A callback function

#### Instajam.user.lookup(username, callback)

  * __Description__: Returns basic information for the given username.
  * __Arguments__:
    * _username_: The username string to look up.
    * _callback(result)_: A callback function.

#### Instajam.user.follows(user_id, callback)

  * __Description__: Returns a list of users the currently authenticated user follows.
  * __Endpoint__: [users/[user-id]/follows](http://instagram.com/developer/endpoints/relationships/#get_users_follows)
  * __Arguments__:
    * _user_id_: The user ID to fetch information for.
    * _callback(result)_: A callback function.

#### Instajam.user.following(user_id, callback)

  * __Description__: Returns a list of users followed by the currently authenticated user.
  * __Endpoint__: [users/[user-id]/followed-by](http://instagram.com/developer/endpoints/relationships/#get_users_followed_by)
  * __Arguments__:
    * _user_id_: The user ID to fetch information for.
    * _callback(result): A callback function.

#### Instajam.user.requests(callback)

  * __Description__: Returns a list of pending follow requests for the currently authenticated user.
  * __Endpoint__: [users/self/requested-by](http://instagram.com/developer/endpoints/relationships/#get_incoming_requests)
  * __Arguments__:
    * _callback(result)_: A callback function.

#### Instajam.user.getRelationship(user_id, callback)

  * __Description__: Returns information about the relationship between the currently authenticated user and the given user ID
  * __Endpoint__: [users/[user-id]/relationship](http://instagram.com/developer/endpoints/relationships/#get_relationship)
  * __Arguments__:
    * _user_id_: The user ID to fetch relationship information for.
    * _callback(result)

### Media, Likes and Comments

#### Instajam.media.get(media_id, callback)

  * __Description__: Returns information for a given media ID
  * __Endpoint__: [media/[media-id]](http://instagram.com/developer/endpoints/media/#get_media)
  * __Arguments__:
    * _media_id_: The ID of the media to fetch information for.
    * __callback(result)__: A callback function.

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
    * _callback(result)_: A callback function.

#### Instajam.media.popular(callback)

  * __Description__: Returns media that is currently popular on Instagram.
  * __Endpoint__: [media/popular](http://instagram.com/developer/endpoints/media/#get_media_popular)
  * __Arguments__:
    * _callback(result)_: A callback function.

#### Instajam.media.comments(media_id, callback)

  * __Description__: Returns a list of comments for a piece of media.
  * __Endpoint__: [media/[media-id]/comments](http://instagram.com/developer/endpoints/comments/#get_media_comments)
  * __Arguments__:
    * _media_id_: The ID of the media to fetch comments for.
    * _callback(result)_: A callback function.



#### Instajam.media.likes(media_id, callback)

  * __Description__: Retrieves 'likes' for a piece of media.
  * __Endpoint__: [/media/[media-id]/likes](http://instagram.com/developer/endpoints/media/#get_media_likes)
  * __Arguments__:
    * _media_id_: The ID of the media to retrieve 'likes' for.
    * _callback(result)_: A callback function.

### Tags

#### Instajam.tag.meta(tag_name, callback)

  * __Description__: Requests metadata for a tag name.
  * __Endpoint__: [/tags/[tag-name]](http://instagram.com/developer/endpoints/tags/#get_tags)
  * __Arguments__:
    * _tag_name_: The name of the tag to fetch metadata for.
    * _callback(result)_: A callback function.

#### Instajam.tag.get(tag_name, options, callback)

  * __Description__: Gets media for a tag name.
  * __Endpoint__: [/tags/[tag-name]/media/recent](http://instagram.com/developer/endpoints/tags/#get_tags_media_recent)
  * __Arguments__:
    * _tag_name_: The name of the tag to fetch media for.
    * _options_: A JSON object of options.
      - min_id
      - max_id
    * _callback(result)_: A callback function.

#### Instajam.tag.search(search_term, callback)

  * __Description__: Searches for a tag name.
  * __Endpoint__: [/tags/search](http://instagram.com/developer/endpoints/tags/#get_tags_search)
  * __Arguments__:
    * _search_term_: The tag name to search for.
    * _callback(result)_: A callback function.

### Locations

#### Instajam.location.meta(location_id, callback)

  * __Description__: Requests metadata for a location.
  * __Endpoint__: [/locations/[location-id]](http://instagram.com/developer/endpoints/locations/#get_locations)
  * __Arguments__:
    * _location_id_: The ID of the location to fetch metadata for.
    * _callback(result)_: A callback function.

#### Instajam.location.get(location_id, options, callback)

  * __Description__: Gets media for a location.
  * __Endpoint__: [/locations/[location-id]/media/recent](http://instagram.com/developer/endpoints/locations/#get_locations_media_recent)
  * __Arguments__:
    * _location_id_: The ID of the location to fetch media for.
    * _options_: A JSON object of options.
      - max_timestamp
      - min_timestamp
      - min_id
      - max_id
    * _callback(result)_: A callback function.

#### Instajam.location.search(options, callback)

 * __Description__: Searches for locations.
  * __Endpoint__: [/locations/search](http://instagram.com/developer/endpoints/locations/#get_locations_search)
  * __Arguments__:
    * _options_: A JSON object of options. Either "lat" and "lng", or "foursquare_v2_id" are required.
      - lat
      - lng
      - distance (in meters, max is 5000)
      - foursquare_v2_id
    * _callback(result)_: A callback function.

### Geographies

#### Instajam.geography.get(geography_id, options, callback)

  * __Description__: Gets recent media from a user-defined geography. In order to fetch media for a geography, your app must have created it.
  * __Endpoint__: [/geographies/[geo-id]/media/recent](http://instagram.com/developer/endpoints/geographies/#get_geographies_media_recent)
  * __Arguments__:
    * _geography_id_: The ID of the geography to fetch media for.
    * _options_: A JSON object of options.
      - count
      - min_id
    * _callback(result)_: A callback function.

## Helper Functions

#### Instajam.nextPage(pagination_url, callback)

  * __Description__: For some requests, Instagram will return a data.pagination key with a URL for the next page of results. This function facilitates making that request.
  * __Arguments__:
    * _pagination_url_: The URL of the next page of results to fetch.
    * _callback(result)_: A callback function.




