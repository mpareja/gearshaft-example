const { follow } = require('gearshaft/messaging')

class Message {
  // Gearshaft does not require inheritance from a Message
  // base class. If a particular message class implements
  // a static `create` method, Gearshaft will use the `create`
  // method when instantiating the class instead of using the
  // class constructor.
  //
  // The static `create` method is an ideal place to introduce
  // schema validation. This Gearshaft example does not include
  // schema validation, but does include comments indicating where
  // you might fit it in.
  static create (input) {
    // SCHEMA: this is the ideal place to throw on schema failure
    // const input = this.validate(input, Message.create)

    const instance = new this()
    Object.assign(instance, input)
    return instance
  }

  // The following static function is primarily for convenience.
  // Gearshaft's `follow` implementation will ensure to call
  // `create` when instantiating the message class, and thus
  // schema validation would be performed when following messages.
  static follow (previous, additionalFields) {
    try {
      return follow(previous, this, additionalFields)
    } catch (error) {
      // helps errors zero-in on the code that supplied message
      // fields that did not congrue to the schema
      Error.captureStackTrace(error, Message.follow)
      throw error
    }
  }

  // The following example expects concrete Message implementations
  // to include a static `schema` field with a Yup validation object.
  // Alternative approaches could include leaning on JSON Schema.
  //
  // The validate function would typically perform validation and
  // sanitization of inputs, like unknown fields removal.
  //
  // static validate (input, stackFunction) {
  //   try {
  //     return this.schema.validateSync(input, { stripUnknown: true })
  //   } catch (error) {
  //     Error.captureStackTrace(error, stackFunction || Message.validate)
  //     throw error
  //   }
  // }
}

module.exports = { Message }
