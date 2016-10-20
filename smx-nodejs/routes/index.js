var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render("../../Staticpage/views/Class");
  // var s = Math.random().toString();
  // res.write('<head><meta charset="utf-8"/></head>');
  // res.end(s+"  长度"+s.length);
  // res.render('index', { title: 'Express' });
});

module.exports = router;
