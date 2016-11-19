var db = require('../db/questionDBHelper')

exports.addQuestion = function(name,content,picurl,voiceurl,callback){
    db.addQuestion(name,content,picurl,voiceurl,function (rows) {
        callback(rows);
    })
}

exports.getQuestion = function(callback){
    db.getQuestion(function(rows){
        callback(rows);
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