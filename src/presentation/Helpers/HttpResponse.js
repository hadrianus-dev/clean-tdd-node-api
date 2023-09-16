const MissingParamError = require('./MissingParamError')

module.exports = class HttpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }

  static unauthorizedError () {
    return {
      statusCode: 401
    }
  }

  static ok (token) {
    return {
      statusCode: 200,
      accessToken: token
    }
  }
}
