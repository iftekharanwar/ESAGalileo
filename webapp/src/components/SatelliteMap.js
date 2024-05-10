import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const SatelliteMap = () => {
  // Default position set to Europe's geographical center
  const [mapCenter] = useState({ lat: 50.1109, lng: 10.1506 });
  const [zoomLevel] = useState(3);
  const [satellites, setSatellites] = useState([]);

  // Custom icon for satellite markers
  const satelliteIcon = new L.Icon({
    iconUrl: require('../assets/satellite-icon.png'),
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -10]
  });

  // Function to fetch satellite data from the N2YO API
  const fetchSatelliteData = async () => {
    try {
      const response = await fetch(`https://api.n2yo.com/rest/v1/satellite/above/${mapCenter.lat}/${mapCenter.lng}/0/90/&apiKey=${process.env.REACT_APP_N2YO_API_KEY}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSatellites(data.above);
    } catch (error) {
      console.error("Failed to fetch satellite data:", error);
    }
  };

  // Fetch satellite data on component mount and set an interval to update satellite positions every minute
  useEffect(() => {
    fetchSatelliteData();
    const interval = setInterval(fetchSatelliteData, 60000);
    return () => clearInterval(interval);
  }, [fetchSatelliteData]);

  return (
    <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {satellites.map(satellite => (
        <Marker
          key={satellite.satid}
          position={[satellite.satlat, satellite.satlng]}
          icon={satelliteIcon}
        >
          <Popup>
            {satellite.satname} <br /> Altitude: {satellite.satalt} km
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default SatelliteMap;
