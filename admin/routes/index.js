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
      console.log(questionId);
    res.render('questionDetails',answer);
  })
 });

router.get('/studentList',function (req,res) {
 })
router.get('/studentlist',function (req,res) {
    api.getStudent(function(studentList){
        console.log("student:"+JSON.stringify(studentList));
        res.render('studentList',{studentList:studentList})
    })
});
router.get('/teacherList',function (req,res) {
    api.getTeacher(function(teacherList){
        console.log("teacher:"+JSON.stringify(teacherList));
        res.render('teacherList',{teacherList:teacherList})
    })
});

router.get('/studentDetails',function (req,res) {
    var studentId = req.query.studentId;
    api.getStudentDetails(studentId,function (studentDetails) {
        // studentDetails={studentDetails:studentDetails};
        console.log("studentDetails:"+JSON.stringify(studentDetails));
        res.render('studentListDetails',studentDetails);
    })
});



module.exports = router;
