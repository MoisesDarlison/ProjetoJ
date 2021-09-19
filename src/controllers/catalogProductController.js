const Validate = require('../service/validation')
const ExceptionError = require('../errors/exception')

const CatalogProductsModel = require('../models/CatalogProducts')
const catalogProductsModel = new CatalogProductsModel()
const DistributorsModel = require('../models/Distributors')
const distributorsModel = new DistributorsModel()

class CatalogProduct {

    /***
   * Catalog
   * @param {string} name
   * @param {string} description
   * @param {string} distributor
   * @param {string} category
   * @param {string} barCode
   */
    async create(request, response) {
        try {
            Validate.validateProductsCatalog(request.body)
            const { name, description, distributorId, category, barCode, amount } = request.body

            const distributor = await distributorsModel.getDistributorById(distributorId)
            if (!distributor) throw new ExceptionError(404, 'Distribuidor não encontrado')

            let productAlreadyExists = null
            if (barCode) {
                productAlreadyExists = await catalogProductsModel.getProductByBarCode(barCode)
                if (productAlreadyExists) throw new ExceptionError(401, 'Codigo de barras ja cadastrado')
            }

            productAlreadyExists = await catalogProductsModel.getProductByNameAndDistributor(name, distributorId)
            if (productAlreadyExists) throw new ExceptionError(401, 'Produto ja cadastrado')

            const product = await catalogProductsModel.setProduct(name, description, distributorId, category, barCode, amount)

            return response.status(201).json(product)

        } catch (error) {
            return response.status(error.status || 500).json(error.message)
        }
    }
}
module.exports = CatalogProduct
