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
    questionList = {questionList:questionList};
    console.log('questionList:'+JSON.stringify(questionList));
    res.render('question',questionList)
  })
});
router.get('/questionDetails',function (req,res) {
  api.getAnswer(function (answerList) {
    answerList={answerList:answerList};
    console.log("answerList:"+JSON.stringify(answerList));
    res.render('questionDetails',answerList);
  })
 });
module.exports = router;
