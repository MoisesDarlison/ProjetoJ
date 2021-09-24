const Validate = require('../service/validation')
const ExceptionError = require('../errors/exception')

const PurchaseModel = require('../models/Purchases')
const ProductsModel = require('../models/Products')
const purchaseModel = new PurchaseModel()
const productsModel = new ProductsModel()

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

      const product = await productsModel.getProductById(productId)
      if (!product) throw new ExceptionError(401, 'Produto não localizado')

      const purchase = await purchaseModel.setPurchase(
        productId,
        quantity,
        validAt,
        costPrice,
        salesPrice,
        batch,
        isSaleOff,
        observation,
      )

      return response.status(201).json(purchase)
    } catch (error) { console.log(error)
      return response.status(error.status || 500).json(error.message)
    }
  }
}
module.exports = Purchase
