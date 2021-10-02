
const morgan = require('morgan')
class ExceptionError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.message = message || 'Error'
    this.name = this.name || 'Error'
    this.stack = this.stack || 'Error'
    this.status = statusCode || 500
    console.warn( colorError(this.status), `↓ ${this.message} - ${this.status} ↓` )
  }
}

function colorError(statusCode){
  const color = {
    500: '\u001b[31m',
    400: '\u001b[33m',
    401: '\u001b[33m',
  }  
  
  return color[statusCode]
}

module.exports = ExceptionError
