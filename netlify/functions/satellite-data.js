const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { httpMethod, queryStringParameters } = event;

  // Only allow GET requests
  if (httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
      headers: { 'Allow': 'GET' },
    };
  }

  const apiUrl = `https://api.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/70/18/&apiKey=${process.env.REACT_APP_N2YO_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      // If response is not ok, throw an error with the status
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        // Add CORS headers
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ message: error.message }),
      headers: {
        'Content-Type': 'application/json',
        // Add CORS headers
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
      },
    };
  }
};
