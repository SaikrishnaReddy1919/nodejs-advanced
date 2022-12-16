const crypto = require('crypto')
const hash = crypto.createHash('sha256')
const fs = require('fs')
const { encryptWithPrivateKey } = require('./encrypt')

const myData = {
  name: 'Saikrishna Reddy',
  mobile: 1111111111,
  securityNumber:
    'Never keep anything personal or secret in a digitally signed message. Because this form of cryptgraphy does not hide data and others can see it!.',
}

const myDataString = JSON.stringify(myData)
hash.update(myDataString) // update method requires data to be in string format so...

//hashed data in hex format
const hashedData = hash.digest('hex')

const senderPrivateKey = fs.readFileSync(__dirname + '/id_rsa_private.pem', 'utf8')

const signedMessage = encryptWithPrivateKey(senderPrivateKey, hashedData)

// for a reciever to verify that the data is correct and has not been tampered with, he/she needs :
// algorith used, original data and signedMessage.
// So, using this data reciever can decrypt the message with the sender's public key and verify.(check verifyIdentity.js)
const packageOfDataToSend = {
  algorithm: 'sha256',
  originalData: myData,
  signedAndEncryptedData: signedMessage,
}

module.exports = packageOfDataToSend
