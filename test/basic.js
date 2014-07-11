var prettify = require('../');

var nameFn = function (el) {
  return el.name;
};
var filterFn = function (el) {
  return (el.name !== 'sub2'); // everything else stays
};

exports.output = function (t) {
  var tree = {
    name: "root",
    deps: [
      { name : 'sub1', deps : [] },
      {
        name : 'sub2',
        deps : [{ name : 'sub2sub', deps : [] }]
      },
      {
        name : 'sub3',
        deps : [
          {
            name : 'sub3sub',
            deps : [{ name : 'sub3subsub', deps : [] }]
          }
        ]
      },
      { name : 'sub4', deps : [] }
    ]
  };

  var output = prettify(tree, 'deps', nameFn).split('\n');
  t.equal(output.length, 8, "8 elements including root");

  output = prettify(tree, 'deps', nameFn, filterFn).split('\n');
  t.equal(output.length, 6, "6 elements remaining after filtering one + one child");

  t.throws(function () {
    output = prettify(tree, 'wrongKey', nameFn).split('\n');
  }, null, "invalid usage when no recurseName key on entry object");

  output = prettify(tree, 'deps', nameFn, function () { return false; }).split('\n');
  t.equal(output.length, 1, "only root survives if all filtered out");
  t.done();
};

exports.bigtree = function (t) {
  var tree = {
    "name": "dye",
    "deps": [
      {
        "name": "./lib-cov/dye.js",
        "deps": [
          {
            "name": "./zalgo",
            "deps": [ { "name": "trials", "deps": [] } ]
          }
        ]
      },
      {
        "name": "./lib/dye.js",
        "deps": [
          {
            "name": "./zalgo",
            "deps": [ { "name": "trials", "deps": [] } ]
          }
        ]
      }
    ]
  };
  var output = prettify(tree, 'deps', nameFn).split('\n');
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
