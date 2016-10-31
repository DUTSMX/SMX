var dbHelper = require('./dbHelper');
var conn = dbHelper.getConn();
var users = require('./userDBHelper');

exports.addCourse = function (userId, name, time, objectOriented, content, callback) {
    var sql = "INSERT INTO course(userId,courseName,courseTime,objectOriented,courseContent) VALUES ('" + userId + "'," + name + ",'" + time + "','" + objectOriented + "','" + content + "')";
    conn.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
        }
        callback(rows);
    })
}

exports.getCourse = function (userId, callback) {
    var sql1 = "SELECT c.courseId as courseId,c.courseName as courseName,c.courseTime as courseTime," +
        // "a.userHeadUrl as teacherHeadUrl," +     //这个字段数据库里没有
        "a.userSchool as teacherSchool,a.userGrade as teacherGrade " +
        "FROM ((joinCourse j INNER JOIN course c ON j.courseId = c.courseId) INNER JOIN account a ON c.userId = a.userId)" +
        "WHERE j.userId = " + userId;
    var sql2 = "SELECT a.courseId as courseId,a.courseName as courseName,a.courseTime " +
        "as courseTime," +
        // "b.userHeadUrl as teacherHeadUrl," + //这个字段数据库里没有
        "b.userSchool as teacherSchool,b.userGrade " +
        "as teacherGrade,b.userName as teacherName " +
        "FROM course a JOIN account b on a.userId = b.userId " +
        "WHERE a.userId = " + userId;
    if (users.judgeRole(userId, function (rows) {
        console.log("length:"+rows.length);
            if (rows && rows.length > 0) {
                var role = rows[0].role;
                if (role == 0 || role == 1) {
                    console.log(sql1);
                    conn.query(sql1, function (err, rows, fields) {
                        if (err) {
                            console.error(err);
                        }
                        console.log("get course: "+JSON.stringify(rows));
                        callback(rows);
                    })
                } else if (role == 2) {
                    console.log(sql2);
                    conn.query(sql2, function (err, rows, fields) {
                        if (err) {
                            console.error(err);
                        }
                        console.log("get course 2: "+JSON.stringify(rows));
                        callback(rows);
                    })
                } else {
                    console.log("role = " + role)
                }
            } else {
                console.log("role is null")
            }
        }));
}

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

exports.joinCourse = function (userId, courseId, callback) {
    var sql = "INSERT INTO joinCourse(userId,courseId) VALUES ('" + userId + "','" + courseId + "')";

    conn.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
        }
        callback(rows);
    })
}