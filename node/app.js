const path = require('path')
const express = require('express')
const logger = require('morgan')
const app = express()
const session = require('express-session')
const userController = require('./controller/user')
const {
  addRouter
} = require('./routes')
require('./mongodb/db')
const {
  salt
} = require('./config')

app.use(logger('dev'))

app.use(express.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json

app.use((req, res, next) => {
  //设置允许跨域的域名，*代表允许任意域名跨域
  // res.header("Access-Control-Allow-Origin", "");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept,Pakchoi-Token");
  res.header('Access-Control-Allow-Credentials', true);
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200)
  else
    next()
})

//静态资源
app.use('/pakchoi/public', express.static(path.join(__dirname, 'public')))

// 授权登录中间件
app.use(userController.authToken.bind(userController))


app.use(session({
  secret: salt,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true
  },
}))


addRouter(app)

app.use((req, res) => {
  res.status(404).json({
    code: 404,
    msg: "找不到页面",
    success: false,
  })
})
module.exports = app