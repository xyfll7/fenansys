const user = require('./api/user')
const Router = require('koa-router')
const baseApi = require('../config/config').baseApi
const router = new Router()

router.use(baseApi, user.routes())

module.exports = router
