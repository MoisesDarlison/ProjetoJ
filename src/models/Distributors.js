const db = require('../configs/databaseConnection')
const { formattedToUpperCase, removeInvalidData} = require('../service/formatted')
const { patternReturnModelByGet } = require('../service/patternReturns')

class DistributorsModel {

  async setDistributor(name, salesMargin) {
    const data = {
      name: formattedToUpperCase(name),
      salesMargin: salesMargin ? salesMargin : 0,
    }

    const response = await db.collection('distributors').add(data)

    return { id: response.id }
  }

  async getDistributors() {
    const response = await db.collection('distributors').get()
    if (response.empty) return []

    return patternReturnModelByGet(response)
  }

  async getDistributorById(id) {
    const response = await db.collection('distributors').doc(id).get()

    if (!response.exists) return false
    return response.data()
  }

  async getDistributorByName(name) {
    const nameFormatted = formattedToUpperCase(name)
    const response = await db
      .collection('distributors')
      .where('name', '==', nameFormatted)
      .get()

    if (response.empty) return false

    return patternReturnModelByGet(response)
  }

  async updateDistributor(id, data) {
    const dataValid = removeInvalidData(data)
    if (!Object.keys(dataValid)?.length) return false
    if (dataValid.name) dataValid.name = formattedToUpperCase(dataValid.name)

    const response = await db
      .collection('distributors')
      .doc(id)
      .update({ ...dataValid })
    if (!response) return false

    return true
  }

  async destroyDistributorById(id) {
    const response = await db.collection('distributors').doc(id).get()
    if (!response.exists) return false
    await db.collection('distributors').doc(id).delete()

    return true
  }
  
}

module.exports = DistributorsModel
