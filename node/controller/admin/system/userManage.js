const UserModel = require('./../../../model/user')
const {
  codeStatus,
  msgContent
} = require('../../../routes/index')
class UserManage {
  async getList(req, res) {
    try {
      const list = await UserModel.aggregate([{
          $lookup: {
            from: 'roles',
            localField: "roleId",
            foreignField: "_id",
            as: "roleData"
          }
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{
                $arrayElemAt: ["$roleData", 0]
              }, "$$ROOT"]
            }
          }
        },
        {
          $sort: {
            updateDate: -1
          }
        }, {
          $skip: req.query.skip
        }, {
          $limit: req.query.pageSize
        },
        {
          $project: {
            roleData: 0,
            password: 0
          }
        }
      ])

      const total = await UserModel.estimatedDocumentCount()
      res.json({
        code: codeStatus.success,
        success: true,
        msg: msgContent.query,
        data: {
          list,
          total
        }
      })
    } catch (error) {
      console.log(error.message)
      res.json({
        code: codeStatus.error,
        success: false,
        msg: msgContent.errQuery
      })
    }
  }
  async update(req, res) {
    try {
      const result = await UserModel.updateOne({
          _id: req.body._id
        },
        req.body)
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
}


module.exports = new UserManage()