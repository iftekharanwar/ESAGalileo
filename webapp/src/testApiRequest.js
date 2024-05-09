require('dotenv').config();
const axios = require('axios');

const requestBody = {
  input: {
    bounds: {
      properties: {
        crs: "http://www.opengis.net/def/crs/EPSG/0/4326"
      },
      bbox: [14.0, 45.0, 15.0, 46.0] // Example bounding box coordinates
    },
    data: [{
      type: 'S2L1C',
      // Additional parameters like time range can be specified here
    }]
  },
  output: {
    width: 552, // Adjusted width to comply with resolution limit
    height: 548, // Adjusted height to comply with resolution limit
    responses: [
      {
        identifier: "default",
        format: {
          type: "image/png"
        }
      }
    ]
  },
  evalscript: `//VERSION=3
  function setup() {
    return {
      input: ["B02", "B03", "B04"],
      output: { bands: 3 }
    };
  }
  function evaluatePixel(sample) {
    return [sample.B04, sample.B03, sample.B02];
  }`
};

axios.post('https://services.sentinel-hub.com/api/v1/process', requestBody, {
  headers: {
    'Accept': 'application/json', // Adjusted to a supported MIME type
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_SENTINEL_HUB_API_KEY}`
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Error data:', error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Error request:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error message:', error.message);
  }
  console.error('Error config:', error.config);
});
