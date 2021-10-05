const Validate = require('../service/validation')
const ExceptionError = require('../errors/exception')

const SalesModel = require('../models/Sales')
const BatchesModel = require('../models/Batches')

const salesModel = new SalesModel()
const batchesModel = new BatchesModel()
class Sale {
  /***
   * Sale - Vende produto do estoque
   * @param {number} quantity
   * @param {number} salesPrice
   * @param {boolean} isSaleOff
   * @param {number} discount
   * @param {string} observation
   * @param {string} salesTo
   */

  async create(request, response) {
    try {
      Validate.validateSale(request.body)
      const {
        productId,
        batchId,
        quantity,
        salesPrice,
        isSaleOff,
        discount,
        observation,
        salesTo,
      } = request.body

      const batch = await batchesModel.getBatchByIdProductAndIdBatch({
        productId,
        batchId,
      })

      if (!batch || batch.quantityRemaining < quantity)
        throw new ExceptionError( 401, 'Produto não localizado ou Saldo insuficiente' )

      const sale = await salesModel.setSale({
        productId,
        batch,
        quantity,
        salesPrice,
        isSaleOff,
        discount,
        observation,
        salesTo,
      })

      return response.status(200).json(sale)
    } catch (error) {
      return response.status(error.status || 500).json(error.message)
    }
  }
  /**
 * Sale - Lista todas as vendas
 * @param {number} maxLimit 
 * @param {*} response 
 */
  //TODO adicionar paginação
  async list(request, response){

    try {
      const sales = await salesModel.getSales()

      return response.status(200).json(sales)
    } catch (error) {
      return response.status(error.status || 500).json(error.message)
    }
  }
}
module.exports = Sale
