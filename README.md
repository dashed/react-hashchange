react-hashchange
================

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


License
=======

MIT.
