var db = require("../db/userDbHelper")

exports.postAddCourse = function(courseId,courseName,teacherId,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent,callback){
    console.log("courseId:"+courseId+" courseName:"+courseName+" teacherId:"+teacherId+" courseDate:"+courseDate+" beginTime:"+beginTime+" finishTime:"+finishTime +
        " courseTime:"+courseTime+" objectOriented:"+objectOriented+" courseContent:"+courseContent)
    db.postAddCourse(courseId,courseName,teacherId,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent,function (rows) {
        // console.log("rows:"+JSON.stringify(rows));
        callback(rows);
    })
};

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
exports.getChecked=function (callback) {
    db.getChecked(function (rows) {
        callback(rows);
    })
};
exports.getWaitChecking=function (callback) {
    db.getWaitChecking(function (rows) {
        callback(rows);
    })
};
exports.getSuggestion=function (callback) {
    db.getSuggestion(function (rows) {
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
        db.getStudentListDetails(studentId,function (rows) {
            callback({
                detail: detail[0],
                list: rows
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