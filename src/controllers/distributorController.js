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
            if (distributorAlreadyExists) throw new ExceptionError(401, 'Distribuidor ja cadastrado')

            const distributor = await distributorsModel.setDistributor(name, salesMargin)

            return response.status(201).json(distributor)

        } catch (error) {
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

        } catch (error) {
            return response.status(error.status || 500).json(error.message)
        }
    }

    /***
    * Distributor - Lista Apenas 1  filtando pelo nome
    * ou pelo ID
    * @param {string} id
    */
    async filter(request, response) {
        try {
            const { id } = request.params

            const distributor = await distributorsModel.getDistributorById(id)
            if (!distributor) throw new ExceptionError(401, 'Distribuidor não encontrado')

            return response.status(200).json(distributor)

        } catch (error) {
            return response.status(error.status || 500).json(error.message)
        }
    }

    async update(request, response) {
        try {
            const { id } = request.params
            Validate.validateDistributor(request.body)
            const { name, salesMargin } = request.body

            const data = { name, salesMargin }

            const distributorAlreadyExists = await distributorsModel.getDistributorByName(name)
            if (distributorAlreadyExists && distributorAlreadyExists.id != id) throw new ExceptionError(401, 'Distribuidor ja cadastrado')

            const distributor = await distributorsModel.updateDistributor(id, data)
            if (!distributor) throw new ExceptionError(401, 'Distribuidor não encontrado')

            return response.status(200).json('Altualização realizada com sucesso')

        } catch (error) {
            return response.status(error.status || 500).json(error.message)
        }
    }

    async destroy(request, response) {
        try {
            const { id } = request.params

            const distributor = await distributorsModel.destroyDistributorById(id)
            if (!distributor) throw new ExceptionError(401, 'Distribuidor não encontrado')

            return response.status(203).json()

        } catch (error) {
            return response.status(error.status || 500).json(error.message)
        }
    }

}
module.exports = Distributor
