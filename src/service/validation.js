const ExceptionError = require('../errors/exception')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

module.exports = {
    validateLogin(data) {
        const schema = {
            type: 'object',
            properties: {
                user: { type: 'string' },
                password: { type: 'string' },
            },
            required: ['user', 'password'],
            additionalProperties: false,
        }

        const validate = ajv.compile(schema)
        const valid = validate(data)

        if (!valid) throw new ExceptionError(400, hasMessageError(validate))

        return true
    },

    validateProductsCatalog(data) {
        const schema = {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                distributorId: { type: 'string' },
                category: { type: 'string' },
                barCode: { type: 'string' }
            },
            required: ['name', 'description', 'distributorId'],
            additionalProperties: false,
        }

        const validate = ajv.compile(schema)
        const valid = validate(data)

        if (!valid) throw new ExceptionError(400, hasMessageError(validate))

        return true
    },

    validateDistributor(data) {
        const schema = {
            type: 'object',
            properties: {
                name: { type: 'string' },
                salesMargin: { type: 'number' }
            },
            required: ['name', 'salesMargin'],
            additionalProperties: false,
        }

        const validate = ajv.compile(schema)
        const valid = validate(data)

        if (!valid) throw new ExceptionError(400, hasMessageError(validate))

        return true
    },

    validatePurchase(data) {
        const schema = {
            type: 'object',
            properties: {
                productId: { type: 'string' },
                quantity: { type: 'number' },
                validAt: { type: 'string', format: 'date' },
                costPrice: { type: 'number' },
                salesPrice: { type: 'number' },
                batch: { type: 'string' },
                isSaleOff: { type: 'boolean', default: false },
                observation: { type: 'string' }

            },
            required: ['productId', 'quantity', 'validAt', 'costPrice'],
            additionalProperties: false,
        }

        const validate = ajv.compile(schema)
        const valid = validate(data)

        if (!valid) throw new ExceptionError(400, hasMessageError(validate))

        return true
    },

    validateSale(data) {
        const schema = {
            type: 'object',
            properties: {
                purchaseId: { type: 'string' },
                quantity: { type: 'number' },
                salesPrice: { type: 'number' },
                isSaleOff: { type: 'boolean', default: false },
                discount: { type: 'number' },
                observation: { type: 'string' }

            },
            required: ['purchaseId', 'quantity', 'salesPrice'],
            additionalProperties: false,
        }

        const validate = ajv.compile(schema)
        const valid = validate(data)

        if (!valid) throw new ExceptionError(400, hasMessageError(validate))

        return true
    },

    validateTypeBodyOnly(data) {
        const schema = {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string', nullable: false },
                salesMargin: { type: 'number', nullable: false }
            },
            nullable: false,
            required: [],
            additionalProperties: true,
        }

        const validate = ajv.compile(schema)
        const valid = validate(data)

        if (!valid) throw new ExceptionError(400, hasMessageError(validate))

        return true
    }

}

function hasMessageError(exception) {
    let response = ''
    exception.errors.forEach((e, index) => {
        response += `(${index + 1}) - *${e.instancePath}* -${e.message} `
    })

    return response
}
