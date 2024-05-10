import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

import 'leaflet/dist/leaflet.css';
import satelliteIconUrl from '../assets/satellite-icon.png';

// Custom icon for the satellite markers
const satelliteIcon = new L.Icon({
  iconUrl: satelliteIconUrl,
  iconSize: [35, 35],
  iconAnchor: [17, 17],
  popupAnchor: [0, -17],
});

const ESASatelliteMap = () => {
  const [satellites, setSatellites] = useState([]);

  // Function to fetch real-time ESA satellite data
  const fetchESASatelliteData = async () => {
    try {
      // Construct the POST request body with the necessary structure for the input, output, and evalscript
      const requestBody = {
        input: {
          bounds: {
            bbox: [ // Define the area of interest with a bounding box (west, south, east, north)
              -180, // west longitude
              -90,  // south latitude
              180,  // east longitude
              90    // north latitude
            ]
          },
          data: [
            {
              type: 'S2L1C', // Example satellite data type, this will need to be specific to the ESA satellite data
              // Additional parameters like time range can be specified here
            },
          ],
        },
        output: {
          width: 512,  // Example output width in pixels
          height: 512, // Example output height in pixels
          // Specify the output format here, e.g., JPEG, TIFF, etc.
        },
        evalscript: `//VERSION=3
function setup() {
  return {
    input: ["B02", "B03", "B04"],
    output: { bands: 3 }
  };
}

function evaluatePixel(sample) {
  return [2.5 * sample.B04, 2.5 * sample.B03, 2.5 * sample.B02];
}`
      };

      // The URL will need to be updated with the correct API endpoint
      const response = await axios.post('https://services.sentinel-hub.com/api/v1/process', requestBody, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SENTINEL_HUB_API_KEY}` // Use the environment variable for the API key
        }
      });
      setSatellites(response.data); // Update the state with the fetched satellite data
    } catch (error) {
      console.error('Error fetching ESA satellite data:', error);
    }
  };

  useEffect(() => {
    fetchESASatelliteData();
    // Set an interval to fetch the satellite data every minute
    const intervalId = setInterval(fetchESASatelliteData, 60000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={3} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {satellites.map((satellite) => (
        <Marker
          key={satellite.id}
          position={[satellite.latitude, satellite.longitude]}
          icon={satelliteIcon}
        >
          <Popup>
            {satellite.name} <br /> Altitude: {satellite.altitude} km
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ESASatelliteMap;
