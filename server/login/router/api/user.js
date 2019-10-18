const Router = require('koa-router')
const User = require('../../controllers/user.js')

const router = new Router()

router
    .prefix('/user')
    .post('/login', User.Login)
    .post('/register', User.Register)

module.exports = router