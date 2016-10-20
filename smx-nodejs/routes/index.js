var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*GEt video*/
router.get('/video',function(req,res){
  res.render('Video',{});
});

/*GEt Question*/
router.get('/question',function(req,res){
  res.render('Question',{});
});

/*GEt Class*/
router.get('/class',function(req,res){
  res.render('Class',{});
});

/*GEt Person*/
router.get('/person',function(req,res){
  res.render('Person',{});
});
module.exports = router;
