const validate = require('../service/validation')
const ExceptionError = require('../errors/exception')

const UsersModel = require('../models/Users')

const usersModel = new UsersModel()

class User {
  /***
     * Create New User Account
     * @param {string} user
     * @param {string} password
     */
  async create(request, response) {
    try {
      validate.validateLogin(request.body)
      const { user, password } = request.body

      const userAlreadyExists = await usersModel.getUserByUserName({userName:user})
      if (userAlreadyExists) throw new ExceptionError(401, 'User Already Exists')

      const { id } = await usersModel.setUser({user, password})

      return response.status(201).json({ id })
    } catch (error) {  
      return response.status(error.status || 500).json(error.message)
    }
  }
  async list(request, response) {
    try {

      const users = await usersModel.getUsers()

      return response.status(201).json(users)
    } catch (error) {  
      return response.status(error.status || 500).json(error.message)
    }
  }

}
module.exports = User