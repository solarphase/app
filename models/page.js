'use strict';

module.exports = function(sequelize, DataTypes) {
  var Page = sequelize.define('Page', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty!'
        }
      }
    },
    url: DataTypes.STRING,
    content: DataTypes.TEXT,
    enabled: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    classMethods: {
      associate: function(models) {
        Page.hasOne(models.NavigationItem);
      }
    }
  });

  return Page;
};
