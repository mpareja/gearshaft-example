const { exampleRegistration } = require('../')
const { Registration } = require('../registration')

describe('registration', () => {
  it('new', () => {
    const registration = new Registration()

    expect(registration.skipRegister()).toBe(false)
  })

  it('userRegistered', () => {
    const registration = exampleRegistration.userRegistered()

    expect(registration.skipRegister()).toBe('user already registered')
  })
})
