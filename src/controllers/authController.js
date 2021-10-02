const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET_TOKEN } = process.env
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
      validate.validateLogin(request.body)

      const { user, password } = request.body

      const userData = await usersModel.getUserByUserName({
        userName: user,
      })

      if (!userData[0]) throw new ExceptionError(401, 'Usuario/Senha invalidos')

      const isValidLogin = bcrypt.compareSync(password, userData[0].password)

      if (!isValidLogin)
        throw new ExceptionError(401, 'Usuario/Senha invalidos')

      const token = jwt.sign({ userId: userData[0].id }, SECRET_TOKEN, {
        expiresIn: 9000000,
      })

      return response.status(200).json({ token })
    } catch (error) {
      return response.status(error.status || 500).json(error.message)
    }
  }
}

module.exports = Login
