const pino = require('pino')
const { createMessageStore } = require('gearshaft/message-store/memory')
const { createWriter } = require('gearshaft/messaging')

exports.configureModules = (config) => {
  const log = pino(config.log)

  const gearshaftLog = log.child(config.gearshaft.log)
  const messageStore = createMessageStore({ log: gearshaftLog })
  const write = createWriter({ log: gearshaftLog, messageStore })

  return {
    gearshaftLog,
    log,
    messageStore,
    write
  }
}
