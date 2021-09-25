const functions = require("firebase-functions");
const crypto = require ("crypto");

const algorithm = "aes-256-cbc";


exports.hashGenerator = functions.https.onRequest(async (request, response) => {
  // console.log('test: ', request.query);
  const {key, type, start, end} = request.query;
  const initVector = crypto.randomBytes(16);
  const Securitykey = crypto.randomBytes(32);
  let resp = '';
  switch (type) {
    case 'get':
      const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
      let decryptedData = decipher.update(key, "hex", "utf-8");
      decryptedData += decipher.final("utf8");
      console.log("Decrypted message: " + decryptedData);
      break;
    case 'new':
      const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
      let encryptedData = cipher.update(key, "utf-8", "hex");
      encryptedData += cipher.final("hex");
      resp = encryptedData;
      console.log("Encrypted message: " + encryptedData);
      break
    default:
      break;
  }

  if(resp !== '') {
    let s = start && start !== '' ? start : null;
    let e = end && end !== '' ? end : null;
    resp = start && end ? resp.slice(s, e) : resp;
  } else {
    resp = 'Done!'
  }

  response.send(resp);
});
