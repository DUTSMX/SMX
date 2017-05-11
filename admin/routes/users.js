var express = require('express');
var router = express.Router();
var api = require("../api/userApi")

/* GET users listing. */
router.get('/syllabus',function(req,res){
    // var data = {'data':[{'teacher':'齐书强','course':[
    //     {'time':'7:00-8:30','grade':'高三','course':'数学','student':[{'id':1,'name':'时'}]},
    //     {'time':'8:40-10:10','grade':'高三','course':'数学','student':[{'id':1,'name':'广'}]},
    //     {'time':'10:20-11:50','grade':'高三','course':'数学','student':[{'id':1,'name':'毅'}]}
    // ]},
    //     {'teacher':'齐','course':[
    //         {'time':'7:00-8:30','grade':'高三','course':'数学','student':[{'id':1,'name':'时'}]},
    //         {'time':'8:40-10:10','grade':'高三','course':'数学','student':[{'id':1,'name':'广'}]},
    //         {'time':'10:20-11:50','grade':'高三','course':'数学','student':[{'id':1,'name':'毅'}]}
    //     ]}]};
    // console.log("data:"+JSON.stringify(data))
    // res.render('syllabus',data);
    api.getSyllabus(function(data){
        console.log("syllabus:"+JSON.stringify(data));
        res.render('syllabus',data)
    })
});

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
        res.render('checked',checked)
    })
});
router.post('/checked',function (req,res) {
    var teacherId = req.body.teacherId;
    console.log( "teacherId:"+teacherId)
    api.checked(teacherId,function(rows){
        rows.teacherId=teacherId;
        console.log("rows:"+JSON.stringify(rows));
        res.send(rows);
    })
})

router.get('/waitChecking',function (req,res) {
    api.getWaitChecking(function(waitChecking){
        console.log("waitChecking:"+JSON.stringify(waitChecking));
        res.render('waitChecking',waitChecking)
    })
});
router.post('/waitChecking',function(req,res){
    var teacherId = req.body.teacherId;
    var type = req.body.type;
    console.log( "teacherId:"+teacherId);
    if(type==2){
        api.agree(teacherId,function(rows){
            rows.teacherId=teacherId;
            console.log("rows:"+JSON.stringify(rows));
            res.send(rows);
        });
    } else{
        api.disagree(teacherId,function(rows){
            rows.teacherId=teacherId;
            console.log("rows:"+JSON.stringify(rows));
            res.send(rows);
        });
    }
});

router.get('/suggestion',function (req,res) {
    api.getSuggestion(function(suggestion){
        console.log("suggestion:"+JSON.stringify(suggestion));
        res.render('suggestion',{suggestion:suggestion})
    })
});

router.get('/suggestionReply',function(req,res){
    var feedbackId = req.query.feedbackId;
    api.getSuggestionReply(feedbackId,function(suggestionReply){
        suggestionReply.feedbackId = feedbackId;
        console.log("suggestionReply:"+JSON.stringify(suggestionReply));
        res.render('suggestionReply',suggestionReply)
    })
});
router.post('/suggestionReply',function (req,res) {
    var feedbackId = req.body.feedbackId;
    var reply = req.body.reply;
    console.log("feedbackId:"+feedbackId+ "reply:"+reply)
    api.suggestionReply(feedbackId,reply,function (rows) {
        console.log("rows:"+JSON.stringify(rows))
        res.send(rows);
    })
});

router.get('/courseDetails',function (req,res) {
    var courseId = req.query.courseId;
    api.getCourseDetails(courseId,function(courseDetails){
        console.log("courseDetails:"+JSON.stringify(courseDetails));
        res.render('courseDetails',courseDetails)
    })
});

router.get('/courseDetailsEdit',function (req,res) {
    var courseId = req.query.courseId;
    api.getCourseDetailsEdit(courseId,function (courseEdit) {
        courseEdit.courseId = courseId;
        console.log("courseDetailsEdit:"+JSON.stringify(courseEdit));
        res.render('courseDetailsEdit',courseEdit)
    })
});
router.post("/courseDetailsEdit",function (req,res) {
    var courseId = req.body.courseId;
    var courseName = req.body.courseName;
    var courseDate =req.body.courseDate;
    var beginTime = req.body.beginTime;
    var finishTime = req.body.finishTime;
    var courseTime = req.body.courseTime;
    var objectOriented = req.body.objectOriented;
    var courseContent = req.body.courseContent;
    console.log("courseId:"+courseId+" courseName:"+courseName+" courseDate:"+courseDate+" beginTime:"+beginTime+" finishTime:"+finishTime +
        " courseTime:"+courseTime+" objectOriented:"+objectOriented+" courseContent:"+courseContent)
    api.courseDetailsEdit(courseId,courseName,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent,function (rows) {
        console.log("rows:"+JSON.stringify(rows))
        res.send(rows);
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

/*router.get('/courseDetailsEdit',function (req,res) {
    var courseId = req.query.courseId;
    api.getCourseDetailsEdit(courseId,function (courseEdit) {
        courseEdit.courseId = courseId;
        console.log("courseDetailsEdit:"+JSON.stringify(courseEdit));
        res.render('courseDetailsEdit',courseEdit)
    })
});
router.post("/courseDetailsEdit",function (req,res) {
    var courseId = req.body.courseId;
    var courseName = req.body.courseName;
    var courseDate =req.body.courseDate;
    var beginTime = req.body.beginTime;
    var finishTime = req.body.finishTime;
    var courseTime = req.body.courseTime;
    var objectOriented = req.body.objectOriented;
    var courseContent = req.body.courseContent;
    console.log("courseId:"+courseId+" courseName:"+courseName+" courseDate:"+courseDate+" beginTime:"+beginTime+" finishTime:"+finishTime +
        " courseTime:"+courseTime+" objectOriented:"+objectOriented+" courseContent:"+courseContent)
    api.courseDetailsEdit(courseId,courseName,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent,function (rows) {
        console.log("rows:"+JSON.stringify(rows))
        res.send(rows);
    })
});*/
router.get('/videoDetailsEdit',function (req,res) {
    var videoId = req.query.videoId;
    api.getVideoDetailsEdit(videoId,function (videoEdit) {
        videoEdit.videoId = videoId;
        console.log("videoDetailsEdit:"+JSON.stringify(videoEdit));
        res.render('videoDetailsEdit',videoEdit)
    })
});
router.post("/videoDetailsEdit",function (req,res) {
    var videoId = req.body.videoId;
    var videoName = req.body.videoName;
    var authorId = req.body.authorId;
    var videoTime = req.body.videoTime;
    var videoAbstract = req.body.videoAbstract;
    var videoUrl = req.body.videoUrl;
    console.log("videoId:"+videoId+"videoName:"+videoName+"authorId:"+authorId+" videoTime:"+videoTime+" videoAbstract:"+videoAbstract +" videoUrl:"+videoUrl);
    api.videoDetailsEdit(videoId,videoName,authorId,videoTime,videoAbstract,videoUrl,function (rows) {
        console.log("rows:"+JSON.stringify(rows))
        res.send(rows);
    })
});

router.get('/studentDetails',function (req,res) {
    var studentId = req.query.studentId;
    api.getStudentDetails(studentId,function (studentListDetails) {
        // studentDetails={studentDetails:studentDetails};
        console.log("list:"+JSON.stringify(studentListDetails));
        res.render('studentListDetails',studentListDetails)
    })
});

router.get('/studentListEdit',function (req,res) {
    console.log("student:"+studentId)
    var studentId = req.query.studentId;
    api.getStudentListEdit(studentId,function (studentEdit) {
        studentEdit.studentId = studentId;
        console.log("studentEdit:"+JSON.stringify(studentEdit));
        res.render('studentListEdit',studentEdit)
    })
});

router.post("/studentListEdit",function (req,res) {
    var studentId = req.body.studentId;
    var phoneNumber =req.body.phoneNumber;
    var studentName=req.body.studentName;
    var studentAge = req.body.studentAge;
    var studentGrade = req.body.studentGrade;
    var studentSchool = req.body.studentSchool;
    var studentAddress = req.body.studentAddress;
    console.log( "studentId:"+studentId+"phoneNumber:"+phoneNumber+"studentName:"+studentName+"studentAge:"+studentAge+"studentGrade:"+studentGrade+"studentSchool:"+studentSchool+"studentAddress:"+studentAddress);
    api.studentListEdit(studentId,phoneNumber,studentName,studentAge,studentGrade,studentSchool,studentAddress,function (rows) {
        console.log("rows:"+JSON.stringify(rows))
        res.send(rows);
    })
});


router.get('/teacherListEdit',function (req,res) {
    var teacherId = req.query.teacherId;
    api.getTeacherListEdit(teacherId,function (teacherEdit) {
        teacherEdit.teacherId = teacherId;
        console.log("teacherEdit:"+JSON.stringify(teacherEdit));
        res.render('teacherListEdit',teacherEdit)
    })
});

router.post("/teacherListEdit",function (req,res) {
    var teacherId = req.body.teacherId;
    var teacherName=req.body.teacherName;
    var phoneNumber = req.body.phoneNumber;
    var teacherAge = req.body.teacherAge;
    var teacherSchool = req.body.teacherSchool;
    var teacherGoodCourse = req.body.teacherGoodCourse;
    var teacherSelfIntroduction = req.body.teacherSelfIntroduction;
    console.log("phoneNumber"+phoneNumber)
    api.teacherListEdit(teacherId,teacherName,phoneNumber,teacherAge,teacherSchool,teacherGoodCourse,teacherSelfIntroduction,function (rows) {
        console.log("rows:"+JSON.stringify(rows))
        res.send(rows);
    })
});

router.get('/teacherDetails',function (req,res) {
    var teacherId = req.query.teacherId;
    api.getTeacherDetails(teacherId,function (teacherDetails) {
        console.log("teacherDetails:"+JSON.stringify(teacherDetails));
        res.render('teacherListDetails',teacherDetails)
    })
});
router.get("/teststudentlist",function (req,res) {
    api.getStudent(function(studentList) {
        console.log("student:" + JSON.stringify(studentList));
        res.render('teststudentlist', {studentList: studentList})
    });
});
router.get("/navigation",function (req,res) {
    console.log("nag")
    var path = require('path');
    res.sendFile(path.resolve(__dirname,'..')+"/navigation.html")
})

module.exports = router;
