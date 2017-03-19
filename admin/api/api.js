var db = require('../db/dBHelper')

exports.getCourse = function(callback){
    db.getCourse(function (rows) {
        callback(rows);
    })
};
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


