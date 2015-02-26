'use strict';

var models = require('../models');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.view.set('linkedPage', models.Page.build({
      title: 'Undefined'
    }));
    next();
  });
};

