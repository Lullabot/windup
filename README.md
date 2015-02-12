# Windup
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/Lullabot/windup?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A starter theme for Drupal. It's pretty light. It's made to be cloned and then hacked, please don't use me as a base theme!

A Ruby Sass version of this theme can be found on the branch ruby-sass.

## Installation

Make sure you have npm, bower and grunt-cli installed

```bash
$ brew install node
$ npm install -g grunt-cli
$ npm install -g bower
```

Then install the theme's dependencies

```bash
$ npm install
$ bower install
```

If the dependencies for a project change, you can update them with:

```bash
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

## Usage

### Wire Dependencies and Compile Sass

```bash
$ grunt
```

### Watch for changes

```bash
$ grunt watch
```

This task will automatically compile Sass when changes are detected in the `.scss` files.

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
$ bower install susy --save
$ grunt wiredep
```

Where <package> is a registered package, GitHub shorthand (e.g. " desandro/masonry"), Git endpoint (e.g. "git://github.com/user/package.git") or a URL (e.g. "http://example.com/script.js").
You can also edit ```bower.json``` directly.

## Template Suggestions and Classes
Template suggestions across all core (Node, User, Taxonomy Term and Comment) and Entity API defined entity types have been normalised to the following:

```
<entity type>
<entity type>__view_mode__<view mode>
<entity_type>__<bundle>
<entity_type>__<bundle>__<view mode>
<entity_type>__<entity id>
<entity_type>__<entity id>__<view mode>
```

There is one exception to this. The core user entity, [uses "user-profile" as the entity type for template suggestions](https://api.drupal.org/api/drupal/modules%21user%21user.module/function/user_view/7) instead of "user".

The following classes can be found on all the above rendered entities:
```
<entity type> <entity type>-<id> type-<bundle> view-mode-<view mode>

```

## Installing new Node.js modules

These are typically used for getting Grunt plugins. Either add to package.json or run:

```bash
$ npm install <module> --save-dev
```
