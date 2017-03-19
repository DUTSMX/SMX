var dbHelper = require('./dbHelper');
var conn = dbHelper.getConn();
var users = require('./userDBHelper');

exports.getAdList = (function (callback) {
    var sql = "SELECT *" +
        "FROM ad";
    conn.query(sql,function (err,rows) {
        if(err){
            console.log(err);
        }else{
            callback(rows);
        }
    })

})

exports.getCourse = function(callback){
    var nowTime = new Date().getTime();
    var sql = "SELECT c.courseId, " +
        "c.courseName, " +
        "c.objectOriented, " +
        "c.courseDate, " +
        "c.beginTime, " +
        "c.finishTime, " +
        "a.userHeadUrl as teacherHeadUrl, " +
        "a.userName as teacherName "+
        "FROM course c JOIN account a ON a.userId = c.userId"
        // + " AND c.courseDate >= curdate()";

    conn.query(sql,function (err,rows) {
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            console.log("rows:"+rows);
            callback(rows);
        }

    })
}

exports.getCourseById = function (userId, callback) {
    var nowTime = new Date().getTime();
    var sql1 = "SELECT c.courseId, " +
        "c.courseName, " +
        "c.objectOriented, " +
        "c.courseDate, " +
        "c.beginTime, " +
        "c.finishTime, " +
        "a.userHeadUrl as teacherHeadUrl, " +
        "a.userName as teacherName "+
        "FROM ((joinCourse j INNER JOIN course c ON j.courseId = c.courseId) INNER JOIN account a ON c.userId = a.userId) " +
        "WHERE j.userId = " + userId;
        //  +"WHERE c.courseDate >= curdate()" ;
    var sql2 = "SELECT c.courseId, " +
        "c.courseName, " +
        "c.objectOriented, " +
        "c.courseDate, " +
        "c.beginTime, " +
        "c.finishTime, " +
        "a.userHeadUrl as teacherHeadUrl, " +
        "a.userName as teacherName "+
        "FROM course c JOIN account a ON c.userId = a.userId " +
        "WHERE c.userId = " + userId
        // +" and c.courseDate >= curdate()";
    if (users.judgeRole(userId, function (rows) {
        // console.log("length:" + rows.length);
        if (rows && rows.length > 0) {
            var role = rows[0].role;
            console.log("role:"+role)
            if (role == 0 || role == 1) {//学生
                console.log(sql1);
                conn.query(sql1, function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("get sql1: " + sql1);
                    console.log("get course: " + JSON.stringify(rows));
                    callback(rows);
                })
            } else if (role == 2) {//老师
                // console.log(sql2);
                conn.query(sql2, function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    // console.log("get course 2: " + JSON.stringify(rows));
                    callback(rows);
                })
            } else {
                console.log("error role = " + role)
                return;
            }
        } else {
            console.log("error role is null")
            return;
        }
    }));
}

exports.getCourseDetail = function (courseId, callback) {
    var sql = "SELECT a.userId as teacherId, " +
        "c.courseId as courseId, " +
        "a.userHeadUrl as teacherHeadUrl, " +
        "a.userName as teacherName, " +
        "a.userSchool as teacherSchool," +
        "a.userGrade as teacherGrade, " +
        "c.courseName, " +
        "c.courseTime, " +
        "c.objectOriented, " +
        "c.courseContent " +
        "FROM account a join course c " +
        "ON a.userId = c.userId " +
        "WHERE c.courseId = " + courseId;
    conn.query(sql, function (err, rows) {
        if (err) {
            console.log(err);
            return;
        } else if (rows == null || rows[0] == null) {
            console.log("error courseDetail empty courseId ="+courseId)
            return;
        } else {
            callback(rows[0]);
        }
    })
}

exports.getTeacherDetail = function (teacherId, callback) {
    var sql = "SELECT t.teacherId, " +
        "a.userName as teacherName, " +
        "a.userSchool as teacherSchool, " +
        "a.userGrade as teacherGrade, " +
        "t.goodCourse, " +
        "t.selfIntroduction " +
        "FROM account a join teacher t " +
        "ON a.userId = t.teacherId " +
        "WHERE a.userId = " + teacherId;
    conn.query(sql, function (err, rows) {
        if (err) {
            console.log(err);
            return
        } else if (rows == null || rows[0] == null) {
            console.log("error teacherDetail teacherId = "+teacherId);
            return;
        } else {
            callback(rows[0]);
        }
    })
}
exports.joinCourse = function (userId, courseId, callback) {
    var sql = "SELECT * FROM joinCourse WHERE userId = "+userId+" and courseId = "+courseId;
    conn.query(sql,function (err,rows) {
        if(err){
            console.log(err);
            callback({
                status:false
            })
        }else if(rows == null ){
            console.log("rows is null");
            callback({
                status:false,
                desc:"not found"
            })
        }else if(rows[0] != null){
            console.log(userId+"已经加入课程"+courseId);
            callback({
                status:false,
                desc:"已加入课程"
            })
        }else{
            var date = new Date();
            var sql = "INSERT INTO joinCourse(userId,courseId,joinTime) VALUES ('" + userId + "','" + courseId + "',"+conn.escape(new Date())+")";
            conn.query(sql, function (err, rows) {
                if (err) {
                    console.log(err)
                    callback({
                        status:false,
                        desc:err
                    })
                }else{
                    callback({
                        status:true,
                        desc:"已加入课程"
                    });
                }
            })
        }
    })
}

exports.unJoinCourse = function (userId,courseId,callback) {
    var sql = "SELECT * FROM joinCourse WHERE userId = "+userId+" and courseId = "+courseId;
    console.log("sql:"+sql);
    conn.query(sql,function (err,rows) {
        console.log("rows:"+JSON.stringify(rows))
        if(err){
            console.log(err);
            callback({
                status:false,
                desc:err
            })
        }else if(rows == null ){
            console.log("rows is null");
            callback({
                status:false,
                desc:"not found"
            })
        }else if(rows[0] == null){
            console.log(userId+"未加入课程"+courseId);
            callback({
                status:false,
                desc:"未加入课程"
            })
        }else{
            var sql = "DELETE FROM joinCourse WHERE userId = "+userId+" and courseId = "+courseId;
            conn.query(sql, function (err, rows) {
                if (err) {
                    callback({
                        status:false,
                        desc:err
                    })
                }else{
                    callback({
                        status:true,
                        desc:"已退出课程"
                    });
                }
            })
        }
    })
}

exports.getJoinStudent = function (courseId,callback) {
    var sql = "SELECT a.userId, " +
        "a.userHeadUrl as headUrl, " +
        "a.userName as userName " +
        "FROM account a JOIN joinCourse j on a.userId = j.userId " +
        "WHERE j.courseId = "+courseId;
    conn.query(sql,function (err,rows) {
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
}
exports.hasJoin = function(userId,courseId,callback){
    var sql = "SELECT * FROM joinCourse WHERE userId = "+userId +" and courseId = "+courseId;
    conn.query(sql,function (err,rows) {
        if(err){
            console.log(err);
        }else{
            callback(rows);
        }
    })
}

exports.addCourse = function (userId,courseName,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent, callback) {
    var sql = "INSERT INTO course(userId,courseName,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent) VALUES ('" + userId + "','" + courseName + "','" + courseDate + "','" + beginTime + "','" + finishTime + "','" + courseTime + "','" + objectOriented + "','" + courseContent + "')";
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
                desc:"课程创建成功"
            });
        }
    })
}
exports.search = function (word, callback) {
    var sql = "SELECT c.courseId as courseId,c.courseName as courseName,c.courseTime as courseTime," +
        "a.userHeadUrl as teacherHeadUrl,a.userSchool as teacherSchool,a.userGrade as teacherGrade  FROM course c JOIN account a on c.userId = a.userId" +
        " WHERE CONCAT(c.courseName,a.userName,c.courseTime,c.courseContent) LIKE '%" + word + "%'"

    console.log(sql);
    conn.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
        }
        callback(rows);
    })
}