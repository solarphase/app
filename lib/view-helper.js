function ViewHelper(res) {
  this.res = res;
  this.res.locals.globals = {};
  this.globals = this.res.locals.globals;
}

ViewHelper.prototype.set = function(key, value) {
  this.globals[key] = value;
};

ViewHelper.prototype.get = function(key) {
  return this.globals[key];
};

module.exports = function() {
  return function(req, res, next) {
    res.view = new ViewHelper(res);
    next();
  };
};

