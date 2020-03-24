const { configureTestModules } = require('./configure-test-modules')
const { createRegisterUserHandler } = require('../register-user-handler')
const { exampleRegisterUser, exampleRegistration } = require('../../')

// setup allows testing scenarios where registration
// does and does not exist
const setupMessageHandled = async (registration) => {
  const modules = configureTestModules()
  const handle = createRegisterUserHandler(modules)

  const message = exampleRegisterUser()

  if (registration) {
    modules.registrationEntityStore.add(message.userId, registration)
  }

  await handle(message)

  return { ...modules, handle, registration, message }
}

describe('register-user-handler', () => {
  describe('given a RegisterUser command', () => {
    it('writes a UserRegistered event', async () => {
      const { message, write } = await setupMessageHandled()

      write.assertOnlyWriteInitial(`registration-${message.userId}`, (event) => {
        expect(event.userId).toEqual(message.userId)
        expect(event.emailAddress).toEqual(message.emailAddress)
      })
    })

    it('logs success', async () => {
      const { log } = await setupMessageHandled()

      expect(log.info).toHaveBeenCalledWith('register-user command successful: UserRegistered event written')
    })
  })

  describe('already registered user', () => {
    it('log ignored', async () => {
      const registration = exampleRegistration.userRegistered()
      const { log } = await setupMessageHandled(registration)

      expect(log.info).toHaveBeenCalledWith(`register-user command ignored: ${registration.skipRegister()}`)
    })
  })

  describe('error writing event', () => {
    it('propagates error', async () => {
      const { handle, message, write } = await setupMessageHandled()
      const inner = new Error('bogus write error')
      write.stubError(inner)

      const error = await handle(message).catch(err => err)

      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('error writing UserRegistered event')
      expect(error.inner).toBe(inner)
    })
  })
})
