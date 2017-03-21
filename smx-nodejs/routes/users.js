var express = require('express');
var api = require('../api/userDBApi');
var utils = require('../utils/utils');
var router = express.Router();
var pages = require('./pages');
var path = require('path');
var course = require('../api/courseDBApi');
/*
* 请求我的页面
* req:
* res:{userId,userHeadUrl,userName,gender,role,status}
* */
router.get('/mine',function (req,res) {
    var userId = req.session.userId;
    api.getMineInfo(userId,function (ret) {
        console.log("ret:"+JSON.stringify(ret))
        res.render('mine',ret);
    })
})
/*
 * 修改问答状态
 * req:status
 * res:status,desc
 * */
router.post('/questionStatus',function (req,res) {
    var userId = req.session.userId;
    var status = req.body.status;
    api.setQuestionStatus(userId,status,function (ret) {
        res.send(ret);
    })
})
/*
* 申请家教页面
* req:
* res:
* */
router.get('/registerTeacher',function (req,res) {
    res.render('registerTeacher',{});
})
/*
* 申请家教操作
* req:
* res:status,desc
* */
router.post('/registerTeacher',function (req,res) {
    var userId = req.session.userId;
    var goodCourse = req.body.goodCourse;
    var selfIntro = req.body.selfIntro;
    api.registerTeacher(userId,goodCourse,selfIntro,function (ret) {
        console.log("ret:"+ret.desc)
        res.send(ret);
    })
})

/*
* 创建课程页面
* req:
* res:
* */
router.get('/createCourse',function (req,res) {
    res.render('createCourse',{});
})
/*
* 获得个人的课程列表
 * req:courseId
 * res:{[courseId,courseName,courseTime,teacherHeadUrl,teacherSchool,teacherGrade,teacherName]}
* */
router.get('/myCourse',function (req,res) {
    var userId = req.session.userId;
    api.getMyCourse(userId,function (myCourse) {
        console.log("myCourse:"+JSON.stringify(myCourse))
        res.render('myCourse',myCourse);
    })
})
/*
* 获得我的问题页面
* req:
* res:{headUrl,authorDetail,aHref,questionDetail}
* */
router.get('/myQuestion',function (req,res) {
    var userId = req.session.userId;
    api.getMyQuestion(userId, function (questionList) {
        console.log("question:"+JSON.stringify(questionList))
        res.render('myQuestion', questionList);
    })
})
/*
* 设置中心页面
* req:
* res
* */
router.get('/setCenter',function (req,res) {
    res.render('setCenter',{})
})
/*
* 登录页面
* req:
* res:
* */
router.get('/login',function (req,res) {
    res.render('login',{})
})
/*
* 登录操作
* req:phoneNumber,password
* res:{status,desc}[userId,name]
* */
router.post('/login',function(req,res){
    var phoneNumber = req.body.phoneNumber;
    var password = req.body.password;
    console.log("phoneNumber:"+phoneNumber+" password:"+password);
    api.login(phoneNumber,password,function (ret) {
        var userId = ret.userId;
        if(ret.status){
            req.session.userId = userId;
            ret.sourceUrl = req.session.sourceUrl;
            console.log("url:"+req.session.sourceUrl)
            console.log("ret:"+JSON.stringify(ret))
            res.send(ret);
        }else{
            console.log(ret)
            res.send(ret);
        }
    })
})
/*
* 获取验证码
* req:phoneNumber
* res:{status,desc}
* */
router.post('/getCheckCode',function (req,res) {
    var phoneNumber = req.body.phoneNumber;
    api.sendCheckCode(phoneNumber,function (rows) {
        console.log("rows:"+JSON.stringify(rows))
        res.send(rows);
    })
})

/*
* 注册页面
* req:phoneNumber,checkCode,password
* res:status.desc
* */
router.get('/register', function (req, res) {
    res.render('register',{})
})
/*
* 注册页面
* req:phoneNumber,checkCode,password
* res:status,desc
* */
router.post('/register',function (req,res) {
    var phoneNumber = req.body.phoneNumber;
    var checkCode = req.body.checkCode;
    var password = req.body.password;
    api.register(phoneNumber, checkCode, password, function (ret) {
        console.log("status:"+ret.status)
        if(ret.status){
            req.session.userId = ret.userId;
        }
        res.send(ret);
    });
})
/*
* 忘记密码页面
* req:
* res:
* */
router.get('/forgetPassword',function (req,res) {
    res.render('forgetPassword',{})
})
/*
* 忘记密码操作
* req:phoneNumber,checkCode,password
* res:{status,desc}
* */
router.post('/forgetPassword',function (req,res) {
    var phoneNumber = req.body.phoneNumber;
    var password = req.body.password;
    var checkCode = req.body.checkCode;
    api.forgetPassword(phoneNumber,checkCode,password,function (ret) {
        res.send(ret);
    })
})
/*
* 修改密码页面
* req:
* res:
* */
router.get('/changePassword',function (req,res) {
    res.render('changePassword',{})
})
/*
* 修改密码操作
* req:oldPassword,password
* res:{status,desc}
* */
router.post('/changePassword',function (req,res) {
    var userId = req.session.userId;
    var oldPassword = req.body.oldPassword;
    var password = req.body.newPassword;
    api.changePassword(userId, oldPassword, password, function (ret) {
        res.send(ret);
    })
})
/*
* 退出登录操作
* */
router.get('/logout',function (req,res) {
    delete req.session.userId;
    res.render('login',{});
})
/*
* 个人信息展示页面
* req:
* res:{userHeadUrl,userName,gender,userAge,userSchool,userGrade,userAddress}
* */
router.get("/personDetail",function (req,res) {
    var userId=req.session.userId;
    api.getUserInfo(userId,function (rows) {
        rows.self=false;
        console.log(JSON.stringify(rows));
        res.render("personDetail",rows);
    })
})
/*个人信息修改页面
* req:
* res:{userHeadUrl,userName,gender,userAge,userSchool,userGrade,userAddress}
* */
router.get("/personDetailEdit",function (req,res) {
    var userId=req.session.userId;
    var from = req.query.from;
    console.log("userId:"+userId)
    api.getUserInfo(userId,function (rows) {
        rows.from = from;
        rows.userId = userId;
        console.log(JSON.stringify(rows));
        res.render("personDetailEdit",rows);
    })
})
/*
* 个人信息修改操作
* */
router.post("/editInfo",function (req,res) {
    var userId = req.session.userId
    console.log("zxc");
    var head = req.body.head;
    var name=req.body.name;
    var gender=req.body.gender;
    var age=req.body.age;
    var school=req.body.school;
    var grade=req.body.grade;
    var address=req.body.address;
    console.log("123456");
    api.editInfo(userId,head,name,gender,age,school,grade,address,function (rows) {
        console.log(rows);
        res.send(rows);
    })
});
/*
* 意见反馈页面
* */
router.get("/feedback",function (req,res) {
    res.render("feedback",{});
});
/*
* 意见反馈操作
* req:content
* res:status,desc
* */
router.post("/feedback",function (req,res) {
    var userId = req.session.userId;
    var content = req.body.content;
    api.saveFeedback(userId,content,function (rows) {
        res.send(rows)
    })
})

/*
* unuse


//登录
//GET phoneNumber,password
router.post('/login', function (req, res) {
    var phoneNumber = req.body.phoneNumber;
    var password = req.body.password;
    console.log("login start");
    api.login(phoneNumber, password, function (ret) {
        if(ret.status){
            req.session.userId = ret.userId;
            console.log("put userId:"+ret.userId);
            console.log("target:"+utils.getServer()+req.session.source);
            if(req.session.source == null){
                res.render("question");
                //res.write('<head><meta charset="utf-8"/></head>');
                //res.write(JSON.stringify(ret));
            }else{
                res.redirect(301,utils.getServer()+req.session.source);
            }
        }else{
            res.write('<head><meta charset="utf-8"/></head>');
            res.write(JSON.stringify(ret));
        }
    });
=======
router.get('/uploadImg',function (req,res) {
    api.uploadImg(function (ret) {
        res.send(ret);
    })
>>>>>>> b87291edd7ab5150d9cba35af5eac4c7c88c81c7
})


/*
//完善个人信息
router.get('/finishInfo',function(req,res){
    var userId = req.session.userId;
    console.log("get userId:"+req.session.userId);
    var name = req.query.userName;
    var gender = req.query.userGrade;
    var age = req.query.userAge;
    api.finishInfo(userId,name,gender,age,function(){
        res.redirect(301,utils.getServer()+req.session.source);
    })

})
*/
module.exports = router;