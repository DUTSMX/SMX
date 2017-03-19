var express = require('express');
var router = express.Router();
var api = require("../api/userApi")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
    api.getStudentDetails(studentId,function (studentDetails) {
        // studentDetails={studentDetails:studentDetails};
        console.log("studentDetails:"+JSON.stringify(studentDetails));
        res.render('studentListDetails',studentDetails)
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
