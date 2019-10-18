const mongoose = require('mongoose')
const config = require('../config/config')

module.exports = async () => {
  // 链接数据库 https://mongoosejs.com/docs/connections.html#buffering
  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
  // To handle initial connection errors
  mongoose
    .connect(config.mongoURI, options)
    .then(() => {
      console.log('Mongodb Connected...')
    })
    .catch(err => {
      console.log(err)
    })
  // To handle errors after initial connection was established
  mongoose.connection.on('error', err => {
    console.log(err)
  })
}
