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


