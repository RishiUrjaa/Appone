// backend/routes/bookingRoutes.js
const { sendResponse } = require('../utils/helpers');

const bookingRoutes = async (req, res, path, method) => {
  const route = path.replace('/api/booking', '');

  switch (route) {
    case '/user-booking':
      if (method === 'POST') {
        sendResponse(res, 200, {
          success: true,
          message: 'User Booking API',
          endpoint: 'astrologer_user_booking',
          data: req.body
        });
      }
      break;

    case '/accept-reject':
      if (method === 'POST') {
        sendResponse(res, 200, {
          success: true,
          message: 'Accept Reject API',
          endpoint: 'accept_reject_request',
          data: req.body
        });
      }
      break;

    case '/accept-reject-new':
      if (method === 'POST') {
        sendResponse(res, 200, {
          success: true,
          message: 'Accept Reject New API',
          endpoint: 'accept_reject_request_new',
          data: req.body
        });
      }
      break;

    case '/cancel':
      if (method === 'POST') {
        sendResponse(res, 200, {
          success: true,
          message: 'Cancel Booking API',
          endpoint: 'cancel_astrologer_bookings',
          data: req.body
        });
      }
      break;

    case '/schedule':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Schedule Bookings API',
          endpoint: 'my_schedule_bookings',
          data: req.query
        });
      }
      break;

    case '/can-start':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Can Booking Start API',
          endpoint: 'can_booking_start',
          data: req.query
        });
      }
      break;

    case '/pending-queue':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Pending Queue API',
          endpoint: 'fetch_queue_users',
          data: req.query
        });
      }
      break;

    case '/change-status':
      if (method === 'POST') {
        sendResponse(res, 200, {
          success: true,
          message: 'Change Status API',
          endpoint: 'change_status_consultations',
          data: req.body
        });
      }
      break;

    case '/online-status':
      if (method === 'POST') {
        sendResponse(res, 200, {
          success: true,
          message: 'Online Status API',
          endpoint: 'astrologer_online_offline',
          data: req.body
        });
      }
      break;

    default:
      sendResponse(res, 404, {
        success: false,
        message: 'Booking route not found'
      });
  }
};

module.exports = bookingRoutes;
