"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Pages', 'enabled', {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    });
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Pages', 'enabled');
    done();
  }
};
