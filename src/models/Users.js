const db = require('../configs/databaseConnection')

class UsersModel {
    async setUser(user, password) {
        const response = await db.collection('users')
            .add({ user, password })

        return { id: response.id }
    }

    async getUsers() {
        const response = await db.collection('users').get()

        if (response.empty) return []

        return formattedUserReturnGet(response)
    }

    async getUserByUserName(userParam) {
        const response = await db.collection('users').where('user', '==', userParam).get()

        if (response.empty) return false

        return formattedUserReturnGet(response)
    }

    async getValidateUserPassword(user, password) {
        const response = await db.collection('users')
            .where('user', '==', user)
            .where('password', '==', password).get()

        if (response.empty) return false

        return formattedUserReturnGet(response)
    }
}

function formattedUserReturnGet(docs) {
    let users = []
    docs.forEach(doc => {
        users.push({
            id: doc.id,
            user: doc.data().user
        })
    })
    return users
}
module.exports = UsersModel