const routes = require('express').Router()
const BatchController = require('../controllers/batchController')

const { create, update } = new BatchController()

routes.post('/new', create)
routes.put('/:id', update)

module.exports = routes
