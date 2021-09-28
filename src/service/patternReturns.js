module.exports = {
  patternReturnModelByGet(docs) {
    let array = []
    docs.forEach((doc) => {
      array.push({
        id: doc.id,
        ...doc.data(),
      })
    })
    return array
  },  
  patternReturnModelByGetWithParents({dataParent, dataChildren}) {
    const response = {
      id: dataParent.id,
      ...dataParent.data(),
    }
    const children = []
    dataChildren.forEach((doc) => {
      children.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    response[dataChildren.query.id] = children
    return response
  },
}
