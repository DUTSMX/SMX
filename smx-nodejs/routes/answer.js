var express = require('express');
var session = require('express-session')
var router = express.Router();
var api = require('../api/answerDBApi')
var pages = require('./pages');
var utils = require('../utils/utils');

router.get('/',function (req,res) {
    res.end("Hello World");
})


router.get('/addAnswer.html',function(req,res){
    res.sendFile(pages.addAnswer());
})

router.get('/searchAnswer.html',function(req,res){
    res.sendFile(pages.searchAnswer())
})

router.get('/addAnswer',function(req,res){
    console.log("name:"+req.session.name);
    var name = req.session.name;
    if(name == null){
        req.session.source = "course/addAnswer.html";
        res.redirect(301,utils.getServer()+"users/error.html");
    }else{
        var name = req.query.name;
        var picurl = req.query.picurl;
        var voiceurl = req.query.voiceurl;
        var content = req.query.content;
        var qid = req.query.qid;
        api.addAnswer(name,qid,content,picurl,voiceurl,function (rows) {
            console.log(rows);
            res.write('<head><meta charset="utf-8"/></head>');
            res.write("回答成功");
        })
    }
})

router.get('/getAnswer',function(req,res){
    var name = req.session.name;
    if(name == null){
        res.redirect(301,utils.getServer()+"users/error.html");
    }else{
        api.getAnswer(name,function(rows){
            res.write('<head><meta charset="utf-8"/></head>');
            res.write(JSON.stringify(rows));
        })
    }
})

router.get('/searchAnswer',function(req,res){
    var word = req.query.word;
    api.searchAnswer(word,function(rows){
        res.write('<head><meta charset="utf-8"/></head>');
        res.write(JSON.stringify(rows));
    })
})

module.exports = router;
