const routes = require('express').Router()
const productController = require('../controllers/productController')
const { create, list, filter,update } = new productController()

routes.post('/new', create)
routes.get('/list', list)
routes.get('/:id', filter)
routes.put('/:id', update)

module.exports = routes
