var express = require('express');
var router = express.Router();
var course=require('../model/course');
<<<<<<< HEAD
var teacher=require('../model/teacher');
=======
var user =require("../model/user")
>>>>>>> ab967b207268730c801753a888fa56ae867c39c2

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


router.post('/createStudent', function (req, res, next) {
    console.log("body:"+JSON.stringify(req.body));
    user.create({
        phoneNumber:req.body.phoneNumber,
        userName:req.body.studentName,
        userSchool:req.body.schoolName,
        userGrade:req.body.classInfo
    }).then(function (data) {
        console.log("data:"+JSON.stringify(data));
    }).cache(function(err){
        console.log("err:"+JSON.stringify(err))
    });
    res.end("235")
});


router.get('/joinReceptionStudentDetail', function (req, res, next) {
    res.render('joinReceptionStudentDetail');
});
router.get('/joinReceptionTodayCourse', function (req, res, next) {
    res.render('joinReceptionTodayCourse');
});
router.get('/joinReceptionPrint', function (req, res, next) {
    res.render('joinReceptionPrint');
});
router.get('/joinReceptionCourseCalendar', function (req, res, next) {
    res.render('joinReceptionCourseCalendar');
});
router.get('/joinReceptionDetail',function (req,res,next) {
<<<<<<< HEAD
    var user =require("../model/user")
    user.findOne({where:{userId:1}}).then(function(ret){
        console.log(JSON.stringify(ret))
        res.render('joinReceptionDetail',{info:ret});
    })
=======
  user.findOne({where:{userId:1}}).then(function(ret){
    console.log(JSON.stringify(ret))
    res.render('joinReceptionDetail',{info:ret});
  })
>>>>>>> ab967b207268730c801753a888fa56ae867c39c2
})
router.get('/joinReceptionStudentList',function (req,res,next) {
  user.findAll({where:{role:0}}).then(function(ret){
    console.log(JSON.stringify(ret))
    res.render('joinReceptionStudentList',{student:ret});
  })
})
router.get('/joinReceptionStudentDetail',function (req,res,next) {
  res.render('joinReceptionStudentDetail');
})

router.get('/education/joinReceptionTeacherList',function (req,res,next) {
    user.findAll({where:{role:1}}).then(function(ret){
        console.log(JSON.stringify(ret))
        res.render('joinReceptionTeacherList',{teacher:ret});
    })
})
router.get('/education/joinReceptionTeacherDetail',function (req,res,next) {
    res.render('joinReceptionTeacherDetail');
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
<<<<<<< HEAD
router.get('/teacherDetail',function (req,res,next) {
    teacher.findOne({teacherId:15}).then(function (ret) {
        console.log("ret:"+JSON.stringify(ret));
        ret.getUser().then(function (ret1) {
            console.log("ret1:"+JSON.stringify(ret1));
            res.render('teacherDetail',{info:ret1,infos:ret});
        })

    })

})
router.get('/teacherCourse',function (req,res,next) {
  res.render('teacherCourse')
})
router.get('/teacherCourseRecord',function (req,res,next) {
  res.render('teacherCourseRecord')
})
router.get('/teacherCourseDetail',function (req,res,next) {
  res.render('teacherCourseDetail')
})
router.get('/teacherList',function (req,res,next) {
  res.render('teacherList');
})
router.get('/officeManagerReport',function (req,res,next) {
  res.render('officeManagerReport');
})
router.get('/officeManagerDetail',function (req,res,next) {
  res.render('officeManagerDetail');
})
=======
router.get('/teacherCourse', function (req, res, next) {
    res.render('teacherCourse')
});
router.get('/teacherCourseRecord', function (req, res, next) {
    res.render('teacherCourseRecord')
});
router.get('/teacherCourseDetail', function (req, res, next) {
    res.render('teacherCourseDetail')
});
router.get('/teacherList', function (req, res, next) {
    res.render('teacherList');
});
router.get('/teacherDetail', function (req, res, next) {
    res.render('teacherDetail');
});

router.get('/officeManagerReport', function (req, res, next) {
    res.render('officeManagerReport');
});
router.get('/officeManagerDetail', function (req, res, next) {
    res.render('officeManagerDetail');
});

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
>>>>>>> ab967b207268730c801753a888fa56ae867c39c2


router.post("/editInfo",function (req,res) {
    console.log(JSON.stringify(req.body))
    res.send({desc:"修改成功！"})
})

module.exports = router;
