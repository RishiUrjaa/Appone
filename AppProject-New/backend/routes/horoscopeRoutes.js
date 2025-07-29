const { sendResponse } = require('../utils/helpers');

function horoscopeRoutes(req, res, path, method) {
  const route = path.replace('/api/horoscope', '');

  switch (route) {
    case '/list':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Horoscope List API',
          endpoint: 'list_upload_horoscope',
          data: req.query
        });
      }
      break;

    case '/upload':
      if (method === 'POST') {
        sendResponse(res, 200, {
          success: true,
          message: 'Horoscope Upload API',
          endpoint: 'image_attchment_upload_horoscope',
          data: req.body
        });
      }
      break;

    case '/remove':
      if (method === 'DELETE') {
        sendResponse(res, 200, {
          success: true,
          message: 'Horoscope Remove API',
          endpoint: 'delete_images_horoscope',
          data: req.body
        });
      }
      break;

    case '/complete':
      if (method === 'POST') {
        sendResponse(res, 200, {
          success: true,
          message: 'Complete Horoscope API',
          endpoint: 'complete_horoscope',
          data: req.body
        });
      }
      break;

    default:
      sendResponse(res, 404, {
        success: false,
        message: 'Horoscope route not found'
      });
  }
}

module.exports = horoscopeRoutes;
