const { sendResponse } = require('../utils/helpers');

const authRoutes = async (req, res, path, method) => {
  const route = path.replace('/api/auth', '');

  try {
    switch (route) {
      case '/signin':
        if (method === 'POST') {
          // SignInApi logic
          console.log('REQ BODY (signin):', req.body); 
          sendResponse(res, 200, {
            success: true,
            message: 'Signin API',
            endpoint: 'signin_astrologer',
            data: req.body
          });
        }
        break;

      case '/signup':
        if (method === 'POST') {
          sendResponse(res, 200, {
            success: true,
            message: 'Signup API',
            endpoint: 'Signup_astrologer',
            data: req.body
          });
        }
        break;

      case '/send-otp':
        if (method === 'POST') {
          sendResponse(res, 200, {
            success: true,
            message: 'Send OTP API',
            endpoint: 'otp_send_astrologer',
            data: req.body
          });
        }
        break;

      case '/verify-otp':
        if (method === 'POST') {
          sendResponse(res, 200, {
            success: true,
            message: 'Verify OTP API',
            endpoint: 'verify_otp_astrologer',
            data: req.body
          });
        }
        break;

      case '/forgot-password':
        if (method === 'POST') {
          sendResponse(res, 200, {
            success: true,
            message: 'Forgot Password API',
            endpoint: 'astrologer_forget_password_otp',
            data: req.body
          });
        }
        break;

      case '/reset-password':
        if (method === 'POST') {
          sendResponse(res, 200, {
            success: true,
            message: 'Reset Password API',
            endpoint: 'change_password_astrologer',
            data: req.body
          });
        }
        break;

      case '/mobile-login':
        if (method === 'POST') {
          sendResponse(res, 200, {
            success: true,
            message: 'Mobile Login API',
            endpoint: 'otp_send_astrologer',
            data: req.body
          });
        }
        break;

      default:
        sendResponse(res, 404, {
          success: false,
          message: 'Auth route not found'
        });
    }
  } catch (err) {
    console.error(' Error in authRoutes:', err);
    sendResponse(res, 500, {
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = authRoutes;
