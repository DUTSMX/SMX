/**
 * Created by zhangchong on 2017/7/1.
 */
var express = require('express');
var router = express.Router();
var user=require('../model/user');
// router.get('/', function(req, res, next) {
//     res.render('index');
// });
router.post('/login',function (req,res) {
    console.log("login")
    var phoneNumber=req.body.phoneNumber;
    var password=req.body.password;
    console.log("phoneNumber:"+phoneNumber);
    user.findAll({
        where:{
            phoneNumber:phoneNumber,
            password:password
        }
    }).then(function (ret) {
        if(ret.length==0){
            console.log('ret:'+JSON.stringify(ret));
            res.send({ret:"账号或密码错误"})
        }else{
            console.log("identityId:"+ret[0].identityId);
            req.session.userId=ret[0].userId;
            req.session.userName = ret[0].userName;
            req.session.identityId = ret[0].identityId;
            console.log("session:"+JSON.stringify(req.session));
            var ret={ret:ret[0].identityId};
            res.send(ret);
        }
    })
})

router.post('/logout',function (req,res) {
    req.session.userId = "";
    req.session.userName = "";
    req.session.identityId = "";
    res.send("123")
})
module.exports=router;