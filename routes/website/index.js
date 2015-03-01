'use strict';

var express = require('express');
var router = express.Router();

require('./home')(router);
require('./custom')(router);

module.exports = router;

