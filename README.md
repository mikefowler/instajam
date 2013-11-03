# Instajam

Instajam is a JavaScript wrapper for the Instagram API. You provide the access token, we provide the jam.

(And Instagram provides the gram. Or the pictures. Or... whatever.)

## Version History
  
  * 2013/11/03 - Version 2.0.
    - Now with 100% more version number!
    - **The hard jQuery dependency is GONE.** Native JSONP request method implemented.
    - Inline documentation via Docco
  * 2012/09/10 - Version 1.0
    - Initial release
    - Supports all GET endpoints (does NOT include adding/removing comments or likes, or setting relationships)

## Documentation

Documentation for Instajam can be found at the (project's homepage](http://mikefowler.me/instajam).

## Contributing

Contributions, fixes, or work on a test suite is welcome. If you are fixing a bug, please open an issue first with details on how to replicate the bug, and mention the issue number in your pull request.

### Developing

To work on Instajam you need to set up Grunt and install some Node.js packages. After cloning the repository, run these commands:

```
npm install
bower install
grunt watch
```

Grunt watches the Instajam source files for changes. When changes are made, Grunt runs JSHint  to validate the code, and, if successful, creates a minified version of the library in the ```dist/``` directory.

### License

Copyright (C) 2013 Mike Fowler, http://mikefowler.me

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.