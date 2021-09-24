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
}
