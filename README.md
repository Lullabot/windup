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

If the dependencies for a project change, you can update them with:

```bash
$ bundle update
$ npm update
$ bower update
```

You can also enable sourcemaps and full tracebacks on error in Gruntfile.js

If you wish to rename windup to a different name (which you probably do), YMMV but you can try:
```bash
$ grep -rl windup * | xargs sed -i .bk 's/windup/mytheme/g'
$ rm *.bk
```

and then rename the files listed by 
```bash
find . -not -path '*/.*/*' -not -name '.*' -name '*windup*'
```

### Problems with Ruby?
You may need something like [rvm](http://rvm.io/) to manage multiple versions of Ruby.

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

This will wire the Bower components specified in ```bower.json``` into ```windup.info``` and ```_vendor.scss``` (See below).

## Dependencies

This will add your externally obtained JavaScript and CSS, as well as all it's necessary dependencies, into windup.info

```bash
$ bower install <package> --save
$ grunt wiredep
```

Sass files will be added into scss/_vendor.scss

```bash
$ bower install ericam/susy --save
$ grunt wiredep
```

Where <package> is a registered package, GitHub shorthand (e.g. " desandro/masonry"), Git endpoint (e.g. "git://github.com/user/package.git") or a URL (e.g. "http://example.com/script.js").
You can also edit ```bower.json``` directly.

## Installing Ruby gems

1. Add the gem to ```Gemfile```
2. Run ```bundle update```
3. Add the gem to the sass task's "require" array in ```Gruntfile.js```

## Installing new Node.js modules

These are typically used for getting Grunt plugins. Either add to package.json or run:

```bash
$ npm install <module> --save-dev
```
