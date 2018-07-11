const config = require('config')
const router = require('koa-router')({ prefix: config.application.basePath })
const controller = require('./toggleRelay.controller')

router.patch('/toggleRelay/:idRelay', controller.toggleRelay)

module.exports = router
