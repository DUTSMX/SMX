var db = require('../db/questionDBHelper')

exports.addQuestion = function(name,content,picurl,voiceurl,callback){
    db.addQuestion(name,content,picurl,voiceurl,function (rows) {
        callback(rows);
    })
}

exports.getQuestion = function(name,callback){
    db.getQuestion(name,function(rows){
        callback(rows);
    })
}

exports.searchQuestion = function(word,callback){
    db.searchQuestion(word,function(rows){
        callback(rows);
    })
}