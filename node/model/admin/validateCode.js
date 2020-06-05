const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseSchema = new Schema({
  validateCode: {
    type: String,
    required: true,
  },
  email: String,
  mobile: Number,
  createTime: Number,
})
const ValidateCodeModel = mongoose.model('validateCode', mongooseSchema)
module.exports = ValidateCodeModel