const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.n2yo.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // remove /api prefix when forwarding to the API
      },
      onProxyReq: function(proxyReq, req, res) {
        // Add API key to each request before it's forwarded
        proxyReq.path += `&apiKey=${process.env.REACT_APP_N2YO_API_KEY}`;
        // Log the outgoing request URL for debugging
        console.log(`Proxying request to: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
      },
    })
  );
};
