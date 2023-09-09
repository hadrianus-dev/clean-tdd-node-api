class LoginRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return { statusCode: 500 }
    } else {
      const { email, password } = httpRequest
      if (!email || !password) {
        return { statusCode: 400 }
      }
    }
  }
}

describe('LoginRouteSpec', () => {
  test('Shoud return 400 if not email is provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: 'any1234'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Shoud return 400 if not password is provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'any-email'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Shoud return 500 if not httpRequest is provided', () => {
    const sut = new LoginRouter()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Shoud return 500 if httpRequest has no body', () => {
    const sut = new LoginRouter()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest) // const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })
})
