# Topiary
[![npm status](http://img.shields.io/npm/v/topiary.svg)](https://www.npmjs.org/package/topiary)
[![build status](https://secure.travis-ci.org/clux/topiary.svg)](http://travis-ci.org/clux/topiary)
[![dependency status](https://david-dm.org/clux/topiary.svg)](https://david-dm.org/clux/topiary)
[![coverage status](http://img.shields.io/coveralls/clux/topiary.svg)](https://coveralls.io/r/clux/topiary)

Topiary is a utility that shapes tree structures into a prettified format ala `npm list`.
It is used by [npm-graph](https://npmjs.org/package/npm-graph).

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
console.log(topiary(tree, 'deps'));
```

Output:
```
root
 ├──sub1
 ├─┬sub2
 │ └──sub2sub
 └──sub3
```

The `'deps'` string is the key to recurse on, expected to hold an array of objects of the same structure.

## Options
A third options object can be supplied to topiary with the following key/value combinations:

### name
If labelling by the default `name` key is not working, you can supply your own labeller:

```js
var namer = function (obj) {
  return '#' + obj.name; // combine stuff from object into a sensible string
};
console.log(topiary(tree, 'deps', { name: namer }));
```

```
root
 ├──#sub1
 ├─┬#sub2
 │ └──#sub2sub
 └──#sub3
```

### filter
You can optionally pass in a function to help filter certain branches or leaf nodes:

```js
var isNotSub2 = function (el) {
  return (el.name !== 'sub2');
};
console.log(topiary(tree, 'deps', { filter: isNotSub2 }));
```

Output:
```
root
 ├──sub1
 └──sub3
```

### sort
You can ask topiary to sort the `recurseName` array before starting to work on it. This solves non-deterministic outputs sometimes produced if it is generated in a non-deterministic manner:

```js
console.log(topiary(tree, 'deps', { label: namer, sort: true }));
```

Note that sorting is done lexicographically based on the labels output by the label functions.

## Installation

```bash
$ npm install topiary
```

## License
MIT-Licensed. See LICENSE file for details.
