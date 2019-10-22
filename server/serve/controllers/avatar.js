const multer = require('@koa/multer')
const path = require('path')
/**
 * 测试
 */
const Test = async ctx => {
  ctx.body = {
    client: ctx.request.body.test,
    server: '🔙嘛嘛,呀'
  }
}

const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/avatar/',
    filename: function(ctx, file, cb) {
      var fileFormat = file.originalname.split('.')
      cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
  })
})

const Avatar = ctx => {
  ctx.body = {
    filename: ctx.request.file.filename
  }
}
module.exports = {
  Test,
  upload,
  Avatar
}
