module.exports = {
  formattedToUpperCase(word) {
    return word.toUpperCase()
  },

  formattedToUpperCaseOnlyFirstCharacter(string) {
    let response = ''
    const arrayString = string.trim().split(' ')
    arrayString.forEach((word) => {
      response += `${word[0].toUpperCase()}${word.substr(1)} `
    })

    return response.trim()
  },

  removeInvalidData(data) {
    const cloneValue = Object.assign({}, data)
    const dataArray = Object.entries(data)

    dataArray.forEach((param) => {
      if (!param[1] && typeof param[1] != 'number') delete cloneValue[param[0]]
    })

    return cloneValue
  },

}
