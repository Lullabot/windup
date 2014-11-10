# Windup

A starter theme for Drupal. It's pretty light.

## Installation

Make sure you have npm, bundler and grunt-cli installed

```bash
$ sudo gem install bundler
$ brew install node
$ npm install -g grunt-cli
```

Then install the theme's dependencies

```bash
$ bundle install
$ npm install
```

You can also enable sourcemaps and full tracebacks on error in Gruntfile.js

Problems with Ruby? You may need something like [rvm](http://rvm.io/) to manage multiple versions of Ruby.

If the dependencies for a project change, you can update them with:

```bash
$ bundle update
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

## Installing new Node.js modules

Either add to package.json or run:

```bash
$ npm install <module> --save-dev
```
