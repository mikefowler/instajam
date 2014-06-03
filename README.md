# Instajam

Instajam is a JavaScript wrapper for the Instagram API. You provide the access token, we provide the jam. (And Instagram provides the gram. Or the pictures. Or... whatever.)

## Basic Usage

``` javascript
// Initialize
API = Instajam.init({
    clientId: '<CLIENT ID>',
    redirectUri: '<REDIRECT URI>',
    scope: ['basic', 'comments']
});

// Get the profile of the authenticated user.
API.user.self.profile(function(response) {
    console.log('Hey there, ' + response.data.full_name);
});
```

## Documentation

Full documentation for Instajam can be found on the [project's homepage](http://mikefowler.me/instajam). [Inline documentation of the code](http://mikefowler.me/instajam/docco/instajam.html) (via Docco) is also available.

## Install via Bower

Instajam is available via the [Bower package manager](http://bower.io/):

``` bash
bower install instajam
```

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
