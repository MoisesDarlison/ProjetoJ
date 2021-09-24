const db = require('../configs/databaseConnection')
const firebase = require('firebase-admin')

class PurchaseModel {
  
  async setPurchase(productId, quantity, validAt, costPrice, salesPrice, batch, isSaleOff = false, observation) {

    const response = await db.collection('purchases')
      .add({ productId, quantity, remaining: quantity, validAt, costPrice, salesPrice, batch, isSaleOff, observation, sale: [] })

    await db.collection('products').doc(productId)
      .update({ amount: firebase.firestore.FieldValue.increment(quantity) })

    return { id: response.id }
  }

  async setSale(purchaseId, quantity, salesPrice, isSaleOff = false, discount, observation, productId) {

    const response = await db.collection('purchases').doc(purchaseId)
      .update({
        sale: firebase.firestore.FieldValue.arrayUnion({ quantity, salesPrice, isSaleOff, discount, observation }),
        remaining: firebase.firestore.FieldValue.increment(-quantity),
      })

    await db.collection('products').doc(productId)
      .update({ amount: firebase.firestore.FieldValue.increment(-quantity) })

    return { response }
  }

  async getPurchaseById(id) {
    const response = await db.collection('purchases').doc(id).get()
    if (!response.exists) return false

    return { id: response.id, ...response.data() }
  }

}

module.exports = PurchaseModel