# Layout Partials

Layout partials should actually be fairly sparse throughout this project. The
idea behind a "layout" file is that it manages the relationship(s) of two or
more components on a given page. Often, this can be thought of as a "Page
Layout" file although that isn't always the case.

Layout files should contain absolutely no non-box model styling.

For example:

## An "Event" layout.

In this example, assume that "next-event" and "event-calendar" are two separate
components, each defined in their respective partials inside the
`scss/components` directory. The only thing we're doing here is figuring out how
they relate to each other.

```html
<section class="next-event">
  <h2 class="next-event__title">Secret Meetings</h2>
  <h3 class="next-event__day">Monday</h3>
</section>
<section class="event-calendar">
  <ul class="event-calendar__list">
    <li class="event-calendar__item">Armageddon</li>
    <li class="event-calendar__item">Weekly Front-end Meeting</li>
    <li class="event-calendar__item">Tech sync</li>
  </ul>
</section>
```

```css
.next-event {
  margin-bottom: 30px;
  @include zen-grid-item(4, 1);
}

.event-calendar {
  @include zen-grid-item(8, 5);
}
```


## Typical contents

Filename              | Purpose
--------------------- | ---------------------------------------------
`_layout.scss`        | Used to import other files in this directory
`_l-blog.scss`        | Manages the placement of various components on a blog
