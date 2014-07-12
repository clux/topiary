var prettify = require('../');

var nameFn = function (el) {
  return el.key;
};
var isNotSub2 = function (el) {
  return (el.key !== 'sub2'); // everything else stays
};
var falseFn = function () {
  return false;
};

exports.output = function (t) {
  var tree = {
    key: "root",
    deps: [
      { key: 'sub1', deps : [] },
      {
        key: 'sub2',
        deps: [{ key: 'sub2sub', deps: [] }]
      },
      {
        key: 'sub3',
        deps: [
          {
            key: 'sub3sub',
            deps: [{ key: 'sub3subsub', deps: [] }]
          }
        ]
      },
      { key: 'sub4', deps: [] }
    ]
  };

  var output = prettify(tree, 'deps', { name: nameFn }).split('\n');
  t.equal(output.length, 8, "8 elements including root");
  t.deepEqual(output, [
    'root',
     ' ├──sub1',
     ' ├─┬sub2',
     ' │ └──sub2sub',
     ' ├─┬sub3',
     ' │ └─┬sub3sub',
     ' │   └──sub3subsub',
     ' └──sub4'
  ], "full tree");

  output = prettify(tree, 'deps', { name: nameFn, filter: isNotSub2 }).split('\n');
  t.equal(output.length, 6, "6 elements remaining after filtering one + one child");

  t.throws(function () {
    output = prettify(tree, 'wrongKey', { name: nameFn }).split('\n');
  }, null, "invalid usage when no recurseName key on entry object");

  output = prettify(tree, 'deps', { name: nameFn, filter: falseFn }).split('\n');
  t.equal(output.length, 1, "only root survives if all filtered out");
  t.done();
};

exports.bigtree = function (t) {
  var tree = {
    name: "dye",
    deps: [
      {
        name: "./lib-cov/dye.js",
        deps: [
          {
            name: "./zalgo",
            deps: [ { name: "trials", deps: [] } ]
          }
        ]
      },
      {
        name: "./lib/dye.js",
        deps: [
          {
            name: "./zalgo",
            deps: [ { name: "trials", deps: [] } ]
          }
        ]
      }
    ]
  };
  // NB: do not need nameFn here
  var output = prettify(tree, 'deps', { sort: true }).split('\n');
  t.deepEqual(output, [
    'dye',
    ' ├─┬./lib-cov/dye.js',
    ' │ └─┬./zalgo',
    ' │   └──trials',
    ' └─┬./lib/dye.js',
    '   └─┬./zalgo',
    '     └──trials'
  ], "full tree");
  t.done();
};
