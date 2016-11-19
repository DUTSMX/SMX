var dbHelper = require('./dbHelper');
var conn = dbHelper.getConn();

exports.addQuestion = function(userId,title,content,time,callback){
    // var picurl = arguments[2]?arguments[2]:null;
    // var voiceurl = arguments[3]?arguments[3]:null;
    var sql = "INSERT INTO question(userId,questionTitle,questionContent,questionTime) VALUES ('"+userId+"','"+title+"','"+content+"','"+time+"')";
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.error(err);
        }
        callback(rows);
    })
}

exports.getQuestion = function(Id,callback){
    var sql = "SELECT questionId,userId,questionTitle,questionContent,questionTitle as questionId,'提问者','提问内容',picurl,voiceurl " +
        "from question WHERE questionId = "+Id+"";
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