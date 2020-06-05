const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseSchema = new Schema({
  roleName: String,
  roleCode: String,
  authList: [Schema.Types.ObjectId],
  usedIn: {
    type: String,
    default: "public"
  },
  remark: {
    type: String,
    max: 100
  },
  createBy: {
    type: String,
    required: true,
    default: "erke"
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  }
})

const RoleMode = mongoose.model('role', mongooseSchema)
module.exports = RoleMode