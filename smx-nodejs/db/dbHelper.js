var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var conn = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'smx',
	port:3306
})
conn.connect();

var unknownError = "发现未知错误";

function findAccount(phoneNumber, password, callback){
	var sql = 'SELECT * from account where phoneNumber = '+phoneNumber + ' and  password ='+password;
	conn.query(sql, function(err, rows, fields){
	if(err){
		console.error(err);
	}
	callback(rows)
})	
}
exports.login = function(phoneNumber,password,callback)	{
	findAccount(phoneNumber,password,function(rows){
		if(rows[0] == null){
			callback("用户名或密码错误");	
		}else{
			callback("登录成功");
		}
	})
}

exports.register = function(phoneNumber,password,callback){
	findAccount(phoneNumber, password, function(rows){
		if(rows[0] == null){
		}else{

		}
	})
}

exports.getMineInfo = function(userId,callback){
	var sql = 'SELECT phoneNumber,teacher,name FROM account where id = '+userId;
	conn.query(sql,function(err,rows,fileds){
		if(err){
			console.err(err);
			callback(unknownError);
		}
		if(rows[0] == null){
			callback("userId 不存在");
		}else{
			callback(JSON.stringify(rows[0]));
		}
	})
}
