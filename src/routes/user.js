const routes = require('express').Router()
const UserController = require('../controllers/userController')
const { create, list } = new UserController()

routes.post('/new', create)
routes.get('/list', list)

module.exports = routes
