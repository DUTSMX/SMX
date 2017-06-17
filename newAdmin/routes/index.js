var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/student',function (req,res,next) {
  res.render('student');
})
router.get('/admin',function (req,res,next) {
  res.render('admin');
})
router.get('/studentList',function (req,res,next) {
  res.render('studentList');
})
router.get('/studentDetail',function (req,res,next) {
  res.render('studentDetail');
})
module.exports = router;
