---
title: Full setup
---

x-dash components only provide markup, i.e. templates. They're generally designed to be styled by their [Origami](https://origami.ft.com) counterparts, i.e. [x-teaser](/components/x-teaser) outputs classes that [o-teaser](https://registry.origami.ft.com/components/o-teaser) uses for styling.

The templates are authored as abstract [JSX](https://reactjs.org/docs/introducing-jsx.html), an extension of Javascript that allows you to use HTML-like markup as a first-class concept (that is, you can define it, pass it around and use it like strings or objects). Since you can use variables in JSX expressions, we can use them to provide templating functionality, similar to Handlebars.

These components do not contain any state or behaviour, so they don't require any kind of runtime to work. Because of this, they can be used in any React-like library, such as Preact or Inferno, without relying on the React runtime, or without any runtime at all, outputting static HTML strings. If you're using a library like one of these, x-dash components will work with [minimal setup](#setup). If you're not using one, and you want to use a component without any setup, they can be used as plain functions that output strings, similar to a Handlebars template. They can also be integrated with Handlebars via the [x-handlebars package](/packages/x-handlebars).

## Installing

Components are installed with [`npm`](https://npmjs.org). For example, to install the [Teaser component](/components/x-teaser):

```
npm install --save @financial-times/x-teaser
```

## Setup

If you're using a component with a React-like runtime, you need to tell x-dash how to interface with it by adding an `x-dash` stanza to your app's `package.json`.

For React, the least you'll need is:

```json
{
  "x-dash": {
    "engine": {
      "browser": {
        "runtime": "react",
        "factory": "createElement"
      }
    }
  }
}
```

Then when you import a component, you can use it with React:

```jsx
const React = require('react');
const ReactDOM = require('react-dom');
const {Teaser} = require('@financial-times/x-teaser');

ReactDOM.render(
  <Teaser title='Hello world' />,
  document.querySelector('#target')
);
```

For more about configuring the component runtime, see the [x-engine documentation](/packages/x-engine/readme.md).

### Enable component features

Each component has a set of features, which are parts of the component that can be toggled on or off. By default, most of these are disabled, and must be explicitly opted in to.

In the case of the Teaser component, to show an image, you must enable it as well as passing in the image data:

```js
Teaser({
  title: 'Hello world',
  image: {
    url: 'https://example.com/foo.jpg'
  },
  showImage: true
});
```

### Use component presets

Because enabling toggles can become repetitive, and to make use cases clearer, components may export presets, which are groups of features to enable.

The Teaser component has a `Small` preset, enabling the "title", "meta" and "status" elements (which show title, concept tags and timestamp respectively):

```js
const {Teaser, presets} = require('@financial-times/x-teaser');

Teaser({
  ...Teaser.presets.Small,
  title: 'Hello world',
  publishedDate: new Date(),
  concept: {
    url: '/brand',
    prefLabel: 'Brand'
  }
});
```

This example uses the [ES2018 Object Spread](https://github.com/tc39/proposal-object-rest-spread) syntax.
