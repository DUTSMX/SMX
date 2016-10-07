var dbHelper = require('./dbHelper');
var conn = dbHelper.getConn();

exports.addCourse = function(userId,name,time,content,callback){
    var sql = "INSERT INTO course(name,teacher,time,content) VALUES ('"+name+"',"+userId+",'"+time+"','"+content+"')";
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.error(err);
        }
        callback(rows);
    })
}

exports.getCourse = function(userId,callback){
    var sql = "SELECT a.id,a.name,b.name as teacher,a.time,a.content FROM course a JOIN account b on a.teacher = b.id";
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.error(err);
        }
        callback(rows);
    })
}

exports.search = function(word,callback){
    var sql = "SELECT a.id,a.name,b.name as teacher,a.time,a.content FROM course a JOIN account b on a.teacher = b.id" +
        " WHERE CONCAT(a.`name`,b.`name`,a.time,a.content) LIKE '%"+word+"%'"

    console.log(sql);
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.error(err);
        }
        callback(rows);
    })
}