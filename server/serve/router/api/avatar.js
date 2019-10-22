const Router = require('@koa/router')
const Avatar = require('../../controllers/avatar')

const router = new Router()

router
  .prefix('/avatar')
  .post('/test', Avatar.Test)
  .post('/avatar', Avatar.upload.single('file'), Avatar.Avatar)

module.exports = router
