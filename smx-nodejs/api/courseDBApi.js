var db = require('../db/courseDBHelper')

exports.getCourse = function(userId,callback){
    db.getCourse(userId,function(rows){
        callback(rows);
    })
}

exports.getCourseDetail = function(courseId,callback){
    db.getCourseDetail(courseId,function(rows){
        callback(rows);
    })
}

exports.getTeacherDetail = function(teacherId,callback){
    db.getTeacherDetail(teacherId, function (rows) {
        callback(rows)
    })
}

/*
* unuse
* */
exports.addCourse = function(userId,name,time,objectOriented,content,callback){
    db.addCourse(userId,name,time,objectOriented,content,function (rows) {
        callback(rows);
    })
}

exports.search = function(word,callback){
    db.search(word,function(rows){
        callback(rows);
    })
}


exports.joinCourse = function(userId,courseId,callback){
    db.getCourse(userId,courseId,function(rows){
        callback(rows);
    })
}