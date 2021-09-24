const routes = require('express').Router()
const productController = require('../controllers/productController')
const { create, list } = new productController()

routes.post('/new', create)
routes.get('/list', list)

module.exports = routes
