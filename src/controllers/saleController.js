const Validate = require('../service/validation')
const ExceptionError = require('../errors/exception')

const InventoriesModel = require('../models/Inventories')
const ProductsModel = require('../models/Products')
const inventoriesModel = new InventoriesModel()
const productsModel = new ProductsModel()

class Sale {

  /***
   * Sale - Vende produto do estoque
   * @param {number} quantity
   */
  async execute(request, response) {
    try {
      Validate.validateSale(request.body)
      const { InventoryId, quantity, salesPrice, isSaleOff, discount, observation } = request.body

      const inventory = await inventoriesModel.getInventoryById(InventoryId)
      if (!inventory || (inventory.remaining < quantity)) throw new ExceptionError(401, 'Produto não localizado ou Saldo insuficiente')
      const productId = inventory.productId
      const sale = await inventoriesModel.setSale(InventoryId, quantity, salesPrice, isSaleOff, discount, observation, productId)

      return response.status(201).json(sale)

    } catch (error) { console.log(error)
      return response.status(error.status || 500).json(error.message)
    }
  }
}
module.exports = Sale
