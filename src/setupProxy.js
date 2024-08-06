const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://timetally.gauffin-oscarsson.com',
      changeOrigin: true,
    })
  );
};
