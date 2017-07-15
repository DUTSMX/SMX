var express = require('express');
var router = express.Router();
var course=require('../model/course');
var user=require(('../model/user'));
var series = require('../model/series')
var user=require(('../model/user'))
var joinreceptionshop=require('../model/joinreceptionshop')
var joinreceptionmanager=require('../model/joinreceptionmanager');
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
    var date=new Date();
    date=date.toLocaleDateString();
    var data = {data:[]};
    var courseTime = ["7:00-8:30","8:40-10:10","10:20-11:50","13:30-15:00","15:10-16:40","16:50-18:20"];
    var courseRoomList = ["教室一","教室二","教室三","教室四","教室五"];
   // data.courseTime = courseTime;
    courseRoomList.forEach(function (courseRoom) {
        console.log("courseRoom:"+courseRoom);
        var temp= {'courseRoom':courseRoom,'course':[]};
        courseTime.forEach(function (courseTime) {
            console.log("courseTime:"+courseTime);
            temp.course.push({'courseTime':courseTime,'courseTeacher':"",'grade':"",'courseName':"",'student':""})
        });
        data.data.push(temp);
    });
    console.log("data:"+JSON.stringify(data));
    var sql="SELECT a.userName as studentName,"+
            "t.teacherName,"+
            "e.courseTime,"+
            "e.courseName,"+
            "e.courseRoom,"+
            "e.grade "+
            "FROM elective e JOIN courseTeacher t ON e.teacherId=t.teacherId JOIN account a ON e.studentId=a.userId "+
            "WHERE e.courseDate ='"+date+"'";
    //     console.log("date:"+date);
    //     course.course.findAll({'where':{courseDate:date}}).then(function (rows) {
    //         console.log("rows:"+JSON.stringify(rows));
    //         rows.forEach(function (rows) {
    //             user.findOne({where:{userId:rows.userId},attributes:['userName']}).then(function (teacher) {
    //                 console.log("teacher:"+JSON.stringify(teacher));
    //             })
    //             course.joinCourse.findAll({where:{courseId:rows.courseId}}).then(function (ret) {
    //                 // console.log("ret:"+JSON.stringify(ret));
    //                 ret.forEach(function (ret) {
    //                     user.findOne({where:{userId:ret.userId},attributes:['userName']}).then(function (ret1) {
    //                         console.log("ret1:"+JSON.stringify(ret1.userName));
    //                         rows.userName=ret1.userName;
    //                         // console.lo0g("ret0:"+JSON.stringify(rows[0].userName));
    //                         // console.log(JSON.stringify(rows[0]))
    //                     })
    //                 })
    //             })
    //         })
    //     });

    course.sequelize.query(sql,{ type: course.sequelize.QueryTypes.SELECT }).then(function (rows){
        var x=0;
         rows.forEach(function (item) {
            var courseRoomFlag = false;
            //teacherList.forEach()
            data.data.forEach(function (kind) {
                if(kind.courseRoom == item.courseRoom){
                    courseRoomFlag = true;
                    var courseTimeFlag = false;
                    kind.course.forEach(function (course) {
                        console.log("course:"+course.courseTime+" item:"+item.courseTime);
                        if(course.courseTime == item.courseTime) {
                            courseTimeFlag = true;
                            if(course.courseName == ""){
                                course.courseTeacher=item.teacherName;
                                course.grade = item.grade;
                                course.courseName = item.courseName;
                                course.student = item.studentName;
                                console.log("student:"+course.student)
                            }else if (course.grade == item.grade && course.courseName == item.courseName) {
                                course.student = course.student + item.studentName;
                                console.log("student:"+course.student)
                            }
                        }
                    });
                    if(!courseTimeFlag){
                        console.log("找不到该上课时间");
                        kind.course.push({'courseTime':item.courseTime,'grade':item.grade,'courseName':item.courseName,'student':[{'studentName':"<a href='www.baidu.com'>"+item.studentName+"</a>&nbsp;&nbsp;"}]})
                    }
                }
            });
            if(!courseRoomFlag){
                console.log("can't find "+item.courseRoom);
                data.data.push({'courseRoomName':item.courseRoomName,'course':[{'courseTime':item.courseTime,'grade':item.grade,'courseName':item.courseName,'student':[{'studentName':"<a href='www.baidu.com'>"+item.studentName+"</a>&nbsp;&nbsp;"}]}]});
            }
            x++;
        });
        if(x==rows.length) {
            console.log("data:" + JSON.stringify(data));
            res.render('joinReceptionTodayCourse',data);
        }
    });
});
router.get('/joinReceptionPrint',function (req,res,next) {
    res.render('joinReceptionPrint');
})
router.get('/joinReceptionCourseCalendar',function (req,res,next) {
    res.render('joinReceptionCourseCalendar');
})
router.get('/joinReceptionStudentDetail',function (req,res,next) {
    user.findOne({'where':{userId:req.query.studentId}}).then(function (student) {
        var sql = "SELECT c.courseSeriesId,c.courseSeriesName, a.userName as teacher, c.startDate, c.endDate, c.time, c.room "+
        "FROM courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId JOIN joinSeries j ON j.courseSeriesId = c.courseSeriesId "+
        "WHERE j.process = 1  and c.endDate >= now() and j.studentId ="+req.query.studentId
        course.sequelize.query(sql).then(function (nowCourse) {
            var sql = "select j.joinSeriesId,s.seriesName,studentId,hopeTeacher,hopeClassType,hopeTime,other from joinSeries j JOIN seriesTemplate s ON s.templateId = j.templateId where process = 0 and j.studentId=24"
            course.sequelize.query(sql).then(function (postCourse) {
                var sql = "SELECT c.courseSeriesId,c.courseSeriesName, a.userName as teacher, c.startDate, c.endDate, c.time, c.room "+
                    "FROM courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId JOIN joinSeries j ON j.courseSeriesId = c.courseSeriesId "+
                    "WHERE j.process = 1  and c.endDate < now() and j.studentId ="+req.query.studentId
                course.sequelize.query(sql).then(function (finishCourse) {
                    console.log("studentList:"+JSON.stringify({student:student,nowCourse:nowCourse,postCourse:postCourse,finishCourse:finishCourse}))
                    res.render('joinReceptionStudentDetail',{student:student,nowCourse:nowCourse[0],postCourse:postCourse[0],finishCourse:finishCourse[0]});
                })
            })
        })
    })
})
router.get('/joinReceptionStudentDetailEdit',function (req,res,next) {
    console.log("query:"+JSON.stringify(req.query))
    res.render('joinReceptionStudentDetailEdit');
})
router.get('/joinReceptionStudentList',function (req,res) {
    user.findAll({where:{role:1}}).then(function(ret){
        console.log("user:"+JSON.stringify(ret))
        res.render('joinReceptionStudentList',{student:ret});
    })
})
router.get('/joinReceptionDetail',function (req,res,next) {
    console.log("userId:"+req.session.userId)
    joinreceptionshop.findOne({where:{userId:req.session.userId}}).then(function(ret1){
        console.log(JSON.stringify(ret1))
        ret1.getUser().then(function (ret) {
            console.log(JSON.stringify(ret))
            res.render('joinReceptionDetail',{info:ret,infos:ret1});
        })
    })
})

router.post("/editInfo",function (req,res) {
    //console.log(JSON.stringify(req.body))
    user.update({
        userName:req.body.userName,
        phoneNumber:req.body.phoneNumber,
    },{'where':{userId:3}}).then(
        joinreceptionshop.update({
            location:req.body.location,
        },{'where':{userId:3}}).then(
            res.send("123")
        )
    )})
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
router.get('/joinReceptionTeacherList',function (req,res) {
    user.findAll({where:{role:2}}).then(function(ret){
        console.log(JSON.stringify(ret))
        res.render('joinReceptionTeacherList',{teacher:ret});
    })
})
router.get('/joinReceptionTeacherDetail',function (req,res,next) {
    user.findOne({'where':{userId:req.query.teacherId}}).then(function (teacher) {
        var sql = "SELECT c.courseSeriesId,c.courseSeriesName, a.userName as teacher, c.startDate, c.endDate, c.time, c.room "+
        "FROM courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId "+
        "WHERE c.endDate > now() and c.courseSeriesTeacher ="+req.query.teacherId;
        course.sequelize.query(sql).then(function (nowCourse) {
            var sql = "SELECT c.courseSeriesId,c.courseSeriesName, a.userName as teacher, c.startDate, c.endDate, c.time, c.room "+
                "FROM courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId "+
                "WHERE c.endDate < now() and c.courseSeriesTeacher ="+req.query.teacherId;
            course.sequelize.query(sql).then(function (finishCourse) {
                res.render('joinReceptionTeacherDetail',{teacher:teacher,nowCourse:nowCourse[0],finishCourse:finishCourse[0]});
            })
        })
    })
})
router.get('/joinReceptionTeacherDetailEdit',function (req,res,next) {
    console.log("query:"+JSON.stringify(req.query))
    res.render('joinReceptionTeacherDetailEdit');
})
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
                }, {'where': {studentId: studentList[i],templateId:req.body.templateId}})
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

