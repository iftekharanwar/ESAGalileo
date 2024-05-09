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

  useEffect(() => {
    // Function to fetch real-time ESA satellite data
    const fetchESASatelliteData = async () => {
      try {
        // Placeholder for the actual API call
        // The URL and parameters will need to be updated with the correct API endpoint and query parameters
        const response = await axios.get('API_ENDPOINT_FOR_ESA_SATELLITE_DATA');
        setSatellites(response.data); // Update the state with the fetched satellite data
      } catch (error) {
        console.error('Error fetching ESA satellite data:', error);
      }
    };

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
