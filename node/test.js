// const fs = require('fs')
// const path = require('path')
const list = []
const time = Date.parse(new Date())
for (let index = 134079; index < 200000; index++) {
  list.push({
    title: '测试' + index,
    amount: index,
    createTime: time + index
  })
}
// // const list2 = JSON.stringify(list)
// // fs.writeFile(path.join(__dirname, 'test.json'), list2, {
// //   flag: "w+"
// // }, (err, data) => {
// //   if (err) throw err
// //   console.log(data)
// // })
// const ist2 = JSON.stringify(list)
// const stream = fs.createWriteStream(path.join(__dirname, 'test.json'), {
//   encoding: "utf8"
// })
// stream.on('close', () => {
//   stream.end()
// })
// stream.on('ready', (data) => {
//   console.log(stream.bytesWritten)
// })
// stream.write(JSON.stringify(list), (data) => {})

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const mongooseSchema = new Schema({
  title: String,
  amount: Number,
  createTime: Number,
})

const testSort = mongoose.model('testSort', mongooseSchema)


testSort.create(list, (err, result) => {
  if (err) throw err
  console.log('写入完成')
  console.log(new Date().getTime() - time)
})