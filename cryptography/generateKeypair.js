const crypto = require('crypto')
const fs = require('fs')

/**
 * This module will generate a public and private keypair and save to current directory
 *
 * Make sure to save the private key elsewhere after generated!
 */

function genKeyPair() {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, //bits - standart for rsa
    publicKeyEncoding: {
      type: 'pkcs1', // "Public key cryptography standards 1"
      format: 'pem', //most common formatting choice
    },
    privateKeyEncoding: {
      type: 'pkcs1', // "Public key cryptography standards 1"
      format: 'pem', //most common formatting choice
    },
  })

  //create the public key file
  fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey)

  //create the private key file
  fs.writeFileSync(__dirname + '/id_rsa_private.pem', keyPair.privateKey)
}

module.exports = genKeyPair
