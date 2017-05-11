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
    var str =crypto.createHmac('sha1',secretKey).update(str).digest('hex');
    return hexCharCodeToStr(str);
}
exports.BASE64 = function (str) {
    return new Buffer(str).toString('base64')
}

function hexCharCodeToStr(hexCharCodeStr) {
    var trimedStr = hexCharCodeStr.toString().trim();
    var rawStr =
        trimedStr.substr(0,2).toLowerCase() === "0x"
            ?
            trimedStr.substr(2)
            :
            trimedStr;
    var len = rawStr.length;
    if(len % 2 !== 0) {
        alert("Illegal Format ASCII Code!");
        return "";
    }
    var curCharCode;
    var resultStr = [];
    for(var i = 0; i < len;i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
        resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}