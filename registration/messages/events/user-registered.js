const { Message } = require('../../../messaging')

class UserRegistered extends Message {}

// Depending on your Message class implementation, this could be
// where the message schema is defined
// UserRegistered.schema = Yup.object({
//   emailAddress: Types.emailAddress.schema().required(),
//   firstName: Yup.string().required(),
//   userId: Attributes.userId.schema().required(),
//   requestedTimestamp: Yup.date().required(),
//   processedTimestamp: Yup.date().required()
// })

module.exports = { UserRegistered }
