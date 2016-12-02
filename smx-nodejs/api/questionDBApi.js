var db = require('../db/questionDBHelper')

exports.addQuestion = function(name,content,picurl,voiceurl,callback){
    db.addQuestion(name,content,picurl,voiceurl,function (rows) {
        callback(rows);
    })
}

exports.getQuestion = function(callback){
    db.getAnswer(function (rows) {
        var questionList = rows;
        db.getQuestion(function (rows) {
            rows.forEach(function (item) {
                questionList.push(item);
            })
            console.log(JSON.stringify(questionList));
            // questionList.sort(function (a,b) {
            //     return a.time<b.time?1:-1;
            // });
            // console.log(JSON.stringify(questionList));
            callback(questionList);
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