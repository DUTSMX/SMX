var db = require('../db/questionDBHelper')

exports.addQuestion = function(userId,questionTitle,questionContent,questionAbstract,callback){
    console.log("p")
    db.addQuestion(userId,questionTitle,questionContent,questionAbstract,function (rows) {
        callback(rows);
    })
}

exports.getQuestion = function(callback){
    db.getQuestionList(function (questionList) {
        db.getOnlineTeacher(function (teacherList) {
            callback({
                teacherList:teacherList,
                questionList:questionList
            });
        })
    })
}

exports.getQuestionDetail = function(questionId,callback){
    db.getQuestionContent(questionId,function (rows) {
        var question = rows;
        db.getQuestionDetail(questionId,function(rows){
            callback({question:question,
            answerList:rows});
        })
    })

}

exports.searchQuestion = function(word,callback){
    db.searchQuestion(word,function(rows){
        callback(rows);
    })
}

exports.getAnswerDetail= function(answerId,callback){
    db.getAnswerDetail(answerId,function(rows){
        callback(rows);
    })
}

exports.askQuestion= function(userId,questionTitle,questionContent,callback){
    db.searchQuestion(userId,questionTitle,questionContent,function(rows){
        callback(rows);
    })
}
exports.answerQuestion = function (userId,questionId,answerContent,answerAbstract,callback) {
    db.addAnswer(userId,questionId,answerContent,answerAbstract,function (rows) {
        callback(rows);
    })
}
exports.getMyQuestion = function(userId, callback){
    db.getMyQuestion(userId, function (rows) {
        var question = rows;
        db.getMyAnswer(userId, function (rows) {
            rows.forEach(function (item) {
                question.add(item);
            })
            callback(question);
        })
    })
}