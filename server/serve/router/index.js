const Router = require('@koa/router')
const baseApi = require('../../config').baseApi
const avatar = require('./api/avatar')
const team = require('./api/team')
const router = new Router()

router.use(baseApi, avatar.routes())
router.use(baseApi, team.routes())

module.exports = router
