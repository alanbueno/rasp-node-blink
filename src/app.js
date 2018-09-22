const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors');

app.use(cors());

require('./middleware/sentry-logs')(app)

app.use(bodyParser({ enableTypes: 'json' }))

app.use(require('./middleware/response-header'))

app.use(require('./middleware/error-handler'))

app.use(require('./middleware/i2c-bus'))

require('./routes')(app)

module.exports = app
