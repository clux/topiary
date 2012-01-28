# Topiary ![travis build status](https://secure.travis-ci.org/clux/topiary.png)

Topiary is a utility that shapes tree structures into nice prettified formats ala `npm list`.

## Usage
Basic usage:

````javascript
var topiary = require('topiary');
console.log(topiary(tree, recurseName, shapeFn));
````

Basic output:

````
root
 ├───sub1Name
 ├──┬sub2Name
 │  └───sub2subName
 └───sub3Name
````

## Example
`tree` is the recursively structured tree structured recursively with `recurseName`,
i.e. with `recurseName = 'deps'` the tree printed above can look like this:

````javascript
var tree = {
  name: "root"
, deps: {
    sub1 : {
      name : 'sub1Name'
    , deps : {}
    }
  , sub2 : {
      name : 'sub2Name'
    , deps : {
        sub2sub : {
          name : 'sub2subName'
        , deps : {}
        }
      }
    }
  , sub3 : {
      name : 'sub3Name'
    , deps : {}
    }
  }
};
````

`shapeFn` is passed the element (for instance `tree.deps['sub1']`) and must return the
string that should be used to name this element.

If your structure is simple (like above) and only has a name property, you can return that:

````javascript
var shapeFn = function (el) { return el.name };
````

Otherwise, you can shape the corresponding string anyway you like from the passed in branch.

Using this `shapeFn` and `tree` we can produce the above output as follows:

````javascript
console.log(topiary(tree, 'deps', shapeFn));
````

### filterFn
You can optionally pass in a function to help filter certain branches or leafs.
Any children of an ignored element are ignored.

````javascript
var filterFn = function (el) {
  if (el.name === 'sub2Name') {
    return false;
  }
  return true;
};
console.log(topiary(tree, 'deps', shapeFn, filterFn));
````

````
root
 ├───sub1Name
 └───sub3Name
````


## Installation

````bash
$ npm install topiary
````

## Running tests

````bash
$ npm test
````

## License
MIT-Licensed. See LICENSE file for details.
