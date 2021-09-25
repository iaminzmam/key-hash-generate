const functions = require("firebase-functions");
const crypto = require ("crypto");

// const algorithm = "aes-256-cbc";


exports.hashGenerator = functions.https.onRequest(async (request, response) => {
  // console.log('test: ', request.query);
  const {key, type, start, end} = request.query;
  let resp = '';
  switch (type) {
    case 'get':
      break;
    case 'new':
      const secret = 'InzamamulHaque';
      const hmac = crypto.createHmac('sha256',secret);
      hmac.update('inz:'+key);
      resp = hmac.digest('hex');
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
