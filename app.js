var flash               = require('express-flash');
var express             = require('express');
var path                = require('path');
var favicon             = require('serve-favicon');
var logger              = require('morgan');
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');
var session             = require('express-session');
var moment              = require('moment');
var expressValidator = require('express-validator');
var methodOverride      = require('method-override');

/*Routers config*/
require('./config/db.js');

/*Routers config*/
var routes  = require('./routes/index');
var users   = require('./routes/users');
var friends   = require('./routes/friends');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(expressValidator());
app.use(cookieParser('keyboard cat'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());
// app.all('*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });


//Helpers
app.use(function (req, res, next) {
  res.locals.session  = req.session.usuario;
  res.locals.isLogged = req.session.usuario ? true : false;
  res.locals.moment   = moment;
  next();

});

app.use('/', routes);
app.use('/usuarios', users);
app.use('/amigos', friends);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404', {data: err});
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
