const MenuModel = require('../../../model/admin/system/menu')
const {
  codeStatus
} = require('../../../routes/index')

class Menu {
  async getList(req, res) {
    try {
      const data = await MenuModel.find().sort({
        sort: 1
      })
      res.json({
        code: codeStatus.success,
        success: true,
        msg: '查询成功',
        data
      })
    } catch (error) {
      res.status(500).json({
        code: codeStatus.error,
        success: false,
        msg: error.message
      })
    }
  }
  async addMenu(req, res) {
    try {
      const data = Object.assign({}, req.body)
      data.name = data.path.substr(1, data.path.length - 1).replace(/\//g, '-').toLocaleLowerCase()
      const result = await MenuModel.create(data)
      if (result) {
        res.json({
          code: codeStatus.success,
          success: true,
          msg: '操作成功'
        })
      }
    } catch (error) {
      res.status(500).json({
        code: codeStatus.error,
        success: false,
        msg: error.message
      })
    }
  }
  async updateMenu(req, res) {
    try {
      const {
        _id,
        ...data
      } = Object.assign({}, req.body)
      data.name = data.path.substr(1, data.path.length - 1).replace(/\//g, '-').toLocaleLowerCase()
      const result = await MenuModel.updateOne({
        _id
      }, data)
      if (result) {
        res.json({
          code: codeStatus.success,
          success: true,
          msg: '更新成功'
        })
      }
    } catch (error) {
      res.status(500).json({
        code: codeStatus.error,
        success: false,
        msg: error.message
      })
    }
  }
  async deleteMenuItem(req, res) {
    const {
      _id
    } = req.body
    try {
      const hadChild = await MenuModel.findOne({
        parentId: _id
      })
      if (hadChild) {
        res.json({
          code: codeStatus.error,
          success: false,
          msg: '该菜单含有子菜单不能删除'
        })
        return
      }
      await MenuModel.deleteOne({
        _id
      })
      res.json({
        code: codeStatus.success,
        success: true,
        msg: '删除成功'
      })
    } catch (error) {
      res.status(500).json({
        code: codeStatus.error,
        success: false,
        msg: '删除失败'
      })
    }
  }
  async getMenuOptions(req, res) {
    try {
      const data = await MenuModel.find({}, {
        _id: "_id",
        parentId: "parentId",
        title: "title"
      }).sort({
        sort: 1
      })
      res.json({
        code: codeStatus.success,
        success: true,
        msg: '查询成功',
        data
      })
    } catch (error) {
      res.status(500).json({
        code: codeStatus.error,
        success: false,
        msg: error.message
      })
    }
  }
}

module.exports = new Menu()