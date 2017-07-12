/**
 * Created by zhangchong on 2017/7/2.
 */
var express = require('express');
var router = express.Router();
var course=require('../model/course');
var user=require(('../model/user'));
var moment=require("moment");
router.get('/studentCourse',function (req,res,next) {
    course.seriesTemplate.findAll().then(function(data){
        console.log(JSON.stringify(data))
        res.render("studentCourse",{myCourse:[],allCourse:data})
    })
    // course.courseSeries.findAll().then(function (data) {
    //     console.log("data:"+JSON.stringify(data));
    //     var date = moment(new Date()).format("YYYY-MM-DD");
    //     var userId=20;
    //     var sql="SELECT c.courseId, " +
    //         "a.userName, " +
    //         "c.courseName, " +
    //         "c.courseDate, " +
    //         "c.beginTime, " +
    //         "c.objectOriented, " +
    //         "c.courseContent," +
    //         "b.courseSeriesNumber,"+
    //          "c.courseDate,"+
    //          "c.courseRoom,"+
    //          "c.courseSeriesId,"+
    //         "c.courseSeriesCourseId "+
    //         "FROM course c JOIN account a ON a.userId = c.userId  JOIN joinCourse s on (c.courseSeriesId = s.courseSeriesId and c.courseSeriesCourseId=s.courseSeriesCourseId) JOIN courseSeries b on s.courseSeriesId=b.courseSeriesId "+
    //         "WHERE s.userId = "+userId;
    //     course.sequelize.query(sql,{ type: course.sequelize.QueryTypes.SELECT }).then(function (ret) {
    //         console.log("ret:"+JSON.stringify(ret));
    //         // course.courseSeries.findAll({where:{courseSeriesId:ret.courseSeriesId}}).then(
    //         //     function (ret1) {
    //         //         console.log("ret1:"+JSON.stringify(ret1));
    //         //     }
    //         // )
    //         res.render('studentCourse',{
    //             courseDetails:ret,courseSeries:data});
    //     });
    // });
});
router.post("/postHope",function (req,res) {
    console.log(JSON.stringify(req.body))
    course.seriesTemplate.findOne({'where':{templateId:req.body.templateId}}).then(function (data) {
        console.log("data:"+JSON.stringify(data))
        course.courseSeries.create({
            courseSeriesName:data.seriesName,
            courseSeriesSubject:data.subject,
            courseSeriesIntro:data.seriesIntro,
            courseSeriesGrade:data.grade,
            courseSeriesNumber:data.number,
            nowNumber:1,
            status:"0",
            courseSeriesTeacher:req.body.teacher,
            courseSeriesLevel:data.level,
            courseSeriesClassType:req.body.classType,
            shopId:req.body.classType,
            time:req.body.time,
            students:req.body.student
        }).then(function (data) {
            console.log("data:"+JSON.stringify(data))
        })
    })
    res.send("提交成功")
})
router.get('/studentCourseRecord',function (req,res,next) {
    res.render('studentCourseRecord');
})
router.get('/studentDetail',function (req,res,next) {
    res.render('studentDetail');
})
router.get('/studentCourseDetail',function (req,res,next) {
    // var courseSeriesId=req.query.courseSeriesId;
    // var studentName=[];
    // course.courseSeries.findOne({where:{courseSeriesId:courseSeriesId}}).then(function (ret) {
    //     console.log("ret:"+JSON.stringify(ret));
    //     ret.getJoinCourse().then(function (ret0) {
    //         console.log("ret0:"+JSON.stringify(ret0));
    //         var student=[];
    //         ret0.forEach(function (item) {
    //             if(student.indexOf(item.userId)==-1){
    //                 student.push(item.userId);
    //             }
    //         });
    //         console.log("student:"+JSON.stringify(student));
    //        student.forEach(function (item) {
    //             console.log("userId:"+item);
    //             user.findOne({where:{userId:item}}).then(function (student) {
    //                 console.log("student:"+JSON.stringify(student));
    //                 studentName.push({userName:student.userName});
    //             })
    //         });
    //             console.log("studentName:"+studentName);
    //             ret.getCourse().then(function (ret1) {
    //                 console.log("ret1:"+JSON.stringify(ret1));
    //                 res.render('studentCourseDetail',{
    //                     courseSeries:ret,
    //                     courseSeriesDetails:ret1
    //                 })
    //             })
    //     });
    // });

    var templateId=req.query.templateId;
    course.seriesTemplate.findOne({
        'where':{'templateId':templateId}
    }).then(function (ret) {
        console.log(JSON.stringify(ret))
        res.render('educationCourseDetail',{template:ret});
    });
});
module.exports=router;