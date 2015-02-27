'use strict';

var models = require('../models');

module.exports = function(app) {
  // Setup navigation.
  app.use(function(req, res, next) {
    models.NavigationItem.findAll({
      include: [
        { model: models.NavigationItem, as: 'Children' },
        { model: models.NavigationItem, as: 'Parent' }
      ]
    }).then(function(items) {
      res.view.set('navigation', items);
      res.view.set('active', []);
      next();
    });
  });

  // Setup linkedPage.
  app.use(function(req, res, next) {
    res.view.set('linkedPage', models.Page.build({
      title: 'Undefined'
    }));
    next();
  });
};

