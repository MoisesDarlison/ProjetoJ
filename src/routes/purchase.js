const routes = require('express').Router()
const PurchaseController = require('../controllers/purchaseController')
const { create } = new PurchaseController()

routes.post('/new', create)

module.exports = routes
