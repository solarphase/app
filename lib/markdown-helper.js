var marked = require('marked');

module.exports = function() {
  return function(req, res, next) {
    res.locals.markdown = marked;
    next();
  };
};

