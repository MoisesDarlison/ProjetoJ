const routes = require('express').Router()
const CategoryController = require('../controllers/categoryController')
const { create,list, filter,update } = new CategoryController()

routes.post('/new', create)
routes.get('/list', list)
routes.get('/:id', filter)
routes.put('/:id', update)

module.exports = routes
