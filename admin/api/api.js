var db = require('../db/dBHelper')
var moment = require("moment");
var user = require('../db/userDbHelper')
exports.getCourse = function(date,callback){
    var course = new Object();
    db.getCourse(date,function (futureCourse) {
        db.getHistoryCourse(date,function(historyCourse){
            callback({futureCourse:futureCourse,
            historyCourse:historyCourse,
            moment:moment});
        })
    })
};

exports.getCourseDetails=function (courseId,callback) {
    db.getCourseDetails(courseId,function (detail) {
        db.getCourseStudentList(courseId, function (courseStudentList) {
            user.getStudent(function (studentList) {
                studentList.forEach(function (student) {
                    student.join=0;
                    courseStudentList.forEach(function(courseStudent) {
                       // console.log("student:"+student.studentId+  "course:"+courseStudent.userId)
                        if(student.studentId == courseStudent.userId){
                            student.join=1;
                        }
                    })
                })
                detail.studentList = studentList;
                callback(detail);
            })

        })
    })
};

exports.getCourseDetailsEdit = function(courseId,callback){
    db.getCourseDetails(courseId,function(rows){
        callback(rows);
    })
}
exports.courseDetailsEdit = function(courseId,courseName,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent,callback){
    console.log("courseId:"+courseId+"courseName:"+courseName+"courseDate:"+courseDate+" beginTime:"+beginTime+" finishTime:"+finishTime +
        " courseTime:"+courseTime+" objectOriented:"+objectOriented+" courseContent:"+courseContent);
    db.courseDetailsEdit(courseId,courseName,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent,function (rows) {
        // console.log("rows:"+JSON.stringify(rows));
        callback(rows)
    })
}

exports.getSelfStudyByDate = function(callback){
    db.getSelfStudyByDate(function(selfStudy){
        selfStudy.moment = moment;
        callback(selfStudy);
    })
}
exports.getSelfStudyDetails = function (date,callback) {
    db.getSelfStudyDetails(date,function (details) {
        callback(details);
    })
}
exports.getQuestion=function (callback) {
  db.getQuestion(function (rows) {
      callback(rows);
  });
};

exports.getAnswer=function (callback) {
    db.getAnswer(function (rows) {
        callback(rows);
    })
}
exports.getQuestionDetails=function (questionId,callback) {
    db.getQuestionContent(questionId,function (rows) {
         var question=rows;
        db.getAnswers(questionId,function (rows) {
            callback({
                moment:moment,
                question:question,
                answerList:rows
            });
        });
    });
};
exports.addCourse = function(courseName,courseDate,teacherName,beginTime,finishTime,courseTime,objectOriented,courseContent,callback){
    console.log( "courseName:"+courseName+"courseDate:"+courseDate+"teacherName:"+teacherName+" beginTime:"+beginTime+" finishTime:"+finishTime +
        " courseTime:"+courseTime+" objectOriented:"+objectOriented+" courseContent:"+courseContent);
    db.addCourse(courseName,courseDate,teacherName,beginTime,finishTime,courseTime,objectOriented,courseContent,function (rows) {
        // console.log("rows:"+JSON.stringify(rows));
        callback(rows)
    })
}
exports.login = function(phoneNumber, password, callback){
    db.findAccount(phoneNumber, password, function(rows){
        console.log("row:"+JSON.stringify(rows))
        if(rows[0] == null){
            callback({
                status:false,
                desc:"手机号或密码错误",
            })
        }else if(rows[0].userName == null || rows[0].userName.length == 0){
            callback({
                status:true,
                userId:rows[0].userId,
                desc:"姓名不能为空，请先完善信息",
                name:true
            })
        }else{
            callback({
                status:true,
                userId:rows[0].userId,
                desc:"登录成功"
            })
        }

    });
};
exports.editPassword=function (userId,oldPassword,password,callback) {
    db.editPassword(userId,oldPassword,password,function (data) {
        callback(data);
    })
};
exports.Delete=function (Id,type,desc,callback) {
    console.log("Id:"+Id);
    db.Delete(Id,type,desc,function (ret) {
        callback(ret);
    })
}
exports.register=function (userName,phoneNumber,callback) {
    console.log('userName1:'+userName);
    db.register(userName,phoneNumber,function (data) {
        if(data.status){
        callback({
            desc:"注册成功"
        });
        }
        else{
            callback({
                desc:"注册失败"
            })
        }
    })
}
exports.registerTeacher=function (userName,phoneNumber,courseName,callback) {
    console.log('userName1:'+userName);
    db.registerTeacher(userName,phoneNumber,courseName,function (data) {
        if(data.status){
            callback({
                desc:"注册成功"
            });
        }
        else{
            callback({
                desc:"注册失败"
            })
        }
    })
}
exports.addStudent=function(courseId,data,callback){
    console.log("data2:"+data);
    console.log("courseId:"+courseId);
    db.addStudent(courseId,data,function (ret) {
        if(ret.status){
            callback(ret);
        }
        else{
            callback(ret)
        }
    })
}
