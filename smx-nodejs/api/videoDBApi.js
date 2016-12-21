var db = require('../db/videoDBHelper')

exports.getVideo = function(callback){
    db.getVideo(function(rows){
        callback(rows);
    })
}

exports.getVideoDetail = function(videoId, callback){
    db.getVideoDetail(videoId, function (rows) {
        callback(rows);
    })
}
exports.videoWatchCountIncrease = function(videoId, callback){
    db.videoWatchCountIncrease(videoId, function (rows) {
        callback(rows);
    })
}

/*
* unuse
* */
exports.addVideo = function(videoname,username,url,degree,picurl,describe,callback){
    db.addVideo(videoname,username,url,degree,picurl,describe,function (rows) {
        callback(rows);
    })
}

exports.searchVideo = function(word,callback){
    db.searchVideo(word,function(rows){
        callback(rows);
    })
}
