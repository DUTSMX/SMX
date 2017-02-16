var express = require('express');
var session = require('express-session')
var router = express.Router();
var api = require('../api/questionDBApi')
var pages = require('./pages');
var utils = require('../utils/utils');

router.get('/', function (req, res) {
    res.redirect("/question");
})
/*
* 获得问题首页的内容
* req:
* res:{
*      teacherList:[{userId,headUrl,userName]
*      questionList:[{aHref,authorHeadUrl,authorName,questionTitle,answerAbstract,}]
*     }
* */
router.get('/question', function (req, res) {

    api.getQuestion(function (rows) {
        console.log("rows:" + JSON.stringify(rows));
        res.render("question", rows);
    })
})
/*
* 获得问题详情的内容
* req:questionId
* res:{
*       question:{questionTitle,questionContent}
*       answerList:[{answerId,authorHeadUrl,authorName,answerAbstract}]
*       }
* */
router.get('/questionDetail', function (req, res) {
    var questionId = req.query.questionId;
    api.getQuestionDetail(questionId, function (questionDetail) {
        console.log("questionDetail:" + JSON.stringify(questionDetail))
        res.render('questionDetail', questionDetail);
    })
})
/*
* 获得回答详情
* req:answerId
* res:{questionId,questionTitle,authorHeadUrl,authorName,answerContent，answerTime}
* */
router.get('/answerDetail', function (req, res) {
    var answerId = req.query.answerId;
    api.getAnswerDetail(answerId, function (answerDetail) {
        console.log("answerDetail:" + JSON.stringify(answerDetail))
        res.render('answerDetail', answerDetail);
    })
})
/*
* 获得提问页面
* */
router.get('/askQuestion',function (req,res) {
    res.render('askQuestion');
})
/*
* 提问页面
* req:questionTitle,questionContent
* res:{status,desc}
* */
router.post('/askQuestion', function (req, res) {
    var userId = req.session.userId;
    var questionTitle = req.body.questionTitle;
    var questionContent = req.body.questionContent;
    api.addQuestion(userId, questionTitle, questionContent, function (rows) {
        console.log(rows);
        res.send(rows);
    })
})
/*
* 回答页面
* req:questionId
* res:questionId
* */
router.get("/answerQuestion",function (req,res) {
    var questionId = req.query.questionId;
    res.render("answerQuestion",{questionId:questionId});
})
/*
* 问答问题
* req:questionId,answerContent
* res:{status,desc}
* */
router.post("/answerQuestion",function (req,res) {
    var userId =req.session.userId;
    var questionId = req.body.questionId;
    var answerContent = req.body.answerContent;
    api.answerQuestion(userId,questionId,answerContent,function (ret) {
        res.send(ret);
    })

})


// router.get('/searchQuestion', function (req, res) {
//     var word = req.query.word;
//     api.searchQuestion(word, function (rows) {
//         res.write('<head><meta charset="utf-8"/></head>');
//         res.write(JSON.stringify(rows));
//     })
// })
module.exports = router;
