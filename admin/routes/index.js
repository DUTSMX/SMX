var express = require('express');
var router = express.Router();
var api = require('../api/api')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/course',function (req,res,next) {
  api.getCourse(function (courseList) {
    console.log("course:"+JSON.stringify(courseList));
    res.render('course',{courseList:courseList})
  })
});
router.get("/courseDetails",function (req,res) {
  var courseId=req.query.courseId;
  api.getCourseDetails(courseId,function (courseDetailsList) {
    console.log("courseDetailsList:"+JSON.stringify(courseDetailsList));
    res.render('courseDetails',{courseDetailsList:courseDetailsList[0]});
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
  res.render("addCourse",{});
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
  res.render('login',{});
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
module.exports = router;
