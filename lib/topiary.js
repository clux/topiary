var defaultFilter = function () {
  return true;
};

module.exports = function (tree, recurseName, nameFn, filterFn) {
  filterFn = filterFn || defaultFilter;
  var lines = [nameFn(tree)];

  var count = function (ary) {
    return ary.filter(filterFn).length;
  };

  var recurse = function (branch, level, parentAry) {
    var idx = 0
      , subAry = branch[recurseName]
      , bSize = count(subAry);

    subAry.filter(filterFn).forEach(function (el) {
      idx += 1;

      var hasChildren = count(el[recurseName]) > 0
        , forkChar    = hasChildren ? "┬" : "─"
        , isLast      = idx === bSize
        , turnChar    = isLast ? "└" : "├"
        , indent      = '';
      
      for (var i = 0; i < level; i += 1) {
        indent += (parentAry[i] ? " " : "│") + " ";
      }

      lines.push(" " + indent + turnChar + "─" + forkChar + nameFn(el));

      if (hasChildren) {
        // recurse into el's tree while keeping track of parent lines
        recurse(el, level + 1, parentAry.concat(isLast));
      }
    });
  };
  if (tree[recurseName]) {
    recurse(tree, 0, []);
  }
  return lines.join('\n');
};
