var dbHelper = require('./dbHelper');
var conn = dbHelper.getConn();

exports.getQuestionContent = function (questionId,callback) {
    var sql = "SELECT questionTitle, " +
        "questionContent " +
        "FROM question WHERE questionId = " + questionId;
    conn.query(sql, function (err,rows) {
        if(err){
            console.log(err);
            return;
        }else if(rows == null || rows[0] == null){
            console.log("questionContent empty questionId = "+questionId)
            return
        }else{
            callback(rows[0]);
        }
    })

}

exports.getQuestionDetail = function(questionId,callback){
    var aContent = 15;
    var sql = "SELECT b.answerId as answerId, " +
        "c.userHeadUrl as authorHeadUrl, " +
        "c.userName as authorName, " +
        "left(b.answerContent,"+ aContent +") as answerAbstract " +
        "FROM answer b INNER JOIN account c on b.userId = c.userId " +
        "WHERE b.questionId = "+questionId;
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
            return
        }
        callback(rows);
    })
}

exports.getAnswer = function (callback) {
    var aContent = 15;
    var sql = "SELECT CONCAT("+"'answerDetail?answerId='"+",b.answerId) as aHref, " +
        "c.userHeadUrl as authorHeadUrl, " +
        "CONCAT(c.userName,"+"'回答了问题'"+") as authorName, " +
        "a.questionTitle as questionTitle, "+
        "left(b.answerContent,"+ aContent +") as answerAbstract, " +
        "b.answerTime as time "+
        "FROM (question a INNER JOIN answer b on a.questionId = b.questionId) JOIN account c on b.userId = c.userId" ;
    // console.log("sql:"+sql);
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
            return;
        }
        callback(rows);
    })
}

exports.getQuestion = function (callback) {
    var aContent = 15;
    var sql = "SELECT CONCAT("+"'questionDetail?questionId='"+",a.questionId) as aHref, " +
        "c.userHeadUrl as authorHeadUrl, " +
        "CONCAT(c.userName,"+"'提出了问题'"+") as authorName, " +
        "a.questionTitle as questionTitle, "+
        "left(a.questionContent,"+ aContent +") as answerAbstract, "+
        "a.questionTime as time "+
        "FROM question a JOIN account c on a.userId = c.userId" ;
    // console.log("sql:"+sql);
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
            return;
        }
        callback(rows);
    })
}


exports.getAnswerDetail = function (answerId,callback) {
    var sql = "SELECT a.questionId as questionId," +
        "a.questionTitle as questionTitle,"+
        "c.userHeadUrl as authorHeadUrl," +
        "c.userName as authorName," +
        "b.answerContent as answerContent," +
        "b.answerTime as answerTime "+
        "FROM (question a INNER JOIN answer b on a.questionId = b.questionId) INNER JOIN account c on b.userId = c.userId " +
        "WHERE b.answerId = "+answerId;
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
            return
        }else if(rows == null || rows[0] == null){
            console.log("error answerDetail empty answerId = "+answerId);
            return;
        }else{
            callback(rows[0]);
        }
    })
}

exports.getMyQuestion = function (userId, callback) {
    var sql = "SELECT a.userHeadUrl as headUrl, " +
        "CONCAT(a.userName,"+"'提出了问题'"+") as authorDetail, " +
        "CONCAT("+"'questionDetail?questionId='"+",q.questionId ) as aHref, " +
        "q.questionTitle as questionDetail " +
        "FROM account a join question q ON a.userId = q.userId " +
        "WHERE q.userId = "+userId;
    // console.log("sql:"+sql);
    conn.query(sql, function (err,rows){
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
}

exports.getMyAnswer = function (userId,callback) {
    var aContent = 15;
    var sql = "SELECT a.userHeadUrl as headUrl, " +
        "concat(a.userName,"+"'回答了问题'"+") as authorDetail, " +
        "CONCAT("+"'answerDetail?answerId='"+",b.answerId) as aHref, " +
        "q.questionTitle as questionDetail " +
        "FROM answer b JOIN question q ON b.questionId = q.questionId JOIN account a ON b.userId = a.userId " +
        "WHERE q.userId = "+ userId;
    conn.query(sql, function (err,rows) {
        if(err){
            console.log(err);
            return;
        }else{
            callback(rows);
        }
    })
}

exports.getOnlineTeacher = function (callback) {
    var sql = "SELECT a.userId, " +
        "a.userHeadUrl as headUrl, " +
        "a.userName " +
        "FROM account a JOIN onlineTeacher o ON a.userId = o.userId ";
    conn.query(sql, function (err,rows) {
        if(err){
            console.log(err)
            return;
        }else if(rows == null){
            console.log("onlineTeacher is empty");
            return;
        }else{
            callback(rows);
        }
    })
}
/*
exports.searchQuestion = function(word,callback){
    var sql = "SELECT questionId,userName,userHeadUrl,questionTtile,questionContent,questionTime as questionId,'提" +
        "问者','提问内容',picurl,voiceurl from question " +
        "WHERE CONCAT(username,content) LIKE '%"+word+"%' )";
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
            return;
        }
        callback(rows);
    })
}
exports.askQuestion = function (userId,questionTitle,questionContent,callback) {
    var time = sd.format(new Date().toLocaleString(), 'YYYY-MM-DD HH:mm:ss');
    var sql = "INSERT INTO question (userId,questionTitle,questionContent,questionTime)" +
        "VALUES ("+userId+",'"+questionTitle+"','"+questionContent+"','"+time+"')";
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.error(err);
        }
        callback(rows);
    })
}*/

