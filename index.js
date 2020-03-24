const { configureModules } = require('./configure-modules')
const { loadConfig } = require('./config')
const { startHost } = require('./host')

const config = loadConfig()

const modules = configureModules(config)

startHost(modules, config)
