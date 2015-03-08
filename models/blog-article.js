"use strict";

module.exports = function(sequelize, DataTypes) {
  var BlogArticle = sequelize.define("BlogArticle", {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty!'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Content cannot be empty!'
        }
      }
    },
    publishedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        BlogArticle.belongsTo(models.BlogCategory);
      }
    }
  });

  return BlogArticle;
};
