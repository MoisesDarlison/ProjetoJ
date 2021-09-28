const routes = require('express').Router()
const productController = require('../controllers/productController')
const { create, list, filter } = new productController()

routes.post('/new', create)
routes.get('/list', list)
routes.get('/:id', filter)

module.exports = routes
