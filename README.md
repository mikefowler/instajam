# Instajam

Instajam is a JavaScript wrapper for the Instagram API. You provide the access token, we provide the jam.

(And Instagram provides the gram. Or the pictures. Or... whatever.)

## Version History
  
  * 2013/02/19 - Version 2.0.
    - Rewritten in Coffeescript and documented with Docco
    - POST endpoints are implemented
    - **The hard jQuery dependency is GONE**
    - Now includes a Jasmine test suite
  * 2012/09/10 - Version 1.0
    - Initial release
    - Supports all GET endpoints (does NOT include adding/removing comments or likes, or setting relationships)

## Documentation

Documentation for Instajam can be found at the (project's homepage](http://mikefowler.me/instajam).

## Contributing

### Building

Building Instajam requires Node.js with the coffee-script and docco packages.

```
sudo npm install -g coffee-script
sudo npm install -g docco
bundle
bundle exec guard
```

Running Guard performs the following tasks:

  1. Watches and re-compiles src/instajam.coffee on changes
  1. Watches and re-compiles spec/*.coffee on changes
  1. Generates library documentation at index.html via Docco on changes to src/instajam.coffee
  1. Automatically minifies to lib/instajam.min.js on changes to lib/instajam.js

### Running Tests

@todo

## License

GPLv2 or later

Copyright (C) 2013 Mike Fowler

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.