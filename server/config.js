const mongoUser = 'xyf'
const mongoPass = "yangqi7'"
let mongoHost = '148.70.143.157'
// const port = '27028'
let mongoURI = `mongodb://xyf:yangqi7'@148.70.143.157:27028/xinjiangfy?&authSource=admin`
// mongoURI = "mongodb://xyf:yangqi7'@localhost:27017,localhost:27018,localhost:27019/xinjiangfy?replicaSet=rep&authSource=admin"
// let mongoURI = `mongodb://xyf:yangqi7'@${mongoHost}:27029,${mongoHost}:27028,${mongoHost}:27027/xinjiangfy?replicaSet=rep`
// let mongoURI = `mongodb://${mongoHost}:27027,${mongoHost}:27028,${mongoHost}:27029/xinjiangfy?replicaSet=rep`
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
