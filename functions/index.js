const functions = require("firebase-functions");
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.hashGenerator = functions.https.onRequest(async (request, response) => {
  // console.log('test: ', request.query);
  const {key, type} = request.query;
  let resp = '';
  switch (type) {
    case 'get':
      break;
    case 'new':
      resp = await bcrypt.hash(key, saltRounds)
      console.log('hash: ',key, resp);
      break
    default:
      break;
  }

  response.send(resp !== '' ? resp : "Done!");
});
