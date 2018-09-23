// @flow

const { to } = require('await-to-js')
const joi = require('joi')

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

/**
 * Handler that show the status of all relays
 * @param {*} ctx 
 */
function getAllRelayStates(ctx){

}

/**
 * Handler that show a specific relay status 
 * @param {*} ctx 
 */
function getRelayState(ctx){
  
}

/**
 * Handler that set a specific relay status between on and off
 * @param {*} ctx 
 */
function setRelayState(ctx){

}

/**
 * Handler that toggle the relay status between on and off
 * @param {*} ctx 
 */
async function toggleRelay (ctx) {

  // joi

  let actualRelay = relays.find(relay => relay.iRelay === Number(ctx.params.idRelay))

  let [err, word] = await to(ctx.i2cBus.readWord(actualRelay.bank))
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

  await ctx.i2cBus.writeByte(actualRelay.bank, word)

  ctx.body = {
    state
  }

  return ctx
}

module.exports = {
  getAllRelayStates,
  getRelayState,
  setRelayState,
  toggleRelay
}
