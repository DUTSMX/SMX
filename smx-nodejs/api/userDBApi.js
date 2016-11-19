var db = require('../db/userDBHelper')
var course = require('../db/courseDBHelper')

exports.login = function(phoneNumber, password, callback){
    db.findAccount(phoneNumber, password, function(rows){
        if(rows[0] == null){
            callback({
                status:false,
                desc:"手机号或密码错误"
            })
        }else{
            callback({
                status:true,
                userId:rows[0].id,
                desc:"登录成功"
            })
        }
    });
}

exports.register = function(phoneNumber,password,callback){
    db.findAccountByNum(phoneNumber,function(rows){
        if(rows[0] == null){
            db.addAccount(phoneNumber,password,function(rows){
              callback({
                  status:true,
                  userId:rows.insertId,
                  desc:"注册成功"
              })
            })
        }else{
            callback({
                status:false,
                desc:"该手机号已经注册过了"
            })
        }
    })
}

exports.getMineInfo = function(userId,callback){
    db.findAccountById(userId,function(rows){
        callback(rows);
    })
}

exports.finishInfo = function(userId,name,gender,age,callback){
    db.finishInfo(userId,name,gender,age,function (rows) {
        callback(rows);
    })
}

exports.getMyCourse = function(userId, callback){
    course.getCourseById(userId,function (rows) {
        callback(rows);
    })
}