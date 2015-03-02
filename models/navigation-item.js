"use strict";

module.exports = function(sequelize, DataTypes) {
  var NavigationItem = sequelize.define("NavigationItem", {
    title: DataTypes.STRING,
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    url: {
      type: DataTypes.STRING,
      get: function() {
        var url = this.getDataValue('url');
        if (!url && this.Page) {
          return this.Page.url;
        }

        return url;
      }
    },
    enabled: { type: DataTypes.BOOLEAN, defaultValue: true }
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

