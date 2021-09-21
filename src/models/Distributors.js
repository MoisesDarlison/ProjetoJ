const db = require('../configs/databaseConnection')
const formattedData = require('../service/normalize')

class DistributorsModel {

    async setDistributor(name, salesMargin) {
        const nameFormatted = formattedData.formattedToUpperCase(name)
        const response = await db.collection('distributors')
            .add({ name: nameFormatted, salesMargin })

        return { id: response.id }
    }

    async getDistributors() {
        const response = await db.collection('distributors').get()

        if (response.empty) return []

        return formattedDistributorReturn(response)
    }

    async getDistributorById(id) {
        const response = await db.collection('distributors').doc(id).get()

        if (!response.exists) return false
        return response.data()
    }

    async getDistributorByName(name) {
        const nameFormatted = formattedData.formattedToUpperCase(name)
        const response = await db.collection('distributors').where('name', '==', nameFormatted).get()

        if (response.empty) return false

        return formattedDistributorReturn(response)
    }
    async updateDistributor(id, data) {
        const dataValid = removeInvalidData(data)
        if (Object.keys(dataValid).length < 1) return false

        const response = await db.collection('distributors').doc(id).update(
            { ...dataValid }
        )
        if (!response) return false

        return true
    }

    async destroyDistributorById(id) {
        const response = await db.collection('distributors').doc(id).get()
        if (!response.exists) return false
        await db.collection('distributors').doc(id).delete()

        return true
    }

}

function formattedDistributorReturn(docs) {
    let distributors = []
    docs.forEach(doc => {
        distributors.push({
            id: doc.id,
            ...doc.data()
        })
    })
    return distributors
}

function removeInvalidData(data) {
    const cloneValue = Object.assign({}, data)
    const dataArray = Object.entries(data)

    dataArray.forEach((param) => {
        if (!param[1] && typeof param[1] != 'number') delete cloneValue[param[0]]
    })

    return cloneValue
}

module.exports = DistributorsModel