react-hashchange [![Build Status](https://travis-ci.org/dashed/react-hashchange.svg)](https://travis-ci.org/dashed/react-hashchange) [![npm version](https://img.shields.io/npm/v/react-hashchange.svg?style=flat)](https://www.npmjs.com/package/react-hashchange)
================

[![Greenkeeper badge](https://badges.greenkeeper.io/dashed/react-hashchange.svg)](https://greenkeeper.io/)

> React component that notifies when browser's hash (i.e. `window.location.hash`) changes.

## Install

```sh
$ yarn add react-hashchange
# npm v5+
$ npm install react-hashchange
# before npm v5
$ npm install --save react-hashchange
```

## Usage


```js
// 3rd-party imports

import ReactDOM from "react-dom";
import React, { Component } from "react";

import HashChange from "react-hashchange";

// function as child component

ReactDOM.render(
    <HashChange onChange={({ hash }) => console.log({ hash })}>
        {({ hash }) => {
            return <div>{`hash: ${hash}`}</div>;
        }}
    </HashChange>,
    mountNode
);

// render prop

const render = ({ hash }) => {
    return <div>{`hash: ${hash}`}</div>;
};

ReactDOM.render(
    <HashChange
        onChange={({ hash }) => console.log({ hash })}
        render={render}
    />,
    mountNode
);
```


## Props

### `render` (optional)

This is a `render` prop. To learn what that is, read: https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce

An optional function that is called whenever the browser's hash (i.e. `window.location.hash`) changes.

The `render` function is invoked with an object argument: `({ hash })`.

 It's expected that `render` function returns a single React element.
This has same API semantics as [`React.Component.render()`](https://facebook.github.io/react/docs/react-component.html#render).

If `render` function is given, it has precedence over any given child component:

```js
<HashChange
    render={() => {
        return (
            <div>"I take precedence over any function as child component."</div>
        );
    }}
>
    {() => {
        return <div>"I will not render."</div>;
    }}
</HashChange>
```

### Function as child component (optional)

Same as `render` prop function (see above).

If `render` function is not given, then the child component will be invoked as a function.

The child component function is invoked with an object argument: `({ hash })`.

```js
<HashChange>
    {({ hash }) => {
        return <div>{`hash: ${hash}`}</div>;
    }}
</HashChange>
````

### `onChange` (optional)

An optional function that is called whenever the browser's hash (i.e. `window.location.hash`) changes.

The `onChange` function is invoked with an object argument: `({ hash })`.

### `getLocationHash` (optional)

An optional function that returns the browser's hash. This function is called whenever `hashchange` event occurs.

If necessary, you may provide your own implementation of `getLocationHash` (e.g. handling browser nuances).

By default the implementation of `getLocationHash` is:

```js
const getLocationHash = () => {
    return window.location.hash;
};
```

License
=======

MIT.
