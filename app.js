var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ball = require("./models/ball");

// We can seed the collection if needed on server start
async function recreateDB(){
// Delete everything
await ball.deleteMany();
let instance1 = new ball({ball_type:"cricket_ball", ball_size:100, ball_cost:250});
let instance2 = new ball({ball_type:"basket_ball", ball_size:200, ball_cost:2000});
let instance3 = new ball({ball_type:"base_ball", ball_size:150, ball_cost:2300});

instance1.save().then(doc=>{

  console.log("First object saved")}

  ).catch(err=>{

  console.error(err)})

  instance2.save().then(doc=>{

    console.log("Second object saved")}
  
    ).catch(err=>{
  
    console.error(err)})

    instance3.save().then(doc=>{

      console.log("Third object saved")}
    
      ).catch(err=>{
    
      console.error(err)})



}
let reseed = true;
if (reseed) { recreateDB();}


require('dotenv').config();
const connectionString =
process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{useNewUrlParser: true,
useUnifiedTopology: true}); 

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ballRouter = require('./routes/ball');
var boardRouter = require('./routes/board');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ball', ballRouter);
app.use('/board', boardRouter);
app.use('/selector',selectorRouter);
app.use('/resource',resourceRouter);
app.use('/ball',ball);

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
