var db = require("../db/userDbHelper")
exports.getStudent=function (callback) {
    db.getStudent(function (rows) {
        callback(rows);
    })
};
exports.getTeacher=function (callback) {
    db.getTeacher(function (rows) {
        callback(rows);
    })
};

exports.getCourseDetails=function (courseId,callback) {
    db.getCourseDetails(courseId,function (detail) {
        callback(detail[0]);
    })
};

exports.getVideoDetails=function (videoId,callback) {
    db.getVideoDetails(videoId,function (detail2) {
        callback(detail2[0]);
    })
};

exports.getStudentDetails=function (studentId,callback) {
    db.getStudentDetails(studentId,function (detail) {
        db.getStudentListDetails(studentId,function (list) {
            callback({
                detail:detail[0],
                list:list
            });
        })
    })
};

exports.getTeacherDetails=function (teacherId,callback) {
    db.getTeacherDetails(teacherId,function (detail) {
        db.getTeacherListDetails(teacherId,function (list1) {
            db.getTeacherVideo(teacherId,function (list2) {
                callback({
                detail:detail[0],
                list1:list1 ,
                list2:list2
                });
            })
        })
    })
};