var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var session=require('express-session');
// var utils = require('./utils/utils');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// app.use(session({
//   resave:true,
//   saveUninitialized:false,
//   secret: utils.getRandom128(),
//   cookie: {maxAge: 30 * 24 * 60 * 60 * 1000}
// }))

var unInterceptionList = ["/users/forgetPassword","/users/register","/users/getCheckCode"]
//登录过滤器，如果session中的userId为空，则跳转到登录页面，登陆成功后跳转回来。
app.use(function (req,res,next) {
  var url = req.originalUrl;
  var regex = "(.css|.js|.png|.gif|.ico|.map\s*)$";
  var ret = url.match(regex);

  if(ret == null) {
    if (url != "/index/login" && !req.session.userId) {
      var flag = true;
      unInterceptionList.forEach(function (item) {
        if(item == url){
          flag = false;
          return;
        }
      })
      if(flag){
        console.log(url + "  redirect  login")
        req.session.sourceUrl = url;
        return res.redirect("/index/login")
      }
    }else{

    }
  }
  next();
})
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
