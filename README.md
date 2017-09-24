react-hashchange
================

> React component that notifies when browser's hash changes.

## Install

```sh
$ yarn add react-combokeys
# npm v5+
$ npm install react-combokeys
# before npm v5
$ npm install --save react-combokeys
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

License
=======

MIT.
