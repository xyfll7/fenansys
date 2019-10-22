const Router = require('koa-router')
const User = require('../../controllers/user')

const router = new Router()

router
  .prefix('/user')
  .post('/login', User.Login)
  .post('/register', User.Register)
  .get('/getUserInfo', User.GetUserInfo)
  .post('/test', User.Test)

module.exports = router
