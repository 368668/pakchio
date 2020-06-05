//mongodb://name:123456@192.168.1.3:27017
const fs = require('fs')
let privateKey
try {
  fs.openSync(__dirname + '/../private.key', 'r')
  privateKey = fs.readFileSync(__dirname + '/../private.key', {
    flag: "r",
    encoding: "utf8"
  })
} catch (error) {
  console.log(error)
}

module.exports = {
  port: '3000',
  host: "192.168.1.3",
  mongodb: "mongodb://superAdmin:123456@192.168.1.3:27017/pakchoi",
  salt: 'pakchoi-server-Libra-erke',
  email: {
    senderAddress: "1726357725@qq.com",
    user: "1726357725@qq.com",
    pass: "ouxpugxwrkcibecj"
  },
  privateKey
}