const HttpResponse = require('../Helpers/HttpResponse')

module.exports = class LoginRouter {
  constructor (AuthUseCase) {
    this.AuthUseCase = AuthUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError()
    } else {
      const { email, password } = httpRequest
      if (!email) {
        return HttpResponse.badRequest('email')
      }
      if (!password) {
        return HttpResponse.badRequest('password')
      }
      this.AuthUseCase.auth(email, password)
    }
  }
}
