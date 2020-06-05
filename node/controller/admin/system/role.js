const RoleModel = require('../../../model/admin/system/role')
const BaseClass = require('./../../baseController')
const {
  codeStatus,
  msgContent
} = require('../../../routes/index')

class Role extends BaseClass {
  constructor() {
    super()
  }
  async hadRoleCode(req, res, next) {
    try {
      const result = await RoleModel.findOne({
        roleCode: req.body.roleCode
      })
      if (result) {
        if (typeof req.body._id == 'undefined' || req.body._id != result._id) {
          throw new Error('roleCode已存在')
        }
      }
      next()
    } catch (error) {
      res.json({
        code: codeStatus.error,
        success: false,
        msg: error.message
      })
    }
  }
  async getList(req, res) {
    try {
      let likes
      if (req.query.keyWords != undefined) {
        likes = super.getLikesObj(['roleName', 'roleCode'], req.query.keyWords)
      }
      const data = await super.queryPageList(RoleModel, req.query, {
        ...likes
      })
      res.json({
        code: codeStatus.success,
        success: true,
        msg: msgContent.query,
        data
      })
    } catch (error) {
      console.log(error)
      res.json({
        code: codeStatus.error,
        success: false,
        msg: msgContent.errQuery
      })
    }
  }
  /**
   * 创建条件
   * 是否是admin
   * 商户管理员 判断自身是否有该路由 */
  async addRole(req, res) {
    try {
      const result = await RoleModel.create(req.body)
      res.json({
        code: codeStatus.success,
        success: true,
        msg: msgContent.save,
      })
    } catch (error) {
      res.json({
        code: codeStatus.error,
        success: false,
        msg: error.message
      })
    }
  }
  async updateRole(req, res) {
    try {
      const result = await RoleModel.updateOne({
        _id: req.body._id
      }, req.body)
      res.json({
        code: codeStatus.success,
        success: true,
        msg: msgContent.save,
      })
    } catch (error) {
      res.json({
        code: codeStatus.error,
        success: false,
        msg: error.message
      })
    }
  }
  async deletelRoleItem(req, res) {
    try {
      const result = await RoleModel.deleteOne({
        _id: req.body._id
      })
      res.json({
        code: codeStatus.success,
        success: true,
        msg: msgContent.delete,
      })
    } catch (error) {
      res.json({
        code: codeStatus.error,
        success: false,
        msg: error.message
      })
    }
  }
  async getRoleOptions(req, res) {
    try {
      const data = await RoleModel.find({}, {
        roleName: "roleName",
      })
      res.json({
        code: codeStatus.success,
        success: true,
        msg: msgContent.delete,
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


module.exports = new Role()