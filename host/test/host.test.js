const { configureModules } = require('../../configure-modules')
const { createTestConfig, createTestLog } = require('../../test')
const { startHost } = require('../host')

const setupHost = () => {
  const config = createTestConfig()
  const modules = configureModules(config)
  modules.log = createTestLog()

  const host = startHost(modules, config)

  return { ...modules, host }
}

describe('host', () => {
  describe('startHost', () => {
    it('logs that the host is starting', async () => {
      const { host, log } = setupHost()

      await host.stop() // clean up

      expect(log.info).toHaveBeenCalledWith('host is starting')
    })
  })
})
