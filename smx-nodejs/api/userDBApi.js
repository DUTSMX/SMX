var db = require('../db/userDBHelper')
var course = require('../db/courseDBHelper')
var question = require('../db/questionDBHelper')
var utils = require('../utils/utils')
var https = require('https');
var http = require('http');
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

exports.register = function(phoneNumber,checkCode, password,callback){
    db.getCheckCode(phoneNumber,function (rows) {
        if(rows != checkCode){
            callback({desc:"验证码错误"})
        }else{
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
    })
}

exports.forgetPassword = function (phoneNumber,checkCode,password,callback) {
    db.getCheckCode(phoneNumber,function (rows) {
        if(rows != checkCode){
            callback({desc:"验证码错误"})
        }else{
            db.findAccountByNum(phoneNumber,function(rows){
                if(rows[0] == null){
                    callback({
                        status:false,
                        desc:"该手机号尚未注册"
                    })
                }else{
                    db.updateAccount(phoneNumber,password,function(rows){
                        callback({
                            status:true,
                            desc:"修改成功"
                        })
                    })
                }
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
    db.judgeRole(userId,function (rows) {
    if(rows[0].role == 2){
        callback({
            status:false,
            desc:"已经是家教了还申请啥"
        })
    }else if (rows[0].role == 1){
        callback({
            status:false,
            desc:"已申请当家教，请耐心等待审核"
        })
    }
    else if (rows[0].role == 0){
        db.registerTeacher(userId,goodCourse,selfIntro,function(rows){
            callback({
                status:true,
                desc:"申请成功"
            })
        })
    }else{
        callback({
            status:false,
            desc:"未知错误"
        })
    }
    })
}
exports.sendCheckCode = function(phoneNumber,callback){
    var phone = phoneNumber;
    var appkey = "5f3d448a372cfaa71eeeb9fda2e323fa";
    var sig = utils.getMD5(appkey+phone);
    var number = Math.floor(Math.random()*9000+1000);
    console.log("number:"+number)
    var data = {
        "tel":{
            "nationcode":"86",
            "phone":phone
        },
        "type":"0",
        "msg":"您的验证码为"+number+"，如非本人操作，请忽略本短信",
        "sig":sig,
        "extend":"",
        "ext":""
    }
    var content= qs.stringify(data);
    var random = Math.floor(Math.random()*10000000);
    var opt = {
        method: "POST",
        host: "yun.tim.qq.com",
        port:443,
        path:"/v3/tlssmssvr/sendsms?sdkappid=1400019919&random="+random,
        headers: {
            "Content-Type": 'application/json;charset=UTF-8'
        }
    }
    var req = https.request(opt,function(serverFeedback){
        serverFeedback.setEncoding("utf8");
        serverFeedback.on('data',function (body) {
            console.log("data:"+body)
            db.saveCheckCode(phoneNumber,number,function (rows) {
                callback("验证码发送成功")
            })
        })
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
exports.uploadImg = function (callback) {
    var appId="10068625";
    var bucket = "smxbucket";
    var secretId =  "AKIDGPM8i9uTM4a0FJlqMgoljZ8a0IPLLlGi";
    var secretKey = "TowscBYpzznPq5B6pLfnjTIwOGUfdbP2";
    var expiredTime = 0;
    var timestamp = Math.floor(Date.parse(new Date())/1000);
    console.log("timestamp:"+timestamp)
    var random = Math.floor(Math.random()*10000);
    var Original = "a="+appId+"&b="+bucket+"&k="+secretId+"&e="+expiredTime+"&t="+timestamp+"&r="+random+"&f=";
    console.log("Original:"+Original)
    var SignTmp = utils.getHMacSHA1(secretKey,Original);
    var Sign = utils.BASE64(SignTmp+Original);
    console.log("Sign:"+Sign);
    var data = {
        "op":"create"
    }
    console.log("data,length:"+JSON.stringify(data).length)
    var opt={
        method:"POST",
        host:"tj.file.myqcloud.com",
        port:80,
        path:"/files/v2/"+appId+"/"+bucket+"/testfolder/",
        headers:{
            "Content-Type":"application/json",
            "Content-Length":JSON.stringify(data).length,
            "Authorization":Sign
        }
    }
    console.log("opt:"+JSON.stringify(opt))
    var req = http.request(opt,function (serverFeedback) {
        serverFeedback.setEncoding("utf8");
        serverFeedback.on('data',function (body) {
            console.log("data:"+body)
            callback("上传成功")
        })
    })
    req.on('error',function (e) {
        console.log("problem with request "+e.message);
    })
    req.write(JSON.stringify(data));
    req.end();
}