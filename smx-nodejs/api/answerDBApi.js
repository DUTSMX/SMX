var db = require('../db/answerDBHelper')

exports.addAnswer = function(name,qid,content,picurl,voiceurl,callback){
    db.addAnswer(name,qid,content,picurl,voiceurl,function (rows) {
        callback(rows);
    })
}   

exports.getAnswer = function(name,callback){
    db.getAnswer(name,function(rows){
        callback(rows);
    })
}

exports.searchAnswer = function(word,callback){
    db.searchAnswer(word,function(rows){
        callback(rows);
    })
}
