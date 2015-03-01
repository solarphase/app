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
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash');

// Helper libraries.

var markdownHelper = require('./lib/markdown-helper');
var viewHelper = require('./lib/view-helper');

// Route hooks.

var beforeRoutes = require('./routes/before');
var afterRoutes = require('./routes/after');

// Routes.

var pages = require('./routes/pages');

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

app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({ secret: 'TODO', maxAge: null }));
app.use(flash());

// Helpers.

app.use(markdownHelper());
app.use(viewHelper());

// Routes.

beforeRoutes(app);
app.use('/', pages);
afterRoutes(app);

/* Exports */

module.exports = app;

