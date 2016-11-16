var express = require('express');
var session = require('express-session')
var router = express.Router();
var api = require('../api/questionDBApi')
var pages = require('./pages');
var utils = require('../utils/utils');

router.get('/',function (req,res) {
    res.end("Hello World");
})


router.get('/addQuestion.html',function(req,res){
    res.sendFile(pages.addQuestion());
})

router.get('/searchQuestion.html',function(req,res){
    res.sendFile(pages.searchQuestion())
})

router.get('/addQuestion',function(req,res){
    console.log("username:"+req.session.name);
    var username = req.session.username;
    if(username == null){
        req.session.source = "course/addQuestion.html";
        res.redirect(301,utils.getServer()+"users/addQuestion.html");
    }else{
        var name = req.query.name;
        var picurl = req.query.picurl;
        var voiceurl = req.query.voiceurl;
        var content = req.query.content;
        api.addQuestion(userId,name,content,picurl,voiceurl,function (rows) {
            console.log(rows);
            res.write('<head><meta charset="utf-8"/></head>');
            res.write("提问成功");
        })
    }
})

router.get('/getQuestion',function(req,res){
    var username = req.session.username;
    if(username == null){
        res.redirect(301,utils.getServer()+"users/error.html");
    }else{
        api.getQuestion(username,function(rows){
            res.write('<head><meta charset="utf-8"/></head>');
            res.write(JSON.stringify(rows));
        })
    }
})

router.get('/searchQuestion',function(req,res){
    var word = req.query.word;
    api.searchQuestion(word,function(rows){
        res.write('<head><meta charset="utf-8"/></head>');
        res.write(JSON.stringify(rows));
    })
})

router.get('/question',function (req,res) {
    res.render('question',{});
})
router.get('/questionDetail',function (req,res) {
    res.render('questionDetail',{});
})
router.get('/answerDetail',function (req,res) {
    res.render('answerDetail',{});
})
router.get('/askQuestion',function (req,res) {
    res.render('askQuestion',{});
})

module.exports = router;
