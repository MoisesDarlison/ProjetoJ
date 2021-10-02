const db = require('../configs/databaseConnection')
const { FieldValue } = require('@google-cloud/firestore')

class SalesModel {
  
  async setSale({ productId, batch, quantity, salesPrice, isSaleOff= false, discount, observation, salesTo = null }){

    let saleRef = null
    const response = await db.runTransaction(async (transaction) => {
      saleRef = db.collection('sales').doc()

      const responseSale = await transaction.set(saleRef,
        {productId, batch, quantity, salesPrice, isSaleOff, discount, observation, salesTo })

      await transaction.set(db.doc(`/products/${productId}/batches/${batch.id}`),
        {quantityRemaining: FieldValue.increment(-quantity)},
        {merge: true})
       
      return responseSale
    })
    
    if(response._writeBatch.isEmpty) return false 
    
    return {id: saleRef.id}

  }
 
}

module.exports = SalesModel

// const response = await db.collection('sales')
//   .add({productId, batch, quantity, salesPrice, isSaleOff, discount, observation, salesTo })
    
// return { id: response.id }
