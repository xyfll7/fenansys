const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const dbConnect = require('./modules/dbconnect')
const router = require('./router')

const port = 8089

const app = new Koa()
dbConnect()
app.use(cors())
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
