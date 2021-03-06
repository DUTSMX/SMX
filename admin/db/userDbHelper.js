var db = require("./dBHelper");
var conn = db.getConn();

exports.getSyllabus = function(callback){
    var sql = "SELECT e.grade as grade ,e.courseName as courseName ,a.userName as studentName, ti.courseTime as courseTime , t.teacherName as teacherName "+
    "FROM elective e " +
        "left JOIN account a ON e.studentId = a.userId "+
        "LEFT JOIN courseTeacher t ON e.teacherId = t.teacherId "+
    "LEFT JOIN courseTime ti ON ti.courseTime = e.courseTime ";
    // var sql = "select * from elective";
    console.log("sql:"+sql)
    conn.query(sql,function (err,rows) {
        if(err){
            console.log(err);
            return;
        }else{
            console.log("data:"+JSON.stringify(rows))
            callback(rows);
        }
    })
};
exports.addElective1 = function(studentId,teacherId,courseTime,courseName,grade,callback){
    var sql = "INSERT INTO elective (studentId,teacherId,courseTime,courseName,grade) " +
        "VALUES ("+studentId+","+teacherId+",'"+courseTime+"','"+courseName+"','"+grade+"');"
    conn.query(sql, function (err,rows) {
        if (err) {
            console.log(err);
            callback({
                status:false,
                desc:err
            })
        }else {
            callback({
                status:true,
                desc:"选择课程成功"
            });
        }
    })
}
// exports.saveCourseMessage = function(phoneNumber,checkCode,callback){
//     this.getCourseMessage(phoneNumber,function (ret) {
//         if(ret == -1){
//             var sql = "INSERT INTO checkCode(phoneNumber,code) VALUES('"+phoneNumber+"','"+checkCode+"')";
//             conn.query(sql,function (err,rows) {
//                 if(err){
//                     console.log(err)
//                     callback({
//                         status:false,
//                         desc:err
//                     })
//                 }else{
//                     callback({
//                         status:true,
//                         desc:"验证码发送成功"
//                     })
//                 }
//             })
//         }else{
//             var sql = "UPDATE checkCode set code = '"+checkCode +"' WHERE phoneNumber = '"+phoneNumber+"'";
//             conn.query(sql,function (err,rows) {
//                 if(err){
//                     console.log(err)
//                     callback({
//                         status:false,
//                         desc:err
//                     })
//                 }else{
//                     callback({
//                         status:true,
//                         desc:"验证码发送成功"
//                     })
//                 }
//             })
//         }
//     })
// }
exports.getCourseMessage = function(studentId,callback){
    var sql = "select a.phoneNumber as phoneNumber, a.userName as studentName , t.teacherName as teacherName, e.courseTime as courseTime, e.courseName as courseName , e.grade as grade " +
        " from elective e left join account a on a.userId = e.studentId " +
        "left join courseTeacher t on t.teacherId = e.teacherId " +
        "where e.studentId = '"+studentId+"'";
    conn.query(sql,function (err,rows) {
        if(err){
            console.log(err);
            callback(-1)
        }else if(rows == null){
            console.log("saveCourseMessage rows is null")
            callback(-1)
        }else if(rows[0] == null){
            callback(-1)
        }else{
            console.log("rows:"+JSON.stringify(rows));
            callback(rows);
        }
    })


}

exports.getStudent = function(callback){
    var sql = "SELECT a.userId as studentId, " +
        "a.registerDate as studentRegisterDate, " +
        "a.userName as studentName, " +
        "a.userAge as studentAge, " +
        "a.userGrade as studentGrade, " +
        "a.userSchool as studentSchool, " +
        "a.userAddress as studentAddress " +
        "FROM account a WHERE a.role<2 " +
        "GROUP BY a.userId";

    conn.query(sql,function (err,rows) {
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
};

exports.getTeacher = function(callback){
    var sql = "SELECT a.userId as teacherId, " +
        "a.userName as teacherName, " +
        "x.createTime as teacherCreateTime, " +
        "a.registerDate as teacherRegisterDate, "+
        "x.goodCourse as teacherGoodCourse, " +
        "x.selfIntroduction as teacherSelfIntroduction " +
        "FROM account a LEFT JOIN teacher x ON a.userId = x.teacherId WHERE a.role = 2 " +
        "GROUP BY a.userId";

    conn.query(sql,function (err,rows) {
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
};

exports.getChecked = function(callback){
    var sql = "SELECT a.userId as teacherId, " +
        "a.registerDate as teacherRegisterDate, "+
        "a.userName as teacherName, " +
        "x.goodCourse as teacherGoodCourse, " +
        "x.selfIntroduction as teacherSelfIntroduction " +
        "FROM account a LEFT JOIN teacher x ON a.userId = x.teacherId WHERE a.role = 2 " +
        "GROUP BY a.userId ";
    conn.query(sql,function (err,rows) {
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
};

exports.checked = function(teacherId,callback){
    var sql = "UPDATE account a SET a.role = 0 WHERE a.userId = "+teacherId+"";
    console.log("sql:" + sql);
    conn.query(sql, function (err,rows) {
        if (err) {
            console.log(err);
            callback({
                status:false,
                desc:err
            })
        }else {
            callback({
                status:true,
                desc:"已驳回"
            });
        }
    })
};

exports.getWaitChecking = function(callback){
    var sql = "SELECT a.userId as teacherId, " +
        "a.registerDate as teacherCreateTime, "+
        "a.userName as teacherName, " +
        "x.goodCourse as teacherGoodCourse, " +
        "x.selfIntroduction as teacherSelfIntroduction " +
        "FROM account a LEFT JOIN teacher x ON a.userId = x.teacherId WHERE a.role = 1 " +
        "GROUP BY a.userId";
    conn.query(sql,function (err,rows) {
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
};


exports.agree = function(teacherId,callback){
    var sql = "update account a set a.role = 2 where a.userId = "+teacherId+"";
    console.log("sql:" + sql);
    conn.query(sql, function (err,rows) {
        if (err) {
            console.log(err);
            callback({
                status:false,
                desc:err
            })
        }else {
            callback({
                status:true,
                desc:"已同意"
            });
        }
    })
};
exports.disagree = function(teacherId,callback){
    var sql = "update account a set a.role = 0 where a.userId = "+teacherId+"";
    console.log("sql:" + sql);
    conn.query(sql, function (err,rows) {
        if (err) {
            console.log(err);
            callback({
                status:false,
                desc:err
            })
        }else {
            callback({
                status:true,
                desc:"已否决"
            });
        }
    })
};

exports.getSuggestion = function(callback){
    var sql="SELECT f.feedbackId , f.userId , "+
        "a.userName , "+
        "f.createTime as feedbackTime , "+
        "f.feedback , f.replyState "+
        "FROM feedback f JOIN account a ON f.userId = a.userId";
    conn.query(sql,function (err,rows) {
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
};

exports.getSuggestionReply = function(feedbackId,callback){
    var sql="SELECT f.feedbackId , f.userId , "+
        "a.userName , "+
        "f.createTime as feedbackTime , "+
        "f.feedback  "+
        "FROM feedback f JOIN account a ON f.userId = a.userId  WHERE f.feedbackId = "+feedbackId+"";
    conn.query(sql,function (err,rows) {
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
};
exports.suggestionReply = function (feedbackId,reply,callback) {
            var sql = "UPDATE feedback set replyState = '已回复', reply='" + reply + "' WHERE feedbackId=" + feedbackId + "";
            console.log("sql:" + sql)
            conn.query(sql, function (err, rows) {
                if (err) {
                    console.log(err);
                    callback({
                        status: false,
                        desc: err
                    })
                } else {
                    callback({
                        status: true,
                        desc: "回复成功"
                    });
                }
            })
}


exports.getCourseDetails = function(courseId,callback){
    var sql = "SELECT c.courseName ,"+
        "a.userId AS teacherId ,"+
        "c.beginTime AS courseBeginTime ,"+
        "c.finishTime AS courseFinishTime ,"+
        "c.courseTime ,"+
        "c.objectOriented , "+
        "c.courseContent ,"+
        "COUNT(j.userId) AS courseCount "+
        "FROM course c JOIN account a ON c.userId = a.userId JOIN joinCourse j ON j.courseId = c.courseId "+
        "WHERE c.courseId = "+courseId+"";
    conn.query(sql,function (err,rows) {
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
};
exports.getCourseDetailsEdit = function(courseId,callback){
    var sql="select courseId from course where courseId="+courseId+"";
    conn.query(sql,function(err,rows){
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
};
exports.courseDetailsEdit = function (courseId,courseName,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent, callback) {
            var sql ="UPDATE course set courseName='"+courseName+"',courseDate='"+courseDate+"',beginTime='"+beginTime+"',finishTime='"+finishTime+"',courseTime='"+courseTime+"',objectOriented='"+objectOriented+"',courseContent='"+courseContent+"' "+
                "WHERE courseId="+courseId+"";
            console.log("sql:"+sql)
            conn.query(sql, function (err,rows) {
                if (err) {
                    console.log(err);
                    callback({
                        status:false,
                        desc:err
                    })
                }else {
                    callback({
                        status:true,
                        desc:"课程修改成功"
                    });
                }
            })
}

exports.getVideo = function(callback){
    var sql = "SELECT v.videoId , "+
        "a.userName as teacherName , "+
        "v.videoName , "+
        "v.videoTime , "+
        "v.videoWatchCount , "+
        "v.createTime AS videoCreateTime , "+
        "vt.tagName AS videoTagName "+
        "FROM video v LEFT JOIN account a ON v.authorId = a.userId "+
        "JOIN videotag vt ON vt.videoId = v.videoId ";
    conn.query(sql,function (err,rows) {
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
};

exports.getVideoDetails = function(videoId,callback){
    var sql = "SELECT v.videoName ,"+
        "v.authorId AS teacherId,"+
        "v.videoTime ,"+
        "v.videoAbstract ,  "+
        "v.videoUrl "+
        "FROM video v " +
        "WHERE v.videoId = "+videoId+"";
    conn.query(sql,function (err,rows) {
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
};

exports.getVideoDetailsEdit = function(videoId,callback){
    var sql="select videoId from video where videoId="+videoId+"";
    conn.query(sql,function(err,rows){
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
};
exports.videoDetailsEdit = function (videoId,videoName,authorId,videoTime,videoAbstract ,videoUrl, callback) {
    var sql ="UPDATE video set videoName='"+videoName+"',authorId="+authorId+",videoTime='"+videoTime+"',videoAbstract='"+videoAbstract+"',videoUrl='"+videoUrl+"' "+
        "WHERE videoId="+videoId+" ";
    console.log("sql:"+sql)
    conn.query(sql, function (err,rows) {
        if (err) {
            console.log(err);
            callback({
                status:false,
                desc:err
            })
        }else {
            callback({
                status:true,
                desc:"视频修改成功"
            });
        }
    })
}

exports.getStudentDetails = function(studentId,callback){
    var sql = "SELECT a.userId as studentId, " +
        "a.phoneNumber, " +
        "a.registerDate as studentRegisterDate, " +
        "a.userName as studentName, " +
        "a.userAge as studentAge, " +
        "a.userGrade as studentGrade, " +
        "a.userSchool as studentSchool, " +
        "a.userAddress as studentAddress " +
        "FROM account a WHERE a.userId ="+studentId+"" ;
    conn.query(sql,function (err,rows) {
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows[0]);
        }
    })
};

exports.getStudentListDetails = function (studentId,callback) {
    var sql = "SELECT c.courseId,teacherName,courseName,courseTime,objectOriented,courseContent,courseCount FROM "+
        "(SELECT j.courseId, "+
        "a.userName as teacherName, "+
        "c.courseName,c.courseTime, "+
        "c.objectOriented, "+
        "c.courseContent, "+
        "COUNT(j.userId)+'人' as courseCount "+
        "FROM course c left JOIN joinCourse j ON j.courseId = c.courseId "+
        "JOIN account a ON c.userId = a.userId "+
        "group by courseId) c "+
    "JOIN joinCourse j ON j.courseId = c.courseId "+
    "JOIN account a ON j.userId = a.userId where a.userId ="+studentId+" ";
    conn.query(sql,function (err,rows) {
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
};

exports.studentListEdit = function (studentId,phoneNumber,studentName,studentAge,studentGrade,studentSchool,studentAddress, callback) {
            //console.log("rows[0]:"+JSON.stringify(rows[0]));
            var sql = "UPDATE account set userId="+studentId+",phoneNumber="+phoneNumber+",userName='"+studentName+"',userAge='"+studentAge+"',userGrade='"+studentGrade+"',userSchool='"+studentSchool+"',userAddress='"+studentAddress+"' "+
                    "WHERE userId="+studentId+"";
            console.log("sql:"+sql)
            conn.query(sql, function (err,rows) {
                if (err) {
                    console.log(err);
                    callback({
                        status:false,
                        desc:err
                    })
                }else {
                    callback({
                        status:true,
                        desc:"学生信息修改成功"
                    });
                }
            })
};
exports.teacherListEdit = function (teacherId,teacherName,phoneNumber,teacherAge,teacherSchool,teacherGoodCourse,teacherSelfIntroduction, callback) {
            var sql = "UPDATE account set phoneNumber="+phoneNumber+",userName='"+teacherName+"',userAge='"+teacherAge+"',userSchool='"+teacherSchool+"' "+
                "WHERE userId="+teacherId+"";
                console.log(sql);
            conn.query(sql, function (err,rows) {
                if (err) {
                    console.log(err);
                    callback({
                        status:false,
                        desc:err
                    })
                }else {
                    //console.log("rows[0]:"+JSON.stringify(rows[0]));
                    var sql = "UPDATE teacher set goodCourse='"+teacherGoodCourse+"',selfIntroduction='"+teacherSelfIntroduction+"' "+
                        "WHERE teacherId="+teacherId+"";
                    console.log("sql:"+sql)
                    conn.query(sql, function (err,rows) {
                        if (err) {
                            console.log(err);
                            callback({
                                status:false,
                                desc:err
                            })
                        }else {
                            callback({
                            status:true,
                            desc:"老师信息修改成功"
                            });
                        }
                   })
                }
            })
};


exports.getTeacherDetails = function(teacherId,callback) {
    var sql = "SELECT a.userId as teacherId , " +
        "a.phoneNumber, " +
        "x.createTime as teacherCreateTime , " +
        "a.registerDate as teacherRegisterDate , " +
        "a.userName as teacherName , " +
        "a.userAge as teacherAge ," +
        "a.userSchool as teacherSchool ," +
        "x.goodCourse as teacherGoodCourse , " +
        "x.selfIntroduction as teacherSelfIntroduction  " +
        "FROM account a LEFT JOIN teacher x ON a.userId = x.teacherId WHERE a.userId = "+teacherId+" ";
    conn.query(sql, function (err, rows) {
        console.log(sql);
        if (err) {
            console.log(err);
            return;
        } else {
            callback(rows[0]);
        }
    })
};

exports.getTeacherListDetails = function(teacherId,callback) {
    var sql =" SELECT c.courseId, "+
        "a.userName as teacherName, "+
        "c.courseName, "+
        "c.beginTime, "+
        "c.objectOriented, "+
        "c.courseContent , "+
        "count(j.userId) as courseCount "+
        "FROM course c left JOIN joinCourse j ON j.courseId = c.courseId "+
        "JOIN account a ON c.userId = a.userId where a.userId=  "+teacherId+" "+
        "group by c.courseId ";
    conn.query(sql,function (err,rows) {
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
};


exports.getTeacherVideo = function(teacherId,callback) {
    var sql = "SELECT v.videoId , "+
    "a.userName as teacherName , "+
        "v.videoName , "+
        "v.videoTime , "+
        "v.videoWatchCount , "+
    "v.createTime as videoCreateTime , "+
        "vt.tagName "+
    "FROM video v JOIN account a ON v.authorId = a.userId  "+
    "LEFT JOIN videotag vt ON v.videoId = vt.videoId  WHERE v.authorId = "+teacherId+" ";
    conn.query(sql,function (err,rows) {
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
};
