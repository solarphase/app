var models = require('../../models');
var should = require('should');

require('./before');

describe('Page', function() {
  var page = models.Page.build({ title: 'Something' });

  it('should have a title property', function() {
    page.should.have.property('title');
  });

  it('should have a url property', function() {
    page.should.have.property('url');
  });

  it('should have a content property', function() {
    page.should.have.property('content');
  });
});

