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

exports.getMD5 = function(str){
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}
exports.getHMacSHA1 = function (secretKey,str) {
    var str =new Buffer((crypto.createHmac('sha1',secretKey).update(str).digest())+str).toString("base64");
    return str;
}
exports.BASE64 = function (str) {
    return new Buffer(str).toString('base64')
}