const { createCommandConsumer } = require('./consumers/command-consumer')
const { createRegistrationEntityStore } = require('./registration-entity-store')

exports.registerConsumers = (host, modules, config) => {
  const registrationEntityStore = createRegistrationEntityStore(modules.messageStore)
  const componentModules = { ...modules, registrationEntityStore }

  host.register(createCommandConsumer(componentModules, config))
}
