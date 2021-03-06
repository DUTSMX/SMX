var express = require('express');
var router = express.Router();
var api = require('../api/api')
var user = require("../api/userApi")
var moment = require("moment");
/* GET home page. */
router.get('/', function(req, res, next) {
  var date = moment(new Date()).format("YYYY-MM-DD");
  api.getCourse(date,function (course) {
  res.render('course',course)
})
});
router.get('/course',function (req,res,next) {
  var date = moment(new Date()).format("YYYY-MM-DD");
  api.getCourse(date,function (course) {
    console.log("course:"+JSON.stringify(course))
    res.render('course',course)
  })
});
router.get('/courseDetails',function (req,res) {
  var courseId = req.query.courseId;
  api.getCourseDetails(courseId,function(courseDetails) {
    courseDetails.courseDate = moment(courseDetails.courseDate).format("YYYY-MM-DD")
    console.log("courseDetails:" + JSON.stringify(courseDetails))
    res.render('courseDetails', courseDetails)
  })
});

router.get('/courseDetailsEdit',function (req,res) {
  var courseId = req.query.courseId;
  api.getCourseDetailsEdit(courseId,function (courseEdit) {
    console.log("courseEdit:"+JSON.stringify(courseEdit))
    if(courseEdit){
      courseEdit.courseId = courseId;
      courseEdit.courseDate = moment(courseEdit.courseDate).format("YYYY-MM-DD")
      console.log("courseDetailsEdit:"+JSON.stringify(courseEdit));
      res.render('courseDetailsEdit',courseEdit)
    }else{
      res.render('error',{message:"courseDetailsEdit",error:{status:404,stack:""}});
    }
  })
});
router.post("/courseDetailsEdit",function (req,res) {
  var courseId = req.body.courseId;
  var courseName = req.body.courseName;
  var courseDate =req.body.courseDate;
  var beginTime = req.body.beginTime;
  var finishTime = req.body.finishTime;
  var courseTime = req.body.courseTime;
  var objectOriented = req.body.objectOriented;
  var courseContent = req.body.courseContent;
  console.log("courseId:"+courseId+" courseName:"+courseName+" courseDate:"+courseDate+" beginTime:"+beginTime+" finishTime:"+finishTime +
      " courseTime:"+courseTime+" objectOriented:"+objectOriented+" courseContent:"+courseContent)
  api.courseDetailsEdit(courseId,courseName,courseDate,beginTime,finishTime,courseTime,objectOriented,courseContent,function (rows) {
    console.log("rows:"+JSON.stringify(rows))
    res.send(rows);
  })
});
router.get('/selfStudy',function (req,res) {
  api.getSelfStudyByDate(function (selfStudy) {
    res.render('selfStudy',{selfStudy:selfStudy})
  })
})
router.get('/selfStudyDetails',function (req,res) {
  var date = req.query.date;
  console.log("date:"+date);
  api.getSelfStudyDetails(date,function (details) {
    console.log("details："+JSON.stringify(details))
    res.render('selfStudyDetails',{date:date,student:details});
  })
})

router.get('/question',function (req,res) {
  api.getQuestion(function(questionList){
    var moment = require("moment");
    questionList = {questionList:questionList,moment:moment};
    console.log('questionList:'+JSON.stringify(questionList));
    res.render('question',questionList)
  })
});
router.get('/questionDetails',function (req,res) {
  var questionId = req.query.questionId;
  api.getQuestionDetails(questionId,function (answer) {
    console.log("answerList:"+JSON.stringify(answer));
    res.render('questionDetails',answer);
  })
 });
router.get("/addCourse",function (req,res) {
  user.getTeacher(function (rows) {
    console.log("teacherList:"+JSON.stringify(rows))
    res.render("addCourse",{teacherList:rows});
  })
})

router.post("/addCourse",function (req,res) {
  var courseName = req.body.courseName;
  var courseDate =req.body.courseDate;
  var teacherName=req.body.teacherName;
  var beginTime = req.body.beginTime;
  var finishTime = req.body.finishTime;
  var courseTime = req.body.courseTime;
  var objectOriented = req.body.objectOriented;
  var courseContent = req.body.courseContent;
  console.log(" courseName:"+courseName+" courseDate:"+courseDate+"teacherName:"+teacherName+" beginTime:"+beginTime+" finishTime:"+finishTime +
      " courseTime:"+courseTime+" objectOriented:"+objectOriented+" courseContent:"+courseContent)
  api.addCourse(courseName,courseDate,teacherName,beginTime,finishTime,courseTime,objectOriented,courseContent,function (rows) {
    console.log("rows:"+JSON.stringify(rows))
    res.send(rows);
  })
});

router.get("/addVideo",function (req,res) {
  res.render("addVideo",{});
});
router.get("/login",function (req,res) {
  res.render("login",{});
})
router.post('/login',function(req,res){
  var phoneNumber = req.body.phoneNumber;
  var password = req.body.password;
  console.log("phoneNumber:"+phoneNumber+" password:"+password);
  api.login(phoneNumber,password,function (ret) {
    console.log("ret:"+JSON.stringify(ret));
     var userId = ret.userId;
    if(ret.status){
      console.log("userId:"+userId);
      req.session.userId = userId;
      console.log("req:"+req.session.userId);
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
router.get('/logout',function (req,res) {
  delete req.session.userId;
  //   var userId=req.session.userId;
  res.render('login',{});
})
router.get('/loginAlready',function (req,res) {
    var userId=req.session.userId;
    res.render('loginAlready',{userId:userId});
})
router.get('/EditPassword',function (req,res) {
  res.render('EditPassword',{})
})
router.post('/editPassword',function (req,res) {
  var userId=req.session.userId;
  console.log("userId:"+userId);
  var oldPassword=req.body.oldPassword;
  console.log("oldPassword:"+oldPassword);
  var password=req.body.password;
  console.log("password:"+password);
  api.editPassword(userId,oldPassword,password,function (data) {
    res.send(data);
  })
});
router.post('/Delete',function (req,res) {
  var Id=req.body.Id;
  var type=req.body.type;
  var desc=req.body.desc;
  console.log("Id:"+Id);
  api.Delete(Id,type,desc,function (ret) {
    res.send(ret);
  })
})
router.get('/register',function (req,res) {
  res.render('register',{});
});
router.post('/register',function (req,res) {
  var userName=req.body.userName;
  var phoneNumber=req.body.phoneNumber;
  console.log("userName:"+userName);
  console.log("phoneNumber:"+phoneNumber);
  api.register(userName,phoneNumber,function (data) {
    console.log("data2:"+JSON.stringify(data));
    res.send(data);
  })
})
router.get('/registerTeacher',function (req,res) {
  res.render('registerTeacher',{});
});

router.post('/registerTeacher',function (req,res) {
  var userName=req.body.userName;
  var phoneNumber=req.body.phoneNumber;
  var courseName=req.body.courseName;
  console.log("userName:"+userName);
  console.log("phoneNumber:"+phoneNumber);
  console.log("courseName:"+courseName);
  api.registerTeacher(userName,phoneNumber,courseName,function (data) {
    console.log("data2:"+JSON.stringify(data));
    res.send(data);
  })
})
router.post('/addStudent',function (req,res) {
  var data=req.body.data;
  var courseId=req.body.courseId;
  console.log("data1:"+JSON.stringify(data));
  console.log("courseId:"+courseId);
  api.addStudent(courseId,data,function (ret) {
   console.log("ret:"+JSON.stringify(ret))
    res.send(ret);
  })
});
router.post('/addSelfStudy',function (req,res) {
  var data=req.body.data;
  var date=req.body.date;
  console.log("date1:"+date);
  console.log("data1:"+JSON.stringify(data));
  api.addSelfStudy(data,date,function (ret) {
    res.send(ret);
  })
})
router.post('/deleteSelfStudy',function (req,res) {
  var userId=req.body.userId;
  var date=req.body.date;
  api.deleteSelfStudy(userId,date,function (ret) {
    console.log("ret:"+JSON.stringify(ret));
    res.send(ret);
  })
})
router.post('/takeOff',function (req,res) {
  var courseId=req.body.courseId;
  var userId=req.body.userId;
  var attend=req.body.attend;
  console.log("courseId:"+courseId);
  console.log("userId:"+userId);
  console.log("attend:"+attend);
  api.takeOff(courseId,userId,attend,function (ret) {
    console.log("ret:"+JSON.stringify(ret));
    res.send(ret);
  })
})
router.post('/unTakeOff',function (req,res) {
  var courseId=req.body.courseId;
  var userId=req.body.userId;
  var attend=req.body.attend;
  console.log("courseId:"+courseId);
  console.log("userId:"+userId);
  console.log("attend:"+attend);
  api.unTakeOff(courseId,userId,attend,function (ret) {
    console.log("ret:"+JSON.stringify(ret));
    res.send(ret);
  })
})
router.post("/costEdit",function (req,res) {
  var courseId=req.body.courseId;
  var userId=req.body.userId;
  var cost=req.body.cost;
  console.log("courseId:"+courseId);
  console.log("userId:"+userId);
  console.log("cost:"+cost);
  api.costEdit(courseId,userId,cost,function (ret) {
    console.log("ret:"+JSON.stringify(ret));
    res.send(ret);
  })
})
module.exports = router;
