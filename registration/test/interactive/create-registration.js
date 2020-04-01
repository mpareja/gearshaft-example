#!/usr/bin/env node

const { configureModules } = require('../../../configure-modules')
const { loadConfig } = require('../../../config')

const { exampleRegisterUser, commandStreamName } = require('../../')

async function go () {
  const config = loadConfig()
  const { postgresGateway, write } = configureModules(config)

  const registerUser = exampleRegisterUser()
  await write(registerUser, commandStreamName(registerUser.userId))

  console.log(`command written with user id: ${registerUser.userId}`)

  await postgresGateway.end()
}

go()
