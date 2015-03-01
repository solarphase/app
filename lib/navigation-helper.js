'use strict';

var BPromise = require('bluebird');

function NavigationHelper() {}

NavigationHelper.prototype.traverseUp = function(item, callback) {
  var that = this;
  return new BPromise(function(resolve, reject) {
    that._traverseUp(item, callback, resolve);
  });
};

NavigationHelper.prototype._traverseUp = function(item, callback, resolve) {
  var that = this;
  item.getParent().then(function(parent) {
    if (parent === null) {
      return resolve();
    }

    callback(parent);
    that._traverseUp(parent, callback, resolve);
  });
};

module.exports = new NavigationHelper();
