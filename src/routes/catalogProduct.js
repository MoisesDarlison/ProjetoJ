const routes = require('express').Router()
const CatalogProductController = require('../controllers/catalogProductController')
const { create } = new CatalogProductController()

routes.post('/new', create)

module.exports = routes
