// @flow

const { Bus, Device } = require('i2c-bus-promised')
const { to } = require('await-to-js')

const relayBanks = { a: 0x12, b: 0x13 }

const relays = [
  { iRelay: 1, iDic: 0, bank: relayBanks.a },
  { iRelay: 2, iDic: 1, bank: relayBanks.a },
  { iRelay: 3, iDic: 2, bank: relayBanks.a },
  { iRelay: 4, iDic: 3, bank: relayBanks.a },
  { iRelay: 5, iDic: 4, bank: relayBanks.a },
  { iRelay: 6, iDic: 5, bank: relayBanks.a },
  { iRelay: 7, iDic: 6, bank: relayBanks.a },
  { iRelay: 8, iDic: 7, bank: relayBanks.a },
  { iRelay: 9, iDic: 0, bank: relayBanks.b },
  { iRelay: 10, iDic: 1, bank: relayBanks.b }
]
const address = 0x20

async function toggleRelay (ctx) {
  const bus = new Bus()
  await bus.open()

  const relaysBus = new Device(bus, address)

  let actualRelay = relays.find(relay => relay.iRelay === Number(ctx.params.idRelay))

  await relaysBus.writeByte(0x00, 0x00)
  await relaysBus.writeByte(0x01, 0x00)

  let [err, word] = await to(relaysBus.readWord(actualRelay.bank))
  if (err) {
    throw err
  }

  let state
  if ((word >> actualRelay.iDic) & 1) {
    // go to low state
    word -= (1 << actualRelay.iDic)
    state = 'off'
  } else {
    // go to high state
    word += (1 << actualRelay.iDic)
    state = 'on'
  }

  await relaysBus.writeByte(actualRelay.bank, word)

  ctx.body = {
    state
  }

  return ctx
}

module.exports.toggleRelay = toggleRelay
