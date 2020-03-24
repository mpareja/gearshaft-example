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
  }
})
