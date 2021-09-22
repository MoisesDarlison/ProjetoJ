const db = require('../configs/databaseConnection')
const formattedData = require('../service/normalize')

class CatalogProductsModel {
    async setProduct(name, description, distributorId, category, barCode) {
        const data = {
            name: formattedData.formattedToUpperCaseOnlyFirstCharacter(name),
            description,
            distributorId,
            category: category || null,
            barCode: barCode ? formattedData.formattedToUpperCase(barCode) : null
        }
        const response = await db.collection('products')
            .add(data)

        return { id: response.id }
    }

    async getProducts() {
        const response = await db.collection('products').get()

        if (response.empty) return []

        return formattedProductsReturn(response)
    }

    async getProductById(id) {

        const response = await db.collection('products').doc(id).get()

        if (!response.exists) return false

        return { id: response.id, ...response.data() }
    }

    async getProductByBarCode(barCode) {
        const barCodeFormatted = formattedData.formattedToUpperCase(barCode)
        const response = await db.collection('products')
            .where('barCode', '==', barCodeFormatted)
            .get()

        if (response.empty) return false

        return formattedProductsReturn(response)
    }

    async getProductByNameAndDistributor(name, distributorId) {
        const nameFormatted = formattedData.formattedToUpperCaseOnlyFirstCharacter(name)

        const response = await db.collection('products')
            .where('name', '==', nameFormatted)
            .where('distributorId', '==', distributorId)
            .get()

        if (response.empty) return false

        return formattedProductsReturn(response)
    }
}

function formattedProductsReturn(docs) {
    let products = []
    docs.forEach(doc => {
        products.push({
            id: doc.id,
            ...doc.data()
        })
    })
    return products
}

module.exports = CatalogProductsModel