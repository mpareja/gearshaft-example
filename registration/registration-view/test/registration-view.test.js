const { exampleRegistrationView, exampleUserRegistered } = require('../../examples')
const { RegistrationView } = require('../registration-view')

describe('registration-view', () => {
  it('new', () => {
    const view = new RegistrationView()

    expect(view.emailAddress).toBeUndefined()
    expect(view.firstName).toBeUndefined()
    expect(view.userId).toBeUndefined()
  })

  it('userRegistered', () => {
    const userRegistered = exampleUserRegistered()
    const view = exampleRegistrationView.userRegistered(userRegistered)

    expect(view.emailAddress).toBe(userRegistered.emailAddress)
    expect(view.firstName).toBe(userRegistered.firstName)
    expect(view.userId).toBe(userRegistered.userId)
  })
})
