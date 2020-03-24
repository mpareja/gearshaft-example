const faker = require('faker')
const { RegisterUser } = require('../messages')

exports.exampleRegisterUser = (overrides) => {
  const fields = Object.assign({
    emailAddress: faker.internet.email(),
    firstName: faker.name.firstName(),
    requestedTimestamp: new Date(),
    userId: faker.random.uuid()
  }, overrides)

  return RegisterUser.create(fields)
}
