const { category } = require('../stream-names')
const { createConsumer } = require('gearshaft/consumer')
const { createRegistrationViewDocumentProjection } = require('../registration-view')

exports.createRegistrationViewConsumer = (modules, config) => {
  const { registerHandlers } = createRegistrationViewDocumentProjection(modules)

  return createConsumer({
    category,
    groupMember: config.gearshaft.groupMember,
    groupSize: config.gearshaft.groupSize,
    log: modules.gearshaftLog,
    messageStore: modules.messageStore,
    name: 'Registration.RegistrationView',
    registerHandlers
  })
}
