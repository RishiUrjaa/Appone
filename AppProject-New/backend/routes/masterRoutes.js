const { sendResponse } = require('../utils/helpers');

async function masterRoutes(req, res, path, method) {
  const route = path.replace('/api/master', '');

  switch (route) {
    case '/specialization':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Master Specialization API',
          endpoint: 'master_specialization',
          data: req.query,
        });
      }
      break;

    case '/education-degree':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Master Education Degree API',
          endpoint: 'master_education_degree',
          data: req.query,
        });
      }
      break;

    case '/languages':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Language Categories API',
          endpoint: 'language_categories',
          data: req.query,
        });
      }
      break;

    case '/cities':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Master City API',
          endpoint: 'master_city',
          data: req.query,
        });
      }
      break;

    case '/home':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Home API',
          endpoint: 'home_astrologers',
          data: req.query,
        });
      }
      break;

    case '/dynamic':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Dynamic API',
          endpoint: 'astrologers_dynamic',
          data: req.query,
        });
      }
      break;

    default:
      sendResponse(res, 404, {
        success: false,
        message: 'Master route not found',
      });
  }
}

module.exports = masterRoutes;
