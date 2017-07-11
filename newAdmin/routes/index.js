var express = require('express');
var router = express.Router();
var course=require('../model/course');
var user =require("../model/user")

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
  user.findOne({where:{userId:1}}).then(function(ret){
    console.log(JSON.stringify(ret))
    res.render('joinReceptionDetail',{info:ret});
  })
})
router.get('/joinReceptionStudentList',function (req,res,next) {
  user.findAll({where:{role:0}}).then(function(ret){
    console.log(JSON.stringify(ret))
    res.render('joinReceptionStudentList',{student:ret});
  })
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
