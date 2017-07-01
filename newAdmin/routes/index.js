var express = require('express');
var router = express.Router();
var courseSeries=require('../model/course');

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
  courseSeries.findAll().then(function (data) {
    res.render('studentCourse',{data:data});
  })
})
router.get('/studentCourseRecord',function (req,res,next) {
  res.render('studentCourseRecord');
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
router.get('/teacherCourseRecord',function (req,res,next) {
  res.render('teacherCourseRecord')
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

router.get('/officeManagerReport',function (req,res,next) {
  res.render('officeManagerReport');
})
router.get('/officeManagerDetail',function (req,res,next) {
  res.render('officeManagerDetail');
})

router.get('/adminJoinList',function (req,res,next) {
  res.render('adminJoinList');
})
router.get('/adminJoinDetail',function (req,res,next) {
  res.render('adminJoinDetail');
})
router.get('/adminUserList',function (req,res,next) {
  res.render('adminUserList');
})
router.get('/adminUserDetail',function (req,res,next) {
  res.render('adminUserDetail');
})
router.get('/adminDetail',function (req,res,next) {
  res.render('adminDetail');
})

module.exports = router;
