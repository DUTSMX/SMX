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

router.get('/checked',function (req,res) {
    api.getChecked(function(checked){
        console.log("checked:"+JSON.stringify(checked));
        res.render('checked',{checked:checked})
    })
});



router.post("/bohui",function (req,res) {
    var teacherId = req.query.teacherId;
    api.bohui(teacherId,function (rows) {
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

router.get('/video',function (req,res) {
    api.getVideo(function(video){
        console.log("video:"+JSON.stringify(video));
        res.render('video',{video:video})
    })
});

router.get('/videoDetails',function (req,res) {
    var videoId = req.query.videoId ;
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

router.get('/studentListEdit',function (req,res) {
    var studentId = req.query.studentId;
    api.getStudentListEdit(studentId,function (studentEdit) {
        console.log("studentEdit:"+JSON.stringify(studentEdit));
        res.render('studentListEdit',studentEdit)
    })
});

router.post("/studentListEdit",function (req,res) {
    var studentId = req.body.studentId;
    var registerDate =req.body.registerDate;
    var studentName=req.body.studentName;
    var studentAge = req.body.studentAge;
    var studentGrade = req.body.studentGrade;
    var studentSchool = req.body.studentSchool;
    var studentAddress = req.body.studentAddress;
    console.log( "studentId:"+studentId+"registerDate:"+registerDate+"studentName:"+studentName+"studentAge:"+studentAge+"studentGrade:"+studentGrade+"studentSchool:"+studentSchool+"studentAddress:"+studentAddress);
    api.studentListEdit(studentId,registerDate,studentName,studentAge,studentGrade,studentSchool,studentAddress,function (rows) {
        console.log("rows:"+JSON.stringify(rows))
        res.send(rows);
    })
});


router.get('/teacherListEdit',function (req,res) {
    var teacherId = req.query.teacherId;
    api.getTeacherListEdit(teacherId,function (teacherEdit) {
        console.log("teacherEdit:"+JSON.stringify(teacherEdit));
        res.render('teacherListEdit',teacherEdit)
    })
});

router.post("/teacherListEdit",function (req,res) {
    var teacherId = req.body.teacherId;
    var teacherCreateTime =req.body.teacherCreateTime;
    var teacherRegisterDate =req.body.teacherRegisterDate;
    var teacherName=req.body.teacherName;
    var teacherAge = req.body.teacherAge;
    var teacherSchool = req.body.teacherSchool;
    var teacherGoodCourse = req.body.teacherGoodCourse;
    var teacherSelfIntroduction = req.body.teacherSelfIntroduction;
    console.log( "teacherId:"+teacherId+"teacherCreateTime:"+teacherCreateTime+"teacherRegisterDate:"+teacherRegisterDate+"teacherName:"+teacherName+"teacherAge:"+teacherAge+"teacherSchool:"+teacherSchool+"teacherGoodCourse:"+teacherGoodCourse+"teacherSelfIntroduction:"+teacherSelfIntroduction);
    api.teacherListEdit(teacherId,teacherCreateTime,teacherRegisterDate,teacherName,teacherAge,teacherSchool,teacherGoodCourse,teacherSelfIntroduction,function (rows) {
        console.log("rows:"+JSON.stringify(rows))
        res.send(rows);
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
