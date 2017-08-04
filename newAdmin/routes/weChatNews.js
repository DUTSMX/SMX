/**
 * Created by y on 2017/7/28.
 */
var express = require('express');
var router = express.Router();
var weChatNews=require('../model/weChatNews');

router.post('/modifyWeChatNewsUrl',function (req,res) {

    console.log("modifyWeChatNewsUrl");

    var weChatNewsUrl=req.body.weChatNewsUrl;

    console.log("weChatNewsUrl:"+weChatNewsUrl);

    weChatNews.findAll({
        where:{
            weChatNewsUrl:weChatNewsUrl
        }
    }).then(function (ret) {
        if(ret.length==0){
            console.log('ret:'+JSON.stringify(ret));

            res.send({status:false,desc:"没有正确输入微信推送链接"})

        }else{
            console.log("上传微信推送链接成功");

            var ret = {status:true,desc:"上传微信推送链接成功"};

            res.send(ret);
        }
    })
});
module.exports=router;