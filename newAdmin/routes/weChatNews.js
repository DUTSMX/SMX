/**
 * Created by y on 2017/7/28.
 */
var express = require('express');
var router = express.Router();
var weChatNews=require('../model/weChatNews');
var db = require("../model/db")

router.get('/weChatNews',function (req,res) {
    var sql = "SELECT weChatNewsUrl,weChatNewsTitle FROM weChatNews";

    console.log("db" +db);
    db.sequelize.query(sql).then(function(print){
        console.log("微信标题以及链接"+JSON.stringify({print:print[0]}));
        res.render('weChatNews',{print:print[0]});
    })
});



router.post('/modifyWeChatNewsUrl',function (req,res) {

    console.log("modifyWeChatNewsUrl");

    var weChatNewsUrl=req.body.weChatNewsUrl;

    var weChatNewsTitle=req.body.weChatNewsTitle;

    console.log("weChatNewsUrl:"+weChatNewsUrl);

    weChatNews.findAll({
        where:{

            weChatNewsUrl:weChatNewsUrl,

            weChatNewsTitle:weChatNewsTitle

        }
    }).then(function (ret) {
        if(ret.length==0){


            weChatNews.create({

                weChatNewsUrl:weChatNewsUrl,

                weChatNewsTitle:weChatNewsTitle

            }).then(function (news) {
                res.send({status:true,desc:"添加成功"})
            })

        }else{
            console.log("上传微信推送链接成功");

            var ret = {status:true,desc:"上传微信推送链接成功"};

            res.send(ret);

        }
    })
});
module.exports=router;