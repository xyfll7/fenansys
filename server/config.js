let mongoHost = '106.13.92.185'
let mongoURI = `mongodb://${mongoHost}:27018/xinjiangfy`
if (process.env.NODE_ENV === 'production') {
  mongoHost = 'localHost'
  mongoURI = `mongodb://${mongoHost}:27018,${mongoHost}:27017,${mongoHost}:27019/xinjiangfy?replicaSet=rep`
}

module.exports = {
  mongoURI,
  secretOrKey: 'secret',
  baseApi: '/api/v1'
}
