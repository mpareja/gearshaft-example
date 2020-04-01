const { createPostgresDocumentStore } = require('gearshaft/document-store/postgres')
const { RegistrationView } = require('./registration-view')

exports.createRegistrationViewDocumentStore = ({ postgresGateway }) => createPostgresDocumentStore({
  columns: { id: 'email_address' },
  entity: RegistrationView,
  idField: 'emailAddress',
  postgresGateway,
  table: 'registration_view'
})
