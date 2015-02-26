var express = require('express');
var router = express.Router();

var articles = [
  {
    title: "Some article.",
    published_at: new Date(),
    content: "This is some article content."
  },
  {
    title: "Some other article.",
    published_at: new Date(),
    content: "This is some article content."
  },
  {
    title: "Some weird article.",
    published_at: new Date(),
    content: "This is some article content."
  }
];

/* GET blog listing. */
router.get('/', function(req, res, next) {
  var page = {
    title: "Blog",
    activeId: "blog",
    content: ""
  };

  res.setViewGlobal("linkedPage", page);
  res.getViewGlobal("active").push("blog");

  var viewModel = {
    articles: articles
  };

  res.render("blog/index", viewModel);
});

module.exports = router;

