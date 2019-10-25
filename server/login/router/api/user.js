const Router = require('@koa/router')
const User = require('../../controllers/user')

const router = new Router()

router
  .prefix('/user')
  .post('/test', User.Test)
  .post('/register', User.Register)
  .post('/login', User.Login)
  .get('/info', User.Info)

module.exports = router
