var express = require('express');
var session = require('express-session')
var router = express.Router();
var api = require('../api/courseDBApi')
var pages = require('./pages');
var utils = require('../utils/utils');

router.get('/',function (req,res) {
    res.end("Hello World");
})


/*添加课程页面，返回html*/
router.get('/addCourse.html',function(req,res){
    res.sendFile(pages.addCourse());
})

/*搜索课程页面，返回html*/
router.get('/search.html',function(req,res){
    res.sendFile(pages.search())
})

router.get('/addCourse',function(req,res){
    console.log("userId:"+req.session.userId);
    var userId = req.session.userId;
    if(userId == null){
        req.session.source = "course/addCourse.html";
        res.redirect(301,utils.getServer()+"users/login.html");
    }else{
        var name = req.query.name;
        var time = req.query.time;
        var content = req.query.content;
        api.addCourse(userId,name,time,content,function (rows) {
            console.log(rows);
            res.write('<head><meta charset="utf-8"/></head>');
            res.write("提交成功");
        })
    }
})

router.get('/getCourse',function(req,res){
    var userId = 1;
    if(userId == null){
        req.session.source="course/getCourse";
        res.redirect(301,utils.getServer()+"users/login.html");
    }else{
        api.getCourse(userId,function(rows){
            res.write('<head><meta charset="utf-8"/></head>');
            res.write(JSON.stringify(rows));
        })
    }
})

router.get('/search',function(req,res){
    var word = req.query.word;
    api.search(word,function(rows){
        res.write('<head><meta charset="utf-8"/></head>');
        res.write(JSON.stringify(rows));
    })
})

module.exports = router;