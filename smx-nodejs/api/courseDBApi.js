var db = require('../db/courseDBHelper')

exports.addCourse = function(userId,name,time,content,callback){
    db.addCourse(userId,name,time,content,function (rows) {
        callback(rows);
    })
}

exports.getCourse = function(userId,callback){
    db.getCourse(userId,function(rows){
        callback(rows);
    })
}