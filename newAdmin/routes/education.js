/**
 * Created by zhangchong on 2017/6/28.
 */
var express = require('express');
var router = express.Router();
var course=require('../model/course');
var user = require("../model/user")
var moment = require("moment");
router.get('/educationCourse',function (req,res,next) {
    course.seriesTemplate.findAll().then(function (ret) {
        course.courseSeries.findAll({'where':{status:1}}).then(function (data) {
            console.log(JSON.stringify(data))
            res.render('educationCourse',{courseSeries:ret,post:data});
        })
    })
});
router.get('/educationCreateCourse',function (req,res,next) {
    res.render('educationCreateCourse');
});
router.get('/educationTemplate',function (req,res) {
    course.seriesTemplate.findAll().then(function (ret) {
            res.render('educationTemplate',{template:ret});
    })
})
router.post('/addCourseSeries',function (req,res) {
    var courseSeriesName=req.body.courseSeriesName;
    var courseSeriesSubject=req.body.courseSeriesSubject;
    var courseSeriesIntro=req.body.courseSeriesIntro;
    var courseSeriesGrade=req.body.courseSeriesGrade;
    var courseSeriesLevel=req.body.courseSeriesLevel;
    var courseSeriesNumber=req.body.courseSeriesNumber;
    var courseSeriesCourseName=req.body.courseSeriesCourseName;
    console.log("courseSeriesCourseName:"+JSON.stringify(courseSeriesCourseName));
    course.seriesTemplate.create({
        seriesName:courseSeriesName,
        seriesIntro:courseSeriesIntro,
        subject:courseSeriesSubject,
        grade:courseSeriesGrade,
        level:courseSeriesLevel,
        number:courseSeriesNumber,
        courseName:JSON.stringify(courseSeriesCourseName)
        }).then(function (data) {
        console.log("data:"+JSON.stringify(data));
        res.send("添加成功");
    }).catch(function (err) {
        console.log("err:"+err);
        res.send(err);
    })
});
router.get('/educationCourseDetail',function (req,res,next) {
    var templateId=req.query.templateId;
    course.seriesTemplate.findOne({
        'where':{'templateId':templateId}
    }).then(function (ret) {
        console.log(JSON.stringify(ret))
        res.render('educationCourseDetail',{template:ret});
    });
})
router.post('/seriesTemplateDelete',function (req,res) {
    var templateId = req.body.templateId;
    course.seriesTemplate.destroy({where:{templateId:templateId}}).then(function (ret) {
       console.log("ret:"+ret);
        res.send({
            status:true,
            desc:"删除成功"
        })
    });
})
router.get('/educationDetail',function (req,res,next) {
    res.render('educationDetail');
    })
router.post('/createTeacher', function (req, res, next) {
    console.log("body:"+JSON.stringify(req.body));
    user.create({
        phoneNumber:req.body.phoneNumber,
        userName:req.body.teacherName,
        userSchool:req.body.schoolName,
        userGrade:req.body.classInfo
    }).then(function (data) {

        console.log("data:"+JSON.stringify(data));
        res.send("添加成功")
    }).catch(function(err){

        console.log("err:"+JSON.stringify(err))

    });
    //res.end("235")
});
router.post('/createCourse',function (req,res) {
    course.courseSeries.findOne({'where':{courseSeriesId:req.body.seriesId}}).then(function (data) {
        console.log("data:"+JSON.stringify(data))
        console.log("courseSeriesCourseName:"+data.courseSeriesCourseName)
        var courseList = JSON.parse(data.courseSeriesCourseName)
        var studentList = JSON.parse(data.students)
        for(var i=0;i<courseList.length;i++){
            course.course.create({
                userId:data.courseSeriesTeacher,
                courseName:courseList[i],
                courseRoom:data.room
            }).then(function (data) {
                console.log(i+"　　:"+JSON.stringify(data))
                for(var i=0;i<studentList.length;i++){
                    course.joinCourse.create({
                        userId:studentList[i],
                        courseId:data.courseId,
                        attend:0
                    })
                }
            })
        }
        res.send("success")
    })
})
module.exports=router;
