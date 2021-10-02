const validate = require('../service/validation')
const ExceptionError = require('../errors/exception')

const CategoryModel = require('../models/Categories')
const categoryModel = new CategoryModel()

class Category {
  /***
     * Cria uma nova categoria
     * @param {string} name
     */
  async create(request, response) {
    try {
      validate.validateCategory(request.body)
      const { name } = request.body

      const userAlreadyExists = await categoryModel.getCategoryByName(name)
      if (userAlreadyExists) throw new ExceptionError(401, 'Categoria ja cadastrada')

      const category = await categoryModel.setCategory(name)

      return response.status(201).json(category)
    } catch (error) {  
      return response.status(error.status || 500).json(error.message)
    }
  }
  
  /***
   * Categoria - Lista Todos
   * @param {number} MaxCategoria paginação
   */
  //TODO: cria paginação
  async list(request, response) {
    try {
      const users = await categoryModel.getCategories()

      return response.status(201).json(users)
    } catch (error) {  
      return response.status(error.status || 500).json(error.message)
    }
  }

  /***
   * Categoria - Lista Apenas 1  filtando pelo ID
   * @param {string} id
   */
  async filter(request, response) {
    try {
      const { id } = request.params

      const category = await categoryModel.getCategoryById(id)
      if (!category)
        throw new ExceptionError(401, 'Categoria não encontrada')

      return response.status(200).json(category)
    } catch (error) {  
      return response.status(error.status || 500).json(error.message)
    }
  }

  /***
   * Categoria - Atualização pelo ID
   * @param {string} id
   * @param {string} name
   */
  async update(request, response) {
    try {
      validate.validateTypeBodyOnly(request.body)
      
      const { id } = request.params
      const { name} = request.body

      const categoryAlreadyExists = await categoryModel.getCategoryByName(name)
      if (categoryAlreadyExists && categoryAlreadyExists[0]?.id != id)
        throw new ExceptionError(401, 'Categoria ja cadastrada')

      const category = await categoryModel.updateCategory(id, {name})
      if (!category)
        throw new ExceptionError(401, 'Categoria não encontrada')

      return response.status(200).json('Altualização realizada com sucesso')
    } catch (error) { 
       
      return response.status(error.status || 500).json(error.message)
    }
  }

}
module.exports = Category