var express = require('express');
var router = express.Router();
var api = require("../api/userApi")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addCourse',function(req,res){
        var courseId = req.body.courseId;
        var courseName = req.body.courseName;
        var teacherId = req.body.teacherId;
        var courseDate =req.body.courseDate;
        // (new Date(req.query.courseDate)).getTime();//将日期转化为时间戳
        var beginTime = req.body.beginTime;
        var finishTime = req.body.finishTime;
        var courseTime = req.body.courseTime;
        var objectOriented = req.body.objectOriented;
        var courseContent = req.body.courseContent;
        console.log("courseId:"+courseId+" courseName:"+courseName+" teacherId:"+teacherId+" courseDate:"+courseDate+" beginTime:"+beginTime+" finishTime:"+finishTime +
            " courseTime:"+courseTime+" objectOriented:"+objectOriented+" courseContent:"+courseContent)
        api.postAddCourse(courseId,courseName,teacherId,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent,function (rows) {
            res.send(rows);
        })
    });

router.get('/studentList',function (req,res) {
    api.getStudent(function(studentList){
        console.log("student:"+JSON.stringify(studentList));
        res.render('studentList',{studentList:studentList})
    })
});
router.get('/teacherList',function (req,res) {
    api.getTeacher(function(teacherList){
        console.log("teacher:"+JSON.stringify(teacherList));
        res.render('teacherList',{teacherList:teacherList})
    })
});

router.get('/checked',function (req,res) {
    api.getChecked(function(checked){
        console.log("checked:"+JSON.stringify(checked));
        res.render('checked',{checked:checked})
    })
});

router.get('/waitChecking',function (req,res) {
    api.getWaitChecking(function(waitChecking){
        console.log("waitChecking:"+JSON.stringify(waitChecking));
        res.render('waitChecking',{waitChecking:waitChecking})
    })
});

router.get('/suggestion',function (req,res) {
    api.getSuggestion(function(suggestion){
        console.log("suggestion:"+JSON.stringify(suggestion));
        res.render('suggestion',{suggestion:suggestion})
    })
});

router.get('/courseDetails',function (req,res) {
    var courseId = req.query.courseId;
    api.getCourseDetails(courseId,function(courseDetails){
        console.log("courseDetails:"+JSON.stringify(courseDetails));
        res.render('courseDetails',courseDetails)
    })
});

router.get('/videoDetails',function (req,res) {
    var videoId = req.query.videoId;
    api.getVideoDetails(videoId,function(videoDetails){
        console.log("videoDetails:"+JSON.stringify(videoDetails));
        res.render('videoDetails',videoDetails)
    })
});

router.get('/studentListDetails',function (req,res) {
    var studentId = req.query.studentId;
    api.getStudentDetails(studentId,function (studentListDetails) {
        // studentDetails={studentDetails:studentDetails};
        console.log("list:"+JSON.stringify(studentListDetails));
        res.render('studentListDetails',studentListDetails)
    })
});

router.get('/teacherListDetails',function (req,res) {
    var teacherId = req.query.teacherId;
    api.getTeacherDetails(teacherId,function (teacherDetails) {
        console.log("teacherDetails:"+JSON.stringify(teacherDetails));
        res.render('teacherListDetails',teacherDetails)
    })
});


module.exports = router;
