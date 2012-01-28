var prettify = require('../')
  , assert = require('assert');

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
    , deps : {
        sub3sub : {
          name : 'sub3subName'
        , deps : {
            sub3subsub : {
              name : 'sub3subsubName'
            , deps : {}
            }
          }
        }
      }
    }
  , sub4 : {
      name : 'sub4Name'
    , deps : {}
    }
  }
};

var shapeFn = function (el) { return el.name };
var ignoreFn = function (el) {
  if (el.name === 'sub2Name') {
    return false;
  }
  return true;
};

var testIt = function () {
  var output = prettify(tree, 'deps', shapeFn).split('\n');
  assert.equal(output.length, 8, "8 elements including root");

  output = prettify(tree, 'deps', shapeFn, ignoreFn).split('\n');
  assert.equal(output.length, 6, "6 elements remaining after filtering one + one child");

  output = prettify(tree, 'wrongKey', shapeFn).split('\n');
  assert.equal(output.length, 1, "only root survives if wrong key");

  output = prettify(tree, 'deps', shapeFn, function () { return false; }).split('\n');
  assert.equal(output.length, 1, "only root survives if all filtered out");

  console.log('tests done');
};
testIt();
