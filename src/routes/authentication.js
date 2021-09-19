const routes = require('express').Router()
const authController = require('../controllers/authController')
const { auth } = new authController()

routes.post('/', auth)

module.exports = routes
