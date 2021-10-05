const ExceptionError = require('../errors/exception')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

function hasMessageError(exception) {
  let response = ''
  exception.errors.forEach((e, index) => {
    response += `(${index + 1}) - *${e.instancePath}* -${e.message} `
  })

  return response
}

module.exports = {
  validateLogin(data) {
    const schema = {
      type: 'object',
      properties: {
        user: { type: 'string', nullable: false , minLength:4 },
        password: { type: 'string', nullable: false , minLength:4 },
      },
      required: ['user', 'password'],
      additionalProperties: false,
    }

    const validate = ajv.compile(schema)
    const valid = validate(data)

    if (!valid) throw new ExceptionError(400, hasMessageError(validate))

    return true
  },

  validateCategory(data) {
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string', nullable: false , minLength:1 },
      },
      required: ['name'],
      additionalProperties: false,
    }

    const validate = ajv.compile(schema)
    const valid = validate(data)

    if (!valid) throw new ExceptionError(400, hasMessageError(validate))

    return true
  },

  validateProducts(data) {
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string', nullable: false , minLength:1},
        description: { type: 'string' },
        distributorId: { type: 'string', nullable: false , minLength:1 },
        categoryId: { type: 'string' },
        barCode: { type: 'string' },
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
        name: { type: 'string', nullable: false , minLength:1 },
        salesMargin: { type: 'number' , nullable: false},
      },
      required: ['name', 'salesMargin'],
      additionalProperties: false,
    }

    const validate = ajv.compile(schema)
    const valid = validate(data)

    if (!valid) throw new ExceptionError(400, hasMessageError(validate))

    return true
  },

  validateBatch(data) {
    const schema = {
      type: 'object',
      properties: {
        productId: { type: 'string', nullable: false , minLength:1 },
        quantity: { type: 'number', minimum: 1 },
        validAt: { type: 'string', format: 'date' },
        costPrice: { type: 'number' },
        salesPrice: { type: 'number' },
        NumberBatch: { type: 'string' },
        isSaleOff: { type: 'boolean', default: false },
        observation: { type: 'string' },
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
        productId: { type: 'string' },
        batchId: { type: 'string' },
        quantity: { type: 'number', minimum: 1 },
        salesPrice: { type: 'number' },
        isSaleOff: { type: 'boolean' },
        discount: { type: 'number' },
        observation: { type: 'string' },
        salesTo: { type: 'string' },
      },
      required: ['productId','batchId', 'quantity', 'salesPrice'],
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
        id: { type: 'string', nullable: false , minLength:1 },
        name: { type: 'string', nullable: false , minLength:1 },
        salesMargin: { type: 'number', nullable: false },
      },
      nullable: false,
      required: [],
      additionalProperties: true,
    }

    const validate = ajv.compile(schema)
    const valid = validate(data)

    if (!valid) throw new ExceptionError(400, hasMessageError(validate))

    return true
  },
}
