require('dotenv').config({ 'path': './env/.env' })
const express = require('express')
const app = express()

const { PORT = 3333 } = process.env

const userRoutes = require('./routes/user')
const authRoutes = require('./routes/authentication')
const productRoutes = require('./routes/product')
const distributorRoutes = require('./routes/distributor')
const purchaseRoutes = require('./routes/purchase')

app.use(express.json())
app.use('/user', userRoutes)
app.use('/login', authRoutes)
app.use('/distributor', distributorRoutes)
app.use('/product', productRoutes)
app.use('/purchase', purchaseRoutes)

app.listen(PORT, () => console.log('Server Listing in port:', PORT))
