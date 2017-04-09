var db = require('../db/dBHelper')

exports.getCourse = function(callback){
    db.getCourse(function (rows) {
        callback(rows);
    })
};
exports.getCourseDetails=function (courseId,callback) {
    console.log("courseId:"+courseId);
    db.getCourseDetails(courseId,function (rows) {
        callback(rows);
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
            var moment = require("moment");
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
    db.Delete(Id,type,desc,function (ret) {
        callback(ret);
    })
}


