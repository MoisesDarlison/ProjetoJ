const validate = require('../service/validation')
const ExceptionError = require('../errors/exception')
const UsersModel = require('../models/Users')

const usersModel = new UsersModel()

class Login {
  /***
   * Authentication Account
   * @param {string} user
   * @param {string} password
   */
  async auth(request, response) {
    try {
      const { user, password } = request.body

      validate.validateLogin({ user, password })

      const isValidLogin = await usersModel
        .getValidateUserPassword( user, password )

      if (!isValidLogin[0])
        throw new ExceptionError(401, 'Login/Password invalid')

      return response.status(200).json(`${isValidLogin[0].user} login Success`)
    } catch (error) {
      return response.status(error.status || 500).json(error.message)
    }
  }
}

module.exports = Login
