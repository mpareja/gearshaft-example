const { entityStreamName } = require('../stream-names')
const { UserRegistered } = require('../messages')

exports.createRegisterUserHandler = ({ log, registrationEntityStore, write }) => {
  const registerUserHandler = async (registerUser) => {
    // Handlers operating on previously existing entities will want
    // to load the entity with the version details like so:
    // ```
    // const [registration, { version }] = await registrationEntityStore.fetchRecord(registerUser.userId)
    // ```
    const registration = await registrationEntityStore.fetch(registerUser.userId)

    const ignoreReason = registration.skipRegister()
    if (ignoreReason) {
      log.info(`register-user command ignored: ${ignoreReason}`)
      return
    }

    const processedTimestamp = new Date()
    const userRegistered = UserRegistered.follow(registerUser, { processedTimestamp })

    await writeEvent(userRegistered)

    log.info('register-user command successful: UserRegistered event written')
  }

  const writeEvent = async (userRegistered) => {
    const streamName = entityStreamName(userRegistered.userId)

    try {
      // Handlers writing to a previously existing stream will want to
      // to include the expected version like so:
      // ```
      // await write(userRegistered, streamName, { expectedVersion: version })
      // ```
      await write.initial(userRegistered, streamName)
    } catch (inner) {
      const error = new Error('error writing UserRegistered event')
      error.inner = inner
      throw error
    }
  }

  return registerUserHandler
}
