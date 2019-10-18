const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const dbConnect = require('./modules/dbconnect')
const cors = require('koa2-cors')
const router = require('./router/index')

const app = new Koa()
dbConnect()
app.use(cors())
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())
app.listen(8088, () => {
  console.log('http://localhost:8088')
})
