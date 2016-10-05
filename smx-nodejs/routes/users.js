var express = require('express');
var session = require('express-session')
var db = require('../db/dbHelper');
var utils = require('../utils/utils');
var router = express.Router();
var pages = require('./pages');

router.use(session({
    secret: utils.getRandom128(),
    cookie: {maxAge: 10 * 1000}
}))

router.get('/login.html', function (req, res) {
    res.sendFile(pages.login());
})

router.get('/register.html', function (req, res) {
    res.sendFile(pages.register());
})

router.get('/mine.html',function (req,res) {
    res.sendFile(pages.mine());
})
router.get('/login', function (req, res) {
    var phoneNumber = req.query.phoneNumber;
    var password = req.query.password;
    console.log("login");
    db.login(phoneNumber, password, function (ret) {
        // res.write('<head><meta charset="utf-8"/></head>');
        // res.end(JSON.stringify(ret));
        if(ret.status == true){
            console.log("true");
            req.session.isVisit = 1;
            req.session.userId = ret.userId;
            console.log("userId:"+req.session.userId);
            res.redirect(utils.getServer()+"users/getMineInfo")
        }else{
            res.write('<head><meta charset="utf-8"/></head>');
            res.end(ret.desc);
        }
    });
})

router.get('/register', function (req, res) {
    var phoneNumber = req.query.phoneNumber;
    var password = req.query.password;
    db.register(phoneNumber, password, function (ret) {
        res.write('<head><meta charset="utf-8"/></head>');
        res.end(ret);
    });

})

router.get('/getMineInfo', function (req, res) {
    /*
     var visit = req.session.isVisit;
     if(visit == null){
     res.end("true");
     }else{
     res.end("false");
     }
     */
    console.log("visit:"+req.session.isVisit)
    if (req.session.isVisit == null) {
        console.log("route login")
        res.sendFile(pages.login());
    } else {
        req.session.isVisit++;
        var userId = req.session.userId;
        console.log("userId:"+userId);
        db.getMineInfo(userId, function (ret) {
            res.write('<head><meta charset="utf-8"/></head>');
            res.end(ret +　"第"+req.session.isVisit+"次登录");
        })
    }
})
module.exports = router;
