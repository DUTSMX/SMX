var express = require('express');
var session = require('express-session')
var router = express.Router();
var api = require('../api/courseDBApi')
var pages = require('./pages');
var utils = require('../utils/utils');
var user = require('../api/userDBApi')

/*
* 获取首页轮播图信息，我的课程信息和推荐课程信息
* req:
* res:{
*     courseList:
*       {
*       rotation:,
*       myCourse:[courseId,courseName,courseTime,teacherHeadUrl,teacherSchool,teacherGrade,teacherName],
*       allCourse:[courseId,courseName,courseTime,teacherHeadUrl,teacherSchool,teacherGrade,teacherName]
*       }
*     }
* */
router.get('/course',function(req,res){
    var userId = req.session.userId;
    api.getCourse(userId,function(rows){
        console.log("rows:"+JSON.stringify(rows));
        res.render("course",rows);
    })
})
/*
* 获取课程详情信息
* req:courseId
* res:{teacherId,courseId,teacherHeadUrl,teacherName,teacherSchool,teacherGrade,courseName,courseTime，objectOriented,courseContent,studentCount,join}
* */
router.get('/courseDetail',function(req,res){
    var courseId = req.query.courseId;
    var userId = req.session.userId;
    api.getCourseDetail(userId,courseId,function (courseDetail) {
        console.log("courseDetial:"+JSON.stringify(courseDetail));
        res.render('courseDetail',courseDetail);
    })
});
/*
 * 获取老师详情信息
 * req:teacherId
 * res:{teacherId,teacherName,teacherSchool,teacherGrade,goodCourse,selfIntroduction}
 * */
router.get('/teacherDetail',function (req,res) {
    var teacherId = req.query.teacherId;
    api.getTeacherDetail(teacherId, function (teacherDetail) {
        console.log("teacher:"+JSON.stringify(teacherDetail))
        res.render('teacherDetail',teacherDetail);
    })
})
/*
* 加入课程
* req:courseId
* res:{status,desc}
* */
router.get('/joinCourse',function (req,res) {
    var userId = req.session.userId;
    var courseId = req.query.courseId;
    console.log("courseId:"+courseId)
    api.joinCourse(userId,courseId,function (ret) {
        res.send(ret);
    })
})
/*
* 退出课程
* req:courseId
* res:{status,desc}
* */
router.get('/unJoinCourse',function (req,res) {
    console.log("unJoinCourse")
    var userId = req.session.userId;
    var courseId = req.query.courseId;
    api.unJoinCourse(userId,courseId,function (ret) {
        res.send(ret)
    })
})
/*
* 获得课程的学生列表
* req:courseId
* res:{userId,headUrl,userName}
* */
router.get('/studentList',function (req,res) {
    var courseId = req.query.courseId;
    api.getStudentList(courseId,function (ret) {
        console.log("ret:"+JSON.stringify(ret))
        res.render('studentList',ret);
    })
})
/*
* 获得老师的课程列表
* req:teacherId
* res:{[courseId,courseName,courseTime,teacherHeadUrl,teacherSchool,teacherGrade,teacherName]}
* */
router.get('/courseList',function (req,res) {
    var teacherId = req.query.teacherId;
    api.getCourseList(teacherId,function (courseList) {
        res.render('courseList',courseList);
    })
})
/*
* 创建课程
* req:{courseName,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent}
* res:{status,desc}
* */
router.post('/createCourse',function(req,res){
        var userId = req.session.userId;
        var courseName = req.body.courseName;
        var courseDate =req.body.courseDate;
            // (new Date(req.query.courseDate)).getTime();//将日期转化为时间戳
        var beginTime = req.body.beginTime;
        var finishTime = req.body.finishTime;
        var courseTime = req.body.courseTime;
        var objectOriented = req.body.objectOriented;
        var courseContent = req.body.courseContent;
        console.log("userId:"+userId+" courseName:"+courseName+" courseDate:"+courseDate+" beginTime:"+beginTime+" finishTime:"+finishTime +
        " courseTime:"+courseTime+" objectOriented:"+objectOriented+" courseContent:"+courseContent)
        api.addCourse(userId,courseName,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent,function (rows) {
            res.send(rows);
        })
    }
)
/*
* 获取个人的详细信息
* req:userId
*
* */
router.get('/getUserInfoById',function (req,res) {
    var userId = req.query.userId;
    user.getUserInfo(userId,function (rows) {
        console.log("rows:"+JSON.stringify(rows))
        rows.self=true;
        console.log("rows:"+JSON.stringify(rows))
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