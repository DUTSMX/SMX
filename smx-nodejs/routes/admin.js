/**
 * Created by zhangchong on 2017/1/15.
 */
var express = require('express');
var session = require('express-session')
var router = express.Router();
var api = require('../api/answerDBApi')
var pages = require('./pages');
var utils = require('../utils/utils');
router.get("/addCourse",function (req,res) {
    console.log("test");
    res.render("admin/addCourse",{});
});





module.exports = router;