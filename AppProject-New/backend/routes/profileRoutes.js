const { sendResponse } = require('../utils/helpers');

const profileRoutes = async (req, res, path, method) => {
  const route = path.replace('/api/profile', '');

  switch (route) {
    case '/get':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Get Profile API',
          endpoint: 'get_profile_astrologers',
          data: req.query
        });
      }
      break;

    case '/update':
      if (method === 'PUT') {
        sendResponse(res, 200, {
          success: true,
          message: 'Update Profile API',
          endpoint: 'update_superviser_profile',
          data: req.body
        });
      }
      break;

    case '/change-mobile':
      if (method === 'PUT') {
        sendResponse(res, 200, {
          success: true,
          message: 'Change Mobile API',
          endpoint: 'change_mobile_astrologer',
          data: req.body
        });
      }
      break;

    case '/professional-details':
      if (method === 'PUT') {
        sendResponse(res, 200, {
          success: true,
          message: 'Update Professional Details API',
          endpoint: 'update_professional_details',
          data: req.body
        });
      }
      break;

    case '/check-status':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Check Status API',
          endpoint: 'check_all_steps',
          data: req.query
        });
      }
      break;

    case '/registration':
      if (method === 'POST') {
        sendResponse(res, 200, {
          success: true,
          message: 'Astrologer Registration API',
          endpoint: 'astrologer_regestrion',
          data: req.body
        });
      }
      break;

    case '/delete':
      if (method === 'DELETE') {
        sendResponse(res, 200, {
          success: true,
          message: 'Delete Astrologer API',
          endpoint: 'delete_astrologer',
          data: req.body
        });
      }
      break;

    case '/update-price':
      if (method === 'PUT') {
        sendResponse(res, 200, {
          success: true,
          message: 'Update Price API',
          endpoint: 'update_astrologer_price',
          data: req.body
        });
      }
      break;

    default:
      sendResponse(res, 404, {
        success: false,
        message: 'Profile route not found'
      });
  }
};

module.exports = profileRoutes;
