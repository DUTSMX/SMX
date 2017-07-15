var express = require('express');
var router = express.Router();
var db = require("../model/db")
var course=require('../model/course');
var user=require(('../model/user'));
var series = require('../model/series')
var joinreceptionshop=require('../model/joinreceptionshop')
var student = require("../model/student")
var teacher = require("../model/teacher")
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
    var sql = "select c.courseSeriesId,c.courseSeriesName,c.startDate,c.endDate,c.time,c.room, a.userName from courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId order by userName,time"
    db.sequelize.query(sql).then(function (data) {
        console.log("course:"+JSON.stringify(data[0]))
        res.render('joinReceptionCourseManager',{allCourse:data[0]});
    })
})
router.get('/joinReceptionCoursePost',function (req,res) {
    series.seriesTemplate.findAll().then(function(data) {
        var sql = "SELECT userId,userName from account where role = 1 order by userName"
        db.sequelize.query(sql).then(function(studentList){
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
    db.sequelize.query(sql).then(function (data) {
        course.course.findAll({'where':{courseSeriesId:req.query.seriesId}}).then(function (courseList) {
            console.log("courseDetail:"+JSON.stringify(data[0]))
            res.render("joinReceptionCourseDetail",{series:data[0][0],courseList:courseList})
        })
    })
})
router.get('/joinReceptionTodayCourse',function (req,res,next) {
    var date=new Date();
    date=date.toLocaleDateString();
    var data = []
    var courseTime = ["07:00:00","08:40:00","10:20:00","13:30:00","15:10:00","16:50:00","19:00:00","21:10:00"];
    var courseRoomList = ["教室一","教室二","教室三","教室四","教室五"];
   // data.courseTime = courseTime;
    courseRoomList.forEach(function (courseRoom) {
        // console.log("courseRoom:"+courseRoom);
        var temp= {'courseRoom':courseRoom,'course':[]};
        courseTime.forEach(function (courseTime) {
            // console.log("courseTime:"+courseTime);
            temp.course.push({'courseTime':courseTime,'courseTeacher':"",'grade':"",'courseName':"",'student':""})
        });
        data.push(temp);
    });
    // console.log("data:"+JSON.stringify(data));
    var sql="SELECT "+
        "c.courseId,c.beginTime as courseTime, c.courseName,a.userName as teacherName,co.room as courseRoom,GROUP_CONCAT(ac.userName) as studentName "+
        "FROM "+
        "course c "+
        "JOIN account a ON c.userId = a.userId "+
        "JOIN courseSeries co ON c.courseSeriesId = co.courseSeriesId "+
        "JOIN joinCourse j ON c.courseId = j.courseId "+
        "JOIN account ac ON ac.userId = j.userId "+
        "where c.courseDate = '"+req.query.date+"' "+
        "group by c.courseId "
    db.sequelize.query(sql,{ type: db.sequelize.QueryTypes.SELECT }).then(function (rows){
        var x=0;
         rows.forEach(function (item) {
            var courseRoomFlag = false;
            //teacherList.forEach()
            data.forEach(function (kind) {
                if(kind.courseRoom == item.courseRoom){
                    courseRoomFlag = true;
                    var courseTimeFlag = false;
                    kind.course.forEach(function (course) {
                        // console.log("course:"+course.courseTime+" item:"+item.courseTime);
                        if(course.courseTime == item.courseTime) {
                            courseTimeFlag = true;
                            if(course.courseName == ""){
                                course.courseTeacher=item.teacherName;
                                course.grade = item.grade;
                                course.courseName = item.courseName;
                                course.student = item.studentName;
                                // console.log("student:"+course.student)
                            }else if (course.grade == item.grade && course.courseName == item.courseName) {
                                course.student = course.student + item.studentName;
                                // console.log("student:"+course.student)
                            }
                        }
                    });
                    if(!courseTimeFlag){
                        // console.log("找不到该上课时间");
                        kind.course.push({'courseTime':item.courseTime,'grade':item.grade,'courseName':item.courseName,'student':[{'studentName':"<a href='www.baidu.com'>"+item.studentName+"</a>&nbsp;&nbsp;"}]})
                    }
                }
            });
            if(!courseRoomFlag){
                // console.log("can't find "+item.courseRoom);
                data.push({'courseRoomName':item.courseRoomName,'course':[{'courseTime':item.courseTime,'grade':item.grade,'courseName':item.courseName,'student':[{'studentName':"<a href='www.baidu.com'>"+item.studentName+"</a>&nbsp;&nbsp;"}]}]});
            }
            x++;
        });
        if(x==rows.length) {
            // console.log("data:" + JSON.stringify(data));
            res.render('joinReceptionTodayCourse',{date:req.query.date,data:data,courseTime:courseTime});
        }
    });
});
router.get('/joinReceptionPrint',function (req,res,next) {
    var sql = "SELECT c.courseId,c.beginTime, c.courseName,a.userName as teacher,co.room,ac.userName as student,ac.phoneNumber "+
        "FROM course c JOIN account a ON c.userId = a.userId JOIN courseSeries co ON c.courseSeriesId = co.courseSeriesId  "+
    "JOIN joinCourse j ON c.courseId = j.courseId JOIN account ac ON ac.userId = j.userId "+
    "where c.courseDate = '2017-07-15' "
            db.sequelize.query(sql).then(function (print) {
                res.render('joinReceptionPrint',{print:print[0]});
            })
})
router.get('/joinReceptionCourseCalendar',function (req,res,next) {
    res.render('joinReceptionCourseCalendar');
})
router.get('/joinReceptionStudentDetail',function (req,res,next) {
    user.findOne({'where':{userId:req.query.studentId}}).then(function (student) {
        var sql = "SELECT c.courseSeriesId,c.courseSeriesName, a.userName as teacher, c.startDate, c.endDate, c.time, c.room "+
        "FROM courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId JOIN joinSeries j ON j.courseSeriesId = c.courseSeriesId "+
        "WHERE j.process = 1  and c.endDate >= now() and j.studentId ="+req.query.studentId
        db.sequelize.query(sql).then(function (nowCourse) {
            var sql = "select j.joinSeriesId,s.seriesName,studentId,hopeTeacher,hopeClassType,hopeTime,other from joinSeries j JOIN seriesTemplate s ON s.templateId = j.templateId where process = 0 and j.studentId="+req.query.studentId
            db.sequelize.query(sql).then(function (postCourse) {
                var sql = "SELECT c.courseSeriesId,c.courseSeriesName, a.userName as teacher, c.startDate, c.endDate, c.time, c.room "+
                    "FROM courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId JOIN joinSeries j ON j.courseSeriesId = c.courseSeriesId "+
                    "WHERE j.process = 1  and c.endDate < now() and j.studentId ="+req.query.studentId
                db.sequelize.query(sql).then(function (finishCourse) {
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
    var sql = "SELECT a.userId, a.userName, s.grade, count(j.joinSeriesId) "+
    "FROM account a JOIN student s ON a.userId = s.userId LEFT JOIN joinSeries j ON a.userId = j.studentId "+
    "WHERE role = 1 GROUP BY a.userId ORDER BY count(joinSeriesId) DESC"
    db.sequelize.query(sql).then(function(ret){
        console.log("studentList:"+JSON.stringify(ret[0]))
        res.render('joinReceptionStudentList',{student:ret[0]});
    })
})
router.get('/joinReceptionDetail',function (req,res,next) {
    console.log("userId:"+req.session.userId)
    joinreceptionshop.findOne({where:{userId:req.session.userId}}).then(function(ret1){
        console.log(JSON.stringify(ret1))
        user.findOne({'where':{userId:ret1.userId}}).then(function (ret) {
            console.log(JSON.stringify(ret))
            res.render('joinReceptionDetail',{info:ret,infos:ret1});
        })
    })
})
router.post("/editInfo",function (req,res) {
    console.log(JSON.stringify(req.body))
    user.update({
        userHeadUrl: req.body.userHeadUrl,
        userFrontIdHeadUrl: req.body.userFrontIdHeadUrl,
        userBackIdHeadUrl: req.body.userBackIdHeadUrl,
        userName: req.body.userName,
        phoneNumber: req.body.phoneNumber,
    }, {'where': {userId: req.session.userId}}).then(function (data) {
        console.log("update user")
        joinreceptionshop.update({
            location: req.body.location
        }, {'where': {userId: req.session.userId}}).then(function (data) {
            console.log("update join")
            res.send("修改成功")
        }).catch(function (err) {
            console.log(err)
        })
    }).catch(function (err) {
        console.log(err)
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
    db.sequelize.query(sql).then(function (postCourse) {
        res.render("joinReceptionCourseCheck",{postCourse:postCourse[0]})
    })
})
router.get("/joinReceptionCourseCheckDetail",function (req,res) {
    console.log("req:"+JSON.stringify(req.query))
    series.seriesTemplate.findOne({'where':{templateId:req.query.templateId}}).then(function (template) {
        var sql = "select studentId,userName,hopeTeacher,hopeClassType,hopeTime,other from joinSeries j JOIN account a ON j.studentId = a.userId where process = 0 and templateId = "+req.query.templateId;
        db.sequelize.query(sql).then(function (postList) {
            var sql = "SELECT userId,userName from account where role = 2 order by userName"
            db.sequelize.query(sql).then(function(teacherList){
                var sql = "select c.courseSeriesId,c.courseSeriesName,c.startDate,c.endDate,c.time,c.room, a.userName from courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId order by userName,time"
                db.sequelize.query(sql).then(function (data) {
                    console.log("checkDetail:"+JSON.stringify({template:template,postList:postList[0],teacher:teacherList[0]}))
                    res.render("joinReceptionCourseCheckDetail",{template:template,postList:postList[0],teacher:teacherList[0],allCourse:data[0]})
                })
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
    var sql = "SELECT a.userId, a.userName, t.teachClass, count(c.courseSeriesTeacher) as teacherCount "+
    "FROM account a JOIN teacher t ON a.userId = t.userId LEFT JOIN courseSeries c ON a.userId = c.courseSeriesTeacher "+
    "WHERE role = 2 GROUP BY a.userId ORDER BY userName DESC, teacherCount "
    db.sequelize.query(sql).then(function(ret){
        console.log(JSON.stringify(ret))
        res.render('joinReceptionTeacherList',{teacher:ret[0]});
    })
})
router.get('/joinReceptionTeacherDetail',function (req,res,next) {
    user.findOne({'where':{userId:req.query.teacherId}}).then(function (teacher) {
        var sql = "SELECT c.courseSeriesId,c.courseSeriesName, a.userName as teacher, c.startDate, c.endDate, c.time, c.room "+
        "FROM courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId "+
        "WHERE c.endDate > now() and c.courseSeriesTeacher ="+req.query.teacherId;
        db.sequelize.query(sql).then(function (nowCourse) {
            var sql = "SELECT c.courseSeriesId,c.courseSeriesName, a.userName as teacher, c.startDate, c.endDate, c.time, c.room "+
                "FROM courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId "+
                "WHERE c.endDate < now() and c.courseSeriesTeacher ="+req.query.teacherId;
            db.sequelize.query(sql).then(function (finishCourse) {
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
    var sql = "select * from courseSeries where time = '"+req.body.time+"' and courseSeriesTeacher = "+req.body.teacherId
    db.sequelize.query(sql).then(function (teacherConflict) {
        if(teacherConflict[0].length > 0){
            res.send({status:false,desc:"该老师在当前时间已经有其他课程"})
        }else{
            var sql = "select * from courseSeries where time = '"+req.body.time+"' and room = '"+req.body.room+"'"
            db.sequelize.query(sql).then(function (roomConflict) {
                if(roomConflict[0].length > 0){
                    res.send({status:false,desc:"该教室在当前时间已经有其他课程"})
                }else{
                    var studentList = req.body.studentId
                    for(var i=0;i<studentList.length;i++){
                        var sql = "select * from courseSeries c JOIN joinSeries j ON c.courseSeriesId = j.courseSeriesId JOIN account a ON j.studentId = a.userId where c.time = '"+req.body.time+"' and j.studentId = "+studentList[i]+" and j.process = 1";
                        db.sequelize.query(sql).then(function (studentConflict) {
                            if(studentConflict[0].length > 0){
                                res.send({status:false,desc:"学生"+studentConflict[0][0].userName+"在当前时间已有其他课程"})
                                return;
                            }
                        })
                    }
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
                }
            })
        }
    })
})
router.post('/createStudent', function (req, res, next) {
    console.log("body:"+JSON.stringify(req.body));
    user.create({
        phoneNumber:req.body.phoneNumber,
        userName:req.body.studentName,
        registerDate:Date.now(),
        role:1
    }).then(function (data) {
        student.create({
            userId:data.userId,
            joinshop:1,
            school:req.body.schoolName,
            grade:req.body.classInfo
        }).then(function (data) {
            console.log("data:"+JSON.stringify(data));
            res.send("添加成功")
        })
    }).catch(function(err){
        console.log("err:"+JSON.stringify(err))
    });
});
router.post('/createTeacher', function (req, res, next) {
    console.log("body:"+JSON.stringify(req.body));
    user.create({
        phoneNumber:req.body.phoneNumber,
        userName:req.body.teacherName,
    }).then(function (data) {
        teacher.create({
            userId:data.userId,
            teachClass:req.body.subject
        }).then(function(){
            res.send("创建成功")
            console.log("data:"+JSON.stringify(data));
        })
    }).catch(function(err){
        console.log("err:"+JSON.stringify(err))
    });
});
router.post("/courseNumber",function (req,res,next) {
    var sql = "select courseDate,count(courseId) as number from course where courseDate <'"+req.body.lastDate+"' and courseDate >= '"+req.body.firstDate+"' group by courseDate order by courseDate"
    db.sequelize.query(sql).then(function (ret) {
        console.log("courseName:"+JSON.stringify(ret[0]))
        res.send(ret[0])
    })
})
module.exports=router;

