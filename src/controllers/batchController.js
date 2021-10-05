const Validate = require('../service/validation')
const ExceptionError = require('../errors/exception')

const BatchModel = require('../models/Batches')
const ProductsModel = require('../models/Products')

const batchModel = new BatchModel()
const productsModel = new ProductsModel()

class Batch {
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

      const batch = await batchModel.setBatch({
        productId,
        quantity,
        validAt,
        costPrice,
        salesPrice,
        NumberBatch,
        isSaleOff,
        observation,
      })
      if (!batch) throw new ExceptionError()

      return response.status(201).json(batch)
    } catch (error) {
      return response.status(error.status || 500).json(error.message)
    }
  }

  /***
   * batch - Edita produtos ao estoque
   * @param {number} quantity
   * @param {date} validAt
   * @param {number} costPrice
   * @param {number} salesPrice
   * @param {string} NumberBatch
   * @param {boolean} isSaleOff
   * @param {string} observation
   * @param {string} idBatch
   */
  async update(request, response) {
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

      const { id } = request.params

      const batchAlreadyExists = await batchModel.getBatchByIdProductAndIdBatch(
        {
          productId,
          batchId: id,
        },
      )
      if (!batchAlreadyExists)
        throw new ExceptionError(401, 'Produto/lote não localizado')

      const quantityDiff = Number(quantity - batchAlreadyExists.quantityPurchased)
      const quantitySale = Number(batchAlreadyExists.quantityPurchased - batchAlreadyExists.quantityRemaining)
      
      if(quantitySale > quantity ){
        throw new ExceptionError(401, 'Quantidade invalida de produtos')
      } 
      const soldAmount = quantity - quantitySale

      const batch = await batchModel.updateBatchById(id, {
        productId,
        quantity,
        validAt,
        costPrice,
        salesPrice,
        NumberBatch,
        isSaleOff,
        observation,
        quantityDiff,
        soldAmount,
      })

      return response.status(201).json(batch)
    } catch (error) {
      return response.status(error.status || 500).json(error.message)
    }
  }
}
module.exports = Batch
