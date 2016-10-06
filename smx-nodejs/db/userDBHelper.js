var dbHelper = require('./dbHelper');
var conn = dbHelper.getConn();

exports.findAccount = function (phoneNumber, password, callback) {
    var sql = 'SELECT * FROM account WHERE phoneNumber = ' + phoneNumber + ' and  password =' + password;
    conn.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
        }
        callback(rows)
    })
}

exports.findAccountByNum = function(phoneNumber,callback){
    var sql = 'SELECT * FROM account WHERE phoneNumber = ' + phoneNumber;
    conn.query(sql, function (err, rows, fields) {
        if (err) {
            console.error(err);
        }
        callback(rows)
    })
}

exports.findAccountById = function(userId,callback){
    var sql = 'SELECT phoneNumber,teacher,name FROM account WHERE id = '+userId;
    conn.query(sql,function(err,rows,fileds){
        if(err){
            console.error(err);
            callback(unknownError);
        }
        callback(rows);
    })
}

exports.addAccount = function(phoneNumber,password,callback){
    var sql = "INSERT INTO account(phoneNumber,password) VALUES ("+phoneNumber+","+password+")";
    conn.query(sql,function(err,rows,fileds){
        if(err){
            console.error(err);
        }
        console.log(rows);
        callback(rows);
    })
}

exports.finishInfo = function(userId,name,gender,age,callback){
    var sql = "UPDATE account SET name="+name+",gender="+gender+",age="+age+"WHERE id="+userId;
    conn.query(sql,function(err,rows,fileds){
        if(err){
            console.error(err);
        }
        callback(rows);
    })
}