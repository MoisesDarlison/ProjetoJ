const routes = require('express').Router()
const SaleController = require('../controllers/saleController')
const { create } = new SaleController()

routes.post('/new', create)

module.exports = routes
