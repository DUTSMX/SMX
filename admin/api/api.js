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

exports.getStudent=function (callback) {
    db.getStudent(function (rows) {
        callback(rows);
    })
};
exports.getTeacher=function (callback) {
    db.getTeacher(function (rows) {
        callback(rows);
    })
};

exports.getStudentDetails=function (studentId,callback) {
    db.getStudentDetails(studentId,function (detail) {
        db.getStudentListDetails(studentId,function (list) {
            callback({
                detail:detail[0],
                list:list
            })
        })
    })
};
