const { sendResponse } = require('../utils/helpers');

async function historyRoutes(req, res, path, method) {
  const route = path.replace('/api/history', '');

  switch (route) {
    case '/calls':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Call History API',
          endpoint: 'call_history',
          data: req.query
        });
      }
      break;

    case '/live-calls':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Live Call History API',
          endpoint: 'astrologer_live_history',
          data: req.query
        });
      }
      break;

    case '/chats':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Chat History API',
          endpoint: 'astrologer_chat_history',
          data: req.query
        });
      }
      break;

    case '/videos':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Video History API',
          endpoint: 'video_history',
          data: req.query
        });
      }
      break;

    case '/video-fetch':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Fetch Video API',
          endpoint: 'astrologer_video_history',
          data: req.query
        });
      }
      break;

    case '/horoscope':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Horoscope History API',
          endpoint: 'horoscope_history',
          data: req.query
        });
      }
      break;

    case '/pooja':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Pooja History API',
          endpoint: 'puja_booking_history',
          data: req.query
        });
      }
      break;

    default:
      sendResponse(res, 404, {
        success: false,
        message: 'History route not found'
      });
  }
}

module.exports = historyRoutes;
