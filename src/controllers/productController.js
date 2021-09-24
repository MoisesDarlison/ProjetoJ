const Validate = require('../service/validation')
const ExceptionError = require('../errors/exception')

const ProductsModel = require('../models/Products')
const productsModel = new ProductsModel()
const DistributorsModel = require('../models/Distributors')
const distributorsModel = new DistributorsModel()

class Product {
  /***
   * Product
   * @param {string} name
   * @param {string} description
   * @param {string} distributorId
   * @param {string} category
   * @param {string} barCode
   */
  async create(request, response) {
    try {
      Validate.validateProducts(request.body)
      const {
        name,
        description,
        distributorId,
        category,
        barCode = null,
      } = request.body

      const distributor = await distributorsModel.getDistributorById(
        distributorId,
      )
      if (!distributor)
        throw new ExceptionError(404, 'Distribuidor não encontrado')

      let productAlreadyExists = null
      if (barCode) {
        productAlreadyExists = await productsModel.getProductByBarCode(barCode)
        if (productAlreadyExists)
          throw new ExceptionError(401, 'Codigo de barras ja cadastrado')
      }

      productAlreadyExists = await productsModel.getProductByNameAndDistributor(
        name,
        distributorId,
      )
      if (productAlreadyExists)
        throw new ExceptionError(401, 'Produto ja cadastrado')

      const product = await productsModel.setProduct(
        name,
        description,
        distributorId,
        category,
        barCode,
      )

      return response.status(201).json(product)
    } catch (error) {
      console.log(error)
      return response.status(error.status || 500).json(error.message)
    }
  }

  /***
   * Products - Lista tudo sem filtro
   * @param {number} maxProducts /paginação - não obrigatorio
   */
  async list(request, response) {
    try {
      const products = await productsModel.getProducts()
      return response.status(201).json(products)
    } catch (error) {
      console.log(error)
      return response.status(error.status || 500).json(error.message)
    }
  }
}
module.exports = Product
