const db = require('../configs/databaseConnection')
const { formattedToUpperCase } = require('../service/format')
const { patternReturnModelByGet } = require('../service/patternReturns')

class CategoriesModel {
  
  async getCategoryByName(name) {
    const nameUpperCase = formattedToUpperCase(name)
    const response = await db
      .collection('categories')
      .where('name', '==', nameUpperCase)
      .get()

    if (response.empty) return false

    return patternReturnModelByGet(response)
  }

  async getCategoryById(id) {
    const response = await db
      .collection('categories')
      .doc(id)
      .get()

    if (!response.exists) return false

    return response.data()
  }

  async setCategory(name){
    const nameUpperCase = formattedToUpperCase(name)
    const response = await db.collection('categories')
      .add({ name:nameUpperCase })

    return { id: response.id }
  }

  async updateCategory(id, {name}){
    
    if (!name) return false
    const nameUpperCase = formattedToUpperCase(name)
    
    const response = await db
      .collection('categories')
      .doc(id)
      .update({ name:nameUpperCase })

    if (!response) return false

    return true

  }

  async getCategories(){
    const response = await db.collection('categories').get()

    if (response.empty) return []

    return patternReturnModelByGet(response)

  }
}

module.exports = CategoriesModel
