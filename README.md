# rasp-node-blink
Basic Restfull API build on top of koa.js framework to handle a Raspberry Pi 3 model B with a expansion board

### Ready, set, go!

  - Clone the repo `https://github.com/alanbueno/rasp-node-blink`
  - Create an SentryProject [https://sentry.io/](https://sentry.io/)
  - [Run `npm install` or `yarn install`](https://github.com/alanbueno/rasp-node-blink#dependencies)
  - [Create your .env file](https://github.com/alanbueno/rasp-node-blink#env-file)
  - Run `npm start` or `yarn run start`

## Env File
Create a .env file (in the root of the project) with the env variables
```shell
    HOST=customHost (default: 0.0.0.0)
    PORT=customPort (default: 3001)
    BASE_PATH=customBasePath
    SENTRY_URL=TokenSentry@sentry.io/token
```
## Dependencies

* ##### boom
* ##### config
* ##### dotenv
* ##### joi
* ##### koa
* ##### koa-bodyparser
* ##### koa-router
* ##### raven

## Dev Dependencies
* ##### snazzy
* ##### standard
* ##### supertest

## Usage

Once the app is ready n running, use any HTTP(s) client to make a request:
```shell
$npm start
``` 
You can set port on config file, if not, default is 3001.

Examples: 
___
  - http://localhost:3001/
  - Method: GET
  - Host: http://localhost:3001
  - Path: '/'

Shoud return just:
```
{
    "version": "0.1.0",
    "uptime": 31.523
}
```
___
  - http://localhost:3001/ping
  - Method: GET
  - Host: http://localhost:3001
  - Path: '/ping'

Shoud return just:
```
pong
```
___
  - http://192.168.0.17:3001/toggleRelay/2
  - Method: PATCH
  - Host: http://yourRaspIp:3001
  - Path: '/toggleRelay/:idRelay'

Shoud return just:
```
{
    "state": "on"
}
```
Or:
```
{
    "state": "off"
}
```
