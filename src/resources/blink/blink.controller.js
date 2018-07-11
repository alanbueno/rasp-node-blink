const input0 = 17
const input1 = 18
const input2 = 27
const input3 = 22
const input4 = 23
const input5 = 24
const input6 = 25
const input7 = 4


function blink (ctx) {
  var i2c = require('i2c-bus'),
  i2c1 = i2c.openSync(1);

  var ADDR = [0x20]

  let resp = i2c1.readWordSync(ADDR, [0x09]);
  
  ctx.body = resp

  return ctx
}

module.exports.blink = blink
