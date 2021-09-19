const db = require('../configs/databaseConnection')

class UsersModel {
    async setUser(user, password) {
        const response = await db.collection('users')
            .add({ user, password })

        return { id: response.id, userNew: user }
    }

    async getUserByUserName(user) {
        const response = await db.collection('users').where('user', '==', user).get()

        if (response.empty) return false

        return { id: response.docs[0].id, user: response.docs[0].data().user }
    }

    async getValidateUserPassword(user, password) {
        const response = await db.collection('users')
            .where('user', '==', user)
            .where('password', '==', password).get()

        if (response.empty) return false

        return { id: response.docs[0].id, user: response.docs[0].data().user }
    }
}

module.exports = UsersModel