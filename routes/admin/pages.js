'use strict';

var express = require('express');
var router = express.Router();
var models = require('../../models');

/* GET list pages */
router.get('/', function(req, res, next) {
  models.Page.findAll({
    include: [models.NavigationItem]
  }).then(function(pages) {
    res.render('admin/pages/index', {
      title: 'Pages',
      pages: pages
    });
  });
});

/* GET page */
router.get('/:id', function(req, res, next) {
  models.Page.find(req.params.id).then(function(page) {
    if (!page) {
      return next();
    }

    res.render('admin/pages/view', {title: page.title, page:page});
  });
});

/* POST create page */
router.post('/', function(req, res, next) {
  models.Page.create({
    title: req.body.title,
    url: req.body.url,
    content: req.body.content || null,
    enabled: req.body.enabled || false
  }).then(function(page) {
    if (!page) {
      req.flash('danger', 'The page could not be created!');
      return res.redirect('/admin/pages/new');
    }

    req.flash('success', 'The page has been created!');
    res.redirect('/admin/pages/' + page.id + '/edit');
  });
});

/* GET new page */
router.get('/new', function(req, res, next) {
  res.render('admin/pages/edit', {
    title: 'New Page',
    page: models.Page.build({})
  });
});

/* GET edit page */
router.get('/:id/edit', function(req, res, next) {
  models.Page.find({
    where: { id: req.params.id }
  }).then(function(page) {
    if (!page) {
      return next();
    }

    res.render('admin/pages/edit', {
      title: 'Edit Page',
      page: page
    });
  });
});

/* PUT update page */
router.put('/:id', function(req, res, next) {
  models.Page.find(req.params.id).then(function(page) {
    if (!page) {
      return next();
    }

    page.updateAttributes({
      title: req.body.title,
      url: req.body.url,
      content: req.body.content || null,
      enabled: req.body.enabled || false
    }).then(function() {
      req.flash('success', 'The page has been saved!');
      res.redirect('/admin/pages/' + req.params.id + '/edit');
    });
  });
});

/* GET confirm navigation item delete */
router.get('/:id/delete', function(req, res, next) {
  models.Page.find(req.params.id).then(function(page) {
    if (!page) {
      return next();
    }

    res.render('admin/pages/delete', {title: 'Delete Page', page:page});
  });
});

/* DELETE delete page */
router.delete('/:id', function(req, res, next) {
  models.Page.find(req.params.id).then(function(page) {
    if (!page) {
      return next();
    }

    page.destroy().then(function(result) {
      req.flash('success', 'The page has been deleted!');
      res.redirect('/admin/pages');
    });
  });
});

module.exports = router;

