const { exampleRegisterUser } = require('./example-register-user')
const { UserRegistered } = require('../messages')

exports.exampleUserRegistered = (overrides) => {
  const fields = Object.assign(exampleRegisterUser(), {
    processedTimestamp: new Date()
  }, overrides)

  return UserRegistered.create(fields)
}
