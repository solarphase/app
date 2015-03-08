var hyphenize = require('../lib/hyphenize');
"use strict";
module.exports = function(sequelize, DataTypes) {
  var BlogCategory = sequelize.define("BlogCategory", {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty!'
        }
      }
    },
    description: DataTypes.TEXT,
    enabled: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    instanceMethods: {
      getUrl: function() {
        return '/blog/' + hyphenize(this.title);
      }
    },
    classMethods: {
      associate: function(models) {
        BlogCategory.belongsTo(models.NavigationItem);
      }
    }
  });
  return BlogCategory;
};
