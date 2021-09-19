const routes = require('express').Router()
const UserController = require('../controllers/userController')
const { create } = new UserController()

routes.post('/new', create)

module.exports = routes
