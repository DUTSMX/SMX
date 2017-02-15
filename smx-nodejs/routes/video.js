var express = require('express');
var session = require('express-session')
var router = express.Router();
var api = require('../api/videoDBApi')
var pages = require('./pages');
var utils = require('../utils/utils');
/*
* 获取视频列表
* req:
* res:{videoId,videoCoverUrl,videoName,videoTime,videoWatchCount}
* */
router.get('/video',function (req,res) {
    api.getVideo(function (videoList) {
        console.log("video:"+JSON.stringify(videoList))
        res.render('video',{videoList:videoList});
    })
})

router.get('/videoDetail',function (req,res) {
    var videoId = req.query.videoId;
    api.videoWatchCountIncrease(videoId,function (rows) {
        console.log(rows);
        console.log("视频观看人次数增加成功");
    })
    api.getVideoDetail(videoId,function (videoDetail) {
        // console.log(videoDetail);
        res.render('videoDetail',videoDetail);
    })
})
module.exports = router;