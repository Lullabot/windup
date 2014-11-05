# Skin Partials

Skin partials can be thought of as nearly the exact opposite of layout partials.
These partials typically extend styles created on a component for a potential
change in theme.

In a project where one component may have different colors based on some
back-end logic, a skin file can be used to handle it.

## Skins for a "Next Event" component

Using an imaginary "Next Event" component which is defined in
`scss/components/_next-event.scss` and assuming there is some kind of class on
our body element that denotes which skin to use, let's create some examples:

```css
// scss/skin/_next-event.scss
.blue-skin .next-event {
  background-color: light-blue;
}

.blue-skin .next-event__title {
  color: blue;
}
```

The styles applied here are strictly color related, and they are meant to
override other color definitions from the original component using CSS
specificity. Actual implementation may vary, but the concept should be the same.

## Typical contents

Filename            | Purpose
------------------- | ---------------------------------------------
`_skin.scss`        | Used to import other files in this directory
`_a-component.scss` | Some component's skin color definitions
`_skin-blue.scss`   | A skin definition that handles a lot of different components

