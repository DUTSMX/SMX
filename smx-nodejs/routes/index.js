var express = require('express');
var course = require('../api/courseDBApi');
var router = express.Router();
var pages = require('./pages')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/MP_verify_sEUETJmOEogP71d6.txt',function(req,res){
	var fs = require('fs');
	fs.readFile(pages.getWXverify(),'utf-8',function(err,data){
		if(err){
			console.log(err)
		}else{
			console.log(data)
			res.send(data)
		}
	})
})
router.get('/main',function (req,res) {
  course.getCourse(1,function (ret) {
    console.log(JSON.stringify(ret))
    res.render('main',ret);
  })
})

router.get('/login',function(req,res){
  res.render('login',{});
});
module.exports = router;
