const Validate = require('../service/validation')
const ExceptionError = require('../errors/exception')

const PurchaseModel = require('../models/Purchases')
const CatalogProductsModel = require('../models/CatalogProducts')
const purchaseModel = new PurchaseModel()
const catalogProductsModel = new CatalogProductsModel()

class Purchase {
  /***
   * Purchase - adiciona produto ao estoque
   * @param {number} quantity
   * @param {date} validAt
   * @param {number} costPrice
   * @param {number} salesPrice
   * @param {string} batch
   * @param {boolean} isSaleOff
   * @param {string} observation
   */
  async create(request, response) {
    try {
      Validate.validatePurchase(request.body)
      const {
        productId,
        quantity,
        validAt,
        costPrice,
        salesPrice,
        batch,
        isSaleOff,
        observation,
      } = request.body

      const product = await catalogProductsModel.getProductById(productId)
      if (!product) throw new ExceptionError(401, 'Produto não localizado')

      const purchase = await purchaseModel.setPurchase(
        productId,
        quantity,
        validAt,
        costPrice,
        salesPrice,
        batch,
        isSaleOff,
        observation
      )

      return response.status(201).json(purchase)
    } catch (error) {
      return response.status(error.status || 500).json(error.message)
    }
  }
}
module.exports = Purchase
