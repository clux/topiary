var defaultFilter = function () {
  return true;
};

module.exports = function (tree, recurseName, nameFn, filterFn) {
  filterFn = filterFn || defaultFilter;
  var lines = [nameFn(tree)];
  if (!Array.isArray(tree[recurseName])) {
    throw new Error("No recurse entry for '" + recurseName + "' found on root");
  }

  var recurse = function (xs, level, parentAry) {
    xs.forEach(function (sub, idx, subAry) {
      var children    = (sub[recurseName] || []).filter(filterFn)
        , hasChildren = children.length > 0
        , forkChar    = hasChildren ? "┬" : "─"
        , isLast      = idx === subAry.length
        , turnChar    = isLast ? "└" : "├"
        , indent      = '';
      
      for (var i = 0; i < level; i += 1) {
        indent += (parentAry[i] ? " " : "│") + " ";
      }

      lines.push(" " + indent + turnChar + "─" + forkChar + nameFn(sub));

      if (hasChildren) {
        // recurse into current tree while keeping track of parent lines
        recurse(children, level + 1, parentAry.concat(isLast));
      }
    });
  };
  recurse(tree[recurseName].filter(filterFn), 0, []);
  return lines.join('\n');
};
