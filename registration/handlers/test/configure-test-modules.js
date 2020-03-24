const { createEntityStoreSubstitute } = require('gearshaft/entity-store')
const { createTestLog } = require('../../../test')
const { createWriterSubstitute } = require('gearshaft/messaging')
const { Registration } = require('../../registration')

exports.configureTestModules = () => {
  const log = createTestLog()
  const registrationEntityStore = createEntityStoreSubstitute({ entity: Registration })
  const write = createWriterSubstitute()
  return { log, registrationEntityStore, write }
}
