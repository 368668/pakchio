const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseSchema = new Schema({
  userName: {
    type: String,
    validate: /^\w{6,16}$/
  },
  password: String,
  roleId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  mobile: {
    type: Number,
    validate: /^\d{11}$/
  },
  email: String,
  avatarUrl: {
    type: String,
    default: "/pakchoi/public/images/default-avatarUrl.png"
  },
  gender: {
    type: String,
    validate: /^1|2$/, //1 男  2 女
    default: 1
  },
  status: {
    type: String,
    validate: /^[-1,0,1]{1}$/, //-1 禁用 0待审核 1启用
    default: 1
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

const UserModel = mongoose.model('user', mongooseSchema)

module.exports = UserModel