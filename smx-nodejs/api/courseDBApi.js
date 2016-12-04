var db = require('../db/courseDBHelper')

exports.getCourse = function(userId,callback){
    db.getCourseById(userId,function(rows){
        var myCourse = rows;
        db.getCourse(function (rows) {
            callback({
                courseList:{
                rotation:null,
                myCourse:myCourse,
                allCourse:rows
                }
            })
        })
    })
}

exports.getCourseList = function (teacherId,callback) {
    db.getCourseById(teacherId,function (rows) {
        callback({myCourse:rows});
    })
}

exports.getCourseDetail = function(courseId,callback){
    db.getCourseDetail(courseId,function(rows){
        var courseDetail = rows;
        db.getJoinStudent(courseId, function (rows) {
            courseDetail.studentCount = rows.length+"人";
            console.log(JSON.stringify(courseDetail))
            callback(courseDetail);
        })
    })
}

exports.getTeacherDetail = function(teacherId,callback){
    db.getTeacherDetail(teacherId, function (rows) {
        callback(rows)
    })
}

exports.joinCourse = function(userId,courseId,callback){
    db.joinCourse(userId,courseId,function(rows){
        callback("已加入课程");
    })
}

exports.getStudentList = function(courseId,callback){
    db.getJoinStudent(courseId,function (rows) {
        callback({studentList:rows});
    })
}
/*
* unuse
*
exports.addCourse = function(userId,name,time,objectOriented,content,callback){
    db.addCourse(userId,name,time,objectOriented,content,function (rows) {
        callback(rows);
    })
}

exports.search = function(word,callback){
    db.search(word,function(rows){
        callback(rows);
    })
}*/