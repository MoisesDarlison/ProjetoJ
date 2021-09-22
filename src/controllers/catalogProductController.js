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
   * @param {string} distributorId
   * @param {string} category
   * @param {string} barCode
   */
    async create(request, response) {
        try {
            Validate.validateProductsCatalog(request.body)
            const { name, description, distributorId, category, barCode = null } = request.body

            const distributor = await distributorsModel.getDistributorById(distributorId)
            if (!distributor) throw new ExceptionError(404, 'Distribuidor não encontrado')

            let productAlreadyExists = null
            if (barCode) {
                productAlreadyExists = await catalogProductsModel.getProductByBarCode(barCode)
                if (productAlreadyExists) throw new ExceptionError(401, 'Codigo de barras ja cadastrado')
            }

            productAlreadyExists = await catalogProductsModel.getProductByNameAndDistributor(name, distributorId)
            if (productAlreadyExists) throw new ExceptionError(401, 'Produto ja cadastrado')

            const product = await catalogProductsModel.setProduct(name, description, distributorId, category, barCode)

            return response.status(201).json(product)

        } catch (error) {
            return response.status(error.status || 500).json(error.message)
        }
    }

    /***
    * Catalog - Lista tudo sem filtro
    * @param {number} maxProducts não obrigatorio
    */
    async list(request, response) {
        try {

            const products = await catalogProductsModel.getProducts()
            return response.status(201).json(products)

        } catch (error) {
            return response.status(error.status || 500).json(error.message)
        }
    }
}
module.exports = CatalogProduct
