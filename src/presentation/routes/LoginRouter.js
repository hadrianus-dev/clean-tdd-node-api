const HttpResponse = require('../Helpers/HttpResponse')

module.exports = class LoginRouter {
  constructor (AuthUseCase) {
    this.AuthUseCase = AuthUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.AuthUseCase || !this.AuthUseCase.auth) {
      return HttpResponse.serverError()
    }
    const { email, password } = httpRequest
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    if (!password) {
      return HttpResponse.badRequest('password')
    }
    const accessToken = this.AuthUseCase.auth(email, password)
    if (!accessToken) {
      return HttpResponse.unauthorizedError()
    }
    return HttpResponse.ok(accessToken)
  }
}
