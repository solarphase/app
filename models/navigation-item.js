"use strict";

module.exports = function(sequelize, DataTypes) {
  var NavigationItem = sequelize.define("NavigationItem", {
    title: DataTypes.STRING,
    identifier: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        NavigationItem.belongsTo(NavigationItem, {as: 'parent'});
        NavigationItem.hasMany(NavigationItem, {as: 'children', foreignKey: 'parentId'});
      }
    }
  });
  return NavigationItem;
};

