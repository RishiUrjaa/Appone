const http = require('http');
const url = require('url');

// Import helpers
const { sendResponse, parseBody } = require('./utils/helpers');

// Import route handlers (should each export a function)
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const historyRoutes = require('./routes/historyRoutes');
const horoscopeRoutes = require('./routes/horoscopeRoutes');
const financialRoutes = require('./routes/financialRoutes');
const masterRoutes = require('./routes/masterRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const broadcastRoutes = require('./routes/broadcastRoutes');
const supportRoutes = require('./routes/supportRoutes');

// Log to check route imports
console.log('🔍 typeof supportRoutes:', typeof supportRoutes);
console.log('🔍 supportRoutes content:', supportRoutes);

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, HTTP_X_API_KEY');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  try {
    // Parse body
    const body = await parseBody(req);
    req.body = body;
    req.query = parsedUrl.query;

    // Logs
    console.log(`➡️ ${method} ${path}`);
    if (method !== 'GET') {
      console.log('📦 Request Body:', body);
    }

    // Health Check
    if (path === '/health' && method === 'GET') {
      sendResponse(res, 200, {
        status: 'OK',
        message: 'Astrology API Server is running',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Route Handling
    if (path.startsWith('/api/auth/')) {
      await authRoutes(req, res, path, method);
    } else if (path.startsWith('/api/profile/')) {
      await profileRoutes(req, res, path, method);  // This MUST be a function
    } else if (path.startsWith('/api/booking/')) {
      await bookingRoutes(req, res, path, method);
    } else if (path.startsWith('/api/history/')) {
      await historyRoutes(req, res, path, method);
    } else if (path.startsWith('/api/horoscope/')) {
      await horoscopeRoutes(req, res, path, method);
    } else if (path.startsWith('/api/financial/')) {
      await financialRoutes(req, res, path, method);
    } else if (path.startsWith('/api/master/')) {
      await masterRoutes(req, res, path, method);
    } else if (path.startsWith('/api/notification/')) {
      await notificationRoutes(req, res, path, method);
    } else if (path.startsWith('/api/broadcast/')) {
      await broadcastRoutes(req, res, path, method);
    } else if (path.startsWith('/api/support/')) {
      await supportRoutes(req, res, path, method);
    } else {
      sendResponse(res, 404, {
        success: false,
        message: 'API endpoint not found',
      });
    }
  } catch (error) {
    console.error('❌ Server Error:', error);
    sendResponse(res, 500, {
      success: false,
      message: 'Internal server error',
    });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Astrology API Server running at http://localhost:${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/health`);
});
