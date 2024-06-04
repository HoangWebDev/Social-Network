var createError = require('http-errors');
var express = require('express');
const configViewEngine = require('./src/config/viewEngine');

var indexRouter = require('./src/routes/index');
var postsRouter = require('./src/routes/posts');
var usersRouter = require('./src/routes/users');
var likeRouter = require('./src/routes/like');
var commentRouter = require('./src/routes/comment');
var friendshipRouter = require('./src/routes/friendship');

var app = express();


// view engine setup
configViewEngine(app)

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/likes', likeRouter);
app.use('/comments', commentRouter);
app.use('/friendships', friendshipRouter);

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
