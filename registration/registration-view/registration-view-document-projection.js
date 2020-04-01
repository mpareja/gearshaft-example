const { createDocumentProjection } = require('gearshaft/document-projection')
const { createRegistrationViewDocumentStore } = require('./registration-view-document-store')
const { RegistrationView } = require('./registration-view')
const { RegistrationViewProjection } = require('./registration-view-projection')

exports.createRegistrationViewDocumentProjection = ({ log, postgresGateway }) => createDocumentProjection({
  documentStore: createRegistrationViewDocumentStore({ postgresGateway }),
  entity: RegistrationView,
  identify: /* istanbul ignore next */ (message) => message.emailAddress,
  log,
  projection: RegistrationViewProjection
})
