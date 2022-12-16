const crypto = require('crypto')
const fs = require('fs')
const { decryptWithPublicKey } = require('./decrypt')
let packageOfDataToSend = require('./signMessage')

// uncomment this line to tamper data🤣
// packageOfDataToSend.originalData.mobile = 2222222222

//decrypt with the senders public key as the message signed with senders private key.
const receivedData = packageOfDataToSend

const hash = crypto.createHash(receivedData.algorithm)

const senderPublicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8')

// here, decryptedMessage is the hash of the original data.
const decryptedMessage = decryptWithPublicKey(
  senderPublicKey,
  packageOfDataToSend.signedAndEncryptedData,
)

//once we get the hash of signedmessage, then calculate hash for the original data. Then these two hashes must be equal to verify successfully. If verified successfully, that means data is correct and signed by the person who said he/she signed it

const hashOriginal = hash.update(
  JSON.stringify(packageOfDataToSend.originalData),
)
const hexOfHash = hash.digest('hex')

if (hexOfHash === decryptedMessage.toString()) {
  console.log('verified successfully....data is correct and sender is valid!')
} else {
  console.log('Data has been tampered or incorrect signature')
}
