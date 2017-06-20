var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/admin',function (req,res,next) {
  res.render('admin');
})
router.get('/joinManager',function (req,res,next) {
  res.render('joinManager');
})
router.get('/joinList',function (req,res,next) {
  res.render('joinList');
})
router.get('/joinDetail',function (req,res,next) {
  res.render('joinDetail');
})
router.get('/joinReception',function (req,res,next) {
  res.render('joinReception');
})
router.get('/joinReceptionStudentDetail',function (req,res,next) {
  res.render('joinReceptionStudentDetail');
})
router.get('/studentCourse',function (req,res,next) {
  res.render('studentCourse');
})
router.get('/studentList',function (req,res,next) {
  res.render('studentList');
})
router.get('/studentDetail',function (req,res,next) {
  res.render('studentDetail');
})
router.get('/studentCourseDetail',function (req,res,next) {
  res.render('studentCourseDetail')
})
router.get('/teacherCourse',function (req,res,next) {
  res.render('teacherCourse')
})
router.get('/teacherCourseDetail',function (req,res,next) {
  res.render('teacherCourseDetail')
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
