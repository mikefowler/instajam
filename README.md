# Instajam

Instajam is a JavaScript wrapper for the Instagram API. You provide the access token, we provide the jam.

(And Instagram provides the gram. Or the pictures. Or... whatever.)

## Version History
  
  * 2013/02/19 - Version 2.0.
    - Now with 100% more version number!
    - **The hard jQuery dependency is GONE.** Native JSONP request method implemented.
    - Rewritten in Coffeescript and documented with Docco
    - POST endpoints are implemented
    - Now includes a Jasmine test suite
  * 2012/09/10 - Version 1.0
    - Initial release
    - Supports all GET endpoints (does NOT include adding/removing comments or likes, or setting relationships)

## Documentation

Documentation for Instajam can be found at the (project's homepage](http://mikefowler.me/instajam).

## Contributing

Contributions or bugfixes to Instajam are welcome. If you are fixing a bug, please open an issue first with details on how to replicate the bug, and mention the issue number in your pull request.

### Developing

Building Instajam requires Node.js with the coffee-script and docco packages, but after that the development process should work smoothly and stay out of your way.

```
sudo npm install -g coffee-script docco
bundle
bundle exec guard
```

Running Guard performs the following tasks:

  1. Watches src/ Coffeescript and compiles to lib/
  1. Watches spec/ Coffeescript and compiles to spec/
  1. Generates documentation in docs/ via Docco when src/ changes.
  1. Creates minified version of the library on changes to lib/instajam.js
  1. Runs LiveReload server to reload test page on spec or src changes.

__Recommendation:__ Install the brilliant [Anvil.app](http://anvilformac.com/) from Riot (and 37 Signals) and set up 'instajam.dev' to point to your local repository. After that, you can access documentation at http://instajam.dev/docs/ and run tests via http://instajam.dev/test.

## License

GPLv2 or later

Copyright (C) 2013 Mike Fowler

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.