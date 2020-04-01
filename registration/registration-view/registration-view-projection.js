const { createEntityProjection } = require('gearshaft/entity-projection')
const { UserRegistered } = require('../messages')

exports.RegistrationViewProjection = createEntityProjection((register) => {
  register(UserRegistered, (registrationView, userRegistered) => {
    registrationView.userRegistered(userRegistered)
  })
})
