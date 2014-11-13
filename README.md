# Windup

A starter theme for Drupal. It's pretty light. It's made to be cloned and then hacked, please don't use me as a base theme!

## Installation

Make sure you have npm, bundler, bower and grunt-cli installed

```bash
$ sudo gem install bundler
$ brew install node
$ npm install -g grunt-cli
$ npm install -g bower
```

Then install the theme's dependencies

```bash
$ bundle install
$ npm install
$ bower install
```

You can also enable sourcemaps and full tracebacks on error in Gruntfile.js

Problems with Ruby? You may need something like [rvm](http://rvm.io/) to manage multiple versions of Ruby.

If the dependencies for a project change, you can update them with:

```bash
$ bundle update
$ npm update
$ bower update
```

## Usage

### Compile SASS

```bash
$ grunt sass
```

### Watch for changes

```bash
$ grunt watch
```

This task will automatically compile SASS when changes are detected in the `.scss` files.

If you're using ```grunt watch``` and click the [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) button, your browser will refresh automatically when Grunt spots a change to your sass files.

### Wire Dependencies

```bash
$ grunt wiredep
```

This will wire the Bower components specified in ```bower.json``` into ```windup.info``` (See below).

## Installing JavaScript from The Internets

This will add your externally obtained JavaScript, as well as all it's necessary dependencies, into windup.info

```bash
$ bower install <package> --save
$ grunt wiredep
```

Where <package> is a registered package, GitHub shorthand (e.g. " desandro/masonry"), Git endpoint (e.g. "git://github.com/user/package.git") or a URL (e.g. "http://example.com/script.js").
You can also edit ```bower.json``` directly.

### Sass Partials

Packages containing .scss files will be imported into scss/component/_vendor.scss, for example:
```bash
$ bower install matthieua/sass-css3-mixins --save
$ grunt wiredep
```

Will produce a _vendor.scss that looks like this
```scss
// bower:scss
@import "../../bower_components/sass-css3-mixins/css3-mixins.scss";
// endbower

```

## Installing Sass gems

1. Add the gem to ```Gemfile```
2. Run ```bundle update```
3. Add the gem to the sass task's "require" array in ```Gruntfile.js```

## Installing new Node.js modules

These are typically used for getting Grunt plugins. Either add to package.json or run:

```bash
$ npm install <module> --save-dev
```

## Testing Code

Included in the project is pre-initialized tests directory. Testing is done via
[Hardy](http://hardy.io) by writing Cucumber tests.

To get started:

 1. Install hardy locally via npm.

```bash
$ npm install -g hardy
```

 2. Write your tests like so:

```cucumber
Feature: Awesome sample test
As a developer I want to have kick-ass CSS tests.

Scenario: Content color
Given I visit "http://lullabot.com/"
Then ".site-footer" should have "color" of "#C9CED1"
```

 3. Start selenium:

```bash
$ hardy selenium start
```

 4. Run your tests:

```bash
$ cd tests
$ hardy --browser="phantomjs" .
```
