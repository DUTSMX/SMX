var express = require('express');
var cookieParser = require('cookie-parser');
//var session = require('express-session')
var db = require('../db/dbHelper');
var path = require('path');
var router = express.Router();

router.use(cookieParser());
// router.use(session({
//   secret:''
// }))


router.get('/login.html',function(req,res){
  res.sendFile(path.resolve(__dirname,'..')+"/views/users/"+"login.html");
})

router.get('/register.html',function(req,res){
  res.sendFile(path.resolve(__dirname,'..')+"/views/users/"+"register.html");
})

router.get('/login',function(req,res){
  var phoneNumber = req.query.phoneNumber;
  var password = req.query.password;
  db.login(phoneNumber,password,function(ret){
    res.write('<head><meta charset="utf-8"/></head>');
    res.end(ret);
  });
})

router.get('/register',function(req,res){
  var phoneNumber = req.query.phoneNumber;
  var password = req.query.password;
  db.register(phoneNumber,password,function(ret){
    res.write('<head><meta charset="utf-8"/></head>');
    res.end(ret);
  });

})

router.get('/getMineInfo', function(req,res){
  if(req.cookies.isVisit){
    console.log(req.cookies);
    res.sendFile(path.resolve(__dirname,'..')+"/views/users/"+"login.html");
  }else{
    res.cookies('isVisit',1,{maxAge:60*1000});
    var userId = req.query.userId;
    db.getMineInfo(userId,function(ret){
      res.write('<head><meta charset="utf-8"/></head>');
      res.end(ret);
    })
  }

})
module.exports = router;
