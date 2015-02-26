var models = require('../../models');
var should = require('should');

require('./before');

describe('NavigationItem', function() {
  var item = models.NavigationItem.build({ title: 'Test', url: '/test' });

  it('should have a title property', function() {
    item.should.have.property('title');
  });

  it('should have a identifier property', function() {
    item.should.have.property('identifier');
  });

  it('should have a url property', function() {
    item.should.have.property('url');
  });

  it('should have functional associations', function(done) {
    item.save().then(function(item) {
      models.NavigationItem.create({
        title: 'Test2',
        url: '/test2'
      }).then(function(item2) {
        item2.setParent(item).then(function() {
          item.getChildren().then(function(children) {
            children[0].id.should.equal(item2.id);
            item2.getParent().then(function(parent) {
              parent.id.should.equal(item.id);
              done();
            });
          });
        });
      });
    });
  });
});
