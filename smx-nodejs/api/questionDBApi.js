var db = require('../db/questionDBHelper')

exports.addQuestion = function(userId,questionTitle,questionContent,callback){
    console.log("p")
    db.addQuestion(userId,questionTitle,questionContent,function (rows) {
        callback("提问成功");
    })
}

exports.getQuestion = function(callback){
    db.getAnswer(function (rows) {
        var questionList = rows;
        db.getQuestion(function (rows) {
            rows.forEach(function (item) {
                questionList.push(item);
            })
            // console.log(JSON.stringify(questionList));
            // questionList.sort(function (a,b) {
            //     return a.time<b.time?1:-1;
            // });
            // console.log(JSON.stringify(questionList));
            db.getOnlineTeacher(function (teacherList) {
                console.log("teacherList:"+JSON.stringify(teacherList));
                callback({
                    teacherList:teacherList,
                    questionList:questionList
                });
            })
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