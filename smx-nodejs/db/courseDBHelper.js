var dbHelper = require('./dbHelper');
var conn = dbHelper.getConn();
var users = require('./userDBHelper');

exports.getCourse = function(callback){
    var nowTime = new Date().getTime();
    var sql = "SELECT c.courseId, " +
        "c.courseName, " +
        "c.courseTime, " +
        "a.userHeadUrl as teacherHeadUrl, " +
        "a.userName as teacherName, " +
        "a.userSchool as teacherSchool, " +
        "a.userGrade as teacherGrade " +
        "FROM course c JOIN account a ON a.userId = c.userId AND c.courseDate >= curdate()";

    conn.query(sql,function (err,rows) {
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }

    })
}

exports.getCourseById = function (userId, callback) {
    var nowTime = new Date().getTime();
    var sql1 = "SELECT c.courseId, " +
        "c.courseName, " +
        "c.courseTime, " +
        "a.userHeadUrl as teacherHeadUrl, " +
        "a.userName as teacherName, " +
        "a.userSchool as teacherSchool, " +
        "a.userGrade as teacherGrade " +
        "FROM ((joinCourse j INNER JOIN course c ON j.courseId = c.courseId) INNER JOIN account a ON c.userId = a.userId) WHERE c.courseDate >= curdate()" ;
    var sql2 = "SELECT c.courseId, " +
        "c.courseName, " +
        "c.courseTime, " +
        "a.userHeadUrl as teacherHeadUrl, " +
        "a.userSchool as teacherSchool, " +
        "a.userGrade as teacherGrade, " +
        "a.userName as teacherName " +
        "FROM course c JOIN account a ON c.userId = a.userId " +
        "WHERE c.courseDate >= curdate() and c.userId = " + userId ;
    if (users.judgeRole(userId, function (rows) {
        // console.log("length:" + rows.length);
        if (rows && rows.length > 0) {
            var role = rows[0].role;
            console.log("role:"+role)
            if (role == 0 || role == 1) {//学生
                console.log("sql:"+sql1);
                conn.query(sql1, function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    // console.log("get course: " + JSON.stringify(rows));
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
    console.log("sql:"+sql);
    conn.query(sql,function (err,rows) {
        if(err){
            console.log(err);
            return;
        }else if(rows == null ){
            console.log("rows is null");
            return;
        }else if(rows[0] != null){
            console.log(userId+"已经加入课程"+courseId);
            callback("已加入课程")
            return;
        }else{
            var sql = "INSERT INTO joinCourse(userId,courseId) VALUES ('" + userId + "','" + courseId + "')";
            conn.query(sql, function (err, rows) {
                if (err) {
                    console.log(err);
                    return;
                }
                callback(rows);
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

/**
 * unuse
 */

exports.addCourse = function (userId,courseName,courseDate,beginTime,finshTime,courseTime,objectOriented,courseContent, callback) {
    var sql = "INSERT INTO course(userId,courseName,courseDate,beginTime,finshTime,courseTime,objectOriented,courseContent) VALUES ('" + userId + "','" + courseName + "','" + courseDate + "','" + beginTime + "','" + finshTime + "','" + courseTime + "','" + objectOriented + "','" + courseContent + "')";
    conn.query(sql, function (err,rows) {
        console.log(sql);
        if (err) {
            console.log(err);
            return;
        }else {
            callback(rows);
        }
    })
}
 /*
exports.search = function (word, callback) {
    var sql = "SELECT c.courseId as courseId,c.courseName as courseName,c.courseTime as courseTime," +
        "a.userHeadUrl as teacherHeadUrl,a.userSchool as teacherSchool,a.userGrade as teacherGrade  FROM course c JOIN account a on c.userId = a.userId" +
        " WHERE CONCAT(a.`courseName`,b.`userName`,a.courseTime,a.courseContent) LIKE '%" + word + "%'"

    console.log(sql);
    conn.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
        }
        callback(rows);
    })
}


 */