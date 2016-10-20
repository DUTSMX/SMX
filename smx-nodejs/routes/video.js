var express = require('express');
var session = require('express-session')
var router = express.Router();
var api = require('../api/videoDBApi')
var pages = require('./pages');
var utils = require('../utils/utils');

router.get('/',function (req,res) {
    res.end("Hello World");
})


router.get('/addVideo.html',function(req,res){
    res.sendFile(pages.addAnswer());
})

router.get('/searchVideo.html',function(req,res){
    res.sendFile(pages.searchAnswer())
})
// videoname,username,url,degree,picurl,describe

router.get('/addVideo',function(req,res){
    console.log("videoname:"+req.session.videoname);
    var videoname = req.session.videoname;
    if(name == null){
        req.session.source = "course/addAnswer.html";
        res.redirect(301,utils.getServer()+"users/error.html");
    }else{
        var videoname = req.query.videoname;
        var picurl = req.query.picurl;
        var url = req.query.url;
        var degree = req.query.degree;
        var describe = req.query.describe;
        api.addVideo(videoname,username,url,degree,picurl,describe,function (rows) {
            console.log(rows);
            res.write('<head><meta charset="utf-8"/></head>');
            res.write("上传成功");
        })
    }
})

router.get('/getVideo',function(req,res){
    var videoname = req.session.videoname;
    if(videoname == null){
        res.redirect(301,utils.getServer()+"users/error.html");
    }else{
        api.getVideo(videoname,function(rows){
            res.write('<head><meta charset="utf-8"/></head>');
            res.write(JSON.stringify(rows));
        })
    }
})

router.get('/searchVideo',function(req,res){
    var word = req.query.word;
    api.searchVideo(word,function(rows){
        res.write('<head><meta charset="utf-8"/></head>');
        res.write(JSON.stringify(rows));
    })
})

module.exports = router;

