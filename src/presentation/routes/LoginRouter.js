const HttpResponse = require('../Helpers/HttpResponse')

module.exports = class LoginRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError()
    } else {
      const { email, password } = httpRequest
      if (!email) HttpResponse.badRequest('email')
      if (!password) HttpResponse.badRequest('password')
    }
  }
}
