let mongoHost = '106.13.92.185'
if (process.env.NODE_ENV === 'production') {
  mongoHost = 'localHost'
}

module.exports = {
  mongoURI: `mongodb://${mongoHost}:27017,${mongoHost}:27018,${mongoHost}:27019/xinjiangfy?replicaSet=rep`,
  secretOrKey: 'secret',
  baseApi: '/api/v1'
}
