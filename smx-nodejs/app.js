var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var utils = require('./utils/utils');
var session = require('express-session');
var routes = require('./routes/index');
<<<<<<< HEAD
var users = require('./routes/users');
var admin = require('./routes/admin');
var course = require('./routes/course');
var question = require('./routes/question');
var video = require('./routes/video');

var app = express();

app.use(session({
  resave:true,
  saveUninitialized:false,
  secret: utils.getRandom128(),
  cookie: {maxAge: 30 * 24 * 60 * 60 * 1000}
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var unInterceptionList = ["/users/forgetPassword","/users/register","/users/getCheckCode"]
//登录过滤器，如果session中的userId为空，则跳转到登录页面，登陆成功后跳转回来。
app.use(function (req,res,next) {
  var url = req.originalUrl;
  var regex = "(.css|.js|.png|.gif|.ico|.map\s*)$";
  var ret = url.match(regex);

  if(ret == null) {
    if (url != "/users/login" && !req.session.userId) {
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
        return res.redirect("/users/login")
      }
    }else{

    }
  }
  next();
})

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/course',course);
app.use('/question',question);
app.use('/video',video);
app.use('/admin',admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
