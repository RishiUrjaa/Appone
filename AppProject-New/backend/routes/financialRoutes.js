const { sendResponse } = require('../utils/helpers');

const financialRoutes = async (req, res, path, method) => {
  const route = path.replace('/api/financial', '');

  switch (route) {
    case '/earnings':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Earnings API',
          endpoint: 'astrologers_earning',
          data: req.query,
        });
      }
      break;

    case '/bank-details':
      if (method === 'PUT') {
        sendResponse(res, 200, {
          success: true,
          message: 'Update Bank Details API',
          endpoint: 'update_bank_details',
          data: req.body,
        });
      } else if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Get Bank Details API',
          endpoint: 'astrologer_bank_details',
          data: req.query,
        });
      }
      break;

    case '/set-discount':
      if (method === 'POST') {
        sendResponse(res, 200, {
          success: true,
          message: 'Set Discount API',
          endpoint: 'set_astrologer_discount',
          data: req.body,
        });
      }
      break;

    case '/gifts':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Gift List API',
          endpoint: 'send_gifts',
          data: req.query,
        });
      }
      break;

    case '/coupons':
      if (method === 'POST') {
        sendResponse(res, 200, {
          success: true,
          message: 'Create Coupon API',
          endpoint: 'create_astrologer_coupans_for_user',
          data: req.body,
        });
      }
      break;

    case '/pooja-coupons':
      if (method === 'GET') {
        sendResponse(res, 200, {
          success: true,
          message: 'Pooja Coupon API',
          endpoint: 'puja_list_for_coupan',
          data: req.query,
        });
      }
      break;

    default:
      sendResponse(res, 404, {
        success: false,
        message: 'Financial route not found',
      });
  }
};

module.exports = financialRoutes;
