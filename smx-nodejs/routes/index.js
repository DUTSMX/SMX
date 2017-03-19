var express = require('express');
var router = express.Router();
var pages = require('./pages')
var crypto = require('crypto');
var https = require('https');
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {var userId = req.session.userId;
		res.redirect('../course/course');
});
router.get('/favicon.ico',function (req,res) {
	var now = path.resolve(__dirname,'..')+"/";
	res.sendFile(now+"favicon.ico")
})
router.get('/MP_verify_sEUETJmOEogP71d6.txt',function(req,res){
	var fs = require('fs');
	fs.readFile(pages.getWXverify(),'utf-8',function(err,data){
		if(err){
			console.log(err)
		}else{
			console.log(data)
			res.send(data)
		}
	})
})

router.get('/search',function (req,res,next) {
	res.render("search",{type:null});
})

router.get('/searchType',function (req,res) {
	var type = req.query.type;
	res.render("search",{type:type});
})

router.post('/search',function (req,res) {
	var course = require("../api/courseDBApi");
	var word = req.body.word;
	course.search(word,function (rows) {
		console.log("rows:"+JSON.stringify(rows));
		res.send(rows)
	});
})

router.get('/main',function (req,res) {
	var userId = req.session.userId;
	var course = require("../api/courseDBApi");
	var video = require("../api/videoDBApi");
	var question = require("../api/questionDBApi");
	var mine = require("../api/userDBApi");
	var courseInfo,videoInfo,questionInfo,mineInfo;
	course.getCourse(userId,function(rows){
		courseInfo=rows;
		video.getVideo(function (rows) {
			videoInfo = rows;
			question.getQuestion(function (rows) {
				questionInfo = rows;
				mine.getMineInfo(userId,function (rows) {
					mineInfo = rows;
					var data = {courseInfo:courseInfo,videoInfo:videoInfo,questionInfo:questionInfo,mineInfo:mineInfo};
					console.log("data:"+JSON.stringify(data))
					res.render("main",data)
				})
			})
		})
	})
})

var APPID = "10068625";
var SECRET_ID = "AKIDGPM8i9uTM4a0FJlqMgoljZ8a0IPLLlGi";
var SECRET_KEY = "TowscBYpzznPq5B6pLfnjTIwOGUfdbP2";

var qcloud = require('qcloud_cos');
exports.AUTH_URL_FORMAT_ERROR = -1;
exports.AUTH_SECRET_ID_KEY_ERROR = -2;
router.get('/appSign',function(req,res,next){
	var bucket = req.query.bucketName;
	var expired = req.query.expired;
	var now            = parseInt(Date.now() / 1000);
	console.log("expired:"+global.expired + "now>global.expired:"+(now>global.expired))
	if(global.expired ==  null || now>global.expired){
		console.log("重新计算");
		var sign = qcloud.auth.signMore(bucket,expired);
		global.expired = expired;
		global.sign = {"data":{"sign":sign}}
	}else{
		console.log("直接返回");
	}
	res.send(global.sign);
})
router.get('/appSignOnce',function (req,res,next) {
	var bucket = req.query.bucketName;
	var fileId = req.query.fileId;
	var data = {"data":{"sign":appSign(bucket, fileId, 0)}}
	res.send(JSON.stringify(data));
})

function appSign(bucket, fileid, expired) {
    console.log(Date.now())
	var now            = parseInt(Date.now() / 1000);
	var rdm            = parseInt(Math.random() * Math.pow(2, 32));

	var secretId = SECRET_ID, secretKey = SECRET_KEY;
	var plainText = 'a='+APPID+'&b='+bucket+'&k='+secretId+'&e='+expired+'&t='+now+'&r='+rdm+'&f='+fileid;
	var data = new Buffer(plainText,'utf8');

	var res = crypto.createHmac('sha1',secretKey).update(data).digest();
	var bin = Buffer.concat([res,data]);

	var sign = bin.toString('base64');

	return sign;
}
var grant_type = "client_credential";
var app_id = "wxdc031022f3870a62";
var secret = "001eea9743a19d960e7af081646682c2";

router.get("/getJSTicket",function (req,res,next) {
	// console.log("saveDate:"+global.saveDate)
	if(!global.saveDate ||new Date().getTime()-global.saveDate>7000){
	// if(true){
		console.log("发送get请求")
		https.get("https://api.weixin.qq.com/cgi-bin/token?grant_type="+grant_type+"&appid="+app_id+"&secret="+secret,function (req,res1) {
			var html = '';
			req.on('data',function (data) {
				html+=data;
			})
			req.on('end',function () {
				global.saveDate = new Date().getTime();
				global.token = JSON.parse(html).access_token;
				getJsTicket(res)
			})
		});
	}else{
		// res.send(global.token);
		console.log("发送保存的")
		getJsTicket(res)
	}
})

function getJsTicket(res){
	var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+global.token+"&type=jsapi";
	https.get(url,function (req,res1) {
		var html = "";
		req.on('data',function (data) {
			html+=data;
		})
		req.on('end',function () {
			console.log(JSON.parse(html).ticket)
			res.send(JSON.parse(html).ticket)
		})
	})
}

module.exports = router;
