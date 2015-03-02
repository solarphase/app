var models = require('../../models');
var should = require('should');

require('./before');

describe('NavigationItem', function() {
  var item = models.NavigationItem.build({ title: 'Test', url: '/test' });

  it('should have a title property', function() {
    item.should.have.property('title');
  });

  it('should have a order property', function() {
    item.should.have.property('order');
  });

  it('should have a enabled property', function() {
    item.should.have.property('enabled');
  });

  describe('#url', function() {
    it('should be a property', function() {
      item.should.have.property('url');
    });

    it('should fall back to the page url if not defined', function() {
      item.url = null;
      item.Page = { url: 'foo' };
      item.url.should.equal('foo');
    });
  });
});
