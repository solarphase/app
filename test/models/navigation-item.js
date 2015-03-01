var models = require('../../models');
var should = require('should');

require('./before');

describe('NavigationItem', function() {
  var item = models.NavigationItem.build({ title: 'Test', url: '/test' });

  it('should have a title property', function() {
    item.should.have.property('title');
  });

  it('should have a url property', function() {
    item.should.have.property('url');
  });
});
