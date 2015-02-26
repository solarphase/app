"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Pages", {
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
      activeId: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING
      },
      content: {
        type: DataTypes.TEXT
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
    migration.dropTable("Pages").done(done);
  }
};
