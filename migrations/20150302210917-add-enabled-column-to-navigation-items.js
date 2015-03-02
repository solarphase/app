"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('NavigationItems', 'enabled', {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    });
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('NavigationItems', 'enabled');
    done();
  }
};
