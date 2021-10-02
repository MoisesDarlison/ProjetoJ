const jwt = require('jsonwebtoken')

const ExceptionError = require('../errors/exception')

const { SECRET_TOKEN } = process.env

module.exports = {
  async verifyJWT(request, response, next) {
    try {
      const {authorization} = request.headers
      
      jwt.verify(authorization, SECRET_TOKEN, (err, decoded) => {
        if (err) {
          throw new ExceptionError(401, 'Autenticação Invalida')
        }
        request.userIdJWT = decoded.userId
        next()
      })
    } catch (error) {
      return response.status(error.status || 500).json(error.message)
    }
  },
}
