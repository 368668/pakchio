const UserModel = require('./../model/user')
const RoleModel = require('../model/admin/system/role')
const ValidateCodeModel = require('./../model/admin/validateCode')
const sendEmail = require('./../utils/sendEmail')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const {
  getMd5Password
} = require('./../utils/util')
const {
  getToken,
  validateToken
} = require('./../utils/token')

const {
  codeStatus
} = require('../routes')


class User {
  constructor() {
    this.whiteList = ['/user/login', '/user/getValidateCode', '/user/register']
  }
  async authToken(req, res, next) {
    next()
    return
    try {
      if (this.whiteList.includes(req.path.replace('/pakchoi', ''))) {
        next()
        return
      }
      const result = await validateToken(req.headers['pakchoi-token'])
      if (!result) {
        res.status(401).json({
          code: codeStatus.errunAuthor,
          success: false,
          msg: "验证失效，请重新登录"
        })
      } else if (typeof result.status != 'undefined' && result.status == 201) {
        const token = await getToken({
          userName: result.userName,
          roleId: result.roleId,
          _id: result._id
        }, true)
        res.status(201).json({
          code: 201,
          success: true,
          msg: "刷新token",
          token
        })
      } else {
        req._token = result
        next()
      }
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        code: codeStatus.error,
        success: false,
        msg: error.message
      })
    }
  }

  async register(req, res) {
    try {
      const data = req.body
      const hadUser = await UserModel.findOne({
        $or: [{
          userName: data.userName,
        }, {
          mobile: data.mobile
        }, {
          email: data.email
        }]
      })
      if (hadUser) {
        res.json({
          code: codeStatus.error,
          success: false,
          msg: '注册失败,用户名或邮箱已被使用'
        })
        return
      }
      /**
       * 验证码
       * * */
      const validate = await ValidateCodeModel.findOne({
        email: data.email,
      }).sort({
        createTime: -1
      })
      if (!validate || validate.email != data.email) {
        res.json({
          code: codeStatus.error,
          success: false,
          msg: '邮箱与验证码不匹配'
        })
        return
      } else if (validate.validateCode != data.validateCode) {
        res.json({
          code: codeStatus.error,
          success: false,
          msg: '验证码错误'
        })
        return
      } else if (Date.parse(new Date()) / 1e3 - validate.createTime > 5 * 60) {
        res.json({
          code: codeStatus.error,
          success: false,
          msg: '验证码已失效'
        })
        return
      }
      /**
       * 验证码 end
       * * */
      data.password = getMd5Password(data.password)
      await UserModel.create(data)
      res.json({
        code: codeStatus.success,
        success: true,
        msg: '注册成功'
      })

    } catch (error) {
      res.status(500).json({
        code: codeStatus.error,
        success: false,
        msg: error.message
      })
    }
  }
  async getValidateCode(req, res) {
    try {
      const {
        email,
        _t
      } = req.query
      let validateCode = Math.random().toString()
      validateCode = validateCode.substr(2, 4)
      await ValidateCodeModel.create({
        email,
        validateCode,
        createTime: _t
      })
      const result = await sendEmail.send({
        title: "注册邮箱验证码",
        to: email,
        html: `<h4>验证码:</h4><p>${validateCode}</p>`
      })
      if (!result) throw result
      res.json({
        code: codeStatus.success,
        success: true,
        msg: '验证码发送成功',
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        code: codeStatus.error,
        success: false,
        msg: '验证码发送失败'
      })
    }
  }
  async login(req, res) {
    try {
      let {
        userName,
        password,
        remember
      } = req.body
      //加密密码查新用户
      password = getMd5Password(password)
      const userInfo = await UserModel.findOne({
        userName,
        password
      }, )
      if (!userInfo) {
        res.json({
          code: codeStatus.error,
          success: false,
          msg: '用户名或密码错误'
        })
        return
      }
      //生成token
      const token = await getToken({
        userName,
        roleId: userInfo.roleId,
        _id: userInfo._id
      }, remember)
      delete userInfo.password
      res.json({
        code: codeStatus.success,
        success: true,
        msg: '登录成功',
        data: {
          userInfo,
          token
        }
      })
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        code: codeStatus.error,
        success: false,
        msg: '登录失败！请联系管理员'
      })
    }
  }

  async getAuthRouter(req, res) {
    try {
      const {
        _token
      } = req
      const data = await RoleModel.aggregate([{
        $match: {
          '_id': new ObjectId(_token.roleId)
        }
      }, {
        $lookup: {
          'from': 'systemmenus',
          'localField': 'authList',
          'foreignField': '_id',
          'as': 'menuList'
        }
      }, {
        $unwind: {
          path: '$menuList'
        }
      }, {
        $replaceRoot: {
          newRoot: '$menuList'
        }
      }, {
        $sort: {
          sort: 1
        }
      }])
      if (!data) {
        throw new Error('账户未确认角色身份')
      }
      res.json({
        code: codeStatus.success,
        success: true,
        msg: '查询成功',
        data
      })
    } catch (error) {
      res.json({
        code: codeStatus.error,
        success: false,
        msg: error.message
      })
    }
  }
}

module.exports = new User()