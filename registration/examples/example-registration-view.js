const { exampleUserRegistered } = require('./example-user-registered')
const { RegistrationView } = require('../registration-view/registration-view')
const { RegistrationViewProjection: { project } } = require('../registration-view/registration-view-projection')

const userRegistered = (overrides) => {
  const registrationView = new RegistrationView()
  const userRegistered = exampleUserRegistered(overrides)

  project(registrationView, userRegistered)

  return registrationView
}

exports.exampleRegistrationView = { userRegistered }
