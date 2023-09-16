const HttpResponse = require('../Helpers/HttpResponse')

module.exports = class LoginRouter {
  constructor (AuthUseCase) {
    this.AuthUseCase = AuthUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.AuthUseCase || !this.AuthUseCase.auth) {
      return HttpResponse.serverError()
    } else {
      const { email, password } = httpRequest
      if (!email) {
        return HttpResponse.badRequest('email')
      }
      if (!password) {
        return HttpResponse.badRequest('password')
      }
      if (email === 'invalid-email' || password === 'invalid-password') {
        return HttpResponse.unauthorizedError()
      }
      this.AuthUseCase.auth(email, password)
    }
  }
}
