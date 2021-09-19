const ExceptionError = require('../errors/exception')

module.exports = {
    formattedToUpperCase(word) {
        return word.toUpperCase()
    },
    formattedToUpperCaseOnlyFirstCharacter(string) {
        let response = ''
        const arrayString = string.trim().split(' ')
        arrayString.forEach(word => {
            response += `${word[0].toUpperCase()}${word.substr(1)} `
        })

        return response.trim()
    },

}