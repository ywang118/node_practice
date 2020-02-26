//检验错误页的处理
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// 解析cookie
var cookieParser = require('cookie-parser');
// 记录access log
var logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user')

//初始化app
var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// 通过配置，自动生成日志
app.use(logger('dev'));
//处理 post 请求 content-type 是 json的格式
app.use(express.json());
//post数据兼容其他的格式
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
// 每次生成http请求 就有了session的值
app.use(session({
  secret: 'WJiol#23123_',
  cookie: {
    path: '/',   //默认配置
    httpOnly: true,   // 前端js无法访问cookie，默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore //sesion 存在redis里面
}))

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog',blogRouter);
app.use('/api/user',userRouter);

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
