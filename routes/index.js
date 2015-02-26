'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Page.find({
    where: { role: 'index' }
  }).then(function(page) {
    if (page !== null) {
      res.view.set('linkedPage', page);
    } else {
      return next(new Error('No page with the role of index was found!'));
    }
    
    res.render('index');
  });
});

module.exports = router;

