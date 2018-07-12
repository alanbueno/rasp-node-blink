const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

require('./middleware/sentry-logs')(app)

app.use(bodyParser({ enableTypes: 'json' }))

app.use(require('./middleware/response-header'))

app.use(require('./middleware/error-handler'))

app.use(require('./middleware/response-decorator'));

require('./routes')(app)

module.exports = app
