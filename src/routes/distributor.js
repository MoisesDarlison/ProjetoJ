const routes = require('express').Router()
const DistributorController = require('../controllers/distributorController')
const { create, list, filter, destroy, update } = new DistributorController()

routes.post('/new', create)
routes.get('/list', list)
routes.put('/:id', update)
routes.get('/:id', filter)
routes.delete('/:id', destroy)

module.exports = routes
