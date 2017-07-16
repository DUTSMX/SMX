var express = require('express');
var router = express.Router();
var db = require("../model/db")
var course=require('../model/course');
var user=require(('../model/user'));
var series = require('../model/series')
var joinreceptionshop=require('../model/joinreceptionshop')
var joinreceptionmanager=require('../model/joinreceptionmanager');
var student = require("../model/student")
var teacher = require("../model/teacher")

/**********************************************************************************************************************/
/*                                              学生管理                                                              */
/**********************************************************************************************************************/
/*今日课程
* req:date
* res:{date,data,courseTime}
* */
router.get('/joinReceptionTodayCourse',function (req,res,next) {
    var date=new Date();
    date=date.toLocaleDateString();
    var data = []
    var courseTime = ["07:00:00","08:40:00","10:20:00","13:30:00","15:10:00","16:50:00","19:30:00","21:10:00"];
    var courseRoomList = ["教室一","教室二","教室三","教室四","教室五","教室六","教室七","教室八"];
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
            console.log("todayCourse:"+JSON.stringify({date:req.query.date,data:data,courseTime:courseTime}));
            res.render('joinReceptionTodayCourse',{date:req.query.date,data:data,courseTime:courseTime});
        }
    });
});
/*打印签到表
* req:date
* res:{date,print}
* */
router.get('/joinReceptionPrint',function (req,res,next) {
    var sql = "SELECT c.courseId,c.beginTime, c.courseName,a.userName as teacher,co.room,ac.userName as student,j.userId as studentId,j.attend,ac.phoneNumber "+
        "FROM course c JOIN account a ON c.userId = a.userId JOIN courseSeries co ON c.courseSeriesId = co.courseSeriesId  "+
        "JOIN joinCourse j ON c.courseId = j.courseId JOIN account ac ON ac.userId = j.userId "+
        "where c.courseDate = '"+req.query.date+"' "
    db.sequelize.query(sql).then(function (print) {
        console.log(JSON.stringify({date:req.query.date,print:print[0]}))
        res.render('joinReceptionPrint',{date:req.query.date,print:print[0]});
    })
})
/*更新签到信息
* req:change:[]
* res:
* */
router.post("/updateAttend",function (req,res) {
    console.log("body:"+JSON.stringify(req.body))
    var change = req.body.change;
    for(var i=0;i<change.length;i++){
        course.joinCourse.update({
            attend:change[i].attend
        },{'where':{userId:change[i].studentId,courseId:change[i].courseId}})
    }
    res.send("提交成功")
})
/* 学生列表
* req:
* res:{student:[studentId,userName,grade,joinCount]}
* */
router.get('/joinReceptionStudentList',function (req,res) {
    var sql = "SELECT s.studentId, a.userName, s.grade, count(j.joinSeriesId) as joinCount "+
        "FROM account a JOIN student s ON a.userId = s.userId LEFT JOIN joinSeries j ON a.userId = j.studentId "+
        "WHERE role = 1 GROUP BY a.userId ORDER BY userName DESC,joinCount"
    db.sequelize.query(sql).then(function(ret){
        console.log("studentList:"+JSON.stringify(ret[0]))
        res.render('joinReceptionStudentList',{student:ret[0]});
    })
})
/* 添加学生
* req:{phoneNumber,studentName,schoolName,classInfo
* res:
* */
router.post('/createStudent', function (req, res, next) {
    console.log("body:"+JSON.stringify(req.body));
    user.create({
        phoneNumber:req.body.phoneNumber,
        userName:req.body.studentName,
        registerDate:Date.now(),
        role:1
    }).then(function (user) {
        student.create({
            userId:user.userId,
            joinshop:1,
            school:req.body.schoolName,
            grade:req.body.classInfo
        }).then(function (student) {
            console.log("createStudent user:"+JSON.stringify(user)+"  student:"+JSON.stringify(student));
            res.send("添加成功")
        })
    })
});
/*学生详情
 * req:studentId
 * res:{student:[],nowCourse:[],postCourse:[],finishCourse:[]
* */
router.get('/joinReceptionStudentDetail',function (req,res,next) {
    student.findOne({'where':{studentId:req.query.studentId}}).then(function(student){
        user.findOne({'where':{userId:student.userId}}).then(function (user) {
            var sql = "SELECT c.courseSeriesId,c.courseSeriesName, a.userName as teacher, c.startDate, c.endDate, c.time, c.room "+
                "FROM courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId JOIN joinSeries j ON j.courseSeriesId = c.courseSeriesId "+
                "WHERE j.process = 1  and c.endDate >= now() and j.studentId ="+student.userId;
            db.sequelize.query(sql).then(function (nowCourse) {
                var sql = "select j.joinSeriesId,s.seriesName,studentId,hopeTeacher,hopeClassType,hopeTime,other from joinSeries j JOIN seriesTemplate s ON s.templateId = j.templateId where process = 0 and j.studentId="+student.userId;
                db.sequelize.query(sql).then(function (postCourse) {
                    var sql = "SELECT c.courseSeriesId,c.courseSeriesName, a.userName as teacher, c.startDate, c.endDate, c.time, c.room "+
                        "FROM courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId JOIN joinSeries j ON j.courseSeriesId = c.courseSeriesId "+
                        "WHERE j.process = 1  and c.endDate < now() and j.studentId ="+student.userId;
                    db.sequelize.query(sql).then(function (finishCourse) {
                        console.log("studentList:"+JSON.stringify({student:user,nowCourse:nowCourse[0],postCourse:postCourse[0],finishCourse:finishCourse[0]}))
                        user.studentId = req.query.studentId;
                        res.render('joinReceptionStudentDetail',{student:user,nowCourse:nowCourse[0],postCourse:postCourse[0],finishCourse:finishCourse[0]});
                    })
                })
            })
        })
    })
})
/* 更新报名信息
*
* */
router.post("/updateHope",function (req,res) {
    console.log("body："+JSON.stringify(req.body))
    series.joinSeries.update({
        hopeTeacher:req.body.teacher,
        hopeClassType:req.body.classType,
        hopeTime:req.body.time,
        other:req.body.other
    },{'where':{joinSeriesId:req.body.joinSeriesId}}).then(function(data){
        res.send("修改成功")
    })
})
/* 删除报名信息
 *
 * */
router.post("/deleteHope",function (req,res) {
    console.log("body："+JSON.stringify(req.body))
    series.joinSeries.destroy({'where':{joinSeriesId:req.body.joinSeries}}
    ).then(function () {
        res.send("删除成功")
    })
})

/*
* 编辑学生
* req:studentId
* res:{student:{},user:{}}
* */
router.get('/joinReceptionStudentDetailEdit',function (req,res,next) {
    student.findOne({'where':{studentId:req.query.studentId}}).then(function (student) {
        // ret.getUser().then(function (ret1) {
        user.findOne({'where':{userId:student.userId}}).then(function(user){
            JSON.stringify("student:"+JSON.stringify(student)+" user:"+JSON.stringify(user))
            res.render('joinReceptionStudentDetailEdit',{student:student,user:user});
        })
    })
})
/*修改学生
* req:userId,userName,phoneNumber,gender,userAddress,grade,joinshop,school
* */
router.post("/changeInfo",function (req,res) {
    console.log(JSON.stringify(req.body))
    student.update({
        grade:req.body.grade,
        joinshop:req.body.joinshop,
        school:req.body.school,
    },{'where':{studentId:req.body.studentId}}).then(function (student) {
        console.log("student:"+JSON.stringify(student))
        user.update({
            userName:req.body.userName,
            phoneNumber:req.body.phoneNumber,
            gender:req.body.gender,
            userAddress:req.body.userAddress,
            userHeadUrl:req.body.headUrl,
            userFrontIdHeadUrl:req.body.frontUrl,
            userBackIdHeadUrl:req.body.backUrl
        },{'where':{userId:req.body.userId}}).then(function (user) {
            console.log("user:"+JSON.stringify(user))
            res.send("修改成功")
        })
    })
})
/*老师列表
* req:
* res:{teacher:[teacherId,userName,teachClass,teacherCount]}
* */
router.get('/joinReceptionTeacherList',function (req,res) {
    var sql = "SELECT t.teacherId as teacherId, a.userName, t.teachClass, count(c.courseSeriesTeacher) as teacherCount "+
        "FROM account a JOIN teacher t ON a.userId = t.userId LEFT JOIN courseSeries c ON a.userId = c.courseSeriesTeacher "+
        "WHERE role = 2 GROUP BY a.userId ORDER BY userName DESC, teacherCount "
    db.sequelize.query(sql).then(function(teacherList){
        console.log("teacherList:"+JSON.stringify(teacherList[0]))
        res.render('joinReceptionTeacherList',{teacher:teacherList[0]});
    })
})
/* 添加老师
* req:phoneNumber,teacherName,subject
* res:
* */
router.post('/createTeacher', function (req, res, next) {
    console.log("body:"+JSON.stringify(req.body));
    user.create({
        phoneNumber:req.body.phoneNumber,
        userName:req.body.teacherName,
        role:2
    }).then(function (user) {
        teacher.create({
            userId:user.userId,
            teachClass:req.body.subject
        }).then(function(teacher){
            res.send("创建成功")
        })
    })
});
/* 老师详情
* req:teacherId
* res:{teacher:[],nowCourse:[],finishCourse:[]}
* */
router.get('/joinReceptionTeacherDetail',function (req,res,next) {
    teacher.findOne({'where':{teacherId:req.query.teacherId}}).then(function (teacher) {
        user.findOne({'where':{userId:teacher.userId}}).then(function (user) {
            user.teacherId =req.query.teacherId;
            var sql = "SELECT c.courseSeriesId,c.courseSeriesName, a.userName as teacher, c.startDate, c.endDate, c.time, c.room "+
                "FROM courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId "+
                "WHERE c.endDate > now() and c.courseSeriesTeacher ="+teacher.userId;
            db.sequelize.query(sql).then(function (nowCourse) {
                var sql = "SELECT c.courseSeriesId,c.courseSeriesName, a.userName as teacher, c.startDate, c.endDate, c.time, c.room "+
                    "FROM courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId "+
                    "WHERE c.endDate < now() and c.courseSeriesTeacher ="+teacher.userId;
                db.sequelize.query(sql).then(function (finishCourse) {
                    console.log("TeacherDetail:"+JSON.stringify({teacher:user,nowCourse:nowCourse[0],finishCourse:finishCourse[0]}))
                    res.render('joinReceptionTeacherDetail',{teacher:user,nowCourse:nowCourse[0],finishCourse:finishCourse[0]});
                })
            })
        })
    })
})
/*编辑老师
* req:teacherId
* res:{teacher:{},student:{}}
* */
router.get('/joinReceptionTeacherDetailEdit',function (req,res,next) {
    teacher.findOne({'where':{teacherId:req.query.teacherId}}).then(function (teacher) {
        // ret.getUser().then(function (ret1) {
        user.findOne({'where':{userId:teacher.userId}}).then(function(user){
            console.log("teacherDetailEdit:"+JSON.stringify({teacher:teacher,user:user}))
            res.render('joinReceptionTeacherDetailEdit',{teacher:teacher,user:user});
        })
    })
})
/* 修改老师
* req:teacherId,userId
* res:
* */
router.post("/modifyInfo",function (req,res) {
    console.log(JSON.stringify(req.body))
    user.update({
        userName:req.body.teacherName,
        phoneNumber:req.body.phoneNumber,
        gender:req.body.gender,
        userHeadUrl:req.body.headUrl,
        userFrontIdHeadUrl:req.body.frontUrl,
        userBackIdHeadUrl:req.body.backUrl,
        cardNumber:req.body.cardNumber
    },{'where':{userId:req.body.userId}}).then(
        teacher.update({
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
            Geography:req.body.Geography,
            studentCard:req.body.studentUrl,
            teacherCard:req.body.teacherUrl
        },{'where':{teacherId:req.body.teacherId}}).then(
            res.send("修改成功")
        )
    )})
/*课程管理
* req:
* res:{allCourse:[]}
* */
router.get('/joinReceptionCourseManager',function (req,res,next) {
    var sql = "select c.courseSeriesId,c.courseSeriesName,c.startDate,c.endDate,c.time,c.room, a.userName from courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId order by userName,time"
    db.sequelize.query(sql).then(function (data) {
        console.log("course:"+JSON.stringify(data[0]))
        res.render('joinReceptionCourseManager',{allCourse:data[0]});
    })
})
/*课程详情
* req:seriesId
* res:{series,courseList}
* */
router.get("/joinReceptionCourseDetail",function (req,res) {
    console.log("query:"+JSON.stringify(req.query))
    var sql = "SELECT c.courseSeriesId,c.courseSeriesName, c.courseSeriesNumber, c.courseSeriesIntro, c.startDate,c.endDate,c.time,c.courseSeriesClassType,c.room, a.userName as teacher,a.userId as teacherId, GROUP_CONCAT(ac.userName) as student "+
        "FROM courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId JOIN joinSeries j ON j.courseSeriesId = c.courseSeriesId JOIN account ac ON j.studentId = ac.userId "+
        "WHERE c.courseSeriesId = "+req.query.seriesId+" GROUP BY j.courseSeriesId"
    db.sequelize.query(sql).then(function (data) {
        course.course.findAll({'where':{courseSeriesId:req.query.seriesId}}).then(function (courseList) {
            var sql = "SELECT userId,userName from account where role = 2 order by userName"
            db.sequelize.query(sql).then(function(teacherList){
                var sql = "SELECT a.userId,a.userName from joinSeries j JOIN account a ON j.studentId = a.userId WHERE j.courseSeriesId = "+req.query.seriesId;
                db.sequelize.query(sql).then(function (studentList) {
                    console.log("courseDetail:"+JSON.stringify({series:data[0][0],courseList:courseList,teacher:teacherList[0],student:studentList[0]}))
                    res.render("joinReceptionCourseDetail",{series:data[0][0],courseList:courseList,teacher:teacherList[0],student:studentList[0]})
                })
            })
        })
    })
})
/* 更新课程
* req:seriesId,teacherId,shopId,startDate,endDate,time,classType,room
* res:
* */
router.post("/updateCourse",function (req,res) {
    console.log("body:"+JSON.stringify(req.body))
    console.log("update:"+JSON.stringify({
            courseSeriesTeacher:req.body.teacherId,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            time:req.body.time,
            courseSeriesClassType:req.body.classType,
            room:req.body.room
        })+"  where:"+JSON.stringify({'where':{courseSeriesId:req.body.seriesId}}))
    series.courseSeries.update({
        courseSeriesTeacher:req.body.teacherId,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        time:req.body.time,
        courseSeriesClassType:req.body.classType,
        room:req.body.room
    },{'where':{courseSeriesId:req.body.seriesId}}).then(function (courseSeries) {
        var sql = "select * from course where courseSeriesId = "+req.body.seriesId;
        db.sequelize.query(sql).then(function (courseDate) {
            var startDate = new Date(req.body.startDate);
            startDate.setDate(startDate.getDate()-1)
            for(var i=0;i<courseDate[0].length;i++){
                course.course.update({
                    courseDate:startDate.setDate(startDate.getDate()+1),
                    beginTime:req.body.time,
                    courseRoom:req.body.room
                },{'where':{courseId:courseDate[0][i].courseId}})
            }
            res.send("更新成功")
        })
    }).catch(function (err) {
        console.log(err)
    })
})
/*删除学生*/
router.post("/deleteStudent",function (req,res) {
    series.joinSeries.update({
        courseSeriesId:0,
        process:0
    },{'where':{courseSeriesId:req.body.courseSeries,studentId:req.body.studentId}}).then(function (joinSeries) {
        course.joinCourse.destroy({'where':{userId:req.body.studentId,courseSeriesId:req.body.courseSeries}}).then(
            res.send("删除成功")
        )
    })
})
/*删除课程*/
router.post("/deleteCourse",function (req,res) {
    course.joinCourse.destroy({'where':{courseSeriesId:req.body.seriesId}}).then(function (joinCourse) {
        course.course.destroy({'where':{courseSeriesId:req.body.seriesId}}).then(function (course) {
            series.joinSeries.update({
                courseSeriesId:0,
                process:0
            },{'where':{courseSeriesId:req.body.seriesId}}).then(function (joinSeries){
                series.courseSeries.destroy({'where':{courseSeriesId:req.body.seriesId}}).then(function (courseSeries) {
                    res.send("删除成功")
                })
            })
        })
    })
})
/*课程日历
* req:
* res:
* */
router.get('/joinReceptionCourseCalendar',function (req,res,next) {
    res.render('joinReceptionCourseCalendar');
})
/*获取当月课程日历
* req:{firstDate,lastDate}
* res:{number}
* */
router.post("/courseNumber",function (req,res,next) {
    var sql = "select courseDate,count(courseId) as number from course where courseDate <'"+req.body.lastDate+"' and courseDate >= '"+req.body.firstDate+"' group by courseDate order by courseDate"
    db.sequelize.query(sql).then(function (ret) {
        console.log("courseName:"+JSON.stringify(ret[0]))
        res.send(ret[0])
    })
})
router.get('/joinReceptionCreateTemplate',function (req,res) {
    res.render('joinReceptionCreateTemplate');
})
/*增加培养方案*/
router.post('/addTemplate',function (req,res) {
    var courseSeriesName=req.body.courseSeriesName;
    var courseSeriesSubject=req.body.courseSeriesSubject;
    var courseSeriesIntro=req.body.courseSeriesIntro;
    var courseSeriesGrade=req.body.courseSeriesGrade;
    var courseSeriesLevel=req.body.courseSeriesLevel;
    var courseSeriesNumber=req.body.courseSeriesNumber;
    var courseSeriesCourseName=req.body.courseSeriesCourseName;
    console.log("courseSeriesCourseName:"+JSON.stringify(courseSeriesCourseName));
    series.seriesTemplate.create({
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
/*课程报名列表
* req:
* res:{allCourse,student}
* */
router.get('/joinReceptionCoursePost',function (req,res) {
    series.seriesTemplate.findAll().then(function(data) {
        var sql = "SELECT userId,userName from account where role = 1 order by userName"
        db.sequelize.query(sql).then(function(studentList){
            console.log("post:"+JSON.stringify({allCourse:data,student:studentList[0]}))
            res.render("joinReceptionCoursePost",{allCourse:data,student:studentList[0]})
        })
    })
})
/*课程模板详情
* req:templateId
* res:{template,student}
* */
router.get('/joinReceptionTemplateDetail',function (req,res,next) {
    var templateId=req.query.templateId;
    series.seriesTemplate.findOne({
        'where':{'templateId':templateId}
    }).then(function (ret) {
        console.log(JSON.stringify({template:ret,student:{status:true}}))
        res.render('joinReceptionTemplateDetail',{template:ret,student:{status:true}});
    });
});
/*课程申请
* req:templateId,studentId,teacher,classType,time,other
* res:
* */
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
/*申请课程
* req:students,room,teacher,classType
* res:
* */
// router.post("/postCourse",function(req,res){
//     console.log("body:"+JSON.stringify(req.body))
//     course.courseSeries.update({
//         students:req.body.students,
//         room:req.body.room,
//         courseSeriesTeacher:req.body.teacher,
//         courseSeriesClassType:req.body.classType,
//         status:1
//     },{'where':{courseSeriesId:req.body.id}}).then(function (data) {
//         console.log("data:"+JSON.stringify(data))
//         res.send("success")
//     })
// })
/* 审核列表
* req:
* res:postCourse
* */
router.get("/joinReceptionCourseCheck",function (req,res) {
    var sql = "SELECT s.templateId,s.seriesName,COUNT(j.studentId) as studentNumber from seriesTemplate s JOIN joinSeries j ON s.templateId = j.templateId where j.process = 0 group by templateId";
    db.sequelize.query(sql).then(function (postCourse) {
        res.render("joinReceptionCourseCheck",{postCourse:postCourse[0]})
    })
})
/* 审核详情
* req:templateId
* res:{template:{},postList:{},teacher:{},allCourse:{}}
* */
router.get("/joinReceptionCourseCheckDetail",function (req,res) {
    console.log("req:"+JSON.stringify(req.query))
    series.seriesTemplate.findOne({'where':{templateId:req.query.templateId}}).then(function (template) {
        var sql = "select studentId,userName,hopeTeacher,hopeClassType,hopeTime,other from joinSeries j JOIN account a ON j.studentId = a.userId where process = 0 and templateId = "+req.query.templateId;
        db.sequelize.query(sql).then(function (postList) {
            var sql = "SELECT userId,userName from account where role = 2 order by userName"
            db.sequelize.query(sql).then(function(teacherList){
                var sql = "SELECT c.courseSeriesId, c.courseSeriesName, c.time, c.room, a.userName "+
                "FROM courseSeries c JOIN account a ON c.courseSeriesTeacher = a.userId "+
                "WHERE c.courseSeriesName = '"+template.seriesName+"' ORDER BY userName, time"
                db.sequelize.query(sql).then(function (data) {
                    console.log("checkDetail:"+JSON.stringify({template:template,postList:postList[0],teacher:teacherList[0]}))
                    res.render("joinReceptionCourseCheckDetail",{template:template,postList:postList[0],teacher:teacherList[0],allCourse:data[0]})
                })
            })
        })
    })
})
/*审核创建课程
* req:templateId,shopId,classType,teacherId,room,startDate,endDate,time,studentId
* res:
* */
router.post('/createCourse',function (req,res) {
    console.log("body:"+JSON.stringify(req.body))
    var sql = "select * from courseSeries where time = '"+req.body.time+"' and courseSeriesTeacher = "+req.body.teacherId
    db.sequelize.query(sql).then(function (teacherConflict) {
        if(teacherConflict[0].length > 0){
            res.send({status:false,desc:"该老师在当前时间已经有其他课程"})
        }else {
            var sql = "select * from courseSeries where time = '" + req.body.time + "' and room = '" + req.body.room + "'"
            db.sequelize.query(sql).then(function (roomConflict) {
                if (roomConflict[0].length > 0) {
                    res.send({status: false, desc: "该教室在当前时间已经有其他课程"})
                } else {
                    console.log("student:" + req.body.studentId)
                    var studentList = req.body.studentId
                    // for(var i=0;i<studentList.length;i++){
                    var sql = "select * from courseSeries c JOIN joinSeries j ON c.courseSeriesId = j.courseSeriesId JOIN account a ON j.studentId = a.userId where c.time = '" + req.body.time + "' and j.studentId in (" + req.body.studentId + ") and j.process = 1";
                    db.sequelize.query(sql).then(function (studentConflict) {
                        if (studentConflict[0].length > 0) {
                            res.send({status: false, desc: "学生" + studentConflict[0][0].userName + "在当前时间已有其他课程"})
                        } else {
                            series.seriesTemplate.findOne({'where': {templateId: req.body.templateId}}).then(function (template) {
                                series.courseSeries.create({
                                    courseSeriesName: template.seriesName,
                                    courseSeriesSubject: template.subject,
                                    courseSeriesIntro: template.seriesIntro,
                                    courseSeriesGrade: template.grade,
                                    courseSeriesNumber: template.number,
                                    courseSeriesCourseName: template.courseName,
                                    courseSeriesLeve: template.level,
                                    courseSeriesTeacher: req.body.teacherId,
                                    shopId: req.body.shopId,
                                    courseSeriesClassType: req.body.classType,
                                    startDate: req.body.startDate,
                                    endDate: req.body.endDate,
                                    time: req.body.time,
                                    room: req.body.room,
                                    students: JSON.stringify(req.body.studentId)
                                }).then(function (courseSeries) {
                                    console.log("courseSeries:" + JSON.stringify(courseSeries))
                                    console.log("id:" + courseSeries.courseSeriesId)
                                    var courseList = JSON.parse(template.courseName)
                                    var startDate = new Date(req.body.startDate);
                                    var tempDate = startDate;
                                    var studentList = req.body.studentId
                                    for (var i = 0; i < studentList.length; i++) {
                                        series.joinSeries.update({
                                            courseSeriesId: courseSeries.courseSeriesId,
                                            process: 1
                                        }, {'where': {studentId: studentList[i], templateId: req.body.templateId}})
                                    }
                                    for (var i = 0; i < courseSeries.courseSeriesNumber; i++) {
                                        course.course.create({
                                            courseSeriesId: courseSeries.courseSeriesId,
                                            userId: req.body.teacherId,
                                            courseName: courseList[i],
                                            courseDate: startDate.setDate(startDate.getDate() + 1),
                                            beginTime: req.body.time,
                                            createDate: Date.now(),
                                            courseRoom: req.body.room
                                        }).then(function (courseRet) {
                                            var studentList = req.body.studentId
                                            for (var i = 0; i < studentList.length; i++) {
                                                course.joinCourse.create({
                                                    userId: studentList[i],
                                                    courseId: courseRet.courseId,
                                                    courseSeriesId: courseSeries.courseSeriesId,
                                                    attend: 0
                                                })
                                            }
                                        })
                                    }
                                    res.send({status: true, desc: "创建成功"})
                                })
                            })
                        }
                    })
                }
            })
        }
    })
})
router.post("/addCourse",function(req,res){
    console.log("body:"+JSON.stringify(req.body))
    series.courseSeries.findOne({'where':{courseSeriesId:req.body.seriesId}}).then(function (courseSeries) {
        console.log("courseSeries:"+JSON.stringify(courseSeries))
        console.log("id:"+courseSeries.courseSeriesId)
        var courseList = JSON.parse(courseSeries.courseSeriesCourseName)
        var startDate = new Date(courseSeries.startDate);
        var tempDate = startDate;
        var studentList = req.body.student
        for (var i = 0; i < studentList.length; i++) {
            series.joinSeries.update({
                courseSeriesId: courseSeries.courseSeriesId,
                process: 1
            }, {'where': {templateId:req.body.templateId,studentId:studentList[i]}})
            var courseList = JSON.stringify(courseSeries.courseSeriesNumber);
            for(var j=0;j<courseList.length;j++){
                course.joinCourse.create({
                    userId: studentList[i],
                    courseId: courseList[j].courseId,
                    courseSeriesId:courseSeries.courseSeriesId,
                    attend: 0
                })
            }
        }
        res.send({status:true,desc:"创建成功"})
    })
})
/*前台个人信息
 * req:userId
 * res:{info,info1}
 * */
router.get('/joinReceptionDetail',function (req,res,next) {
    console.log("userId:"+req.session.userId)
    joinreceptionshop.findOne({where:{userId:req.session.userId}}).then(function(reception){
        user.findOne({'where':{userId:reception.userId}}).then(function (user) {
            console.log("receptionDetail:"+JSON.stringify({reception:reception,user:user}))
            res.render('joinReceptionDetail',{reception:reception,user:user});
        })
    })
})
/*修改个人信息
 * req:userHeadUrl,userFrontIdHeadUrl,userBackIdHeadUrl,userName,phoneNumber,location
 * res:
 * */
router.post("/editInfo",function (req,res) {
    console.log(JSON.stringify(req.body))
    user.update({
        userHeadUrl: req.body.userHeadUrl,
        userFrontIdHeadUrl: req.body.userFrontIdHeadUrl,
        userBackIdHeadUrl: req.body.userBackIdHeadUrl,
        userName: req.body.userName,
        phoneNumber: req.body.phoneNumber,
        userAddress:req.body.address,
        cardNumber:req.body.cardNumber
    }, {'where': {userId: req.session.userId}}).then(function (data) {
            res.send("修改成功")

    })
})
module.exports=router;

