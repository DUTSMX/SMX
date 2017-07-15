var express = require('express');
var router = express.Router();
var joinreceptionmanager=require('../model/joinreceptionmanager');
router.get('/joinManagerDetail', function (req, res, next) {
    joinreceptionmanager.findOne({where:{userId:3}}).then(function(ret1){
        console.log(JSON.stringify(ret1))
        ret1.getUser().then(function (ret) {
            console.log(JSON.stringify(ret))
            res.render('joinManagerDetail',{info:ret,infos:ret1});
        })
    })
});
router.get('/joinManagerReport', function (req, res, next) {
    res.render('joinManagerReport');
});
module.exports=router;