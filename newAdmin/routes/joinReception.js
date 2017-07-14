var express = require('express');
var router = express.Router();
var course=require('../model/course');
var user=require(('../model/user'));

router.get('/joinReceptionCourseManager',function (req,res,next) {
    course.courseSeries.findAll({'where':{status:0}}).then(function (data) {
        console.log(JSON.stringify(data))
        res.render('joinReceptionCourseManager',{post:data});
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
});
module.exports=router;

