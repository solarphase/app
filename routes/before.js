'use strict';

var models = require('../models');

module.exports = function(app) {
  // Setup navigation.
  app.use(function(req, res, next) {
    models.NavigationItem.findAll({
      where: { ParentId: null },
      include: [
        { model: models.NavigationItem, as: 'Children', include: [models.Page] },
        models.Page
      ]
    }).then(function(items) {
      res.locals.navigation = items;
      res.locals.active = [];
      next();
    });
  });
};

