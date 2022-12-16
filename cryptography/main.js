const genKeyPair = require('./generateKeypair')
const fs = require('fs')
const { encryptWithPublicKey } = require('./encrypt')
const { decryptWithPrivateKey } = require('./decrypt')

// generate key pair
console.log('generating key pair ...')
genKeyPair()

// read public key
console.log('reading public key ...')
const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8')

// encrypt message
console.log('encrypting message with public key ...')
const encryptedMessage = encryptWithPublicKey(publicKey, 'SOME_SECRET_MESSAGE')

console.log('encrypted message is : ')
console.log(encryptedMessage.toString())

console.log('------------------------------------')

console.log('decrypting encrypted message using private key ...')
const privateKey = fs.readFileSync(__dirname + '/id_rsa_private.pem', 'utf8')
const decryptedMessage = decryptWithPrivateKey(privateKey, encryptedMessage)

console.log('Decrypted message is :')
console.log(decryptedMessage.toString())
