var express = require('express');
var session = require('express-session')
var router = express.Router();
var api = require('../api/questionDBApi')
var pages = require('./pages');
var utils = require('../utils/utils');

router.get('/',function (req,res) {
    res.end("Hello World");
})


router.get('/question',function(req,res) {

    api.getQuestion(function (rows) {
        console.log("rows:" + rows);
        res.render("question", {
            courseList: {
                // teacherList:rows,
                answerList:rows
            }
        });
    })
})
router.get('/searchQuestion',function(req,res){
    var word = req.query.word;
    api.searchQuestion(word,function(rows){
        res.write('<head><meta charset="utf-8"/></head>');
        res.write(JSON.stringify(rows));
    })
})
router.get('/questionDetail',function (req,res) {
    var questionId = req.query.questionId;
    api.getQuestionDetail(questionId,function (questionDetail) {
        res.render('teacherDetail',teacherDetail);
    })
})
router.get('/answerDetail',function (req,res) {
    var answerId = req.query.answerId;
    api.getAnswerDetail(answerId,function (answerDetail) {
        res.render('answerDetail',answerDetail);
    })
})
router.get('/askQuestion',function (req,res) {
    console.log("userId:"+req.session.userId);
    var userId = req.session.userId;
    if(userId == null){
        req.session.source = "question/askQuestion.ejs";
        res.redirect(301,utils.getServer()+"users/login.ejs");
    }else{
        var questionTitle = req.query.questionTitle;
        var questionContent = req.query.questionContent;
        api.addquestion(userId,questionTitle,questionContent,function (rows) {
            console.log(rows);
            res.write('<head><meta charset="utf-8"/></head>');
            res.write("提问成功");
        })
    }

})

module.exports = router;
