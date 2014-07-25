module.exports = function (tree, recurseName, opts) {
  opts = opts || {};
  var nameFn = opts.name || function (e) { return e.name; };
  var filterFn = opts.filter || function () { return true; };
  var sortFn = !opts.sort ? null : function (x, y) {
    return nameFn(x).localeCompare(nameFn(y));
  };


  var lines = [nameFn(tree)];
  if (!Array.isArray(tree[recurseName])) {
    throw new Error("No recurse entry for '" + recurseName + "' found on root");
  }

  var recurse = function (xs, level, parentAry) {
    var ys = (sortFn instanceof Function) ? xs.sort(sortFn) : xs;
    ys.forEach(function (sub, idx, subAry) {
      var children    = (sub[recurseName] || []).filter(filterFn)
        , hasChildren = children.length > 0
        , forkChar    = hasChildren ? "┬" : "─"
        , isLast      = idx === subAry.length - 1
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
