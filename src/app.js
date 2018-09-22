const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors');
const i2cBus = require('./middleware/i2c-bus')()

app.use(cors());

app.context.i2cBus = i2cBus

require('./middleware/sentry-logs')(app)

app.use(bodyParser({ enableTypes: 'json' }))

app.use(require('./middleware/response-header'))

app.use(require('./middleware/error-handler'))

require('./routes')(app)

module.exports = app
