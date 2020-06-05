exports.addRouter = (app) => {
  // 分页中间件
  app.get(/\/list/, (req, res, next) => {
    if (typeof req.query.currentPage != 'undefined' && typeof req.query.pageSize != 'undefined') {
      const {
        currentPage,
        pageSize
      } = req.query
      req.query.skip = parseInt(currentPage - 1) * parseInt(pageSize)
      req.query.pageSize = parseInt(pageSize) || 10
    }
    next()
  })

  app.use('/pakchoi/system/menu', require('./admin/system/menu'))
  app.use('/pakchoi/system/userManage', require('./admin/system/userManage'))
  app.use('/pakchoi/system/role', require('./admin/system/role'))
  app.use('/pakchoi/user/', require('./user'))
}

exports.codeStatus = {
  success: 1, //成功
  error: 0, //操作失败
  unAuth: -1, //没授权 或授权失效
  validateCodeError: -2, //验证码错误
  serverError: 500
}

exports.msgContent = {
  errQuery: "查询失败",
  query: "查询成功",
  save: "操作成功",
  errSave: "操作失败",
  delete: "删除成功"
}