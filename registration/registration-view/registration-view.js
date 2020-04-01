class RegistrationView {
  userRegistered ({ emailAddress, firstName, userId }) {
    this.emailAddress = emailAddress
    this.firstName = firstName
    this.userId = userId
  }
}

module.exports = { RegistrationView }
