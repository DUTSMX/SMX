var dbHelper = require('./dbHelper');
var conn = dbHelper.getConn();


exports.getVideo = function(callback){
    var sql = "SELECT videoId, " +
        "videoCoverUrl, " +
        "videoName, " +
        "videoTime, " +
        "videoWatchCount " +
        "FROM video";
    conn.query(sql,function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        callback(rows);
    })
}

exports.getVideoDetail = function (videoId,callback) {
    var sql = "SELECT v.videoUrl, " +
        "v.videoName, " +
        "a.userName as authorName, " +
        "a.userSchool as authorSchool, " +
        "a.userGrade as authorGrade, " +
        "v.videoTime, " +
        "v.videoWatchCount, " +
        "v.videoAbstract, " +
        "v.videoContent " +
        "FROM account a JOIN video v " +
        "ON a.userId = v.authorId " +
        "WHERE v.videoId = "+videoId;
    // console.log("videoId:"+videoId)
    conn.query(sql, function (err,rows) {
        if(err){
            console.log(err)
            return;
        }else if(rows == null || rows[0] == null){
            console.log("error:getVideoDetail empty videoId = "+videoId)
            return;
        }else{
            callback(rows[0]);
        }
    })
}
/*
* unuse
* */
/*
exports.addVideo = function(videoname,username,url,degree,picurl,describe,callback){
    var degree = arguments[3]?arguments[3]:0;
    var picurl = arguments[4]?arguments[4]:null;
    var sql = "INSERT INTO video(videoname,username,url,degree,picurl,describe) VALUES ('"+videoname+"',"+username+"," +
        ""+url+","+degree+","+picurl+","+descrirbe+")";
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
            return
        }
        callback(rows);
    })
}
exports.searchVideo = function(word,callback){
    var sql = "SELECT id,videoname,username,url,degree,picurl,describe as videoid,'发布者',videourl,'视频播放次数' ,picurl,'视频描述'from video " +
        "WHERE CONCAT(videoname,username,describe) LIKE '%"+word+"%' )";
    conn.query(sql,function(err,rows,fields){
        if(err){
            console.error(err);
        }
        callback(rows);
    })
}
*/