const Validate = require('../service/validation')
const ExceptionError = require('../errors/exception')

const SaleModel = require('../models/Sale')
const CatalogProductsModel = require('../models/CatalogProducts')
const saleModel = new SaleModel()
const catalogProductsModel = new CatalogProductsModel()

class Sale {

    /***
   * Sale - Vende produto do estoque
   * @param {string} name
   * @param {number} quantity
   * @param {number} salesPrice
   * @param {number} discount
   * @param {boolean} isSaleOff
   * @param {string} observation
   */
    async create(request, response) {
        try {
            Validate.validateSale(request.body)
            const { productId, quantity, salesPrice, isSaleOff, observation, discount } = request.body

            const product = await catalogProductsModel.getProductById(productId)
            if (!product) throw new ExceptionError(401, 'Produto não localizado')

            const sale = await saleModel.setSale(productId, quantity, salesPrice, isSaleOff, observation, discount)

            return response.status(201).json(sale)

        } catch (error) {
            return response.status(error.status || 500).json(error.message)
        }
    }
}
module.exports = Sale
