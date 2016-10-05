
exports.getRandom128 = function(){
    var length = 128;
    return Math.floor(Math.random()*Math.pow(36,length)).toString(36);
};

exports.getServer = function(){
    // return "http://localhost:8081/";
    return "http://123.207.150.222:8081/";
}