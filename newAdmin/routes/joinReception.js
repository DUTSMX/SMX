var express = require('express');
var router = express.Router();
var course=require('../model/course');
var user=require(('../model/user'));

router.get('/joinReceptionCourseManager',function (req,res,next) {
    course.courseSeries.findAll({'where':{status:0}}).then(function (data) {
        console.log(JSON.stringify(data))
        res.render('joinReceptionCourseManager',{post:data});
    })
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
router.get('/joinReceptionStudentDetail',function (req,res,next) {
    res.render('joinReceptionStudentDetail');
})
router.get('/joinReceptionStudentList',function (req,res,next) {
    user.findAll({where:{role:0}}).then(function(ret){
        console.log(JSON.stringify(ret))
        res.render('joinReceptionStudentList',{student:ret});
    })
})
router.get('/joinReceptionDetail',function (req,res,next) {
    user.findOne({where:{userId:1}}).then(function(ret){
        console.log(JSON.stringify(ret))
        res.render('joinReceptionDetail',{info:ret});
    })
})
router.post("/postCourse",function(req,res){
    console.log("body:"+JSON.stringify(req.body))
    course.courseSeries.update({
        students:req.body.students,
        room:req.body.room,
        courseSeriesTeacher:req.body.teacher,
        courseSeriesClassType:req.body.classType,
        status:1
    },{'where':{courseSeriesId:req.body.id}}).then(function (data) {
        console.log("data:"+JSON.stringify(data))
        res.send("success")
    })
})
module.exports=router;

