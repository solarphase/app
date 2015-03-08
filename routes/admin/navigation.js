'use strict';

var express = require('express');
var router = express.Router();
var models = require('../../models');

/* ALL fetch pages */
router.all('*', function(req, res, next) {
  models.Page.findAll({
    include: [models.NavigationItem]
  }).then(function(pages) {
    res.locals.pages = pages;
    next();
  });
});

/* GET list navigation items */
router.get('/', function(req, res, next) {
  models.NavigationItem.findAll({
    include: [
      { model: models.NavigationItem, as: 'Parent' },
      models.Page
    ]
  }).then(function(items) {
    res.render('admin/navigation/index', {
      title: 'Navigation',
      items: items
    });
  });
});

/* POST create navigation item */
router.post('/', function(req, res, next) {
  var data = {
    title: req.body.title,
    order: req.body.order || null,
    url: req.body.url || null,
    enabled: !!req.body.enabled,
    ParentId: req.body.ParentId || null,
    PageId: req.body.PageId || null
  };

  models.NavigationItem.create(data).then(function(item) {
    req.flash('success', 'The navigation item has been created!');
    res.redirect('/admin/navigation/' + item.id + '/edit');
  }).catch(function(err) {
    req.session.formData = data;
    req.flash('danger', err.errors[0].message);
    res.redirect('/admin/navigation/new');
  });
});

/* GET new navigation item */
router.get('/new', function(req, res, next) {
  var data = req.session.formData;
  delete req.session.formData;

  res.render('admin/navigation/edit', {
    title: 'New Navigation Item',
    item: models.NavigationItem.build(data)
  });
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

    res.render('admin/navigation/edit', {
      title: 'Edit Navigation Item',
      item: item
    });
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
      enabled: !!req.body.enabled,
      ParentId: req.body.ParentId || null,
      PageId: req.body.PageId || null
    }).then(function() {
      req.flash('success', 'The navigation item has been saved!');
    }).catch(function(err) {
      req.flash('danger', err.errors[0].message);
    }).finally(function() {
      res.redirect('/admin/navigation/' + req.params.id + '/edit');
    });
  });
});

/* GET confirm navigation item delete */
router.get('/:id/delete', function(req, res, next) {
  models.NavigationItem.find(req.params.id).then(function(item) {
    if (!item) {
      return next();
    }

    res.render('admin/navigation/delete', {
      title: 'Delete Navigation Item',
      item: item
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

