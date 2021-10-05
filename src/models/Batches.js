const { FieldValue } = require('@google-cloud/firestore')
const db = require('../configs/databaseConnection')

class BatchModel {
  async setBatch({
    productId,
    quantity,
    validAt,
    costPrice,
    salesPrice,
    numberBatch = null,
    isSaleOff = false,
    observation,
  }) {
    let productsRef = null
    const response = await db.runTransaction(async (transaction) => {
      productsRef = db.collection(`products/${productId}/batches`).doc()

      const query = await transaction.set(productsRef, {
        productId,
        quantityPurchased: quantity,
        quantityRemaining: quantity,
        validAt,
        costPrice,
        salesPrice,
        numberBatch,
        isSaleOff,
        observation,
      })

      await transaction.set(
        db.doc(`products/${productId}`),
        { amount: FieldValue.increment(quantity) },
        { merge: true },
      )

      return query
    })

    if (response._writeBatch.isEmpty) return false

    return { id: productsRef.id }
  }

  async getBatchById(id) {
    const response = await db.collection('batches').doc(id).get()
    if (!response.exists) return false

    return response.data()
  }

  async getBatchByIdProductAndIdBatch({ productId, batchId }) {
    const response = await db
      .collection(`products/${productId}/batches`)
      .doc(batchId)
      .get()
    if (!response.exists) return false

    return { id: response.id, ...response.data() }
  }

  async updateBatchById(id, {
    productId,
    quantity,
    validAt,
    costPrice,
    salesPrice,
    numberBatch = null,
    isSaleOff = false,
    observation,
    quantityDiff,
    soldAmount,
  }) {
    
    const response = await db.runTransaction(async (transaction) => {
      const query = await transaction.set(
        db.doc(`products/${productId}/batches/${id}`),
        {
          productId,
          quantityPurchased: quantity,
          quantityRemaining: soldAmount,
          validAt,
          costPrice,
          salesPrice,
          numberBatch,
          isSaleOff,
          observation,
        },
        { merge: true },
      )

      await transaction.set(
        db.doc(`products/${productId}`),
        { amount: FieldValue.increment(quantityDiff) },
        { merge: true },
      )

      return query
    })

    if (response._writeBatch.isEmpty) return false

    return { id }
  }
}

module.exports = BatchModel
