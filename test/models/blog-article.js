var models = require('../../models');

describe('BlogArticle', function() {
  var item = models.BlogArticle.build({
    title: 'Test',
    content: 'Lorem ipsum'
  });

  it('should have a title property', function() {
    item.should.have.property('title');
  });

  it('should have a content property', function() {
    item.should.have.property('content');
  });

  it('should have a publishedAt property', function() {
    item.should.have.property('publishedAt');
  });
});
