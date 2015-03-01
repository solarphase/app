'use strict';

var BPromise = require('bluebird');
var models = require('../../models');

function traverseNavigationParentsFor(page, callback) {
  return new BPromise(function(resolve, reject) {
    traverseNavigationParent(page.values.NavigationItem, callback, resolve);
  });
}

function traverseNavigationParent(item, callback, resolve) {
  item.getParent().then(function(parent) {
    if (parent === null) {
      resolve();
      return;
    }
    
    callback(parent);
    traverseNavigationParent(parent, callback, resolve);
  });
}

module.exports = function(router) {
  router.get('*', function(req, res, next) {
    models.Page.find({
      where: {url: req.path},
      include: [models.NavigationItem]
    }).then(function(page) {
      if (page === null) {
        return next();
      }

      res.view.get('active').push(page.NavigationItem.id);
      traverseNavigationParentsFor(page, function(parent) {
        res.view.get('active').push(parent.id);
      }).then(function() {
        res.view.set('linkedPage', page);
        res.render('index');
      });
    });
  });

  return router;
};

