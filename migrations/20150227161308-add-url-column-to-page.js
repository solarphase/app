"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Pages', 'url', DataTypes.STRING);
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Pages', 'url');
    done();
  }
};
