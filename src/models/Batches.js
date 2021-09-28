const db = require('../configs/databaseConnection')

class BatchModel {
  async setBatch(
    productId,
    quantity,
    validAt,
    costPrice,
    salesPrice,
    numberBatch,
    isSaleOff = false,
    observation,
  ) {
    const response = await db
      .doc(`products/${productId}`)
      .collection('batches')
      .add({
        quantityPurchased: quantity,
        quantityRemaining: quantity,
        validAt,
        costPrice,
        salesPrice,
        numberBatch,
        isSaleOff,
        observation,
      })

    if (!response) return false

    return { id: response.id }
  }

  async getInventoryById(id) {
    const response = await db.collection('inventory').doc(id).get()
    if (!response.exists) return false

    return { id: response.id, ...response.data() }
  }
}

module.exports = BatchModel
