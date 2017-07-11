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
    course.courseSeries.findAll().then(function (ret) {
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
    var courseSeriesNumber=req.body.courseSeriesNumber;
    var courseSeriesCourseName=req.body.courseSeriesCourseName;
    console.log("courseSeriesCourseName:"+JSON.stringify(courseSeriesCourseName));
    course.courseSeries.create({
        courseSeriesName:courseSeriesName,
        courseSeriesSubject:courseSeriesSubject,
        courseSeriesIntro:courseSeriesIntro,
        courseSeriesGrade:courseSeriesGrade,
        courseSeriesNumber:courseSeriesNumber,
        //courseSeriesCourseName:courseSeriesCourseName
        }).then(function (data) {
        console.log(data);
        courseSeriesCourseName.forEach(function (item) {
            console.log("item:"+item);
            var date=new Date();
            console.log("date:"+date);
            console.log("courseSeriesCourseName.IndexOf(item):"+courseSeriesCourseName.indexOf(item));
            course.course.create({
                courseName:item,
                objectOriented:courseSeriesSubject,
                courseSeriesId:data.courseSeriesId,
                courseSeriesCourseId:courseSeriesCourseName.indexOf(item)+1,
                createDate:date
            })
        });
        res.send("添加成功");
    }).catch(function (err) {
        console.log(err);
        res.send(err);
    })
});
router.get('/educationCourseDetail',function (req,res,next) {
    var courseSeriesId=req.query.courseSeriesId;
    console.log("courseSeriesId:"+courseSeriesId);
    course.courseSeries.findOne({
        'where':{'courseSeriesId':courseSeriesId}
    }).then(function (ret) {
        console.log("ret:"+JSON.stringify(ret));
          ret.getCourse({
              'where':{'courseSeriesId':courseSeriesId}
          }).then(function (ret1) {
              console.log("ret1:"+JSON.stringify(ret1));
              res.render('educationCourseDetail',{courseSeries:ret,course:ret1});
          });
});
});
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
