const routes = require('express').Router()
const PurchaseController = require('../controllers/purchaseController')
const SaleController = require('../controllers/saleController')

const { create } = new PurchaseController()
const { execute } = new SaleController()

routes.post('/new', create)
routes.post('/sale/new', execute)

module.exports = routes
