const mongoUser = 'xyf'
const mongoPass = "yangqi7'"
let mongoHost = '148.70.143.157'
const port = '27028'
// mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${port}/xinjiangfy?authSource=admin
let mongoURI = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${port}/xinjiangfy?authSource=admin`
// mongoURI = "mongodb://xyf:yangqi7'@localhost:27017,localhost:27018,localhost:27019/xinjiangfy?replicaSet=rep&authSource=admin"
if (process.env.NODE_ENV === 'production') {
  mongoHost = 'localHost'
  mongoURI = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:27017,${mongoHost}:27018,${mongoHost}:27019/xinjiangfy?replicaSet=rep&authSource=admin`
}
console.log(mongoURI)
module.exports = {
  mongoURI,
  secretOrKey: 'secret',
  baseApi: '/api/v1'
}
