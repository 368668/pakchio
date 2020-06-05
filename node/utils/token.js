const jwt = require('jsonwebtoken')
const {
  privateKey
} = require('./../config')

module.exports = {
  async getToken(info, refresh = false) {
    const data = Object.assign({}, info)
    const time = Date.parse(new Date()) / 1e3
    data.iat = refresh ? time + 2 * 3600 : time + 4 * 3600
    if (refresh) {
      data.refreshTime = time + 4 * 3600
    }
    try {
      const token = await jwt.sign(data, privateKey)
      return token;
    } catch (error) {
      console.log(error)
    }
  },

  async validateToken(token) {
    try {
      const decoded = await jwt.verify(token, privateKey)
      const now = Date.parse(new Date()) / 1e3
      //记住会话
      if (typeof decoded.refreshTime != 'undefined') {
        if (now > decoded.iat && now < decoded.refreshTime) {
          //刷新token
          decoded.status = 201
        } else if (decoded.refreshTime - decoded.iat != 2 * 3600 || now > decoded.refreshTime) {
          return null
        }
      } else {
        if (now > decoded.iat) return null
      }
      return decoded
    } catch (error) {
      console.log(error.message)
      return null
    }
  }
}