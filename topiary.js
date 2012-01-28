module.exports = function (tree, recurseName, shapeFn, filterFn) {
  if (!filterFn) {
    filterFn = function () {
      return true;
    };
  }
  var lines = [shapeFn(tree)];

  var count = function (o) {
    return Object.keys(o).filter(function (key) {
      return filterFn(o[key]);
    }).length;
  };

  var recurse = function (branch, level, parentAry) {
    if (!branch[recurseName]) { // missing recurseName key => no sub-elements
      return;
    }
    var idx = 0
      , bSize = count(branch[recurseName]);

    Object.keys(branch[recurseName]).forEach(function (key) {
      var subEl = branch[recurseName][key];

      if (!filterFn(subEl)) {
        return;
      }
      idx += 1;

      var hasChildren = count(subEl[recurseName]) > 0
        , forkChar    = hasChildren ? "┬" : "─"
        , isLast      = idx === bSize
        , turnChar    = isLast ? "└" : "├"
        , indent      = [];

      for (var i = 0; i < level; i += 1) {
        indent.push((parentAry[i] ? " " : "│") + "  ");
      }

      lines.push(" " + indent.join('') + turnChar + "──" + forkChar + shapeFn(subEl));

      if (hasChildren) {
        // recurse into subEl's recursive tree keeping track of parent lines
        recurse(subEl, level + 1, parentAry.concat(isLast));
      }
    });
  };
  recurse(tree, 0, []);
  return lines.join('\n');
};
