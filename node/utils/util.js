const md5 = require('md5')
const {
  salt
} = require('./../config')
module.exports = {
  getMd5Password(password) {
    return md5(md5(password + salt))
  }
}