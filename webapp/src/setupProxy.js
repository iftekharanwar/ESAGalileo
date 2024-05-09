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
        // Append the API key as a query parameter to the proxied request
        const apiKey = process.env.REACT_APP_N2YO_API_KEY;
        if (apiKey) {
          // Check if the original request path already contains a query string
          const delimiter = proxyReq.path.includes('?') ? '&' : '?';
          proxyReq.path += `${delimiter}apiKey=${apiKey}`;
        } else {
          console.error('REACT_APP_N2YO_API_KEY is not defined in the environment variables.');
        }
        // Log the outgoing request URL for debugging
        console.log(`Proxying request to: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
      },
      logLevel: 'debug' // Added log level for detailed proxy logging
    })
  );
};
