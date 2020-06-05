const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseSchema = new Schema({
  path: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  redirect: {
    type: String,
    default: null
  },
  component: {
    type: String,
    default: null
  },
  parentId: {
    type: Schema.Types.ObjectId,
    default: null
  },
  title: {
    type: String,
    required: true
  },
  componentName: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'el-icon-menu'
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  keepAlive: {
    type: Boolean,
    default: false,
  },
  menuType: {
    type: String,
    required: true
  },
  sort: {
    type: Number,
    default: 0
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

const MenuModel = mongoose.model('SystemMenu', mongooseSchema)

module.exports = MenuModel