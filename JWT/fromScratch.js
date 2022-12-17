/**
 * This file has the code to generate JWT from scratch and verify it using native nodejs modules
 * This is actually what happens inside libraries like jsonwebtoken
 * jsonwebtoken library abtract all this implementation and provides a simple way to do it.
 *
 * Here, we are using asymmetric key alogorithm (RSA).
 *
 * You need to generate private-public keys before continuing with this file.
 * Use : cryptography > generateKeyPair.js to generate keypair add them inside this folder
 */

const base64url = require('base64url')
const crypto = require('crypto')
const signatureFunction = crypto.createSign('RSA-SHA256')
const verifyFunction = crypto.createVerify('RSA-SHA256')
const fs = require('fs')

//-------------ISSUANCE OF JWT---------------//

const headerObj = {
  alg: 'RS256',
  typ: 'JWT',
}

const payloadObj = {
  sub: '1234567890',
  name: 'Saikrishna Reddy',
  iat: 1516239022,
}

const headerObjString = JSON.stringify(headerObj)
const payloadObjString = JSON.stringify(payloadObj)

const base64UrlHeader = base64url(headerObjString)
const base64UrlPayload = base64url(payloadObjString)

signatureFunction.write(base64UrlHeader + '.' + base64UrlPayload)
signatureFunction.end()

const PRIVATE_KEY = fs.readFileSync(__dirname + '/id_rsa_private.pem', 'utf8')
const signatureBase64 = signatureFunction.sign(PRIVATE_KEY, 'base64')

const signatureBase64Url = base64url.fromBase64(signatureBase64)

/**
 * three variables : must be same (left side are while issuance and right side vars are while verifcation) for jwt to be verified
 *      base64UrlHeader = headerInBase64UrlFormat
 *      base64UrlPayload = payloadInBase64UrlFormat
 *      signatureBase64Url = signatureInBase64UrlFormat
 */

console.log('Signature in base 64 url encoded is : ', signatureBase64Url)

//-------------VERIFICATION OF JWT---------------//

/**
 * to get the JWT :
 *      - go to https://jwt.io/
 *      - change the algorithm to RS256
 *      - change the payload as > payloadObj
 *      - add private and public key inside verify signature section in the website.
 */

const JWT =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNhaWtyaXNobmEgUmVkZHkiLCJpYXQiOjE1MTYyMzkwMjJ9.QCPxYkLc0FCOwY2t_8klSJ1FhSgIeNraRBKpAV8nzQIf8ioJAydBwF05sjbo09xlvhSQxiJeAH36fpkbWRbR3JNK-hltraDRAgtOeCN8G5m69lTMc3KsxKKNNtjALOSkKWH8RdXLPf_-8xpSvRPbhsYwY4O9CNGZ7-XD9nYdPwVqxUEV9kSqPzXYp5nDuDsb0v_RdUeapgWDHEr9rTUCsdj0fHe9S9AmzYuWK8TthzVQ77tXMb3z39-KmGR7Nq03FJbLxvqb6RTUPeKjGzZlZh3MgtdXnZOjxx88rpP1e5MgXrnc2NFlhgPyG04rnP_ug1XB80iYgVtX2zUg1ZcwMyONhBRMTEFOIRX-jVJDet09mVfggxQki9Grsjq1jxr3BsqX6f3wU2kxI79SSxbtFhCVDszX7whyyaV0t0fvU1RiQAVT7NqlVqphmum96KqpRmk085dVdKQZSNZjo2NVwnPY3fIJSTBGVCFRUCHCJE_KCT04UnqGgi1MDnyINzUvOFI-gphACCjPfl2aU0P01J1gACC-pLKQegg9ME-we87j624azgT4nTY7KHhqApfJ3WSwTxla6tkKuFve_NctvuQggRSR911RdlU0yaRjfXQ7ikXt9EiETaaBX0pHaKXwPEH6QgnVeVGduxk5np1dUkETYxLb7jkUbi-pk2Z-oIo'

const jwtInParts = JWT.split('.')
const [
  headerInBase64UrlFormat,
  payloadInBase64UrlFormat,
  signatureInBase64UrlFormat,
] = jwtInParts

verifyFunction.write(headerInBase64UrlFormat + '.' + payloadInBase64UrlFormat)
verifyFunction.end()

const jwtSignatureBase64 = base64url.toBase64(signatureInBase64UrlFormat)

const PUBLIC_KEY = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8')

const isSignatureValid = verifyFunction.verify(
  PUBLIC_KEY,
  jwtSignatureBase64,
  'base64',
)

console.log('Is token Valid ... ? : ', isSignatureValid)
