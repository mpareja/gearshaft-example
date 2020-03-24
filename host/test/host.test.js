const { startHost } = require('../host')
const { createTestConfig, createTestLog } = require('../../test')

const setupHost = () => {
  const modules = {}
  modules.log = createTestLog()
  const config = createTestConfig()
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
