const rc = require('rc')

exports.loadConfig = () => rc('gearshaft_example', {
  gearshaft: {
    log: {
      level: 'warn'
    }
  },
  log: {
    name: 'gearshaft_example',
    level: 'info'
  },
  postgres: {
    type: 'postgres',
    host: 'localhost',
    user: 'message_store',
    password: 'NInAN5t3kJo8d7I3',
    database: 'message_store'
  }
})
