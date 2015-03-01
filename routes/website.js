'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');
var navigationHelper = require('../lib/navigation-helper');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Page.find({
    where: { role: 'index' },
    include: [models.NavigationItem]
  }).then(function(page) {
    if (page !== null) {
      res.view.get('active').push(page.NavigationItem.id);
      res.view.set('linkedPage', page);
    } else {
      return next(new Error('No page with the role of index was found!'));
    }
    
    res.render('website/index');
  });
});

/* GET custom page. */
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

