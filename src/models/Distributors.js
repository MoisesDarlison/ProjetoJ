const db = require('../configs/databaseConnection')
const formattedData = require('../service/normalize')

class DistributorsModel {
    async setDistributor(name, salesMargin) {
        const nameFormatted = formattedData.formattedToUpperCase(name)
        const response = await db.collection('distributors')
            .add({ name: nameFormatted, salesMargin })

        return { id: response.id }
    }

    async getDistributorById(id) {
        const response = await db.collection('distributors').doc(id).get()

        if (!response.exists) return false

        return { id: response.id, ...response.data() }
    }

    async getDistributorByName(name) {
        const nameFormatted = formattedData.formattedToUpperCase(name)
        const response = await db.collection('distributors').where('name', '==', nameFormatted).get()

        if (response.empty) return false

        return { id: response.docs[0].id, ...response.docs[0].data() }
    }
}

module.exports = DistributorsModel