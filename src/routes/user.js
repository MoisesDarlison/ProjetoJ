const routes = require('express').Router()
const UserController = require('../controllers/userController')
const { create, list } = new UserController()

routes.post('/new', create)
routes.get('/users', list)

module.exports = routes
