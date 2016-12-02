var express = require('express');
var course = require('../api/courseDBApi');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/main',function (req,res) {
  course.getCourse(1,function (ret) {
    console.log(JSON.stringify(ret))
    res.render('main',ret);
  })
})

/*
* unuse
*
router.get('/login',function(req,res){
  res.render('login',{});
});
 */
module.exports = router;
