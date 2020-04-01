const pino = require('pino')
// const { createMessageStore } = require('gearshaft/message-store/memory')
const { createMessageStore } = require('gearshaft/message-store/postgres')
const { createPostgresGateway } = require('gearshaft/postgres-gateway')
const { createWriter } = require('gearshaft/messaging')

exports.configureModules = (config) => {
  const log = pino(config.log)

  const postgresGateway = createPostgresGateway(config.postgres)
  postgresGateway.on('error', (err) => {
    // prevent exposing postgres credentials and clogging up logs
    // https://github.com/brianc/node-postgres/issues/1568
    delete err.client

    log.error({ err }, 'postgres connection error')
  })

  const gearshaftLog = log.child(config.gearshaft.log)
  const messageStore = createMessageStore({ log: gearshaftLog, postgresGateway })
  const write = createWriter({ log: gearshaftLog, messageStore })

  return {
    gearshaftLog,
    log,
    messageStore,
    postgresGateway,
    write
  }
}
