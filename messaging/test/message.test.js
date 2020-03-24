const { Message } = require('../')

class MyMessage extends Message {}

describe('message', () => {
  describe('create', () => {
    describe('given valid input', () => {
      it('returns instance of message class', () => {
        const message = MyMessage.create({ someRequiredField: 'foo' })

        expect(message).toBeInstanceOf(MyMessage)
        expect(message.someRequiredField).toBe('foo')
      })

      // it('strips unknown fields')
    })

    // describe('given a validation exception', () => {
    //   it('stack trace is not obscured with the inclusion of create', () => {
    //   })
    // })
  })

  describe('follow', () => {
    describe('given valid input', () => {
      const message = MyMessage.create({ someRequiredField: 'foo' })

      const next = MyMessage.follow(message)

      expect(next).toBeInstanceOf(MyMessage)
      expect(next.someRequiredField).toBe('foo')
      expect(next.metadata).toBeDefined()
    })

    describe('given a validation exception', () => {
      class ValidationErrorMessage extends Message {}
      ValidationErrorMessage.create = () => { throw new Error('validation error') }

      it('stack trace is not obscured with the inclusion of follow', () => {
        const followed = MyMessage.create({ someRequiredField: 'foo' })

        let error
        try {
          ValidationErrorMessage.follow(followed)
        } catch (e) {
          error = e
        }

        expect(error).toBeInstanceOf(Error)
        expect(error.stack).not.toMatch(/follow \(/)
      })
    })
  })
})
