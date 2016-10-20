var dbHelper = require('./dbHelper');
var conn = dbHelper.getConn();

exports.addAnswer = function(name,qid,content,picurl,voiceurl,callback){
    var picurl = arguments[3]?arguments[3]:null;
    var voiceurl = arguments[4]?arguments[4]:null;
    var sql = "INSERT INTO answer(username,qid,content,picurl,voiceurl) VALUES ('"+name+"',"+qid+","+content+","+picurl+","+voiceurl+")";
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.error(err);
        }
        callback(rows);
    })
}

exports.getAnswer = function(name,callback){
    var sql = "SELECT id,qid,username,cotent,picurl,voiceurl as answerid,questionid,'回答者','回答内容',picurl,voiceurl " +
        "from answer WHERE username = "+name+" ";
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.error(err);
        }
        callback(rows);
    })
}

exports.searchAnswer = function(word,callback){
    var sql = "SELECT id,qid,username,content,picurl,voiceurl as answerid,questionid,'回" +
        "答者','回答内容',picurl,voiceurl from answer " +
        "WHERE CONCAT(username,content) LIKE '%"+word+"%' )";
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.error(err);
        }
        callback(rows);
    })
}