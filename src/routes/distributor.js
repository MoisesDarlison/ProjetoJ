const routes = require('express').Router()
const DistributorController = require('../controllers/distributorController')
const { create } = new DistributorController()

routes.post('/new', create)

module.exports = routes
