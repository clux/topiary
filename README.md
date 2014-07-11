# Topiary
[![npm status](http://img.shields.io/npm/v/topiary.svg)](https://www.npmjs.org/package/topiary)
[![build status](https://secure.travis-ci.org/clux/topiary.svg)](http://travis-ci.org/clux/topiary)
[![dependency status](https://david-dm.org/clux/topiary.svg)](https://david-dm.org/clux/topiary)
[![coverage status](http://img.shields.io/coveralls/clux/topiary.svg)](https://coveralls.io/r/clux/topiary)
[![experimental](http://img.shields.io/badge/stability-experimental-DD5F0A.svg)](http://nodejs.org/api/documentation.html#documentation_stability_index)

Topiary is a utility that shapes tree structures into a prettified format ala `npm list`.
It is used by [npm-graph](https://npmjs.org/npm-graph).

## Usage
Given a tree structure and a key to recurse on, call topiary on that object:

```js
var topiary = require('topiary');

var tree = {
  name: "root",
  deps: [
    {
      name : 'sub1',
      deps : []
    },
    {
      name : 'sub2',
      deps : [ { name : 'sub2sub', deps : [] } ]
    },
    {
      name : 'sub3',
      deps : []
    }
  ]
};
var nameFn = function (el) { return el.name };

console.log(topiary(tree, 'deps', nameFn));
```

Output:
```
root
 ├──sub1
 ├─┬sub2
 │ └──sub2sub
 └──sub3
```

Note the `'deps'` string is the key to recurse on, expected to hold an array of objects of the same structure.

## Extras
### filter
You can optionally pass in a function to help filter certain branches or leaf nodes:

```js
var filterFn = function (el) {
  return (el.name !== 'sub2'); // everything but 'sub2' remains
};
console.log(topiary(tree, 'deps', nameFn, filterFn));
```

Output:
```
root
 ├──sub1
 └──sub3
```

## Installation

```bash
$ npm install topiary
```

## Running tests

```bash
$ npm test
```

## License
MIT-Licensed. See LICENSE file for details.
