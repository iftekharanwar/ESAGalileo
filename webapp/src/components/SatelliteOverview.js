import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Spinner,
  useToast,
} from '@chakra-ui/react';

const SatelliteOverview = () => {
  const [satelliteData, setSatelliteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  const fetchSatelliteData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/70/18/&apiKey=L56653-TSD4L8-2DTEDS-595E`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSatelliteData(data);
    } catch (error) {
      setError(error.message);
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchSatelliteData();
  }, [fetchSatelliteData]);

  return (
    <VStack spacing={4} align="stretch">
      {loading && (
        <HStack justify="center">
          <Spinner />
          <Text>Loading satellite data...</Text>
        </HStack>
      )}
      {error && (
        <Box>
          <Text color="red.500">Error: {error}</Text>
        </Box>
      )}
      {satelliteData && (
        <Box>
          {/* Satellite data visualization will go here */}
          <Text>Data loaded successfully!</Text>
          {/* Example visualization: List of satellites */}
          <VStack align="stretch" spacing={3}>
            {satelliteData.above.map(satellite => (
              <Box key={satellite.satid} p={5} shadow="md" borderWidth="1px">
                <Text fontWeight="bold">{satellite.satname}</Text>
                <Text>Latitude: {satellite.satlat}</Text>
                <Text>Longitude: {satellite.satlng}</Text>
                <Text>Altitude: {satellite.satalt} km</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </VStack>
  );
};

export default SatelliteOverview;
