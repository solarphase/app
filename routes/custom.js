'use strict';

var BPromise = require('bluebird');

var express = require('express');
var router = express.Router();
var models = require('../models');

function traverseNavigationParentsFor(id, callback) {
  return new BPromise(function(resolve, reject) {
    models.NavigationItem.find({ where: { identifier: id } })
      .then(function(item) {
        traverseNavigationParent(item, callback, resolve);
      })
      .catch(function(e) {
        reject(e);
      });
  });
}

function traverseNavigationParent(item, callback, resolve) {
  item.getParent().then(function(parent) {
    if (parent === null) {
      resolve();
    }
    
    callback(parent);
    traverseNavigationParent(parent, callback, resolve);
  });
}

router.get('/:identifier', function(req, res, next) {
  models.Page.find({
    where: { identifier: req.params.identifier }
  }).then(function(page) {
    if (page === null) {
      return next();
    }

    res.view.get('active').push(page.identifier);
    traverseNavigationParentsFor(page.identifier, function(parent) {
      res.view.get('active').push(parent.identifier);
    }).then(function() {
      res.view.set('linkedPage', page);
      res.render('index');
    });
  });
});

module.exports = router;

