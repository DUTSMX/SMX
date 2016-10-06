var express = require('express');
var session = require('express-session')
var api = require('../api/userDBApi');
var utils = require('../utils/utils');
var router = express.Router();
var pages = require('./pages');

router.use(session({
    resave:false,
    saveUninitialized:true,
    secret: utils.getRandom128(),
    cookie: {maxAge: 10 * 1000}
}))

router.get('/login.html', function (req, res) {
    res.sendFile(pages.login());
})

router.get('/register.html', function (req, res) {
    res.sendFile(pages.register());
})

router.get('/login', function (req, res) {
    var phoneNumber = req.query.phoneNumber;
    var password = req.query.password;
    console.log("login");
    api.login(phoneNumber, password, function (ret) {
        if(ret.status){
            req.session.isVisit = 1;// 这句话没有任何意义，但没这句就是跳不过去
            req.session.userId = ret.userId;
            console.log("user:"+ret.userId);
            console.log("userId:"+req.session.userId);
            res.redirect(301,utils.getServer()+"users/getMineInfo");
        }else{
            res.write('<head><meta charset="utf-8"/></head>');
            res.end(JSON.stringify(ret));
        }
    });
})

router.get('/register', function (req, res) {
    var phoneNumber = req.query.phoneNumber;
    var password = req.query.password;
    api.register(phoneNumber, password, function (ret) {
        if(ret.status){
            req.session.userId = ret.userId;
            res.redirect(301,utils.getServer()+"users/getMineInfo");
        }else{
            res.write('<head><meta charset="utf-8"/></head>');
            res.end(JSON.stringify(ret));
        }
    });

})

router.get('/getMineInfo', function (req, res) {
    console.log("userId:"+req.session.userId)
    if (req.session.userId == null) {
        console.log("route login")
        res.sendFile(pages.login());
    } else {
        var userId = req.session.userId;
        api.getMineInfo(userId, function (ret) {
            res.write('<head><meta charset="utf-8"/></head>');
            res.end(JSON.stringify(ret));
        })
    }
})
module.exports = router;