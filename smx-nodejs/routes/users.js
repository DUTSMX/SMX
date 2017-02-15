var express = require('express');
var api = require('../api/userDBApi');
var utils = require('../utils/utils');
var router = express.Router();
var pages = require('./pages');
var path = require('path');
var course = require('../api/courseDBApi');

router.get('/mine',function (req,res) {
    var userId = req.session.userId;
    if(userId == null){
        res.redirect('../users/loginPage');
    }else{
        api.getMineInfo(userId,function (ret) {
            console.log("ret:"+JSON.stringify(ret))
            res.render('mine',ret);
        })
    }
})

router.get('/registerTeacherPage',function (req,res) {
    res.render('registerTeacher',{});
})
/*
* 创建课程
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
    api.getMyCourse(userId,function (rows) {
        res.render('myCourse',{myCourse:rows});
    })
})

router.get('/myQuestion',function (req,res) {var userId = req.session.userId;
    if(userId == null){
        res.redirect('../users/loginPage');
    }else {
        api.getMyQuestion(userId, function (questionList) {
            // console.log("question:"+JSON.stringify(questionList))
            res.render('myQuestion', questionList);
        })
    }
})

router.get('/setCenter',function (req,res) {
    res.render('setCenter',{})
})

router.get('/login',function (req,res) {
    res.render('login',{})
})

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

router.post('/getCheckCode',function (req,res) {
    console.log("获取验证码")
    var phoneNumber = req.body.phoneNumber;
    console.log("phoneNumber:"+phoneNumber)
    api.sendCheckCode(phoneNumber,function (rows) {
        res.send(rows);
    })
})

//注册
// GET phoneNumber,password
router.get('/register', function (req, res) {
    res.render('register',{})
})
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

router.get('/forgetPassword',function (req,res) {
    res.render('forgetPassword',{})
})
router.post('/forgetPassword',function (req,res) {
    var phoneNumber = req.query.phoneNumber;
    var password = req.query.password;
    var checkCode = req.query.checkCode;
    api.forgetPassword(phoneNumber,checkCode,password,function (ret) {
        res.send(ret.desc);
    })
})
router.get('/changePasswordPage',function (req,res) {
    res.render('changePassword',{})
})

router.get('/logout',function (req,res) {
    delete req.session.userId;
    res.render('login',{});
})

router.get('/questionStatus',function (req,res) {
    var userId = req.session.userId;
    var status = req.query.status;
    api.setQuestionStatus(userId,status,function (ret) {
        res.send("设置成功");
    })
})

router.post('/changePassword',function (req,res) {
    var userId = req.session.userId;
    if(userId == null){
        res.redirect('../users/loginPage');
    }else {
        var oldPassword = req.query.oldPassword;
        var password = req.query.newPassword;
        api.changePassword(userId, oldPassword, password, function (ret) {
            res.send(ret);
        })
    }
})

router.get('/registerTeacher',function (req,res) {
    var userId = req.session.userId;
    console.log("userId:"+userId);
    if(userId == null){
        res.redirect('loginPage');
    }else{
        var goodCourse = req.query.goodCourse;
        var selfIntro = req.query.selfIntro;
        api.registerTeacher(userId,goodCourse,selfIntro,function (ret) {
            console.log("ret:"+ret.desc)
            res.send(ret.desc);
        })
    }
})
router.get("/personDetail",function (req,res) {
    var userId=req.session.userId;
    console.log("userId:"+userId)
    if(userId == null){
        res.redirect('../users/loginPage');
    }else{
        api.getUserInfo(userId,function (rows) {
            rows.self=false;
            console.log(JSON.stringify(rows));
            res.render("personDetail",rows);
        })
    }
})
router.get("/personDetailEdit",function (req,res) { var userId=req.session.userId;
    console.log("userId:"+userId)
    if(userId == null){
        res.redirect('../users/loginPage');
    }else{
        api.getUserInfo(userId,function (rows) {
            console.log(JSON.stringify(rows));
            res.render("personDetailEdit",rows);
        })
    }
})

router.post("/editInfo",function (req,res) {
    var userId = req.session.userId
    console.log("userId1:"+req.session.userId);
    if( userId == null){
        console.log("ashdf");
        res.send("userId is null");
    }
    else{
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
    }
});


router.get("/retroaction",function (req,res) {
res.render("retroaction",{});
});

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