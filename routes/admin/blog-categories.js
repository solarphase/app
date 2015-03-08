'use strict';

var express = require('express');
var router = express.Router();
var models = require('../../models');

/* GET list blog categories */
router.get('/', function(req, res, next) {
  models.BlogCategory.findAll().then(function(categories) {
    res.render('admin/blog-categories/index', {
      title: 'Blog Categories',
      categories: categories
    });
  });
});

/* POST create blog category */
router.post('/', function(req, res, next) {
  var data = {
    title: req.body.title,
    description: req.body.description || null,
    enabled: !!req.body.enabled,
    NavigationItemId: req.body.NavigationItemId || null
  };

  models.BlogCategory.create(data).then(function(category) {
    req.flash('success', 'The blog category has been created!');
    res.redirect('/admin/blog/categories/' + category.id + '/edit');
  }).catch(function(err) {
    req.session.formData = data;
    req.flash('danger', err.errors[0].message);
    res.redirect('/admin/blog/categories/new');
  });
});

/* GET new blog category */
router.get('/new', function(req, res, next) {
  var data = req.session.formData;
  delete req.session.formData;

  res.render('admin/blog-categories/edit', {
    title: 'New Blog Category',
    category: models.BlogCategory.build(data)
  });
});

/* GET edit blog category */
router.get('/:id/edit', function(req, res, next) {
  models.BlogCategory.find(req.params.id).then(function(category) {
    if (!category) {
      return next();
    }

    res.render('admin/blog-categories/edit', {
      title: 'Edit Blog Category',
      category: category
    });
  });
});

/* PUT update blog category */
router.put('/:id', function(req, res, next) {
  models.BlogCategory.find(req.params.id).then(function(category) {
    if (!category) {
      return next();
    }

    page.updateAttributes({
      title: req.body.title,
      description: req.body.description || null,
      enabled: !!req.body.enabled
    }).then(function() {
      req.flash('success', 'The blog category has been saved!');
    }).catch(function(err) {
      req.flash('danger', err.errors[0].message);
    }).finally(function() {
      res.redirect('/admin/blog/categories/' + req.params.id + '/edit');
    });
  });
});

/* GET confirm blog category delete */
router.get('/:id/delete', function(req, res, next) {
  models.BlogCategory.find(req.params.id).then(function(category) {
    if (!category) {
      return next();
    }

    res.render('admin/blog-categories/delete', {
      title: 'Delete Blog Category',
      category: category
    });
  });
});

/* DELETE delete blog category */
router.delete('/:id', function(req, res, next) {
  models.BlogCategory.find(req.params.id).then(function(category) {
    if (!category) {
      return next();
    }

    category.destroy().then(function(result) {
      req.flash('success', 'The blog category has been deleted!');
      res.redirect('/admin/blog/categories');
    });
  });
});

module.exports = router;

