var dbHelper = require('./dbHelper');
var conn = dbHelper.getConn();

exports.getQuestionContent = function (questionId,callback) {
    var sql = "SELECT questionTitle, " +
        "questionContent " +
        "FROM question WHERE questionId = " + questionId;
    conn.query(sql, function (err,rows) {
        if(err){
            console.log(err);
        }else if(rows == null || rows[0] == null){
            console.log("empty")
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
            console.error(err);
        }
        callback(rows);
    })
}

exports.searchQuestion = function(word,callback){
    var sql = "SELECT questionId,userName,userHeadUrl,questionTtile,questionContent,questionTime as questionId,'提" +
        "问者','提问内容',picurl,voiceurl from question " +
        "WHERE CONCAT(username,content) LIKE '%"+word+"%' )";
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.error(err);
        }
        callback(rows);
    })
}

exports.getQuestion = function (callback) {
    var aContent = 15;
    var sql = "SELECT a.questionId as questionId, " +
        "b.answerId as answerId, " +
        "c.userHeadUrl as authorHeadUrl, " +
        "c.userName as authorName, " +
        "a.questionTitle as questionTitle, "+
        "left(b.answerContent,"+ aContent +") as answerAbstract "+
        "FROM (question a INNER JOIN answer b on a.questionId = b.questionId) INNER JOIN account c on b.userId = c.userId" ;
    console.log("sql:"+sql);
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.error(err);
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
        }else if(rows == null || rows[0] == null){
            console.log("empty")
        }else{
            callback(rows[0]);
        }
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
}
