'use strict';

module.exports = function(app) {
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.locals.error = err;
      next(err);
    });
  }

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      title: 'Error',
      status: res.statusCode,
      message: err.message,
      error: res.locals.error || ""
    });
  });
};

