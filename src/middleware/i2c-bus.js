const { Bus, Device } = require('i2c-bus-promised')
const address = 0x20


module.exports = async (ctx, next) => {
  try {
    const bus = new Bus()
    await bus.open()

    const i2cBus = new Device(bus, address)

    await i2cBus.writeByte(0x00, 0x00)
    await i2cBus.writeByte(0x01, 0x00)

    return i2cBus

  } catch (error) {
    console.error('err', error)
  }
}