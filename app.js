var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy

require('./models/user.js');
require('./models/project.js');
mongoose.connect(process.env.MONGO_URI);

var routes = require('./routes/index');
var users = require('./routes/users');
var projects = require('./routes/projects');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use(passport.initialize());
passport.use(new LocalStrategy({usernameField: 'email'}, function (email, password, next){
  var User = mongoose.model('User');

  User.findOne({email: email}, function (err, user) {
    if (err) return next(err);
    if(!user) return next(null, false, {message: 'Incorrect username'});

    user.validPassword(password, function (err, isMatch) {
      if (err) return next(err);
      if (!isMAtch) return next(null, false);
      return next(null, user);
    });
  });
}));


app.use('/', routes);
app.use('/users', users);
app.use('/projects', projects);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;