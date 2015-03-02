'use strict';

var express = require('express');
var router = express.Router();
var models = require('../../models');

router.all('*', function(req, res, next) {
  models.Page.findAll({
    include: [models.NavigationItem]
  }).then(function(pages) {
    res.locals.pages = pages;
    next();
  });
});

router.all('*', function(req, res, next) {
  models.NavigationItem.findAll({
    include: [
      { model: models.NavigationItem, as: 'Parent' },
      models.Page
    ]
  }).then(function(items) {
    res.locals.navigationItems = items;
    next();
  });
});

/* GET list navigation items */
router.get('/', function(req, res, next) {
  res.render('admin/navigation/index', {title: 'Navigation', items:res.locals.navigationItems});
});

/* POST create navigation item */
router.post('/', function(req, res, next) {
  models.NavigationItem.create({
    title: req.body.title,
    order: req.body.order || null,
    url: req.body.url || null,
    ParentId: req.body.parentId || null,
    PageId: req.body.pageId || null
  }).then(function(item) {
    if (!item) {
      req.flash('danger', 'The navigation item could not be created!');
      return res.redirect('/admin/navigation');
    }

    req.flash('success', 'The navigation item has been created!');
    res.redirect('/admin/navigation/' + item.id + '/edit');
  });
});

/* GET new navigation item */
router.get('/new', function(req, res, next) {
  res.render('admin/navigation/edit', {title: 'New Navigation Item', item:models.NavigationItem.build({})});
});

/* GET edit navigation item */
router.get('/:id/edit', function(req, res, next) {
  models.NavigationItem.find({
    where: { id: req.params.id },
    include: [
      { model: models.NavigationItem, as: 'Parent' },
      { model: models.NavigationItem, as: 'Children' },
      models.Page
    ]
  }).then(function(item) {
    if (!item) {
      return next();
    }

    res.render('admin/navigation/edit', {title: 'Edit Navigation Item', item:item});
  });
});

/* PUT update navigation item */
router.put('/:id', function(req, res, next) {
  models.NavigationItem.find(req.params.id).then(function(item) {
    if (!item) {
      return next();
    }

    item.updateAttributes({
      title: req.body.title,
      order: req.body.order || null,
      url: req.body.url || null,
      ParentId: req.body.parentId || null,
      PageId: req.body.pageId || null
    }).then(function() {
      req.flash('success', 'The navigation item has been saved!');
      res.redirect('/admin/navigation/' + req.params.id + '/edit');
    });
  });
});

/* DELETE delete navigation item */
router.delete('/:id', function(req, res, next) {
  models.NavigationItem.find(req.params.id).then(function(item) {
    if (!item) {
      return next();
    }

    item.destroy().then(function() {
      req.flash('success', 'The navigation item has been deleted!');
      res.redirect('/admin/navigation');
    });
  });
});

module.exports = router;
