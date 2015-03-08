"use strict";

module.exports = function(sequelize, DataTypes) {
  var NavigationItem = sequelize.define("NavigationItem", {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty!'
        }
      }
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
      validate: {
        isInt: {
          args: true,
          msg: 'Order must be a number!'
        }
      }
    },
    url: {
      type: DataTypes.STRING,
      get: function() {
        var url = this.getDataValue('url');
        if (!url && this.Page) {
          return this.Page.url;
        } else if (!url && this.BlogArticle) {
          return this.BlogArticle.getUrl();
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
        NavigationItem.hasOne(models.BlogCategory);
      }
    }
  });
  return NavigationItem;
};

