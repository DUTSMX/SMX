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
module.exports = router;
