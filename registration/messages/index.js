module.exports = {
  ...require('./commands/register-user'),
  ...require('./events/user-registered')
}
