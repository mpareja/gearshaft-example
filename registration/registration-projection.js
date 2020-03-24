const { createEntityProjection } = require('gearshaft/entity-projection')
const { UserRegistered } = require('./messages')

exports.RegistrationProjection = createEntityProjection((register) => {
  register(UserRegistered, (registration, userRegistered) => {
    registration.userRegistered(userRegistered)
  })
})
