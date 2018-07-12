// @flow

const { Bus, Device } = require('i2c-bus-promised')

const relayBanks = {a: 0x12, b: 0x13}

const relays = [
  {iRelay: 1, iDic: 0, bank: relayBanks.a},
  {iRelay: 2, iDic: 1, bank: relayBanks.a},
  {iRelay: 3, iDic: 2, bank: relayBanks.a},
  {iRelay: 4, iDic: 3, bank: relayBanks.a},
  {iRelay: 5, iDic: 4, bank: relayBanks.a},
  {iRelay: 6, iDic: 5, bank: relayBanks.a},
  {iRelay: 7, iDic: 6, bank: relayBanks.a},
  {iRelay: 8, iDic: 7, bank: relayBanks.a},
  {iRelay: 9, iDic: 0, bank: relayBanks.b},
  {iRelay: 10, iDic: 1, bank: relayBanks.b},
]
const address = 0x20

async function toggleRelay (ctx) {
  const bus = new Bus();
  await bus.open();

  const relaysBus = new Device(bus, address);

  let actualRelay = relays.find(relay => relay.iRelay === Number(ctx.params.idRelay))

  await relaysBus.writeByte(0x00,0x00);
  await relaysBus.writeByte(0x01,0x00);

  Promise.all([
    relaysBus.readWord(actualRelay.bank)
  ])
    .then(async ([value]) => {
      //Shift the bits for the register value, checking if they are already set first
      if ((value >> actualRelay.iDic) & 1) {
        //already high go to lo low state
        value -= (1 << actualRelay.iDic)
      } else {
        //already lo go to high low state
        value += (1 << actualRelay.iDic)
      }

      await relaysBus.writeByte(actualRelay.bank,value);

      return ctx.body = {
        state: value
      }
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports.toggleRelay = toggleRelay
