const config = require('config')
const router = require('koa-router')({ prefix: config.application.basePath })
const controller = require('./relayHandling.controller')

router.get('/statusRelay', controller.getAllRelayStates)
router.get('/statusRelay/:idRelay', controller.getRelayState)
router.patch('/statusRelay/:idRelay', controller.setRelayState)
router.patch('/toggleRelay/:idRelay', controller.toggleRelay)

module.exports = router
