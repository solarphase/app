'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');
var navigationHelper = require('../lib/navigation-helper');

/* GET page by 'url' property */
router.get('*', function(req, res, next) {
  models.Page.find({
    where: {url: req.path},
    include: [models.NavigationItem]
  }).then(function(page) {
    if (!page) {
      return next();
    }

    res.view.set('linkedPage', page);
    if (!page.NavigationItem) {
      return res.render('pages/view');
    }

    res.view.get('active').push(page.NavigationItem.id);
    navigationHelper.traverseUp(page.NavigationItem, function(parent) {
      res.view.get('active').push(parent.id);
    }).then(function() {
      res.render('pages/view');
    });
  });
});

/* GET list pages */
router.get('/pages', function(req, res, next) {
  models.Page.findAll().then(function(pages) {
    res.view.get('linkedPage').title = 'Pages';
    res.render('pages/index', {pages: pages});
  });
});

/* POST create page */
router.post('/pages', function(req, res, next) {
  models.Page.create({
    title: req.body.title,
    url: req.body.url,
    content: req.body.content
  }).then(function(page) {
    if (!page) {
      req.flash('danger', 'The page could not be created!');
      return res.redirect('/pages/new');
    }

    req.flash('success', 'The page has been created!');
    res.redirect('/pages/' + page.id + '/edit');
  });
});

/* GET new page */
router.get('/pages/new', function(req, res, next) {
  res.view.get('linkedPage').title = 'New Page';
  res.render('pages/edit', {page:models.Page.build({})});
});

/* GET edit page */
router.get('/pages/:id/edit', function(req, res, next) {
  models.Page.find({
    where: { id: req.params.id }
  }).then(function(page) {
    if (!page) {
      return next();
    }

    res.view.get('linkedPage').title = 'Edit Page';
    res.render('pages/edit', {page: page});
  });
});

/* PUT update page */
router.put('/pages/:id', function(req, res, next) {
  models.Page.find(req.params.id).then(function(page) {
    if(!page) {
      return next();
    }

    page.updateAttributes({
      title: req.body.title,
      url: req.body.url,
      content: req.body.content
    }).then(function() {
      req.flash('success', 'The page has been saved!');
      res.redirect('/pages/' + req.params.id + '/edit');
    });
  });
});

/* DELETE delete page */
router.delete('/pages/:id', function(req, res, next) {
  models.Page.find(req.params.id).then(function(page) {
    if (!page) {
      return next();
    }

    page.destroy().then(function(result) {
      req.flash('success', 'The page has been deleted!');
      res.redirect('/pages');
    });
  });
});

module.exports = router;

