const db = require('../configs/databaseConnection')

class SaleModel {
    async setSale(productId, quantity, salesPrice, isSaleOff = false, observation, discount) {

        const response = await db.collection('sales')
            .add({ productId, quantity, salesPrice, isSaleOff, observation, discount })

        return { id: response.id }
    }
}

module.exports = SaleModel