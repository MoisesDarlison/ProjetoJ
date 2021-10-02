const routes = require('express').Router()
const UserController = require('../controllers/userController')
const {verifyJWT} = require('../middlewares/authentication')

const { create, list } = new UserController()

routes.post('/new', create)
routes.get('/list',verifyJWT, list)

module.exports = routes
