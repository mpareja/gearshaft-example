const Registration = require('../registration/register-consumers')
const { startHost } = require('gearshaft/host')

exports.startHost = (modules, config) => {
  modules.log.info('host is starting')

  const host = startHost(componentHost => {
    Registration.registerConsumers(componentHost, modules, config)
  })

  host.on('stopped', async () => {
    await modules.postgresGateway.end()
    modules.log.info('host has stopped')
  })

  return host
}
