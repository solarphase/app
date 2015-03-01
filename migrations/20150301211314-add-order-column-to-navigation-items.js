"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('NavigationItems', 'order', {
      type: DataTypes.INTEGER,
      defaultValue: 0
    });
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('NavigationItems', 'order');
    done();
  }
};
