var db = require('../db/videoDBHelper')

exports.addVideo = function(videoname,username,url,degree,picurl,describe,callback){
    db.addVideo(videoname,username,url,degree,picurl,describe,function (rows) {
        callback(rows);
    })
}

exports.getVideo = function(name,callback){
    db.getVideo(name,function(rows){
        callback(rows);
    })
}

exports.searchVideo = function(word,callback){
    db.searchVideo(word,function(rows){
        callback(rows);
    })
}
