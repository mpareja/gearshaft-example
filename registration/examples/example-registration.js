const { exampleUserRegistered } = require('./example-user-registered')
const { Registration } = require('../registration')
const { RegistrationProjection: { project } } = require('../registration-projection')

const userRegistered = (overrides) => {
  const registration = new Registration()
  const userRegistered = exampleUserRegistered(overrides)

  project(registration, userRegistered)

  return registration
}

exports.exampleRegistration = { userRegistered }
