var express = require('express');
var session = require('express-session')
var router = express.Router();
var api = require('../api/videoDBApi')
var pages = require('./pages');
var utils = require('../utils/utils');

router.get('/video',function (req,res) {
    api.getVideo(function (videoList) {
        console.log("video:"+JSON.stringify(videoList))
        res.render('video',{videoList:videoList});
    })
})

router.get('/videoDetail',function (req,res) {
    var videoId = req.query.videoId;
    api.getVideoDetail(videoId,function (videoDetail) {
        console.log(videoDetail);
        res.render('videoDetail',videoDetail);
    })
})

/*
* unuse
*
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
 */
module.exports = router;