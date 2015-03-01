'use strict';

module.exports = function(sequelize, DataTypes) {
  var Page = sequelize.define('Page', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Page.hasOne(models.NavigationItem);
      }
    }
  });

  return Page;
};
