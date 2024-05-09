import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3001;

// Proxy endpoint for fetching satellite data from n2yo
app.get('/satellite-data', async (req, res) => {
  const apiUrl = `https://api.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/70/18/&apiKey=${process.env.REACT_APP_N2YO_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching satellite data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
