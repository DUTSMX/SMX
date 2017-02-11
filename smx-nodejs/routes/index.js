var express = require('express');
var course = require('../api/courseDBApi');
var router = express.Router();
var pages = require('./pages')
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
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
router.get('/main',function (req,res) {
  course.getCourse(1,function (ret) {
    console.log(JSON.stringify(ret))
    res.render('main',ret);
  })
})

var APPID = "10068625";
var SECRET_ID = "AKIDGPM8i9uTM4a0FJlqMgoljZ8a0IPLLlGi";
var SECRET_KEY = "TowscBYpzznPq5B6pLfnjTIwOGUfdbP2";

exports.AUTH_URL_FORMAT_ERROR = -1;
exports.AUTH_SECRET_ID_KEY_ERROR = -2;
router.get('/appSign',function(req,res,next){
	var bucket = req.query.bucketName;
	var expired = req.query.expired;
	var data = {"data":{"sign":appSign(bucket, '', expired)}}
	res.send(JSON.stringify(data));
})
router.get('/appSignOnce',function (req,res,next) {
	var bucket = req.query.bucketName;
	var fileId = req.query.fileId;
	var data = {"data":{"sign":appSign(bucket, fileId, 0)}}
	res.send(JSON.stringify(data));
})

function appSign(bucket, fileid, expired) {
	var now            = parseInt(Date.now() / 1000);
	var rdm            = parseInt(Math.random() * Math.pow(2, 32));

	var secretId = SECRET_ID, secretKey = SECRET_KEY;
	var plainText = 'a='+APPID+'&k='+secretId+'&e='+expired+'&t='+now+'&r='+rdm+'&f='+fileid+'&b='+bucket;
	var data = new Buffer(plainText,'utf8');

	var res = crypto.createHmac('sha1',secretKey).update(data).digest();
	var bin = Buffer.concat([res,data]);

	var sign = bin.toString('base64');

	return sign;
}

module.exports = router;
