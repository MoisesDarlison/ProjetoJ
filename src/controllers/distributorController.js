const Validate = require('../service/validation')
const ExceptionError = require('../errors/exception')

const DistributorsModel = require('../models/Distributors')
const distributorsModel = new DistributorsModel()

class Distributor {
  /***
   * Distributor - cadastra um destribuidor
   * @param {string} name
   * @param {number} salesMargin
   */
  async create(request, response) {
    try {
      Validate.validateDistributor(request.body)
      const { name, salesMargin } = request.body

      const distributorAlreadyExists = await distributorsModel.getDistributorByName(name)
      if (distributorAlreadyExists)
        throw new ExceptionError(401, 'Distribuidor ja cadastrado')

      const distributor = await distributorsModel.setDistributor({
        name,
        salesMargin,
      })

      return response.status(201).json(distributor)
    } catch (error) { console.log(error)
      return response.status(error.status || 500).json(error.message)
    }
  }

  /***
   * Distributor - Lista todos os destribuidores
   */
  async list(request, response) {
    try {
      const distributors = await distributorsModel.getDistributors()

      return response.status(200).json(distributors)
    } catch (error) { console.log(error)
      return response.status(error.status || 500).json(error.message)
    }
  }

  /***
   * Distributor - Lista Apenas 1  filtando pelo nome
   * @param {string} id
   */
  async filter(request, response) {
    try {
      const { id } = request.params

      const distributor = await distributorsModel.getDistributorById(id)
      if (!distributor)
        throw new ExceptionError(401, 'Distribuidor não encontrado')

      return response.status(200).json(distributor)
    } catch (error) { console.log(error)
      return response.status(error.status || 500).json(error.message)
    }
  }

  /***
   * Distributor - Atualização pelo ID
   * @param {string} id
   * @param {string} name
   * @param {number} salesMargin
   */
  async update(request, response) {
    try {
      const { id } = request.params
      Validate.validateDistributor(request.body)
      const { name, salesMargin } = request.body

      const distributorAlreadyExists = await distributorsModel.getDistributorByName(name)
      if (distributorAlreadyExists && distributorAlreadyExists[0]?.id != id)
        throw new ExceptionError(401, 'Distribuidor ja cadastrado')

      const distributor = await distributorsModel.updateDistributor(id, { name, salesMargin })
      if (!distributor)
        throw new ExceptionError(401, 'Distribuidor não encontrado')

      return response.status(200).json('Altualização realizada com sucesso')
    } catch (error) { console.log(error)
      return response.status(error.status || 500).json(error.message)
    }
  }

  /***
   * Distributor - Deleta pelo ID
   * @param {string} id
   */ 
  async destroy(request, response) {
    try {
      const { id } = request.params

      const distributor = await distributorsModel.destroyDistributorById(id)
      if (!distributor)
        throw new ExceptionError(401, 'Distribuidor não encontrado')

      return response.status(203).json()
    } catch (error) { console.log(error)
      return response.status(error.status || 500).json(error.message)
    }
  }
}
module.exports = Distributor
