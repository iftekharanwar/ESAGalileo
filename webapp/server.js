import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the React app
// Replace __dirname with a path derived from import.meta.url for ES Modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'build')));

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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
