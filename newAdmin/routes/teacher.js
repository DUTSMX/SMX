/**
 * Created by ASUS on 2017/7/11.
 */
var express = require('express');
var router = express.Router();
var course=require('../model/course');
var user=require(('../model/user'));
var moment=require("moment");
var teacher = require("../model/teacher")
router.get('/teacherCourse',function (req,res,next) {
    course.courseSeries.findAll().then(function (data) {
        console.log("data:" + JSON.stringify(data));
        var date = moment(new Date()).format("YYYY-MM-DD");
        var userId = 20;
        var sql = "SELECT c.courseId, " +
            "a.userName, " +
            "c.courseName, " +
            "c.courseDate, " +
            "c.beginTime, " +
            "c.objectOriented, " +
            "c.courseContent," +
            "b.courseSeriesNumber," +
            "c.courseDate," +
            "c.courseRoom," +
            "c.courseSeriesId," +
            "c.courseSeriesCourseId " +
            "FROM course c JOIN account a ON a.userId = c.userId  JOIN joinCourse s on (c.courseSeriesId = s.courseSeriesId and c.courseSeriesCourseId=s.courseSeriesCourseId) JOIN courseSeries b on s.courseSeriesId=b.courseSeriesId " +
            "WHERE s.userId = " + userId;
        course.sequelize.query(sql, {type: course.sequelize.QueryTypes.SELECT}).then(function (ret) {
            console.log("ret:" + JSON.stringify(ret));
            course.courseSeries.findAll({where:{courseSeriesId:ret.courseSeriesId}}).then(
                function (ret1) {
                    res.render('teacherCourse', {
                        courseDetails: [], courseSeries: []
                    });
                }
            )
        });
    })
})

router.get('/teacherCourseRecord',function (req,res,next) {
    res.render('teacherCourseRecord');
})
router.get('/teacherDetail',function (req,res,next) {
    teacher.findOne({'where':{teacherId:2}}).then(function (ret) {
        ret.getUser().then(function (ret1) {
            res.render('teacherDetail',{info:ret1,infos:ret});
        })
    })
})
router.post("/modifyInfo",function (req,res) {
    console.log(JSON.stringify(req.body));
    user.update({
        userName:req.body.teacherName,
        phoneNumber:req.body.phoneNumber,
        gender:req.body.gender,

        userHeadUrl : req.body.userHeadUrl,
        userFrontIdHeadUrl:req.body.userFrontIdHeadUrl,
        userBackIdHeadUrl:req.body.userBackIdHeadUrl

    }, {'where':{userId:2}}).then(
        teacher.update({

            studentCard :req.body.studentCard,
            teacherCard :req.body.teacherCard,

            college:req.body.college,
            teachClass:req.body.teachClass,
            class:req.body.Class,
            province:req.body.province,
            city:req.body.city,
            highSchool:req.body.highSchool,
            SciOrLiber:req.body.SciOrLiber,
            SumScore:req.SumScore,
            Chinese:req.body.Chinese,
            Math:req.body.Math,
            English:req.body.English,
            Physics:req.body.Physics,
            Chemistry:req.body.Chemistry,
            Biology:req.body.Biology,
            Politics:req.body.Politics,
            History:req.body.History,
            Geography:req.body.Geography

        },{'where':{userId:2}}).then(
            res.send("123")
        )
    )});
router.get('/teacherCourseDetail',function (req,res,next) {
    var courseSeriesId=req.query.courseSeriesId;
    course.courseSeries.findOne({where:{courseSeriesId:courseSeriesId}}).then(function (ret) {
        console.log("ret:"+JSON.stringify(ret));
        ret.getJoinCourse().then(function (ret0) {
            console.log("ret0:"+JSON.stringify(ret0));
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
});
router.get('/joinReceptionTeacherList',function (req,res) {

});

module.exports=router;