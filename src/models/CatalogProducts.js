const db = require('../configs/databaseConnection')
const formattedData = require('../service/normalize')

class CatalogProductsModel {
    async setProduct(name, description, distributorId, category = null, barCode = null) {
        const nameFormatted = formattedData.formattedToUpperCaseOnlyFirstCharacter(name)
        const barCodeFormatted = formattedData.formattedToUpperCase(barCode)

        const response = await db.collection('products')
            .add({ name: nameFormatted, description, distributorId, category, barCode: barCodeFormatted })

        return { id: response.id }
    }

    async getProductByBarCode(barCode) {
        const barCodeFormatted = formattedData.formattedToUpperCase(barCode)
        const response = await db.collection('products')
            .where('barCode', '==', barCodeFormatted)
            .get()

        if (response.empty) return false

        return { id: response.docs[0].id, ...response.docs[0].data() }
    }

    async getProductByNameAndDistributor(name, distributorId) {
        const nameFormatted = formattedData.formattedToUpperCaseOnlyFirstCharacter(name)

        const response = await db.collection('products')
            .where('name', '==', nameFormatted)
            .where('distributorId', '==', distributorId)
            .get()

        if (response.empty) return false

        return { id: response.docs[0].id, ...response.docs[0].data() }
    }

    async getProductById(id) {

        const response = await db.collection('products').doc(id).get()

        if (!response.exists) return false

        return { id: response.id, ...response.data() }
    }
}

module.exports = CatalogProductsModel