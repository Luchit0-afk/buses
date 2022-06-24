//Require the data base configurations
require('./config/db_connection.js');

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
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug')


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'ultra-secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal( function(username, password, done){
  //Aca debemos buscar en la base de datos el username y la contraseña para verificar que los datos esten en la base de datos
  if(username === "test" && password === "12345"){
    return done(null, { id: 1, username: "test" });
  }
  done(null, { success: false });
  //CREO QUE NUNCA DEVOLVEMOS EL ERROR SI HUBO ALGUNO
}))

//Serializacion
passport.serializeUser(function(user, done){
  done(null, user.id);
})

//Deserializacion
passport.deserializeUser(function(id, done){
  done(null, { id: 1, username: "Luciano" });
})

//Routes
app.use('/credit_card', CreditCard);
app.use('/trip', Trip);
app.use('/city', City);
app.use('/passenger', Passenger);
app.use('/user', User);

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
