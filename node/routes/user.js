const router = require('express').Router()
const userController = require('./../controller/user')
const fs = require('fs')
const path = require('path')
/**
 * 注册
 */
router.post('/register', userController.register)
/**
 * 获取邮箱验证码
 */
router.get('/getValidateCode', userController.getValidateCode)
/**
 * login
 */
router.post('/login', userController.login)

/**
 * get userinfo
 */
// router.get('/getUserInfo', userController.getUserInfo)

// /**
//  * 获取授权路由
//  */
router.get('/getAuthRouter', userController.authToken.bind(userController), userController.getAuthRouter)

router.get('/test', (req, res) => {
  fs.readFile(path.resolve('F:/v/video.html'), {
    flag: "r",
    encoding: "utf8"
  }, (err, html) => {
    res.send(html)
  })
})

router.get('/test2', (req, res) => {
  fs.readFile(path.resolve('D:/迅雷下载/video.html'), {
    flag: "r",
    encoding: "utf8"
  }, (err, html) => {
    res.send(html)
  })
})
module.exports = router