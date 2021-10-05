const db = require('../configs/databaseConnection')
const { FieldValue } = require('@google-cloud/firestore')
const { patternReturnModelByGet } = require('../service/patternReturns')

class SalesModel {
  async setSale({
    productId,
    batch,
    quantity,
    salesPrice,
    isSaleOff = false,
    discount,
    observation,
    salesTo = null,
  }) {
    let saleRef = null
    const response = await db.runTransaction(async (transaction) => {
      saleRef = db.collection('sales').doc()

      await transaction.set(
        db.doc(`/products/${productId}/batches/${batch.id}`),
        { quantityRemaining: FieldValue.increment(-quantity) },
        { merge: true },
      )

      await transaction.set(
        db.doc(`/products/${productId}`),
        { amount: FieldValue.increment(-quantity) },
        { merge: true },
      )
      const cloneBatch = Object.assign({}, batch)

      delete cloneBatch['productId']
      delete cloneBatch['salesPrice']
      delete cloneBatch['quantityRemaining']
      delete cloneBatch['quantityPurchased']
      delete cloneBatch['id']
      
      const responseSale = await transaction.set(saleRef, {
        productId,
        batchId:batch.id,
        quantity,
        salesPrice,
        isSaleOff,
        discount,
        observation,
        salesTo,
        ...cloneBatch,
      })
      return responseSale
    })

    if (response._writeBatch.isEmpty) return false

    return { id: saleRef.id }
  }

  async getSales() {
    const response = await db.collectionGroup('sales').get()

    return patternReturnModelByGet(response)
  }
}

module.exports = SalesModel

