/* Requires */

// Third-party libraries.

var express = require('express');
var partials = require("express-partials");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Models.

var models = require('./models');

// Helper libraries.

var markdownHelper = require('./lib/markdown-helper');
var viewHelper = require('./lib/view-helper');

// Routes.

var index = require('./routes/index');
var errorHandler = require("./routes/error");

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

app.use(function(req, res, next) {
  res.view.set("linkedPage", models.Page.build({
    title: "Undefined"
  }));

  next();
});

app.use('/', index);
errorHandler(app);

/* Exports */

module.exports = app;

