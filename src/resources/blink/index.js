const config = require('config')
const router = require('koa-router')({ prefix: config.application.basePath })
const controller = require('./blink.controller')

router.post('/blink', controller.blink)

module.exports = router
