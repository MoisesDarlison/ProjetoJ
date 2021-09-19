const db = require('../configs/databaseConnection')

class PurchaseModel {
    async setPurchase(productId, quantity, validAt, costPrice, salesPrice, batch, isSaleOff = false, observation) {

        const response = await db.collection('purchases')
            .add({ productId, quantity, remaining: quantity, validAt, costPrice, salesPrice, batch, isSaleOff, observation })

        return { id: response.id }
    }
}

module.exports = PurchaseModel