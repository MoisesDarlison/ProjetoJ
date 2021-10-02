
require('dotenv').config({ 'path': './env/.env' })
const express = require('express')
const morgan = require('morgan')
const server = express()
const routes = require('./routes/index')

const { PORT = 3333 } = process.env

server.use(morgan('dev'))
server.use(express.json())
server.use(routes)

server.listen(PORT, () => console.log('Server Listing in port:', PORT))
