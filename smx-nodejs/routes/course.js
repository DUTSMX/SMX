var express = require('express');
var session = require('express-session')
var router = express.Router();
var api = require('../api/courseDBApi')
var pages = require('./pages');
var utils = require('../utils/utils');
var user = require('../api/userDBApi')


router.get('/course',function(req,res){
    var userId = req.session.userId;
    console.log("userId:"+userId)
    if(userId == null){
        res.redirect('../users/loginPage');
    }else{
        api.getCourse(userId,function(rows){
            console.log("rows:"+JSON.stringify(rows));
            res.render("course",rows);
        })
    }
})

router.get('/courseDetail',function(req,res){
    var courseId = req.query.courseId;
    var userId = req.session.userId;
    // console.log("courseId:"+courseId);
    api.getCourseDetail(userId,courseId,function (courseDetail) {
        console.log("courseDetial:"+JSON.stringify(courseDetail));
        res.render('courseDetail',courseDetail);
    })
});

router.get('/teacherDetail',function (req,res) {
    var teacherId = req.query.teacherId;
    api.getTeacherDetail(teacherId, function (teacherDetail) {
        res.render('teacherDetail',teacherDetail);
    })
})

router.get('/joinCourse',function (req,res) {
    var userId = req.session.userId;
    if(userId == null){
        res.redirect('../users/loginPage');
    }else{
        var courseId = req.query.courseId;
        console.log("courseId:"+courseId)
        api.joinCourse(userId,courseId,function (ret) {
            res.send(ret);
        })
    }
})

router.get('/studentList',function (req,res) {
    var courseId = req.query.courseId;
    api.getStudentList(courseId,function (ret) {
        console.log("ret:"+JSON.stringify(ret))
        res.render('studentList',ret);
    })
})

router.get('/courseList',function (req,res) {
    var teacherId = req.query.teacherId;
    api.getCourseList(teacherId,function (ret) {
        res.render('courseList',ret);
    })
})
router.get('/createCourse',function(req,res){
        console.log("userId:"+req.session.userId);

        var userId = req.session.userId;
        if(userId == null){
            res.redirect('../users/loginPage');
        }else{
            console.log("路由");
            var courseName = req.query.courseName;
            var courseDate = req.query.courseDate;
            var beginTime = req.query.beginTime;
            var finshTime = req.query.finshTime;
            var courseTime = req.query.courseTime;
            var objectOriented = req.query.objectOriented;
            var courseContent = req.query.courseContent;
            api.addCourse(userId,courseName,courseDate,beginTime,finshTime,courseTime,objectOriented,courseContent,function (rows) {
                res.send(rows);

            })
        }
    }
)
router.get('/getUserInfoById',function (req,res) {
    var userId = req.query.userId;
    user.getUserInfo(userId,function (rows) {
        res.render("personDetail",rows);
    })
})


/*
 * unuse

router.get('/search',function(req,res){
    var word = req.query.word;
    api.search(word,function(rows){
        res.write('<head><meta charset="utf-8"/></head>');
        res.write(JSON.stringify(rows));
    })
});


*/
module.exports = router;