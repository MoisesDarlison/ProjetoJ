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
            if (distributorAlreadyExists) throw new ExceptionError(401, 'Distributor Already Exists')

            const distributor = await distributorsModel.setDistributor(name, salesMargin)

            return response.status(201).json(distributor)

        } catch (error) {
            return response.status(error.status || 500).json(error.message)
        }
    }
}
module.exports = Distributor
