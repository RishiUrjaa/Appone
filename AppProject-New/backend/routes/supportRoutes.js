const { sendResponse } = require('../utils/helpers');

const supportRoutes = async (req, res, path, method) => {
  const route = path.replace('/api/support', '');

  switch (route) {
    case '/add':
      if (method === 'POST') {
        // AddSuport logic
        sendResponse(res, 200, {
          success: true,
          message: 'Add Support API',
          endpoint: 'add_support_astrologer',
          data: req.body
        });
      }
      break;

    default:
      sendResponse(res, 404, {
        success: false,
        message: 'Support route not found'
      });
  }
};

module.exports = supportRoutes;