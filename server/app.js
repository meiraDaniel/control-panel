require("dotenv").config();


const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require ('passport');
const accountRoutes = require('./routes/account.routes');
const hoursRoutes = require('./routes/hours.routes');
const wallsRoutes = require('./routes/walls.routes');
const todoRoutes = require('./routes/todos.routes');


//configurations
require('./configurations/passportConfigurations')(passport)
const db = require('./database/configuration/sequelizeConfig')
db.connector.sync()


const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', accountRoutes);
app.use('/', hoursRoutes);
app.use('/', wallsRoutes);
app.use('/', todoRoutes);

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
  console.log(err)
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
