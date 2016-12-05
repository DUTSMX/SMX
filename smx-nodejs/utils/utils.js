var uuid = require('node-uuid');
var crypto = require('crypto');
exports.getRandom128 = function(){
    var length = 128;
    return Math.floor(Math.random()*Math.pow(36,length)).toString(36);
};

exports.getServer = function(){
    return "http://localhost:8080/";
    // return "http://123.207.150.222:8081/";
}

exports.getUUid = function(){
    uuid.v1();
}

exports.md5 = function(str){
    console.log("md5:"+md5);
    return crypto.createHash('md5').update(str),digest('hex');
}