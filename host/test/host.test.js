const delay = require('util').promisify(setTimeout)
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

      // clean up
      await host.stop()

      expect(log.info).toHaveBeenCalledWith(
        'host is starting')
    })
  })

  describe('stop', () => {
    it('logs that the host is stopping', async () => {
      const { host, log } = setupHost()

      await host.stop()

      await delay(10) // allow "stopped" event to be processed

      expect(log.info).toHaveBeenCalledWith('host has stopped')
    })
  })

  describe('when a postgres connection errors', () => {
    it('logs error without divulging sensitive credentials', async () => {
      const config = createTestConfig()
      const { log, postgresGateway } = configureModules(config)
      log.error = jest.fn()

      // 1. reserve connection that will do the termination
      const reaperConnection = await postgresGateway.connect()

      // 2. grab pid for connection that will be terminated
      const result = await postgresGateway.query('SELECT pg_backend_pid() as pid')
      const { pid } = result.rows[0]

      // 3. terminate the other connection
      await reaperConnection.query('SELECT pg_backend_pid() as pid, pg_terminate_backend($1::int)', [pid])
      await reaperConnection.release()

      // 4. cleanup
      await postgresGateway.end()

      await delay(100) // give termination of other pid a chance to be noticed

      expect(log.error).toHaveBeenCalledWith(
        { err: expect.any(Error) },
        'postgres connection error'
      )

      const error = log.error.mock.calls[0][0]
      expect(containsValue(error, config.postgres.password)).toBe(false)
    })
  })
})

const containsValue = (obj, value) => {
  if (obj === value) {
    return true
  }

  if (!obj) {
    return false
  }

  if (obj instanceof Array) {
    return obj.some((entry) => containsValue(entry, value))
  }

  if (typeof obj === 'object') {
    return Object.values(obj).some((entry) => containsValue(entry, value))
  }

  return false
}
