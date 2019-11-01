const Router = require('@koa/router')
const Judge = require('../../controllers/judge')

const router = new Router()

router
  .prefix('/team')
  .post('/add', Judge.Add)
  .get('/get', Judge.Get)
  .put('/update', Judge.Update)
  .delete('/delete', Judge.Delete)

module.exports = router
