const { entityStreamName } = require('../stream-names')
const { UserRegistered } = require('../messages')

exports.createRegisterUserHandler = ({ log, registrationEntityStore, write }) => {
  const registerUserHandler = async (registerUser) => {
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
      await write.initial(userRegistered, streamName)
    } catch (inner) {
      const error = new Error('error writing UserRegistered event')
      error.inner = inner
      throw error
    }
  }

  return registerUserHandler
}
