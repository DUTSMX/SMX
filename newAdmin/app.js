var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require("express-session");

var index = require('./routes/index');
var education=require('./routes/education');
var user = require('./routes/user');
var student = require('./routes/student');
var joinReception = require('./routes/joinReception');
var teacher = require("./routes/teacher")
var joinManager = require("./routes/joinManager")
var app = express();
var getRandom128 = function(){
  var length = 128;
  return Math.floor(Math.random()*Math.pow(36,length)).toString(36);
};
app.use(session({
  resave:true,
  saveUninitialized:false,
  secret: getRandom128(),
  cookie: {maxAge: 30 * 24 * 60 * 60 * 1000}
}));
var unInterceptionList = ["/users/forgetPassword","/users/register","/users/getCheckCode","/AppSign"]
//登录过滤器，如果session中的userId为空，则跳转到登录页面，登陆成功后跳转回来。
app.use(function (req,res,next) {
  var url = req.originalUrl;
  var regex = "(.css|.js|.png|.gif|.ico|.map\s*)$";
  var ret = url.match(regex);
  if(ret == null) {
    console.log("url:"+url)
    console.log("userId:"+req.session.userId)
    if(url == "/" || url == "/user/login"){
      next();
    }else if (!req.session.userId ||!url.startsWith("/joinReception/")) {
        return res.redirect("/")
    }else{
      next();
    }
  }else{
    next();
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(function (req,res,next) {
    res.locals.session = req.session;
    next();
})
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user',user);
app.use('/education',education);
app.use('/student',student);
app.use('/joinReception',joinReception)
app.use('/teacher',teacher)
app.use('/joinManager',joinManager)
// app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
