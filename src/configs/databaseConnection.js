
const Firestore = require('@google-cloud/firestore')
const { GOOGLE_APPLICATION_CREDENTIALS, GOOGLE_PROJECT_ID } = process.env

const db = new Firestore({
  projectId: GOOGLE_PROJECT_ID,
  keyFilename: GOOGLE_APPLICATION_CREDENTIALS,
})

module.exports = db