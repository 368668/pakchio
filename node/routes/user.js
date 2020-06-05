const router = require('express').Router()
const userController = require('./../controller/user')

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


module.exports = router