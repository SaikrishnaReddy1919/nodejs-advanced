# Basic Cryptography
- In case of -> Data protection :
    - Encrypt with public key and decrypt with private key.
    - Refer :
        - Encryption > File : `encrypt.js` > `encryptWithPublicKey()`
        - Decryption > File : `decrypt.js` > `decryptWithPrivateKey()`
    - To test :
        - run `node main.js`
- In case of -> Digital Signatures | JWTs ...
    - Encrypt with private key and decrypt with public key
    - Here, after encrypting, the encrypted data need to transferred to receiver along with the algorithm used, original data and signed message. Using the receiver/application can calculate the hash and the compare it with the hash received/calculated from the received data.
    - If verifed successfully, it means the data is correct and sender is not valid.
    - Refer :
        - Encryption > File : `encrypt.js` > `encryptWithPrivateKey()`
        - Decryption > File : `decrypt.js` > `decryptWithPublicKey()`
    - To test :
        - run `node verifyIdentity.js`
- This is how the JWT token is structured (three dots).
    - first dot : algorithm used, second dot : payload data(orignal data in our case), and third dot : signature
    - Using this token, server can calculate and verify wether the sender and data is valid or not.
    

#### NOTE:
- Here, we are sending data(orignalData) directly to `verifIdentity.js` file. But this data can also be structured in a way that JWT token is srtuctured or in some other format.
