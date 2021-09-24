const db = require('../configs/databaseConnection')
const {patternReturnModelByGet} = require('../service/patternReturns')

class UsersModel {
  
  async setUser(user, password) {
    const response = await db.collection('users')
      .add({ user, password })

    return { id: response.id }
  }

  async getUsers() {
    const response = await db.collection('users').get()

    if (response.empty) return []

    return patternReturnModelByGet(response)
  }

  async getUserByUserName(userParam) {
    const response = await db.collection('users').where('user', '==', userParam).get()

    if (response.empty) return false

    return patternReturnModelByGet(response)
  }

  async getValidateUserPassword(user, password) {
    const response = await db.collection('users')
      .where('user', '==', user)
      .where('password', '==', password).get()

    if (response.empty) return false

    return patternReturnModelByGet(response)
  }
}

module.exports = UsersModel