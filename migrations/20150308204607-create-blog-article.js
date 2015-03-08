"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("BlogArticles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      publishedAt: {
        type: DataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("BlogArticles").done(done);
  }
};
