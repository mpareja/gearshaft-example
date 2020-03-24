const { commandCategory } = require('../stream-names')
const { createConsumer } = require('gearshaft/consumer')
const { createRegisterUserHandler } = require('../handlers/register-user-handler')
const { RegisterUser } = require('../messages')

exports.createCommandConsumer = (modules, config) => {
  const registerHandlers = (register) => {
    register(RegisterUser, createRegisterUserHandler(modules))
  }

  return createConsumer({
    category: commandCategory(),
    groupMember: config.gearshaft.groupMember,
    groupSize: config.gearshaft.groupSize,
    log: modules.gearshaftLog,
    name: 'Registration.Command',
    registerHandlers,
    messageStore: modules.messageStore
  })
}
