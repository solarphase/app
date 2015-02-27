"use strict";

module.exports = function(sequelize, DataTypes) {
  var NavigationItem = sequelize.define("NavigationItem", {
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        NavigationItem.belongsTo(NavigationItem, {as: 'Parent'});
        NavigationItem.hasMany(NavigationItem, {as: 'Children', foreignKey: 'ParentId'});
        NavigationItem.belongsTo(models.Page);
      }
    }
  });
  return NavigationItem;
};

