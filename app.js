'use strict';

/* Requires */

// Third-party libraries.

var express = require('express');
var partials = require("express-partials");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Helper libraries.

var markdownHelper = require('./lib/markdown-helper');
var viewHelper = require('./lib/view-helper');

// Route hooks.

var beforeRoutes = require('./routes/before');
var afterRoutes = require('./routes/after');

// Routes.

var website = require('./routes/website');

/* Bootstrapping */

var app = express();

// View engine.

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Third-party middleware.

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(partials());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Helpers.

app.use(markdownHelper());
app.use(viewHelper());

// Routes.

beforeRoutes(app);
app.use('/', website);
afterRoutes(app);

/* Exports */

module.exports = app;

