
class Registration {
  constructor () {
    this.registered = false
  }

  userRegistered (userRegistered) {
    this.registered = true
  }

  skipRegister () {
    return this.registered ? 'user already registered' : false
  }
}

module.exports = { Registration }
