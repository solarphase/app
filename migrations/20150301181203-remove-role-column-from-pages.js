"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.removeColumn('Pages', 'role');
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.addColumn('Pages', 'role', {
      type: DataTypes.STRING,
      unique: true
    });
    done();
  }
};
