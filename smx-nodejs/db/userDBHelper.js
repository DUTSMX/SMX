var dbHelper = require('./dbHelper');
var conn = dbHelper.getConn();

exports.findAccount = function (phoneNumber, password, callback) {
    // console.log(phoneNumber+password);
    var sql = "SELECT * FROM account WHERE phoneNumber = '"+ phoneNumber + "' and  password = '"+ password+"'";
    conn.query(sql, function (err, rows, fields) {
        // console.log(rows);
        if (err) {
            console.log(err);
            return;
        }
        callback(rows)
    })
}

exports.findAccountById = function(userId,callback){
    var sql = 'SELECT userId,userHeadUrl,userName,gender,role FROM account WHERE userId = '+userId;
    console.log("sql:"+sql);
    conn.query(sql,function(err,rows,fileds){
        if(err){
            console.log(err);
            return;
            // callback(unknownError);
        }else if(rows == null || rows[0] == null){
            console("error account empty userId = "+userId);
        }else{
            callback(rows[0]);
        }
    })
}

exports.getQuestionStatus = function(userId,callback){
    var sql = "SELECT * FROM onlineTeacher WHERE userId = "+userId;
    conn.query(sql,function (err,rows) {
        if (err) {
            console.log(err);
            return;
        } else if (rows == null) {
            console.log("error getQuestionStatus is empty userId = " + userId);
        }else if(rows[0] != null) {
            callback(1);
        }else {
            callback(0);
        }
    })
}

exports.setQuestionStatus = function(userId,status,callback){
    console.log("userId:"+userId+" status:"+status)
    this.getQuestionStatus(userId,function (ret) {
        if(ret && status == 0){//删除
            var sql = "DELETE FROM onlineTeacher WHERE userId = "+userId;
            conn.query(sql,function (err,rows) {
                if(err){
                    console.log(err);
                    return;
                }else{
                    callback(rows);
                }
            })
        }else if(!ret && status == 1){//添加
            var sql = "INSERT INTO onlineTeacher(userId) VALUES("+userId+")";
            conn.query(sql,function (err,rows) {
                if(err){
                    console.log(err);
                }else{
                    callback(rows);
                }
            })
        }else{
            console.log("error rows:"+JSON.stringify(ret)+" userId:"+userId);
            return;
        }
    })
}
exports.findAccountByNum = function(phoneNumber,callback){
    var sql = 'SELECT * FROM account WHERE phoneNumber = ' + phoneNumber;
    conn.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            return;
        }
        callback(rows)
    })
}


exports.addAccount = function(phoneNumber,password,callback){
    var sql = "INSERT INTO account(phoneNumber,password) VALUES ("+phoneNumber+","+password+")";
    conn.query(sql,function(err,rows,fileds){
        if(err){
            console.log(err);
            return;
        }
        // console.log(rows);
        callback(rows);
    })
}

exports.updateAccount = function(phoneNumber,password,callback){
    var sql = "UPDATE account set password = '"+password+"' WHERE phoneNumber = "+phoneNumber;
    conn.query(sql,function (err,rows) {
        if(err){
            console.log(err);
            return
        }else{
            callback(rows);
        }
    })
}

exports.changePassword = function (userId,oldPassword,password,callback) {
    var sql = "SELECT * FROM account WHERE userId = "+userId +" and password = '"+oldPassword+"'";
    conn.query(sql,function (err,rows) {
        if(err){
            console.log(err);
            return;
        }else if(rows == null || rows[0] == null){
            callback("密码错误")
        }else{
            console.log("password:"+password)
            var sql = "UPDATE account set password = '"+password+"' WHERE userId = "+userId;
            conn.query(sql,function (err,rows) {
                if(err){
                    console.log(err);
                    return;
                }else{
                    callback("修改成功")
                }
            })
        }
    })
}
/*
exports.finishInfo = function(userId,name,gender,age,callback){
    var sql = "UPDATE account SET userName='"+name+"',userGrade='"+gender+"',userAge="+age+",role = 0 WHERE userId="+userId;
    // console.log(sql);
    conn.query(sql,function(err,rows,fileds){
        // console.log(rows)
        if(err){
            console.log(err);
            return;
        }
        callback(rows);
    })
}*/
exports.judgeRole = function (userId,callback) {
    var sql ="SELECT role FROM account WHERE userId = '"+ userId +"' ";
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
            return;
        }
        // console.log(rows);
        //console.log("rows:"+rows[0].role);
        callback(rows);
    })
}

exports.registerTeacher = function(userId,goodCourse,selfIntro,callback){
    var createTime = String(new Date());
    console.log("createTime");
    var sql = "INSERT INTO teacher(teacherId,goodCourse,selfIntroduction,createTime) VALUES("+userId+",'"+goodCourse+"','"+selfIntro+"','"+createTime+"')";
    console.log(sql);
    conn.query(sql,function (err,rows) {

        if(err){
            console.log(err)
            return
        }else{
            var userId = rows.insertId;
            var sql = "UPDATE account SET role = 2 WHERE userId = "+userId;
            conn.query(sql,function (err,rows) {
                if(err){
                    console.log(err);
                    return
                }else{
                    callback(rows)
                }
            })
        }
    })
}
exports.getUserInfo=function (userId,callback) {
    var sql="SELECT userName, " +
        "gender, " +
        "userAge," +
        "userSchool," +
        "userGrade," +
        "userAddress " +
        "FROM " +
        "account where userId="
    +userId
    console.log(sql);
    conn.query(sql,function (err,rows) {
        if(err){
            console.log(err);
        }
        else {
            console.log(JSON.stringify(rows));
            callback(rows);
        }
    })
}
