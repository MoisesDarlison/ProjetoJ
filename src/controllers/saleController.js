const Validate = require('../service/validation')
const ExceptionError = require('../errors/exception')

const PurchasesModel = require('../models/Purchases')
const ProductsModel = require('../models/Products')
const purchasesModel = new PurchasesModel()
const productsModel = new ProductsModel()

class Sale {

    /***
   * Sale - Vende produto do estoque
   * @param {number} quantity
   */
    async execute(request, response) {
        try {
            Validate.validateSale(request.body)
            const { purchaseId, quantity, salesPrice, isSaleOff, discount, observation } = request.body

            const purchase = await purchasesModel.getPurchaseById(purchaseId)
            if (!purchase || (purchase.remaining < quantity)) throw new ExceptionError(401, 'Produto não localizado ou Saldo insuficiente')
            const productId = purchase.productId
            const sale = await purchasesModel.setSale(purchaseId, quantity, salesPrice, isSaleOff, discount, observation, productId)

            return response.status(201).json(sale)

        } catch (error) { console.log(error)
            return response.status(error.status || 500).json(error.message)
        }
    }
}
module.exports = Sale
