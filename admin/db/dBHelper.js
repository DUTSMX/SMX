var mysql = require('mysql');
var moment = require('moment');
var conn = mysql.createConnection({
    host: '5835638b397af.gz.cdb.myqcloud.com',
    // host:'localhost',
    user: 'root',
    // password: 'root',
    password:'smxsjk123456',
    database: 'smx',
    port: 12409
    // port:3306
})
conn.connect();

exports.getConn = function(){
    return conn;
}

/*mysql一段时间没有请求连接会断开*/
setInterval(function () {
    conn.query('SELECT 1');
}, 5000);

exports.getCourse = function(callback){
    var sql = "SELECT c.courseId, " +
        "a.userName as teacherName, " +
        "c.courseName, " +
        "c.beginTime, " +
        "c.objectOriented, " +
        "c.courseContent, " +
        "COUNT(s.userId)+'人' as courseCount " +
        "FROM course c JOIN account a ON a.userId = c.userId JOIN joinCourse s on c.courseId = s.courseId " +
        "GROUP BY s.courseId";

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
exports.getQuestion = function(callback){
    var aContent =  100;
    var sql = "SELECT d.questionId, " +
        "d.questionTitle," +
        "left(d.questionContent,"+ aContent +") as questionContent, " +
        "a.userName as asker, " +
        "d.questionTime, " +
        "COUNT(f.questionId) as answerNumber " +
        "FROM question d JOIN account a ON a.userId = d.userId JOIN answer f on d.questionId = f.questionId " +
        "GROUP BY f.questionId";

    conn.query(sql,function (err,rows) {
        console.log(sql);
        if(err){
            console.log(err);
            return false;
        }else{
            callback(rows);
        }
    })
};
exports.getQuestionContent = function (questionId,callback) {
    var sql="SELECT d.questionId,"+
            "d.questionTitle,"+
            "d.questionContent,"+
            "d.questionTime "+
            "FROM question d JOIN account a ON a.userId=d.userId "+"WHERE d.questionId ="+questionId;
    conn.query(sql,function (err,rows) {
        if(err){
            console.log(err);
            return false;
        }
        else if(rows== null||rows[0]== null){
            console.log("questionContent empty questionId ="+questionId);
        }
        else{
            callback(rows[0]);
        }
    })
};
exports.getAnswers=function (questionId,callback) {
    var aContent = 100;
    console.log("questionId:"+questionId);
    var sql = "SELECT b.answerId as answerId, " +
        "c.userName as useName, " +
        "b.answerTime as answerTime, " +
        "left(b.answerContent,"+ aContent +") as answerContent " +
        "FROM answer b INNER JOIN account c on b.userId = c.userId " +
        "WHERE b.questionId = "+questionId;
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
            return
        }
        callback(rows);
    })
};
exports.getStudent = function(callback){
    var sql = "SELECT a.userId as studentId, " +
        "a.registerDate as studentRegisterDate, " +
        "a.userName as studentName, " +
        "a.userAge as studentAge, " +
        "a.userGrade as studentGrade, " +
        "a.userSchool as studentSchool, " +
        "a.userAddress as studentAddress " +
        "FROM account a WHERE a.role in(0,1)" +
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

exports.getStudentDetails = function(studentId,callback){
    var sql = "SELECT a.userId as studentId, " +
        "a.registerDate as studentRegisterDate, " +
        "a.userName as studentName, " +
        "a.userAge as studentAge, " +
        "a.userGrade as studentGrade, " +
        "a.userSchool as studentSchool, " +
        "a.userAddress as studentAddress " +
        "FROM account a WHERE userId ="+studentId ;
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

exports.getStudentListDetails = function (studentId,callback) {
    var sql1 = "SELECT j.courseId,"+
        "a.userName as teacherName,"+
        "c.courseName,"+
        "c.courseTime,"+
        "c.objectOriented,"+
        "c.courseContent,"+
        "COUNT(c.userId)+'人' as courseCount "+
        "FROM course c JOIN joinCourse j ON j.courseId = c.courseId  JOIN account a ON j.userId = a.userId "+
        "WHERE j.courseId ="+
        "( SELECT j.courseId "+
        "FROM joinCourse j JOIN account a ON j.userId = a.userId WHERE j.userId="+studentId+" )";
    conn.query(sql1,function (err,rows) {
        console.log(sql1);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
}

exports.getTeacherDetails = function(callback){
    var sql = "SELECT a.userId as teacherId, " +
        "x.createTime as teacherCreateTime, " +
        "a.registerDate as teacherRegisterDate, "+
        "a.userName as teacherName, " +
        "a.userAge as teacherAge,"+
        "a.userSchool as teacherSchool"+
        "x.goodCourse as teacherGoodCourse, " +
        "x.selfIntroduction as teacherSelfIntroduction " +
        "FROM account a LEFT JOIN teacher x ON a.userId = x.teacherId WHERE a.userId = 2 ";
    conn.query(sql,function (err,rows) {
        console.log(sql);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })

    var sql1 = "SELECT j.courseId,"+
        "a.userName as teacherName,"+
        "c.courseName,"+
        "c.courseTime,"+
        "c.objectOriented,"+
        "c.courseContent,"+
        "COUNT(c.userId)+'人' as courseCount "+
        "FROM course c JOIN joinCourse j ON j.courseId = c.courseId  JOIN account a ON j.userId = a.userId"+
        "WHERE j.courseId ="+
        "( SELECT j.courseId "+
        "FROM joinCourse j JOIN account a ON j.userId = a.userId WHERE j.userId=17 )";
    conn.query(sql1,function (err,rows) {
        console.log(sql1);
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
};