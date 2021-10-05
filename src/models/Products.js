const db = require('../configs/databaseConnection')
const formattedData = require('../service/format')

const {
  patternReturnModelByGet,
  patternReturnModelByGetWithParents,
} = require('../service/patternReturns')

class productsModel {
  async setProduct({ name, description, distributorId, categoryId, barCode }) {
    const data = {
      name: formattedData.formattedToUpperCaseOnlyFirstCharacter(name),
      description,
      distributorId,
      categoryId: categoryId ? categoryId : null,
      barCode: barCode ? formattedData.formattedToUpperCase(barCode) : null,
    }
    const response = await db.collection('products').add(data)

    return { id: response.id }
  }

  async getProducts() {
    const response = await db.collectionGroup('products').get()

    return patternReturnModelByGet(response)
  }

  async getProductById(id) {
    const response = await db.collection('products').doc(id).get()

    if (!response.exists) return false

    return { id: response.id, ...response.data() }
  }

  async getProductAndInventoryAndSalesByIdProduct(id) {
    let response = await db.runTransaction(async (transaction) => {
      const responseParent = await transaction.get(
        db.collection('products').doc(id),
      )
      const response = await transaction.get(
        db.collection(`products/${id}/batches`),
      )

      return patternReturnModelByGetWithParents({
        dataParent: responseParent,
        dataChildren: response,
      })
    })

    return response
  }

  async getProductByBarCode(barCode) {
    const barCodeFormatted = formattedData.formattedToUpperCase(barCode)
    const response = await db
      .collection('products')
      .where('barCode', '==', barCodeFormatted)
      .get()

    if (response.empty) return false

    return patternReturnModelByGet(response)
  }

  async getProductByNameAndDistributor({ name, distributorId }) {
    const nameFormatted = name ? formattedData.formattedToUpperCaseOnlyFirstCharacter(name) : null
    const response = await db
      .collection('products')
      .where('name', '==', nameFormatted)
      .where('distributorId', '==', distributorId)
      .get()

    if (response.empty) return false

    return patternReturnModelByGet(response)
  }

  async updateProduct( id, { name, description, distributorId, categoryId, barCode } ) {
    const data = {
      name: name ? formattedData.formattedToUpperCaseOnlyFirstCharacter(name): null,
      description,
      distributorId,
      categoryId: categoryId ? categoryId : null,
      barCode: barCode ? formattedData.formattedToUpperCase(barCode) : null,
    }
    if(!name) return false

    const response = await db.collection('products').doc(id).update(data)
    if (!response) return false

    return true
  }
}

module.exports = productsModel
