var db = require("../db/userDbHelper")

exports.getSyllabus = function(callback){

    var data = {data:[]};
    db.getSyllabus(function(rows){
        rows.forEach(function (item) {
            var teacherFlag = false
            data.data.forEach(function (teacher) {
                if(teacher.teacherName == item.teacherName){
                    teacherFlag = true;
                    var courseFlag = false;
                    teacher.course.forEach(function (course) {
                        console.log("course:"+course.time+" item:"+item.courseTime)
                        if(course.time == item.courseTime){
                            courseFlag = true;
                            course.student.forEach(function (student) {
                                student.studentName = student.studentName+ "<a href='www.baidu.com'>" +item.studentName+"</a>&nbsp;&nbsp;";
                                // course.student.push({'studentName':item.studentName});
                            })
                        }
                    })
                    if(!courseFlag){
                        teacher.course.push({'time':item.courseTime,'grade':item.grade,'courseName':item.courseName,'student':[{'studentName':"<a href='www.baidu.com'>"+item.studentName+"</a>&nbsp;&nbsp;"}]})
                    }
                }
            })
            if(!teacherFlag){
                data.data.push({'teacherName':item.teacherName,'course':[{'time':item.courseTime,'grade':item.grade,'courseName':item.courseName,'student':[{'studentName':"<a href='www.baidu.com'>"+item.studentName+"</a>&nbsp;&nbsp;"}]}]});
            }
        })
        callback(data);
        // var num=0;
        // for (var i=1;i<=5;i++) {
        //     for (var j=1;j<=6;j++){
        //         num++;
        //         if (teacher[i].teacherId == teacher[i] && time.get(j).timeId ==time[j])
        //             callback(list[num]);
        //     }
        // }
    })
}

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

exports.getVideoDetailsEdit = function(videoId,callback){
    db.getVideoDetailsEdit (videoId,function(rows){
        callback(rows);
    })
}
exports.videoDetailsEdit = function(videoId,videoName,authorId,videoTime,videoAbstract ,videoUrl, callback){
    console.log("videoId:"+videoId+"videoName:"+videoName+"authorId:"+authorId+" videoTime:"+videoTime+" videoAbstract:"+videoAbstract +" videoUrl:"+videoUrl);
    db.videoDetailsEdit(videoId,videoName,authorId,videoTime,videoAbstract,videoUrl,function (rows) {
        // console.log("rows:"+JSON.stringify(rows));
        callback(rows);
    })
}


exports.getStudentDetails=function (studentId,callback) {
    db.getStudentDetails(studentId,function (detail) {
        db.getStudentListDetails(studentId,function (rows) {
            callback({
                detail: detail,
                list: rows
            });
        })
    })
};

exports.getStudentListEdit=function(studentId,callback) {
    db.getStudentDetails(studentId,function (rows) {
        callback(rows);
    })
};

exports.studentListEdit = function(studentId,phoneNumber,studentName,studentAge,studentGrade,studentSchool,studentAddress,callback){
    console.log( "studentId:"+studentId+"phoneNumber:"+phoneNumber+"studentName:"+studentName+"studentAge:"+studentAge+"studentGrade:"+studentGrade+"studentSchool:"+studentSchool+"studentAddress:"+studentAddress);
    db.studentListEdit(studentId,phoneNumber,studentName,studentAge,studentGrade,studentSchool,studentAddress,function (rows) {
        // console.log("rows:"+JSON.stringify(rows));
        callback(rows)
    })
};


exports.getTeacherListEdit=function(teacherId,callback) {
    db.getTeacherDetails(teacherId,function (details) {
        callback(details)
    })
};

exports.teacherListEdit = function(teacherId,teacherName,phoneNumber,teacherAge,teacherSchool,teacherGoodCourse,teacherSelfIntroduction,callback){
    db.teacherListEdit(teacherId,teacherName,phoneNumber,teacherAge,teacherSchool,teacherGoodCourse,teacherSelfIntroduction,function (rows) {
        // console.log("rows:"+JSON.stringify(rows));
        callback(rows)
    })
};


exports.getTeacherDetails=function (teacherId,callback) {
    db.getTeacherDetails(teacherId,function (detail) {
        db.getTeacherListDetails(teacherId,function (list1) {
            db.getTeacherVideo(teacherId,function (list2) {
                callback({
                detail:detail,
                list1:list1 ,
                list2:list2
                });
            })
        })
    })
}