const LoginRouter = require('./LoginRouter')
const MissingParamError = require('../Helpers/MissingParamError')

class AuthUseCaseSty {
  auth (email, password) {
    this.email = email
    this.password = password
  }
}

const makeSut = () => {
  const authUsecaseSty = new AuthUseCaseSty()
  const sut = new LoginRouter(authUsecaseSty)

  return {
    sut, authUsecaseSty
  }
}

describe('LoginRouteSpec', () => {
  test('Shoud return 400 if not email is provided', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any-email'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Shoud return 500 if not httpRequest is provided', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Shoud return 500 if httpRequest has no body', () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest) // const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Shoud call AuthUseCase with correct params', () => {
    const { sut, authUsecaseSty } = makeSut()
    const httpRequest = {
      body: {
        email: 'any-email',
        password: 'any-password'
      }
    }
    sut.route(httpRequest)
    authUsecaseSty.auth('any-email', 'any-password')
    expect(authUsecaseSty.email).toBe(httpRequest.body.email)
    expect(authUsecaseSty.password).toBe(httpRequest.body.password)
  })

  test('Shoud return 500 if no AuthUseCase is provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'any-email',
        password: 'any-password'
      }
    }
    const HttpResponse = sut.route(httpRequest)
    expect(HttpResponse.statusCode).toBe(500)
  })

  test('Shoud return 500 if no AuthUseCase has no auth methover', () => {
    const sut = new LoginRouter({})
    const httpRequest = {
      body: {
        email: 'any-email',
        password: 'any-password'
      }
    }
    const HttpResponse = sut.route(httpRequest)
    expect(HttpResponse.statusCode).toBe(500)
  })
})
