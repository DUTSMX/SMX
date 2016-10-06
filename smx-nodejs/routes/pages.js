var path = require('path');

var dir = path.resolve(__dirname,'..')+"/views/users/";

exports.login = function(){
    return dir+"login.html";
}

exports.register = function(){
    return dir+"register.html";
}

exports.mine = function(){
    return dir+"mine.html";
}

exports.finishInfo = function(){
    return dir+"finishInfo.html";
}

exports.addCourse = function(){
    return dir+"addCourse.html";
}