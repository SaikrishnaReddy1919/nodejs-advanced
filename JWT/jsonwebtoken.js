/**
 * same process using jsonwebtoken library
 * this librariy provides lot of flexibility like giving an option to specify which alogorithm to use, you dont need to focus coversions (like base64 to base64url encoded) and many more.
 */

const jwt = require('jsonwebtoken')
const fs = require('fs')

const PUBLIC_KEY = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8')
const PRIVATE_KEY = fs.readFileSync(__dirname + '/id_rsa_private.pem', 'utf8')

const payload = {
  sub: '1234567890',
  name: 'Saikrishna Reddy',
  iat: 1516239022,
}

//all we need to provide is payload, private key and algorithm. No coversions, no formatting.
const signedJWT = jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' })

//this above jwt need to send to the client so on every request client sends this token again to server in header. Server grabs the token from header then verifies it
// and in almost two lines we can verify wether the token is valid or not.
jwt.verify(signedJWT, PUBLIC_KEY, { algorithms: ['RS256'] }, (err, payload) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Token verified')
    console.log(payload)
  }
})
