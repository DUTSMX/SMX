var db = require('../db/userDBHelper')
var course = require('../db/courseDBHelper')
var question = require('../db/questionDBHelper')
var utils = require('../utils/utils')
var https = require('https');
var qs = require('querystring')

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
                userId:rows[0].userId,
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

exports.forgetPassword = function (phoneNumber,password,callback) {
    db.findAccountByNum(phoneNumber,function(rows){
        if(rows[0] == null){
            callback({
                status:false,
                desc:"该手机号尚未注册"
            })
        }else{
            db.updateAccount(phoneNumber,password,function(rows){
                console.log("rows:"+JSON.stringify(rows));
                callback({
                    status:true,
                    desc:"修改成功"
                })
            })
        }
    })
}

exports.changePassword = function(userId,oldPassword,password,callback){
    db.changePassword(userId,oldPassword,password,function (ret) {
        callback(ret)
    })
}
exports.getMineInfo = function(userId,callback){
    db.findAccountById(userId,function(rows){
        var mineInfo = rows;
        db.getQuestionStatus(userId,function (ret) {
            mineInfo.status=ret;
            callback(rows);
        })
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
exports.getMyQuestion = function(userId, callback){
    question.getMyQuestion(userId, function (rows) {
        var questionList = rows;
        question.getMyAnswer(userId, function (rows) {
            rows.forEach(function (item) {
                questionList.push(item)
            })
            callback({questionList:questionList});
        })
    })
}
exports.setQuestionStatus = function(userId,status,callback){
    db.setQuestionStatus(userId,status,function (ret) {
        callback(ret);
    })
}
exports.registerTeacher = function(userId,goodCourse,selfIntro,callback){
    db.registerTeacher(userId,goodCourse,selfIntro,function (ret) {
        callback(ret);
    })
}
exports.sendCheckCode = function(phoneNumber,callback){
    var phone = phoneNumber;
    var appkey = "5f3d448a372cfaa71eeeb9fda2e323fa";
    console.log("sendCheckCode")
    // var sig = utils.md5(appkey+phone);
    // console.log("sig:"+sig);
    var number = (Math.random()*10000)%10000;
    var data = {
        "tel":{
            "nationcode":"86",
            "phone":"18840824301"
        },
        "type":"0",
        "msg":"您的验证码为"+number+"，如非本人操作，请忽略本短信",
        "sig":"9665fa863f8abc5d71ceb0cf3c9cdfd3",
        "extend":"",
        "ext":""
    }
    var content= qs.stringify(data);
    var opt = {
        method: "POST",
        host: "yun.tim.qq.com",
        port:443,
        path:"/v3/tlssmssvr/sendsms?sdkappid=1400019919&random=1261823",
        headers: {
            "Content-Type": 'application/json;charset=UTF-8'
            // "Content-Length": data.length
        }
    }
    console.log(opt);
    var req = https.request(opt,function(serverFeedback){
        console.log("status Code :"+serverFeedback.statusCode);
        console.log("headers:"+serverFeedback.headers);
        serverFeedback.setEncoding("utf8");
        serverFeedback.on('data',function (body) {
            console.log("body:"+body);
        })
        // callback(serverFeedback);
    })
    req.on('error',function (e) {
        console.log("problem with request "+e.message);
    })
    req.write(JSON.stringify(data));
    req.end();
}
exports.getUserInfo =function(userId,callback){
    db.getUserInfo(userId,function (rows) {
        callback(rows[0]);
    })

}