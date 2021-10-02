const { FieldValue } = require('@google-cloud/firestore')
const db = require('../configs/databaseConnection')

class BatchModel {
  async setBatch( productId, quantity, validAt, costPrice, salesPrice, numberBatch, isSaleOff = false, observation ) {
    let productsRef = null
    const response = await db.runTransaction(async (transaction) => {

      productsRef = db.collection(`products/${productId}/batches`).doc()
     
      const query = await transaction.set(productsRef,{
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

      await transaction.set(db.doc(`products/${productId}`),{amount: FieldValue.increment(quantity)}, {merge: true})
       
      return query
    })

    if(response._writeBatch.isEmpty) return false 

    return {id: productsRef.id}
  }

  async getBatchByIdProductAndIdBatch({productId,batchId}) {
    const response = await db.collection(`products/${productId}/batches`).doc(batchId).get()
    if (!response.exists) return false

    return { id: response.id, ...response.data() }
  }
}

module.exports = BatchModel
