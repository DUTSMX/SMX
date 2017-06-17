var db = require("../db/userDbHelper")
var https = require("https")
exports.getSyllabus = function(callback){

    var data = {data:[]};
    var courseTime = ["7:00-8:30","8:40-10:10","10:20-11:50","13:30-15:00","15:10-16:40","16:50-18:20"];
    var teacherList = ["齐书强","张可爽","李金泰","韩军","李丹丹"];
    data.courseTime = courseTime;
    teacherList.forEach(function (teacher) {
        var temp= {'teacherName':teacher,'course':[]};
        courseTime.forEach(function (course) {
            temp.course.push({'time':course,'grade':"",'courseName':"",'student':""})
        })
        data.data.push(temp);
    })

    // callback(data);
    // db.getCourseTime(){
    //     db.getTeacherList(){
    //     }
    // }

    db.getSyllabus(function(rows){
        rows.forEach(function (item) {
            var teacherFlag = false
            //teacherList.forEach()
            data.data.forEach(function (teacher) {
                if(teacher.teacherName == item.teacherName){
                    teacherFlag = true;
                    var courseFlag = false;
                    teacher.course.forEach(function (course) {
                        console.log("course:"+course.time+" item:"+item.courseTime)
                        if(course.time == item.courseTime) {
                            courseFlag = true;
                            if(course.courseName == ""){
                                course.grade = item.grade;
                                course.courseName = item.courseName;
                                course.student = "<a href='www.baidu.com'>" + item.studentName + "</a>&nbsp;&nbsp;";
                                console.log("student:"+course.student)
                            }else if (course.grade == item.grade && course.courseName == item.courseName) {
                                course.student = course.student + "<a href='www.baidu.com'>" + item.studentName + "</a>&nbsp;&nbsp;";
                                console.log("student:"+course.student.studentName)
                            }
                        }
                    })
                    if(!courseFlag){
                        teacher.course.push({'time':item.courseTime,'grade':item.grade,'courseName':item.courseName,'student':[{'studentName':"<a href='www.baidu.com'>"+item.studentName+"</a>&nbsp;&nbsp;"}]})
                    }
                }
            })
            if(!teacherFlag){
                console.log("con't find "+item.teacherName);
                data.data.push({'teacherName':item.teacherName,'course':[{'time':item.courseTime,'grade':item.grade,'courseName':item.courseName,'student':[{'studentName':"<a href='www.baidu.com'>"+item.studentName+"</a>&nbsp;&nbsp;"}]}]});
            }
        })
        callback(data);
    })
}
exports.addElective1 = function(studentId,teacherId,courseTime,courseName,grade,callback){
    console.log("studentId:"+studentId+"teacherId:"+teacherId+"courseTime:"+courseTime+" courseName:"+courseName+" grade:"+grade);
    db.addElective1(studentId,teacherId,courseTime,courseName,grade,function(rows){
        callback(rows);
    })
}
var crypto = require('crypto');
function getMD5(str){
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}
exports.sentCourseMessage = function(studentId,callback){
    //var phone = phoneNumber;
    // var appkey = "5f3d448a372cfaa71eeeb9fda2e323fa";
    // console.log("getCourseMessage1")
    // var sig = getMD5(appkey+phone);
    // console.log("getCourseMessage2")
    //var message = {message:[]};
    //console.log("getCourseMessage")
    db.getCourseMessage(studentId,function (rows) {
        var message = {message:[]};
        console.log("rows:"+JSON.stringify(rows))
        var phone = rows[0].phoneNumber;
        // var phone ="18840824301"
        var appkey = "5f3d448a372cfaa71eeeb9fda2e323fa";
        console.log("getCourseMessage1")
        var sig = getMD5(appkey+phone);
        console.log("getCourseMessage2")
        console.log("phone:"+JSON.stringify(phone))
        console.log("message:"+JSON.stringify(message))
        rows.forEach(function (item) {
            message.message.forEach(function (student) {
                    student.studentName = item.studentName
            })
                message.message.push({
                    'studentName': item.studentName,
                    'course':[{'teacherName': item.teacherName, 'courseTime': item.courseTime, 'courseName': item.courseName, 'grade': item.grade}]
                })
            console.log("message:" + JSON.stringify(message));
        })
        console.log("phone:"+phone)
            var data = {
                "tel": {
                    "nationcode": "86",
                    "phone": phone
                },
                "msg": JSON.stringify(message) + "同学您好，您的课程安排如下：123如非本人操作，请忽略本短信",
                "sig": sig,
                "extend": "",
                "ext": ""
            }

            console.log("data:"+JSON.stringify(data))

            // var content= qs.stringify(data);
            var random = Math.floor(Math.random() * 10000000);
            var opt = {
                method: "POST",
                host: "yun.tim.qq.com",
                port: 443,
                path: "/v3/tlssmssvr/sendsms?sdkappid=1400019919&random=" + random,
                headers: {
                    "Content-Type": 'application/json;charset=UTF-8'
                }
            }
            var req = https.request(opt, function (serverFeedback) {
                serverFeedback.setEncoding("utf8");
                serverFeedback.on('data', function (body) {
                    console.log("data:" + body)
                })
            })
            req.on('error', function (e) {
                console.log("problem with request " + e.message);
            })
            req.write(JSON.stringify(data));
            req.end();
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