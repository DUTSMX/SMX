var mysql = require('mysql');

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
            return;
        }else{
            callback(rows);
        }
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
        "FROM account a JOIN teacher x ON a.userId = x.teacherId WHERE a.role = 2 " +
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