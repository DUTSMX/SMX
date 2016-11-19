var express = require('express');
var session = require('express-session')
var router = express.Router();
var api = require('../api/courseDBApi')
var pages = require('./pages');
var utils = require('../utils/utils');



router.get('/course',function(req,res){
    var userId = 1;
    if(userId == null){
        req.session.source="course/course";
        res.redirect(301,utils.getServer()+"users/login.ejs");
    }else{
        api.getCourse(userId,function(rows){
            console.log("rows:"+rows);
            res.render("course",{
                courseList:
                {
                    // rotation:[],
                    myCourse:rows,
                    allCourse:rows
                }
            });
        })
    }
})

router.get('/courseDetail',function(req,res){
    var courseId = req.query.courseId;
    console.log("courseId:"+courseId);
    api.getCourseDetail(courseId,function (courseDetail) {
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


/*
 * unuse
 */
router.get('/search',function(req,res){
    var word = req.query.word;
    api.search(word,function(rows){
        res.write('<head><meta charset="utf-8"/></head>');
        res.write(JSON.stringify(rows));
    })
});

router.get('/addCourse',function(req,res){
    console.log("userId:"+req.session.userId);
    var userId = req.session.userId;
    if(userId == null){
        req.session.source = "course/createCourse.ejs";
        res.redirect(301,utils.getServer()+"users/login.ejs");
    }else{
        var name = req.query.name;
        var time = req.query.time;
        var objectOriented = req.query.objectOriented;
        var content = req.query.content;
        api.addCourse(userId,name,time,objectOriented,content,function (rows) {
            console.log(rows);
            res.write('<head><meta charset="utf-8"/></head>');
            res.write("提交成功");
        })
    }
});

module.exports = router;