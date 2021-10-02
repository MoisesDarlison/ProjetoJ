const db = require('../configs/databaseConnection')
const bcrypt = require('bcrypt')
const { SALT_PASSWORD } = process.env

const { patternReturnModelByGet } = require('../service/patternReturns')

class UsersModel {
  async setUser({ user, password }) {
    const salt = bcrypt.genSaltSync(Number(SALT_PASSWORD))
    const passwordEncrypted = bcrypt.hashSync(password, salt)

    const response = await db
      .collection('users')
      .add({ user, password: passwordEncrypted })

    return { id: response.id }
  }

  async getUsers() {
    const response = await db.collection('users').get()

    if (response.empty) return []

    return patternReturnModelByGet(response)
  }

  async getUserByUserName({userName}) {
    const response = await db
      .collection('users')
      .where('user', '==', userName)
      .get()

    if (response.empty) return false

    return patternReturnModelByGet(response)
  }
}

module.exports = UsersModel
