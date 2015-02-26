"use strict";
module.exports = function(sequelize, DataTypes) {
  var Page = sequelize.define("Page", {
    title: DataTypes.STRING,
    activeId: DataTypes.STRING,
    role: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Page;
};