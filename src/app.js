const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const i2cBus = require('./middleware/i2c-bus')

app.use(cors())

// mounting bus
i2cBus()
  // eslint-disable-next-line
  .then(bus => app.context.i2cBus = bus)
  .catch(err => console.error('Error calling bus mounter: ', err))

require('./middleware/sentry-logs')(app)

app.use(bodyParser({ enableTypes: 'json' }))

app.use(require('./middleware/response-header'))

app.use(require('./middleware/error-handler'))

require('./routes')(app)

module.exports = app
