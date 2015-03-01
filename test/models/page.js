var models = require('../../models');
var should = require('should');

require('./before');

describe('Page', function() {
  var page = models.Page.build({ title: 'Something' });

  it('should have a title property', function() {
    page.should.have.property('title');
  });

  it('should have a content property', function() {
    page.should.have.property('content');
  });

  describe('#role', function() {
    it('should be a property', function() {
      page.should.have.property('role');
    });

    it('should be unique', function(done) {
      page.role = 'test';
      page.save().then(function() {
        models.Page.create({
          title: 'Something else',
          role: 'test'
        }).then(function() {
          done(new Error('Two models with same role was created!'));
        }).catch(function() {
          done();
        });
      }).catch(function(e) {
        done(e);
      });
    });
  });
});

