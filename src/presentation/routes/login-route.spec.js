class LoginRouter {
  route (httpRequest) {
    if (!httpRequest.body.email) {
      return { statusCode: 400 }
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
})
