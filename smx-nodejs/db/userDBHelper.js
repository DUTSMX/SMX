var dbHelper = require('./dbHelper');
var conn = dbHelper.getConn();

exports.findAccount = function (phoneNumber, password, callback) {
    console.log(phoneNumber+password);
    var sql = "SELECT * FROM account WHERE phoneNumber = '"+ phoneNumber + "' and  password = '"+ password+"'";
    conn.query(sql, function (err, rows, fields) {
        console.log(rows);
        if (err) {
            console.log(err);
        }
        callback(rows)
    })
}

exports.findAccountByNum = function(phoneNumber,callback){
    var sql = 'SELECT * FROM account WHERE phoneNumber = ' + phoneNumber;
    conn.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        callback(rows)
    })
}

exports.findAccountById = function(userId,callback){
    var sql = 'SELECT phoneNumber,teacher,name FROM account WHERE id = '+userId;
    conn.query(sql,function(err,rows,fileds){
        if(err){
            console.log(err);
            callback(unknownError);
        }
        callback(rows);
    })
}

exports.addAccount = function(phoneNumber,password,callback){
    var sql = "INSERT INTO account(phoneNumber,password) VALUES ("+phoneNumber+","+password+")";
    conn.query(sql,function(err,rows,fileds){
        if(err){
            console.log(err);
        }
        console.log(rows);
        callback(rows);
    })
}

exports.finishInfo = function(userId,name,gender,age,callback){
    var sql = "UPDATE account SET name='"+name+"',gender='"+gender+"',age="+age+",teacher = 0 WHERE id="+userId;
    console.log(sql);
    conn.query(sql,function(err,rows,fileds){
        console.log(rows)
        if(err){
            console.log(err);
        }
        callback(rows);
    })
}
exports.judgeRole = function (userId,callback) {
    var sql ="SELECT role FROM account WHERE userId = '"+ userId +"'";
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.error(err);
        }
        console.log("rows:"+rows[0].role);
        callback(rows);
    })
}