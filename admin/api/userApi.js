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

exports.getChecked=function (callback) {
    db.getChecked(function (rows) {
        callback({list:rows});
    })
};

exports.checked=function(teacherId,callback) {
    console.log( "teacherId:"+teacherId)
    db.checked(teacherId, function (rows) {
        callback(rows)
    })
};

exports.getWaitChecking=function (callback) {
    db.getWaitChecking(function (rows) {
        callback({list:rows});
    })
};
exports.agree=function(teacherId,callback) {
    console.log( "teacherId:"+teacherId)
    db.agree(teacherId, function (rows) {
        callback(rows)
    })
};
exports.disagree=function(teacherId,callback) {
    console.log( "teacherId:"+teacherId)
    db.disagree(teacherId, function (rows) {
        callback(rows)
    })
};

exports.getSuggestion=function (callback) {
    db.getSuggestion(function (rows) {
        callback(rows);
    })
};

exports.getSuggestionReply=function (feedbackId,callback) {
    db.getSuggestionReply(feedbackId,function (detail) {
        callback(detail[0]);
    })
};
exports.suggestionReply = function (feedbackId,reply,callback){
    console.log("feedbackId:"+feedbackId+ "reply:"+reply);
    db.suggestionReply(feedbackId,reply,function(rows) {
        callback(rows);
    })
};

exports.getCourseDetails=function (courseId,callback) {
    db.getCourseDetails(courseId,function (detail) {
        callback(detail[0]);
    })
};

exports.getCourseDetailsEdit = function(courseId,callback){
    db.getCourseDetailsEdit (courseId,function(rows){
        callback(rows);
    })
}
exports.courseDetailsEdit = function(courseId,courseName,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent,callback){
    console.log("courseId:"+courseId+"courseName:"+courseName+"courseDate:"+courseDate+" beginTime:"+beginTime+" finishTime:"+finishTime +
        " courseTime:"+courseTime+" objectOriented:"+objectOriented+" courseContent:"+courseContent);
    db.courseDetailsEdit(courseId,courseName,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent,function (rows) {
        // console.log("rows:"+JSON.stringify(rows));
        callback(rows)
    })
}

exports.getVideo=function (callback) {
    db.getVideo(function (rows) {
        callback(rows);
    })
};

exports.getVideoDetails=function (videoId,callback) {
    db.getVideoDetails(videoId,function (detail) {
        callback(detail[0]);
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

exports.getStudentListEdit=function(studentId,callback) {
    db.getStudentListDetails(studentId,function (rows) {
        callback({list:rows});
    })
};

exports.studentListEdit = function(studentId,registerDate,studentName,studentAge,studentGrade,studentSchool,studentAddress,callback){
    console.log( "studentId:"+studentId+"registerDate:"+registerDate+"studentName:"+studentName+"studentAge:"+studentAge+"studentGrade:"+studentGrade+"studentSchool:"+studentSchool+"studentAddress:"+studentAddress);
    db.studentListEdit(studentId,registerDate,studentName,studentAge,studentGrade,studentSchool,studentAddress,function (rows) {
        // console.log("rows:"+JSON.stringify(rows));
        callback(rows)
    })
};


exports.getTeacherListEdit=function(teacherId,callback) {
    db.getTeacherListDetails(teacherId,function (list1) {
        db.getTeacherVideo(teacherId, function (list2) {
            callback({
                list1: list1,
                list2: list2
            });
        })
    })
};

exports.teacherListEdit = function(teacherId,teacherCreateTime,teacherRegisterDate,teacherName,teacherAge,teacherSchool,teacherGoodCourse,teacherSelfIntroduction,callback){
    console.log( "teacherId:"+teacherId+"teacherCreateTime:"+teacherCreateTime+"teacherRegisterDate:"+teacherRegisterDate+"teacherName:"+teacherName+"teacherAge:"+teacherAge+"teacherSchool:"+teacherSchool+"teacherGoodCourse:"+teacherGoodCourse+"teacherSelfIntroduction:"+teacherSelfIntroduction);
    db.teacherListEdit(teacherId,teacherCreateTime,teacherRegisterDate,teacherName,teacherAge,teacherSchool,teacherGoodCourse,teacherSelfIntroduction,function (rows) {
        // console.log("rows:"+JSON.stringify(rows));
        callback(rows)
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
}