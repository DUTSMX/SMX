/**
 * Created by zhangchong on 2017/6/28.
 */
var express = require('express');
var router = express.Router();
var course=require('../model/course');
var moment = require("moment");
router.get('/',function (req,res) {
    course.courseSeries.findAll().then(function (ret) {
        console.log("ret:" + JSON.stringify(ret));
        res.render('educationCourse',{courseSeries:ret});
    });
});
router.get('/educationCourse',function (req,res,next) {
    //console.log("11111");
    course.seriesTemplate.findAll().then(function (ret) {
        console.log("ret:"+JSON.stringify(ret));
        res.render('educationCourse',{courseSeries:ret});
    })
});
router.get('/educationCreateCourse',function (req,res,next) {
    res.render('educationCreateCourse');
});
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
router.post('/courseSeriesDelete',function (req,res) {
    var courseSeriesId=req.body.courseSeriesId;
    course.courseSeries.destroy({where:{courseSeriesId:courseSeriesId}}).then(function (ret) {
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
module.exports=router;
