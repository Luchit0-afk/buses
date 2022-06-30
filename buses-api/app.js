if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config()
}
require('./config/db_connection.js');
// require('./config/passport.js');
require("./config/strategies/JwtStrategy")
require("./config/strategies/LocalStrategy")
require("./config/authenticate")

var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var PassportLocal = require('passport-local').Strategy;

var CreditCard = require('./routes/credit_card/router.js');
var Trip = require('./routes/trip/router.js');
var City = require('./routes/city/router.js');
var Passenger = require('./routes/passenger/router.js');
var User = require('./routes/user/router.js');

var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

var app = express();
app.use(cors());

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
app.use(connectLiveReload());

//Midlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  secret: 'ultra-secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/credit_card', CreditCard);
app.use('/trip', Trip);
app.use('/city', City);
app.use('/passenger', Passenger);
app.use('/user', User);


//Mejorar la captura del error 404
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
