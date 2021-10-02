const Validate = require('../service/validation')
const ExceptionError = require('../errors/exception')

const ProductsModel = require('../models/Products')
const DistributorsModel = require('../models/Distributors')
const CategoryModel = require('../models/Categories')

const productsModel = new ProductsModel()
const distributorsModel = new DistributorsModel()
const categoryModel = new CategoryModel()

class Product {
  /***
   * Product - Cadastro
   * @param {string} name
   * @param {string} description
   * @param {string} distributorId
   * @param {string} categoryId
   * @param {string} barCode
   */
  async create(request, response) {
    try {
      Validate.validateProducts(request.body)
      const {
        name,
        description,
        distributorId,
        categoryId = null,
        barCode = null,
      } = request.body

      const distributor = await distributorsModel.getDistributorById( distributorId )
      if (!distributor)
        throw new ExceptionError(404, 'Distribuidor não encontrado')

      if(categoryId){
        const categoryAlreadyExists = await categoryModel.getCategoryById(categoryId)
        if(!categoryAlreadyExists)
          throw new ExceptionError(404, 'Categoria não localizada')
      }

      let productAlreadyExists = null
      if (barCode) {
        productAlreadyExists = await productsModel.getProductByBarCode(barCode)
        if (productAlreadyExists) 
          throw new ExceptionError(401, 'Codigo de barras ja cadastrado')
      }

      productAlreadyExists = await productsModel.getProductByNameAndDistributor({
        name,
        distributorId,
      })
      if (productAlreadyExists)
        throw new ExceptionError(401, 'Produto ja cadastrado')

      const product = await productsModel.setProduct({
        name,
        description,
        distributorId,
        categoryId,
        barCode,
      })

      return response.status(201).json(product)
    } catch (error) {
       
      return response.status(error.status || 500).json(error.message)
    }
  }

  /***
   * Products - Lista tudo sem filtro
   * @param {number} maxProducts /paginação - não obrigatorio
   */
  //TODO: adicionar paginação
  async list(request, response) {
    try {
      const products = await productsModel.getProducts()

      return response.status(200).json(products)
    } catch (error) {
       
      return response.status(error.status || 500).json(error.message)
    }
  }

  /***
   * Products - Lista todos os dados de um produto inclusive suas compras e vendas
   * @param {string} id
   */
  async filter(request, response) {
    try {
      const { id } = request.params

      const product = await productsModel.getProductAndInventoryAndSalesByIdProduct(id)
      if (!product) throw new ExceptionError(401, 'Distribuidor não encontrado')
        
      return response.status(200).json(product)
    } catch (error) { 
      console.error(error)
      return response.status(error.status || 500).json(error.message)
    }
  }

}
module.exports = Product
