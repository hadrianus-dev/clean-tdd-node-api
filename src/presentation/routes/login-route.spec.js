const LoginRouter = require('./LoginRouter')
const MissingParamError = require('../Helpers/MissingParamError')

const makeSut = () => new LoginRouter()

describe('LoginRouteSpec', () => {
  test('Shoud return 400 if not email is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        password: 'any1234'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Shoud return 400 if not password is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: 'any-email'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Shoud return 500 if not httpRequest is provided', () => {
    const sut = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Shoud return 500 if httpRequest has no body', () => {
    const sut = makeSut()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest) // const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })
})
