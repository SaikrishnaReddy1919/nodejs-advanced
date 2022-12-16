const crypto = require('crypto')

/**
 * In case of 'Data' protection, encrypt with public key
 * In case of digital signatures(identities), encrypt with private key
 *      - for digital sig, there are two main steps involved
 *      - 1. Sign the message. (so that the receiver can know that the person who signed is the actual one and data has not been tampared with)
 *      - 2. Verify the signature.
 */

/**
 *
 * @param {*} publicKey
 * @param {*} message message you want to encrypt
 * @returns encrypted message
 */
function encryptWithPublicKey(publicKey, message) {
  const bufferMessage = Buffer.from(message, 'utf8')

  return crypto.publicEncrypt(publicKey, bufferMessage)
}

function encryptWithPrivateKey(privateKey, message) {
  const bufferMessage = Buffer.from(message, 'utf8')

  return crypto.privateEncrypt(privateKey, bufferMessage)
}

module.exports = {
  encryptWithPublicKey,
  encryptWithPrivateKey,
}
