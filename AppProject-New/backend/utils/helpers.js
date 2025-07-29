const querystring = require('querystring');

const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

const parseBody = (req) => {
  return new Promise((resolve) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        if (!body) {
          resolve({}); 
        } else if (
          req.headers['content-type'] &&
          req.headers['content-type'].includes('application/json')
        ) {
          // try JSON.parse safely
          try {
            resolve(JSON.parse(body));
          } catch (jsonErr) {
            console.error(' Invalid JSON:', jsonErr.message);
            resolve({}); // fallback to empty object
          }
        } else {
          // Parse as form-urlencoded
          resolve(querystring.parse(body));
        }
      } catch (err) {
        console.error(' Error parsing body:', err.message);
        resolve({}); // fallback
      }
    });

    req.on('error', (err) => {
      console.error(' Request error while reading body:', err.message);
      resolve({}); // fallback on stream error
    });
  });
};

module.exports = { 
  sendResponse,
  parseBody,
};
