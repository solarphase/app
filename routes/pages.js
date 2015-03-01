'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');
var navigationHelper = require('../lib/navigation-helper');

/* GET page by 'url' property */
router.get('*', function(req, res, next) {
  models.Page.find({
    where: {url: req.path},
    include: [models.NavigationItem]
  }).then(function(page) {
    if (page === null) {
      return next();
    }

    res.view.get('active').push(page.NavigationItem.id);
    navigationHelper.traverseUp(page.NavigationItem, function(parent) {
      res.view.get('active').push(parent.id);
    }).then(function() {
      res.view.set('linkedPage', page);
      res.render('website/index');
    });
  });
});

module.exports = router;
