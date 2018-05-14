# Windup
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/Lullabot/windup?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A starter theme for Drupal. It's pretty light. It's made to be cloned and then hacked, please don't use me as a base theme!

A Ruby Sass version of this theme can be found on the branch ruby-sass.

## Installation

Make sure you have node version 5.2.x or higher (we're depending on npx being installed). If you don't please look up the steps to install it for the OS you wish to compile the code on.

Install the theme's dependencies

```bash
$ npm install
```

If the dependencies for a project change, you can update them with:

```bash
$ npm update
```

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

### Build CSS and Javascript

For production run:
```bash
$ npm run build
```

### To watch for changes, and build in dev mode use:

```bash
$ npm start
```

This task will automatically compile `.scss` and `.es6` files when changes are detected.

If you're using `npm start` and click the [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) button, your browser will refresh automatically when Grunt spots a change to your sass files.

### Autoprefixer

Windup uses [Autoprefixer](https://github.com/postcss/autoprefixer) and [Babel](https://babeljs.io/) to automatically help your CSS and JS be more compatible with older browsers. By default, they are set to support the browsers with 0.25% market share or above and some other rules. You can modify this within Gruntfile.js using the the [syntax documented on the browserlist plugin page](https://github.com/ai/browserslist#queries), you can test your queries on [browserl.ist](http://browserl.ist).

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
