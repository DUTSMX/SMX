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

exports.getCourseDetail = function(userId,courseId,callback){
    db.getCourseDetail(courseId,function(rows){
        var courseDetail = rows;
        db.getJoinStudent(courseId, function (rows) {
            courseDetail.studentCount = rows.length+"人";
            // console.log(JSON.stringify(courseDetail))
            if(userId == null){
                courseDetail.join = 0;
                callback(courseDetail)
            }else{
                db.hasJoin(userId,courseId,function (rows) {
                    if(rows == null || rows[0] == null){
                        courseDetail.join = 0;
                    }else{
                        courseDetail.join = 1;
                    }
                    callback(courseDetail)
                })
            }
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
        callback(rows);
    })
}
exports.unJoinCourse = function (userId,courseId,callback) {
    db.unJoinCourse(userId,courseId,function (rows) {
        callback(rows)
    })
}
exports.getStudentList = function(courseId,callback){
    db.getJoinStudent(courseId,function (rows) {
        callback({studentList:rows});
    })
}
/*
* unuse
*/

exports.addCourse = function(userId,courseName,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent,callback){
    console.log("userId:"+userId+" courseName:"+courseName+" courseDate:"+courseDate+" beginTime:"+beginTime+" finishTime:"+finishTime +
        " courseTime:"+courseTime+" objectOriented:"+objectOriented+" courseContent:"+courseContent)
    db.addCourse(userId,courseName,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent,function (rows) {
            // console.log("rows:"+JSON.stringify(rows));
            callback(rows)
        })
    }

/*
exports.search = function(word,callback){
    db.search(word,function(rows){
        callback(rows);
    })
}*/