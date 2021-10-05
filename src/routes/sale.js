const routes = require('express').Router()
const SaleController = require('../controllers/saleController')
const { create, list} = new SaleController()

routes.post('/new', create)
routes.get('/list', list)

module.exports = routes
