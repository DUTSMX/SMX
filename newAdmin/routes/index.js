var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/joinManagerReport',function (req,res,next) {
  res.render('joinManagerReport');
})
router.get('/joinManagerDetail',function (req,res,next) {
  res.render('joinManagerDetail');
})

router.get('/joinReceptionDetail',function (req,res,next) {
  res.render('joinReceptionDetail');
})
router.get('/joinReceptionStudentList',function (req,res,next) {
  res.render('joinReceptionStudentList');
})
router.get('/joinReceptionStudentDetail',function (req,res,next) {
  res.render('joinReceptionStudentDetail');
})
router.get('/joinReceptionTodayCourse',function (req,res,next) {
  res.render('joinReceptionTodayCourse');
})
router.get('/joinReceptionPrint',function (req,res,next) {
  res.render('joinReceptionPrint');
})
router.get('/joinReceptionCourseCalendar',function (req,res,next) {
  res.render('joinReceptionCourseCalendar');
})
router.get('/joinReceptionCourseManager',function (req,res,next) {
  res.render('joinReceptionCourseManager');
})

router.get('/studentCourse',function (req,res,next) {
  res.render('studentCourse');
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


router.get('/joinList',function (req,res,next) {
  res.render('joinList');
})
router.get('/createCourse',function (req,res,next) {
  res.render('createCourse');
})
module.exports = router;
