const express = require('express')
const app = express()

const {verifyJWT} = require('../middlewares/authentication')
const userRoutes = require('./user')
const authRoutes = require('./authentication')
const productRoutes = require('./product')
const distributorRoutes = require('./distributor')
const categoryRoutes = require('./category')
const batchRoutes = require('./batch')
const saleRoutes = require('./sale')

app.use('/user', userRoutes)
app.use('/login', authRoutes)
app.use('/distributor',verifyJWT, distributorRoutes)
app.use('/category',verifyJWT, categoryRoutes)
app.use('/product',verifyJWT, productRoutes)
app.use('/batch',verifyJWT, batchRoutes)
app.use('/sale',verifyJWT, saleRoutes)

module.exports = app