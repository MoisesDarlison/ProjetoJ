const routes = require('express').Router()
const CatalogProductController = require('../controllers/catalogProductController')
const { create, list } = new CatalogProductController()

routes.post('/new', create)
routes.get('/list', list)

module.exports = routes
