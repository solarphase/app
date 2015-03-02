'use strict';

var express = require('express');
var router = express.Router();
var models = require('../../models');
var navigationHelper = require('../../lib/navigation-helper');

/* GET page by 'url' property */
router.get('*', function(req, res, next) {
  models.Page.find({
    where: {url: req.path},
    include: [models.NavigationItem]
  }).then(function(page) {
    if (!page) {
      return next();
    }

    res.locals.title = page.title;
    if (!page.NavigationItem) {
      return res.render('website/index', {page:page});
    }

    res.locals.active.push(page.NavigationItem.id);
    navigationHelper.traverseUp(page.NavigationItem, function(parent) {
      res.locals.active.push(parent.id);
    }).then(function() {
      res.render('website/index', {page:page});
    });
  });
});

module.exports = router;

