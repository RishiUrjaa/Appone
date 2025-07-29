const { sendResponse } = require('../utils/helpers');

function notificationRoutes(req, res, path, method) {
  const route = path.replace('/api/notification', '');

  switch (route) {
    case '/list':
      if (method === 'GET') {
        // NotificationApi logic
        sendResponse(res, 200, {
          success: true,
          message: 'Notification List API',
          endpoint: 'list_astrologer_notification',
          data: req.query
        });
      }
      break;

    case '/delete':
      if (method === 'DELETE') {
        // DeleteNotification logic
        sendResponse(res, 200, {
          success: true,
          message: 'Delete Notification API',
          endpoint: 'delete_astrologer_notification',
          data: req.body
        });
      }
      break;

    case '/unread-count':
      if (method === 'GET') {
        // Unread logic
        sendResponse(res, 200, {
          success: true,
          message: 'Unread Count API',
          endpoint: 'total_unread_reports',
          data: req.query
        });
      }
      break;

    default:
      sendResponse(res, 404, {
        success: false,
        message: 'Notification route not found'
      });
  }
}

module.exports = notificationRoutes;
