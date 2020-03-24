const { inspect } = require('util')

exports.createTestLog = () => {
  // levels are listed in order for debug filtering below
  const enableDebugging = /* istanbul ignore next */ (level = 'debug') => {
    const levels = Object.keys(log)
    const levelIndex = levels.indexOf(level)
    const subset = levels.slice(levelIndex)

    for (const key of subset) {
      log[key].mockImplementation((ctx, msg) => {
        const { ...context } = ctx
        delete context.req
        delete context.res
        console.log(`${key.toUpperCase()}:`, msg, inspect(context, { depth: 4 }))
      })
    }
  }

  // order matters: used for call log filtering above
  const log = {
    enableDebugging,
    child: jest.fn(/* istanbul ignore next */() => log),
    trace: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }

  return log
}
