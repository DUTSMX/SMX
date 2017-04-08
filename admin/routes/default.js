var express = require('express');
var router = express.Router();

router.get("/navigation",function (req,res) {
    res.sendFile("../navigation.html")
})
module.exports = router;