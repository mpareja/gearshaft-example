const { startHost } = require('gearshaft/host')

exports.startHost = (modules, config) => {
  modules.log.info('host is starting')

  const host = startHost(componentHost => {
    // TODO: add components
  })

  return host
}
