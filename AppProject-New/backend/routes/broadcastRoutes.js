// backend/routes/broadcastRoutes.js

const { sendResponse } = require('../utils/helpers');

const broadcastRoutes = async (req, res, path, method) => {
  const route = path.replace('/api/broadcast', '');

  switch (route) {
    case '/create':
      if (method === 'POST') {
        sendResponse(res, 200, {
          success: true,
          message: 'Create Broadcast API',
          endpoint: 'create_broadcast',
          socketUrl: 'http://astrourjaa.com:5050/api/',
          data: req.body
        });
      }
      break;

    case '/end':
      if (method === 'POST') {
        sendResponse(res, 200, {
          success: true,
          message: 'End Broadcast API',
          endpoint: 'end_broadcast',
          socketUrl: 'http://astrourjaa.com:5050/api/',
          data: req.body
        });
      }
      break;

    default:
      sendResponse(res, 404, {
        success: false,
        message: 'Broadcast route not found'
      });
  }
};

module.exports = broadcastRoutes;
