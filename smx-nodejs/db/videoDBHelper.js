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

exports.videoWatchCountIncrease = function (videoId,callback) {
    var sql = "UPDATE video SET videoWatchCount = videoWatchCount + 1  WHERE videoId = "+videoId;
    conn.query(sql,function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        callback(rows);
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
*/
exports.searchVideo = function(word,callback){
    var sql = 'select videoCoverUrl, videoId, videoName, detail, count(distinct videoId) from('+
        'select videoCoverUrl, videoId, videoName, "" as detail from video where videoName LIKE "%'+word+'%"' +
        'UNION '+
        'select videoCoverUrl, videoId, videoName, CONCAT("视频内容：",videoAbstract) as detail from video where videoAbstract LIKE "%'+word+'%"'+
        'UNION '+
        'select videoCoverUrl, videoId, videoName, CONCAT("视频内容：",videoContent) as detail from video where videoContent LIKE "%'+word+'%"'+
        ') course group by videoId order by videoId desc'
    console.log("sql:"+sql);
    conn.query(sql,function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        callback(rows);
    })
}