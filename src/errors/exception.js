class ExceptionError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.message = message || 'Error'
        this.name = this.name || 'Error'
        this.stack = this.stack || 'Error'
        this.status = statusCode || 500
    }
}

module.exports = ExceptionError
