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
        }
        else{
        console.log("ret:"+JSON.stringify(ret));
        console.log("identityId:"+ret[0].identityId);
        req.session.userId=ret[0].userId;

        req.session.userName = ret[0].userName;
        console.log(req.session.userName);
        //console.log("------------------");

        console.log("req.session.userId:"+req.session.userId);
        var ret={ret:ret[0].identityId};

        res.send(ret);
        }

    })
})

router.post('/logout',function (req,res) {
    req.session.userName = "";
    res.send("123")
})
module.exports=router;