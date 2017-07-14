/**
 * Created by zhangchong on 2017/7/2.
 */
var express = require('express');
var router = express.Router();
var course=require('../model/course');
var user=require(('../model/user'));
var series = require("../model/series")
var moment=require("moment");
var student = require("../model/student" );
router.get('/studentCourse',function (req,res,next) {
    var sql = "SELECT j.joinSeriesId,s.templateId,s.seriesName,j.hopeClassType,j.hopeTeacher,j.hopeTime FROM seriesTemplate s JOIN joinSeries j ON s.templateId = j.templateId where studentId = 2"
    course.sequelize.query(sql).then(function (postCourse) {
        series.seriesTemplate.findAll().then(function(data){
            console.log("studentCourse:"+JSON.stringify({postCourse:postCourse[0],allCourse:data}))
            res.render("studentCourse",{postCourse:postCourse[0],allCourse:data})
        })
    })
});
router.post("/postHope",function (req,res) {
    // console.log(JSON.stringify(req.body))
    // series.seriesTemplate.findOne({'where':{templateId:req.body.templateId}}).then(function (template) {
        // console.log("template:"+JSON.stringify(template))
        // series.courseSeries.create({
        //     courseSeriesName:template.seriesName,
        //     courseSeriesSubject:template.subject,
        //     courseSeriesIntro:template.seriesIntro,
        //     courseSeriesGrade:template.grade,
        //     courseSeriesNumber:template.number,
        //     courseSeriesCourseName:template.courseName,
        //     courseSeriesLevel:template.level,
        //     nowNumber:1,
        //     status:"0",
        //     shopId:1,
        // }).then(function (courseSeries) {
        //     console.log("courseSeries:"+JSON.stringify(courseSeries))
        //     for(var i=0;i<req.body.student.length;i++){
        series.joinSeries.findAll({where:{templateId:req.body.templateId,studentId:req.body.studentId}}).then(function (joinList) {
            if(joinList.length == 0){
                series.joinSeries.create({
                    templateId:req.body.templateId,
                    studentId:req.body.studentId,
                    hopeTeacher:req.body.teacher,
                    hopeClassType:req.body.classType,
                    hopeTime:req.body.time,
                    other:req.body.other
                }).then(function () {
                    res.send({status:true,desc:"提交成功"});
                })
            }else{
                res.send({status:false,desc:"您已经报名该课程了"})
            }
        })

            // }
        // })
    // })
})
router.post("/deleteHope",function (req,res) {
    series.joinSeries.destroy({
        'where':{joinSeriesId:req.body.joinSeriesId}
    }).then(function () {
        res.send("删除成功")
    })
})
router.get('/studentCourseRecord',function (req,res,next) {
    series.courseSeries.findAll({'where':{status:2}}).then(function (data) {
        console.log("course:"+JSON.stringify(data))
        res.render('studentCourseRecord',{course:data});
    })
})
router.get('/studentDetail',function (req,res,next) {
    student.findOne({'where':{studentId:2}}).then(function (ret) {
        ret.getUser().then(function (ret1) {
            res.render('studentDetail',{info:ret1,infos:ret});
        })
    })
})
router.get('/studentTemplateDetail',function (req,res,next) {
    var templateId=req.query.templateId;
    series.seriesTemplate.findOne({
        'where':{'templateId':templateId}
    }).then(function (ret) {
        console.log(JSON.stringify({template:ret,student:{status:true}}))
        res.render('studentTemplateDetail',{template:ret,student:{status:true}});
    });
});
router.post("/changeInfo",function (req,res) {
    console.log(JSON.stringify(req.body))
    user.update({
        userName:req.body.teacherName,
        phoneNumber:req.body.phoneNumber,
        gender:req.body.gender,
        userAddress:req.body.userAddress,
        userGrade:req.body.userGrade,
    },{'where':{userId:2}}).then(function (data) {
            student.update({
                joinshop:req.body.join,
                school:req.body.school,
            },{'where':{userId:2}}).then(
                res.send("123")
            )
    })
})
router.get('/studentCourseDetail',function (req,res,next) {
    var courseSeriesId=req.query.courseSeriesId;
    var studentName=[];
    course.courseSeries.findOne({where:{courseSeriesId:courseSeriesId}}).then(function (ret) {
        console.log("ret:" + JSON.stringify(ret));
        ret.getJoinCourse().then(function (ret0) {
            console.log("ret0:" + JSON.stringify(ret0));
            var student = [];
            ret0.forEach(function (item) {
                if (student.indexOf(item.userId) == -1) {
                    student.push(item.userId);
                }
            });
            console.log("student:" + JSON.stringify(student));
            student.forEach(function (item) {
                console.log("userId:" + item);
                user.findOne({where: {userId: item}}).then(function (student) {
                    console.log("student:" + JSON.stringify(student));
                    studentName.push({userName: student.userName});
                })
            });
            var timer = setTimeout(function () {
                console.log("studentName:" + JSON.stringify(studentName));
                ret.getCourse().then(function (ret1) {
                    console.log("ret1:" + JSON.stringify(ret1));
                    res.render('studentCourseDetail', {
                        courseSeries: ret,
                        courseSeriesDetails: ret1,
                        student: studentName
                    })
                })
            }, 1000);
        });
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

//     var templateId=req.query.templateId;
//     course.seriesTemplate.findOne({
//         'where':{'templateId':templateId}
//     }).then(function (ret) {
//         console.log(JSON.stringify(ret))
//         res.render('educationCourseDetail',{template:ret});
// >>>>>>> 699ccafcc18bc2bb7461cff24481e9b82fe24849
//     });
    })
})

//router.get('/studentCourseDetail',function (req,res,next) {
    // var seriesId=req.query.seriesId;
    // series.courseSeries.findOne({
    //     'where':{'courseSeriesId':seriesId}
    // }).then(function (course) {
    //     // user.findOne({'where':{userId:course.courseSeriesTeacher}}).then(function (teacher) {
    //     //     course.courseSeriesTeacher = teacher.userName;
    //         var sql = "select userName from joinSeries j JOIN account a on j.studentId = a.userId where j.courseSeriesId = "+course.courseSeriesId;
    //         course.sequelize.query(sql).then(function (students) {
    //             var student = ""
    //             console.log("students:"+JSON.stringify(students))
    //             console.log("student:"+students[0].length)
    //             var firstFlag = true;
    //             for(var i=0;i<students[0].length;i++){
    //                 if(firstFlag){
    //                     firstFlag = false;
    //                     student += students[0][i].userName;
    //                 }else{
    //                     student = student+"，"+students[0][i].userName;
    //                 }
    //                 console.log("student:"+student)
    //             }
    //             course.students = student;
    //             console.log("course:"+JSON.stringify(course))
    //             res.render('detail-series',{courseSeries:course});
    //         })
    //     })
    //
    // });
module.exports=router;