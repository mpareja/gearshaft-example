const { Message } = require('../../../messaging')

class RegisterUser extends Message {}

// Depending on your Message class implementation, this could be
// where the message schema is defined
// RegisterUser.schema = Yup.object({
//   emailAddress: Types.emailAddress.schema().required(),
//   firstName: Yup.string().required(),
//   userId: Attributes.userId.schema().required(),
//   requestedTimestamp: Yup.date().required()
// })

module.exports = { RegisterUser }
