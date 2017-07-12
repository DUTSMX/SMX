/**
 * Created by ASUS on 2017/7/11.
 */
var express = require('express');
var router = express.Router();
var course=require('../model/course');
var user=require(('../model/user'));
var moment=require("moment");
router.get('/teacherCourse',function (req,res,next) {

    course.courseSeries.findAll().then(function (data) {
        console.log("data:"+JSON.stringify(data));
        var date = moment(new Date()).format("YYYY-MM-DD");
        var userId=20;
        var sql="SELECT c.courseId, " +
            "a.userName, " +
            "c.courseName, " +
            "c.courseDate, " +
            "c.beginTime, " +
            "c.objectOriented, " +
            "c.courseContent," +
            "b.courseSeriesNumber,"+
            "c.courseDate,"+
            "c.courseRoom,"+
            "c.courseSeriesId,"+
            "c.courseSeriesCourseId "+
            "FROM course c JOIN account a ON a.userId = c.userId  JOIN joinCourse s on (c.courseSeriesId = s.courseSeriesId and c.courseSeriesCourseId=s.courseSeriesCourseId) JOIN courseSeries b on s.courseSeriesId=b.courseSeriesId "+
            "WHERE s.userId = "+userId;
        course.sequelize.query(sql,{ type: course.sequelize.QueryTypes.SELECT }).then(function (ret) {
            console.log("ret:"+JSON.stringify(ret));
            // course.courseSeries.findAll({where:{courseSeriesId:ret.courseSeriesId}}).then(
            //     function (ret1) {
            //         console.log("ret1:"+JSON.stringify(ret1));
            //     }
            // )
            res.render('teacherCourse',{
                courseDetails:ret,courseSeries:data});
        });
    });
});

router.get('/teacherCourseRecord',function (req,res,next) {
    res.render('teacherCourseRecord');
})
router.get('/teacherDetail',function(req,res,next){
    res.render('teacherDetail');
})
router.get('/teacherCourseDetail',function (req,res,next) {
    var courseSeriesId=req.query.courseSeriesId;
    course.courseSeries.findOne({where:{courseSeriesId:courseSeriesId}}).then(function (ret) {
        console.log("ret:"+JSON.stringify(ret));
        ret.getJoinCourse().then(function (ret0) {
            console.log("ret0:"+JSON.stringify(ret0));
            var teacher=[];
            ret0.forEach(function (item) {
                if(teacher.indexOf(item.userId)==-1){
                    teacher.push(item.userId);
                }
            });
            console.log("teacher:"+teacher);
            var teacherName=[];
            teacher.forEach(function (item) {
                user.findOne({attributes:userName,userId:item}).then(function (userName) {
                    console.log("userName:"+userName);
                    teacherName.push({userName:userName});
                })
            })
        });
        ret.getCourse().then(function (ret1) {
            console.log("ret1:"+JSON.stringify(ret1));
            res.render('teacherCourseDetail',{
                courseSeries:ret,
                courseSeriesDetails:ret1
            })
        })
    });
})
router.get('/joinReceptionTeacherList',function (req,res) {

})

module.exports=router;