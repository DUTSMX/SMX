var db = require("./dBHelper");
var conn = db.getConn();

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

exports.getVideoDetails = function(videoId,callback){
    var sql = "SELECT v.videoName ,"+
        "v.authorId AS teacherId,"+
        "v.videoTime ,"+
        "v.videoAbstract "+
        "FROM video v WHERE v.videoId ="+videoId+"";
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
        "FROM account a WHERE userId ="+studentId+"" ;
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
    var sql = "SELECT j.courseId,"+
        "a.userName as teacherName,"+
        "c.courseName,"+
        "c.courseTime,"+
        "c.objectOriented,"+
        "c.courseContent,"+
        "COUNT(j.userId)+'人' as courseCount  "+
        "FROM course c JOIN joinCourse j ON j.courseId = c.courseId  JOIN account a ON j.userId = a.userId "+
        "WHERE j.courseId ="+
        "( SELECT j.courseId  "+
        "FROM joinCourse j JOIN account a ON j.userId = a.userId WHERE a.userId="+studentId+" )";
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

exports.getTeacherDetails = function(teacherId,callback) {
    var sql = "SELECT a.userId as teacherId , " +
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
            callback(rows);
        }
    })
};

exports.getTeacherListDetails = function(teacherId,callback) {
    var sql = "SELECT c.courseId ,"+
    "a.userName as teacherName ,"+
    "c.courseName ,"+
    "c.courseTime ,"+
    "c.objectOriented ,"+
    "c.courseContent ,"+
    "COUNT(j.userId) as courseCount  "+
    "FROM course c JOIN account a ON c.userId = a.userId JOIN joinCourse j ON j.courseId = c.courseId "+
    "WHERE c.courseId = "+
        "(SELECT c.courseId "+
        "FROM course c JOIN account a ON a.userId = c.userId WHERE a.userId = "+teacherId+" )";
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
    var sql ="SELECT v.videoId ,"+
        "a.userName as teacherName ,"+
        "v.videoName ,"+
        "v.videoTime ,"+
        "v.videoWatchCount ,"+
        "v.createTime as videoCreateTime ,"+
        "vt.tagName as videoTagName "+
        "FROM video v JOIN account a ON v.authorId = a.userId JOIN videotag vt ON vt.videoId = v.videoId "+
        "WHERE v.videoId ="+
            "(SELECT v.videoId "+
            "FROM video v JOIN account a ON a.userId = v.authorId WHERE a.userId =  "+teacherId+" )";
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
