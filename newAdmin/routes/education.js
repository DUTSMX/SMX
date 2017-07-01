/**
 * Created by zhangchong on 2017/6/28.
 */
var express = require('express');
var router = express.Router();
var courseSeries=require('../model/course');
router.get('/',function (req,res) {
    courseSeries.findAll().then(function (ret) {
        console.log("ret:" + JSON.stringify(ret));
        res.render('educationCourse',{courseSeries:ret});
    });
})
router.get('/educationCourse',function (req,res,next) {
    //console.log("11111");
    courseSeries.findAll().then(function (ret) {
        console.log("ret:"+JSON.stringify(ret));
        res.render('educationCourse',{courseSeries:ret});
    })
})
router.get('/educationCreateCourse',function (req,res,next) {
    res.render('educationCreateCourse');
})
router.post('/addCourseSeries',function (req,res) {
    var courseSeriesName=req.body.courseSeriesName;
    var courseSeriesSubject=req.body.courseSeriesSubject;
    var courseSeriesIntro=req.body.courseSeriesIntro;
    var courseSeriesGrade=req.body.courseSeriesGrade;
    var courseSeriesNumber=req.body.courseSeriesNumber;
    var courseSeriesCourseName=req.body.courseSeriesCourseName;
    courseSeries.create({
        courseSeriesName:courseSeriesName,
        courseSeriesSubject:courseSeriesSubject,
        courseSeriesIntro:courseSeriesIntro,
        courseSeriesGrade:courseSeriesGrade,
        courseSeriesNumber:courseSeriesNumber,
        courseSeriesCourseName:courseSeriesCourseName
        }).then(function (data) {
        console.log(data);
        res.send("添加成功");
    }).catch(function (err) {
        console.log(err);
        res.send(err);
    })
})
router.get('/educationCourseDetail',function (req,res,next) {
    var courseSeriesId=req.query.courseSeriesId;
    console.log("courseSeriesId:"+courseSeriesId);
    courseSeries.findOne({'where':{'courseSeriesId':courseSeriesId}}).then(function (ret) {
        console.log("ret:"+JSON.stringify(ret));
        res.render('educationCourseDetail',{courseSeries:ret});
});
router.post('/courseSeriesDelete',function (req,res) {
    var courseSeriesId=req.body.courseSeriesId;
    courseSeries.destroy({where:{courseSeriesId:courseSeriesId}}).then(function (ret) {
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
})
module.exports=router;