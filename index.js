module.exports = process.env.TOPIARY_COV
  ? require('./lib-cov/topiary.js')
  : require('./lib/topiary.js');
