"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.removeColumn('Pages', 'identifier');
    migration.removeColumn('NavigationItems', 'identifier');
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.addColumn('Pages', 'identifier', DataTypes.string);
    migration.addColumn('NavigationItems', 'identifier', DataTypes.string);
    done();
  }
};
