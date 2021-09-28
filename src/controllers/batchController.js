const Validate = require('../service/validation')
const ExceptionError = require('../errors/exception')

const BatchModel = require('../models/Batches')
const ProductsModel = require('../models/Products')

const batchModel = new BatchModel()
const productsModel = new ProductsModel()

class Inventory {
  /***
   * batch - adiciona um lote de produtos ao estoque
   * @param {number} quantity
   * @param {date} validAt
   * @param {number} costPrice
   * @param {number} salesPrice
   * @param {string} NumberBatch
   * @param {boolean} isSaleOff
   * @param {string} observation
   */
  async create(request, response) {
    try {
      Validate.validateBatch(request.body)
      const {
        productId,
        quantity,
        validAt,
        costPrice,
        salesPrice,
        NumberBatch,
        isSaleOff,
        observation,
      } = request.body

      const product = await productsModel.getProductById(productId)
      if (!product) throw new ExceptionError(401, 'Produto não localizado')

      const batch = await batchModel.setBatch(
        productId,
        quantity,
        validAt,
        costPrice,
        salesPrice,
        NumberBatch,
        isSaleOff,
        observation,
      )
      return response.status(201).json(batch)
    } catch (error) { console.log(error)
      return response.status(error.status || 500).json(error.message)
    }
  }
}
module.exports = Inventory
