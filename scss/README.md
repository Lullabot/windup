# Sass Style Guide

This is a loose guide for formatting Sass stylesheets to encourage consistency
between developers in this repository. **As with most things, there will be
exceptions to the rules set forth here**. When you come across those exceptions,
please note them via comments.

## Folder Structure
More info in each folder's readme...

Filename          | Purpose
----------------- | ----------------------------------------------------------------------
`base`            | A collection of architecturally high-level styles for basic elements.
`component`       | Styles for components that make up our designs
`layout`          | Styles for page layout, how components layout on pages, etc.
`libraries`       | SASS resources, variables, mixins, etc
`skin`            | Styles for color schemes (if applicable to project)

## Basics

 - Use only soft tabs equalling two spaces. No hard TAB characters.
 - Remove trailing whitespace.
 - Do not define a unit for 0 values. (0px should be 0)
 - `//` comments will not be rendered on compile.

## Indention & Spacing

 - Starting level selectors should have no indention.
 - Properties should be indented once (two spaces) under their selectors.
 - One space should follow a selector name before the opening declaration bracket.
 - Add one space between a property (after the colon) and value.

E.g.:
```css
.selector {
  text-align: center;
  vertical-align: middle;
}
```

## Sass Formatting

### Selector Nesting

Please try to limit the nesting of selectors as much as possible. Nesting tends
to turn into a spaghetti mess of code and specificity issues.

 - A newline should precede and follow a selector being nested.
 - Place nested selectors after the parent's properties/includes/extends/etc...

E.g.:
```scss
.selector {
  color: #ffffff;
  background: #000000;

  .nested-selector {
    text-align: center;
    border-radius: 5px;
    color: #cecece;
  }

}
```

### Mixins, Nesting, and You

 - When using mixins that act as containers for style declarations (such as
   `@breakpoint()`), never nest a selector within the mixins brackets.
 - `@includes` etc... should be placed (when sensible) at the end of a
   selector's properties. Specifically, add any breakpoint mixins in order of
   progressive enhancement.
 - Do not use preceding or following newlines on nested `@includes`, `@mixins`,
   etc...

E.g.:
```scss
.selector {
  color: #ffffff;
  background: #000000;
  @extend %selector-to-extend;
  @include element-invisible;
  @include breakpoint($medium-viewport) {
    color: #eeeeee;
  }
  @include breakpoint($large-viewport) {
    color: #cccccc;
  }

  .nested-selector {
    // Nested selector content here.
    // Notice the newlines.
  }

}
```

### Extending

While Sass' `@extend` functionality is pretty, it causes a lot of maintenance
nightmares, so use it sparingly. The one absolute rule is:

*Do not `@extend` a selector onto a selector in a different file.*

## Class Naming Conventions

This project leverages a *Component*-*Element*-*Modifier* syntax for naming
classes. This produces rather lengthy class names but also provides quick,
easily discernible information to developers.

The syntax looks like this:
```scss
.component
.component__element
.component__element--modifier
```

The class names in this syntax do not imply any structural hierarchy in regard
to markup. More often than not, the base _component_ class is the containing
element of the sub-components, but this is not always the case. You may end up
with a markup structure in which an _element_ is placed above the base
_component_ like so:

```html
<div class="component__wrapper">
  <div class="component">
    <!-- other markup here -->
  </div>
</div>
```

There are two ways which _modifier_ classes are usually applied. The first
way is by creating the modifier class as an extension of the base class thereby
ensuring that only one class is needed on a given element. This produces
compiled CSS with many duplicate properties applied to classes and is not the
preferred method.

```sass
.component__element {
  // styles
}

.component__element--modifier {
  @extend .component__element;
  // More styles
}
```

Instead, modifier classes should be applied *in addition* to base classes to
achieve the desired result.

```sass
.component__element {
  // styles
}

.component__element--modifier {
  // separate or overriding styles
}
```

```html
<div class="component">
  <div class="component__element component__element--modifier"></div>
</div>
```

## Other Conventions

 - Do not add units to 0 values.

   ```scss
   // No.
   margin: 0px auto;
   // Yes.
   margin: 0 auto;
   ```

### CSS Property Declaration Order

This project follows Drupal's CSS declaration order:

```scss
.selector {
  // Positioning declarations
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  // Box model declarations
  display: inline-block;
  width: 100px;
  padding: 10px;
  border: 1px solid #333333;
  // Other declarations
  background: #000000;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 10px;
}
```

More information can be found here: [drupal.org](https://drupal.org/node/1887862#declaration-order)

### Declaring Color

When possible, use one of the predefined Sass variables in place for colors.
Otherwise, when declaring hexadecimal color values, always use the full hex value.
This makes it much easier to find and replace should we need to.

```scss
// No.
color: #333;
// Yes.
color: #333333;
```

### Comments

Sectioning comments should look like so, with bottom borders extending to 80
characters:

```scss
// This is a section
// -----------------------------------------------------------------------------
.selector {
  color: $blue;
}
```

