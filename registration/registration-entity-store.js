const { createEntityStore } = require('gearshaft/entity-store')
const { Registration } = require('./registration')
const { RegistrationProjection } = require('./registration-projection')

exports.createRegistrationEntityStore = (messageStore) => {
  return createEntityStore({
    category: 'registration',
    entity: Registration,
    projection: RegistrationProjection,
    messageStore
  })
}
