var express = require('express');
var router = express.Router();
var course=require('../model/course');
var teacher=require('../model/teacher');
var user =require("../model/user")
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});
router.get('/joinManagerReport', function (req, res, next) {
    res.render('joinManagerReport');
});
router.get('/joinManagerDetail', function (req, res, next) {
    res.render('joinManagerDetail');
});
router.get('/education/joinReceptionTeacherList',function (req,res,next) {
    user.findAll({where:{role:1}}).then(function(ret){
        console.log(JSON.stringify(ret))
        res.render('joinReceptionTeacherList',{teacher:ret});
    })
})
router.get('/education/joinReceptionTeacherDetail',function (req,res,next) {
    res.render('joinReceptionTeacherDetail');
})
router.post('/createStudent', function (req, res, next) {
    console.log("body:"+JSON.stringify(req.body));
    var phoneNumber = req.body.phoneNumber;
    var userName = req.body.studentName;
    var userSchool = req.body.schoolName;
    var userGrade = req.body.classInfo;
    user.create({
        phoneNumber:phoneNumber,
        userName:userName,
        userSchool:userSchool,
        userGrade:userGrade
    }).then(function (data) {
        console.log("data:"+JSON.stringify(data));
        res.send("添加成功")

    }).catch(function(err){
        console.log("err:"+JSON.stringify(err))
        //res.send(JSON.stringify(err))
    });
});
router.get('/teacherDetail',function (req,res,next) {
    teacher.findOne({teacherId: 15}).then(function (ret) {
        console.log("ret:" + JSON.stringify(ret));
        ret.getUser().then(function (ret1) {
            console.log("ret1:" + JSON.stringify(ret1));
            res.render('teacherDetail', {info: ret1, infos: ret});
        })
    });
})
router.post('/createTeacher', function (req, res, next) {
    console.log("body:"+JSON.stringify(req.body));
    user.create({
        phoneNumber:req.body.phoneNumber,
        userName:req.body.teacherName,
        userSchool:req.body.schoolName,
        userGrade:req.body.classInfo
    }).then(function (data) {
        console.log("data:"+JSON.stringify(data));
    }).cache(function(err){
        console.log("err:"+JSON.stringify(err))
    });
    res.end("235")
});

router.get('/education/joinReceptionTeacherList',function (req,res,next) {
    user.findAll({where:{role:2}}).then(function(ret){
        console.log(JSON.stringify(ret))
        res.render('joinReceptionTeacherList',{teacher:ret});
    })
})

router.get('/joinReceptionTodayCourse',function (req,res,next) {
  res.render('joinReceptionTodayCourse');
})
router.get('/joinReceptionPrint',function (req,res,next) {
  res.render('joinReceptionPrint');
})
router.get('/joinReceptionCourseCalendar',function (req,res,next) {
  res.render('joinReceptionCourseCalendar');
})
router.get('/joinReceptionCourseManager',function (req,res,next) {
  res.render('joinReceptionCourseManager');
})


router.post("/editInfo",function (req,res) {
    console.log(JSON.stringify(req.body))
    user.update({
        userName:req.body.userName,
        phoneNumber:req.body.phoneNumber,
    },{'where':{userId:2}}).then(
        joinreceptionshop.update({
            JoinReceptionLocation:req.body.joinreceptionlocation,
        },{'where':{userId:2}})
    )})

router.get('/teacherList',function (req,res,next) {
  res.render('teacherList');
})
router.get('/officeManagerReport',function (req,res,next) {
  res.render('officeManagerReport');
})
router.get('/officeManagerDetail',function (req,res,next) {
  res.render('officeManagerDetail');
})
router.get('/adminJoinList', function (req, res, next) {
    res.render('adminJoinList');
});
router.get('/adminJoinDetail', function (req, res, next) {
    res.render('adminJoinDetail');
});
router.get('/adminUserList', function (req, res, next) {
    res.render('adminUserList');
});
router.get('/adminUserDetail', function (req, res, next) {
    res.render('adminUserDetail');
});
router.get('/adminDetail', function (req, res, next) {
    res.render('adminDetail');
});
var APPID = "10068625";
var SECRET_ID = "AKIDGPM8i9uTM4a0FJlqMgoljZ8a0IPLLlGi";
var SECRET_KEY = "TowscBYpzznPq5B6pLfnjTIwOGUfdbP2";

var qcloud = require('qcloud_cos');
exports.AUTH_URL_FORMAT_ERROR = -1;
exports.AUTH_SECRET_ID_KEY_ERROR = -2;
router.get('/appSign', function (req, res, next) {
    var bucket = req.query.bucketName;
    var expired = req.query.expired;
    var now = parseInt(Date.now() / 1000);
    console.log("expired:" + global.expired + "now>global.expired:" + (now > global.expired))
    if (global.expired == null || now > global.expired) {
        console.log("重新计算");
        var sign = qcloud.auth.signMore(bucket, expired);
        global.expired = expired;
        global.sign = {"data": {"sign": sign}}
    } else {
        console.log("直接返回");
    }
    res.send(global.sign);
})
router.get('/appSignOnce', function (req, res, next) {
    var bucket = req.query.bucketName;
    var fileId = req.query.fileId;
    var data = {"data": {"sign": appSign(bucket, fileId, 0)}}
    res.send(JSON.stringify(data));
})

function appSign(bucket, fileid, expired) {
    console.log(Date.now())
    var now = parseInt(Date.now() / 1000);
    var rdm = parseInt(Math.random() * Math.pow(2, 32));

    var secretId = SECRET_ID, secretKey = SECRET_KEY;
    var plainText = 'a=' + APPID + '&b=' + bucket + '&k=' + secretId + '&e=' + expired + '&t=' + now + '&r=' + rdm + '&f=' + fileid;
    var data = new Buffer(plainText, 'utf8');

    var res = crypto.createHmac('sha1', secretKey).update(data).digest();
    var bin = Buffer.concat([res, data]);

    var sign = bin.toString('base64');

    return sign;
}
router.post("/editInfo",function (req,res) {
    console.log(JSON.stringify(req.body))
    res.send({desc:"修改成功！"})
})

module.exports = router;
