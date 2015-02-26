var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Page.find({
    where: { role: "index" }
  }).then(function(page) {
    res.render('index', { linkedPage: page });
  });
});

module.exports = router;

