let mongoHost = '148.70.143.157'
let mongoURI = `mongodb://${mongoHost}:27017/xinjiangfy`
if (process.env.NODE_ENV === 'production') {
  mongoHost = 'localHost'
  mongoURI = `mongodb://${mongoHost}:27018,${mongoHost}:27017,${mongoHost}:27019/xinjiangfy?replicaSet=rep`
}

module.exports = {
  mongoURI,
  secretOrKey: 'secret',
  baseApi: '/api/v1'
}
