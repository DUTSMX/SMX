var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });

  // return res.render("../Staticpage/views/Class");
  // var s = Math.random().toString();
  // res.write('<head><meta charset="utf-8"/></head>');
  // res.end(s+"  长度"+s.length);
  // res.render('index', { title: 'Express' });
});

/*GEt video*/
router.get('/video',function(req,res){
  res.render('Video',{});
});

/* GEt VideoDetail*/
router.get('/videoDetail',function(req,res){
  res.render('../../Staticpage/views/VideoDetail',{});
});



/*GEt Question*/
router.get('/question',function(req,res){
  res.render('Question',{});
});
router.get('/login',function(req,res){
  res.render('login',{});
});

/*GEt Class*/
router.get('/course',function(req,res){
  res.render('course',{});
});


/*GEt Person*/
router.get('/person',function(req,res){
  res.render('Person',{});
});
module.exports = router;
