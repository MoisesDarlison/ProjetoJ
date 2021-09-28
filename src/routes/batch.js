const routes = require('express').Router()
const BatchController = require('../controllers/batchController')

const { create } = new BatchController()

routes.post('/new', create)

module.exports = routes
