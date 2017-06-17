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
router.get('/joinList',function (req,res,next) {
  res.render('joinList');
})
router.get('/joinDetail',function (req,res,next) {
  res.render('joinDetail');
})
router.get('/studentList',function (req,res,next) {
  res.render('studentList');
})
router.get('/studentDetail',function (req,res,next) {
  res.render('studentDetail');
})
router.get('/teacherList',function (req,res,next) {
  res.render('teacherList');
})
router.get('/teacherDetail',function (req,res,next) {
  res.render('teacherDetail');
})
router.get('/courseList',function (req,res,next) {
  res.render('courseList');
})
router.get('/courseDetail',function (req,res,next) {
  res.render('courseDetail');
})
router.get('/createCourse',function (req,res,next) {
  res.render('createCourse');
})
module.exports = router;
