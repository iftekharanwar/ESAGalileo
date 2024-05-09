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
      // Directly append the API key as a query parameter in the fetch request
      const apiKey = process.env.REACT_APP_N2YO_API_KEY;
      const response = await fetch(`/api/rest/v1/satellite/above/41.702/-76.014/0/70/18/?apiKey=${apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSatelliteData(data);
      console.log('Satellite data fetched:', data); // Added console log to track fetched data
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

  // Log the REACT_APP_N2YO_API_KEY to verify it is being loaded correctly
  console.log('REACT_APP_N2YO_API_KEY:', process.env.REACT_APP_N2YO_API_KEY);

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
  console.log('Labels for graph:', labels); // Added console log to track labels

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
  console.log('Data for graph:', data); // Added console log to track graph data

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
