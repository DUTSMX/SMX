var express = require('express');
var router = express.Router();
var course=require('../model/course');
var user=require(('../model/user'));
var series = require('../model/series')
router.post("/postHope",function (req,res) {
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
})
router.get('/joinReceptionCourseManager',function (req,res,next) {
    var sql = "select c.courseSeriesId,c.courseSeriesName,c.startDate,c.endDate,c.time,c.room, a.userName from courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId"
    course.sequelize.query(sql).then(function (data) {
        console.log("course:"+JSON.stringify(data[0]))
        res.render('joinReceptionCourseManager',{allCourse:data[0]});
    })
})
router.get('/joinReceptionCoursePost',function (req,res) {
    series.seriesTemplate.findAll().then(function(data) {
        var sql = "SELECT userId,userName from account where role = 1 order by userName"
        user.sequelize.query(sql).then(function(studentList){
            console.log("post:"+JSON.stringify({allCourse:data,student:studentList[0]}))
            res.render("joinReceptionCoursePost",{allCourse:data,student:studentList[0]})
        })
    })
})
router.get("/joinReceptionCourseDetail",function (req,res) {
    console.log("query:"+JSON.stringify(req.query))
    var sql = "SELECT c.courseSeriesName, c.courseSeriesNumber, c.courseSeriesIntro, c.room, a.userName as teacher, GROUP_CONCAT(ac.userName) as student "+
    "FROM courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId JOIN joinSeries j ON j.courseSeriesId = c.courseSeriesId JOIN account ac ON j.studentId = ac.userId "+
    "WHERE c.courseSeriesId = "+req.query.seriesId+" GROUP BY j.courseSeriesId"
    course.sequelize.query(sql).then(function (data) {
        course.course.findAll({'where':{courseSeriesId:req.query.seriesId}}).then(function (courseList) {
            console.log("courseDetail:"+JSON.stringify(data[0]))
            res.render("joinReceptionCourseDetail",{series:data[0][0],courseList:courseList})
        })
    })
})
router.get('/joinReceptionTodayCourse',function (req,res,next) {
    res.render('joinReceptionTodayCourse');
})
router.get('/joinReceptionPrint',function (req,res,next) {
    res.render('joinReceptionPrint');
})
router.get('/joinReceptionCourseCalendar',function (req,res,next) {
    res.render('joinReceptionCourseCalendar');
})
router.get('/joinReceptionStudentDetail',function (req,res,next) {
    res.render('joinReceptionStudentDetail');
})
router.get('/joinReceptionStudentList',function (req,res,next) {
    user.findAll({where:{role:0}}).then(function(ret){
        console.log(JSON.stringify(ret))
        res.render('joinReceptionStudentList',{student:ret});
    })
})
router.get('/joinReceptionDetail',function (req,res,next) {
    user.findOne({where:{userId:1}}).then(function(ret){
        console.log(JSON.stringify(ret))
        res.render('joinReceptionDetail',{info:ret});
    })
})
router.post("/postCourse",function(req,res){
    console.log("body:"+JSON.stringify(req.body))
    course.courseSeries.update({
        students:req.body.students,
        room:req.body.room,
        courseSeriesTeacher:req.body.teacher,
        courseSeriesClassType:req.body.classType,
        status:1
    },{'where':{courseSeriesId:req.body.id}}).then(function (data) {
        console.log("data:"+JSON.stringify(data))
        res.send("success")
    })
})
router.get("/joinReceptionCourseCheck",function (req,res) {
    var sql = "SELECT s.templateId,s.seriesName,COUNT(j.studentId) as studentNumber from seriesTemplate s JOIN joinSeries j ON s.templateId = j.templateId where j.process = 0 group by templateId";
    course.sequelize.query(sql).then(function (postCourse) {
        res.render("joinReceptionCourseCheck",{postCourse:postCourse[0]})
    })
})
router.get("/joinReceptionCourseCheckDetail",function (req,res) {
    console.log("req:"+JSON.stringify(req.query))
    series.seriesTemplate.findOne({'where':{templateId:req.query.templateId}}).then(function (template) {
        var sql = "select studentId,userName,hopeTeacher,hopeClassType,hopeTime,other from joinSeries j JOIN account a ON j.studentId = a.userId where process = 0 and templateId = "+req.query.templateId;
        course.sequelize.query(sql).then(function (postList) {
            var sql = "SELECT userId,userName from account where role = 2 order by userName"
            user.sequelize.query(sql).then(function(teacherList){
                console.log("checkDetail:"+JSON.stringify({template:template,postList:postList[0],teacher:teacherList[0]}))
                res.render("joinReceptionCourseCheckDetail",{template:template,postList:postList[0],teacher:teacherList[0]})
            })
        })
    })
})
router.get('/joinReceptionTemplateDetail',function (req,res,next) {
    var templateId=req.query.templateId;
    series.seriesTemplate.findOne({
        'where':{'templateId':templateId}
    }).then(function (ret) {
        console.log(JSON.stringify({template:ret,student:{status:true}}))
        res.render('joinReceptionTemplateDetail',{template:ret,student:{status:true}});
    });
});

router.post('/createCourse',function (req,res) {
    console.log("body:"+JSON.stringify(req.body))
    series.seriesTemplate.findOne({'where':{templateId:req.body.templateId}}).then(function (template) {
        series.courseSeries.create({
            courseSeriesName:template.seriesName,
            courseSeriesSubject:template.subject,
            courseSeriesIntro:template.seriesIntro,
            courseSeriesGrade:template.grade,
            courseSeriesNumber:template.number,
            courseSeriesCourseName:template.courseName,
            courseSeriesLeve:template.level,
            courseSeriesTeacher:req.body.teacherId,
            shopId:req.body.shopId,
            courseSeriesClassType:req.body.classType,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            time:req.body.time,
            room:req.body.room,
            students:JSON.stringify(req.body.studentId)
        }).then(function (courseSeries) {
            console.log("courseSeries:"+JSON.stringify(courseSeries))
            console.log("id:"+courseSeries.courseSeriesId)
            var courseList = JSON.parse(template.courseName)
            var startDate = new Date(req.body.startDate);
            var tempDate = startDate;
            var studentList = req.body.studentId
            for (var i = 0; i < studentList.length; i++) {
                series.joinSeries.update({
                    courseSeriesId: courseSeries.courseSeriesId,
                    process: 1
                }, {'where': {studentId: studentList[i]}})
            }
            for(var i=0;i<courseSeries.courseSeriesNumber;i++){
                course.course.create({
                    courseSeriesId:courseSeries.courseSeriesId,
                    userId:req.body.teacherId,
                    courseName:courseList[i],
                    courseDate:startDate.setDate(startDate.getDate()+1),
                    beginTime:req.body.time,
                    createDate:Date.now(),
                    courseRoom:req.body.room
                }).then(function (courseRet) {
                    var studentList = req.body.studentId
                    for (var i = 0; i < studentList.length; i++) {
                        course.joinCourse.create({
                            userId: studentList[i],
                            courseId: courseRet.courseId,
                            attend: 0
                        })
                    }
                })
            }
            res.send({status:true,desc:"创建成功"})
        })
    })


})
module.exports=router;

