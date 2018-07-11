// const dic_pins = { 
//   "relay1": 0, 
//   "relay2": 1, 
//   "relay3": 2, 
//   "relay4": 3, 
//   "relay5": 4, 
//   "relay6": 5, 
//   "relay7": 6, 
//   "relay8": 7, 
  
//   "relay9": 0, 
//   "relay10": 1, 

//   "transistor1": 3, 
//   "transistor2": 2, 
//   "transistor3": 4 
// }

const relayBanks = {a: 0x12, b: 0x13}

const relays = [
  {iRelay: 1, iDic: 0, bank: relayBanks['a']},
  {iRelay: 2, iDic: 1, bank: relayBanks['a']},
  {iRelay: 3, iDic: 2, bank: relayBanks['a']},
  {iRelay: 4, iDic: 3, bank: relayBanks['a']},
  {iRelay: 5, iDic: 4, bank: relayBanks['a']},
  {iRelay: 6, iDic: 5, bank: relayBanks['a']},
  {iRelay: 7, iDic: 6, bank: relayBanks['a']},
  {iRelay: 8, iDic: 7, bank: relayBanks['a']},
  {iRelay: 9, iDic: 0, bank: relayBanks['b']},
  {iRelay: 10, iDic: 1, bank: relayBanks['b']},
]
const address = 0x20


function toggleRelay (ctx) {
  var i2c = require('i2c-bus'),
  i2c1 = i2c.openSync(1);

  // i2c1.writeWordSync(address, 0x00,0x00);
  // i2c1.writeWordSync(address, 0x01,0x00);

  let actualRelay = relays.find(relay => relay.iRelay === Number(ctx.params.idRelay))

  let value =  i2c1.readWordSync(address, actualRelay.bank)
  
  //Shift the bits for the register value, checking if they are already set first
  if ((value >> actualRelay.iDic) & 1) {
    //already high go to lo low state
    value -= (1 << actualRelay.iDic)
  } else {
    //already lo go to high low state
    value += (1 << actualRelay.iDic)
  }

  //Now write to the IO expander
  i2c1.writeWordSync(address, actualRelay.bank, value)
  
  ctx.body = 'Done'

  return ctx
}

module.exports.toggleRelay = toggleRelay
