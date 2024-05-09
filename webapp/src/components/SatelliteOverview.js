import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SatelliteOverview = () => {
  const [satelliteData, setSatelliteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  const fetchSatelliteData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Updated the API endpoint to use the proxy
      const response = await fetch(`/api/rest/v1/satellite/above/41.702/-76.014/0/70/18/`);
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Satellite Data Over Time',
      },
    },
  };

  // Ensure satelliteData and satelliteData.above are defined before mapping
  const labels = satelliteData && satelliteData.above ? satelliteData.above.map(sat => sat.satname) : [];

  const data = {
    labels,
    datasets: [
      {
        label: 'Satellite Altitude (km)',
        data: labels.map(label => {
          const satellite = satelliteData && satelliteData.above ? satelliteData.above.find(sat => sat.satname === label) : null;
          return satellite ? satellite.satalt : null;
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

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
          <Text>Data loaded successfully!</Text>
          <Line options={options} data={data} />
        </Box>
      )}
    </VStack>
  );
};

export default SatelliteOverview;
