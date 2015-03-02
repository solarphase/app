'use strict';

var express = require('express');
var router = express.Router();

router.use('/pages', require('./pages'));
router.use('/navigation', require('./navigation'));

module.exports = router;

