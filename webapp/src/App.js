import React from 'react';
import { ThemeProvider } from './ThemeProvider.js'; // Added .js extension
import SatelliteOverview from './components/SatelliteOverview.js';
import SatelliteMap from './components/SatelliteMap.js';
import AboutESA from './components/AboutESA.js'; // New import for the About ESA component
import { Box, Flex, Link, Text } from '@chakra-ui/react';

function App() {
  return (
    <ThemeProvider>
      <Flex direction="column" minHeight="100vh">
        <Box as="header" bg="gray.800" color="white" py={4}>
          <Flex align="center" justify="center" direction="column">
            <Text fontSize="xl" fontWeight="bold">Galileo Satellite Tracker</Text>
            <Flex mt={2}>
              <Link href="#overview" px={3}>Overview</Link>
              <Link href="#map" px={3}>Map</Link>
              <Link href="#about" px={3}>About ESA</Link>
            </Flex>
          </Flex>
        </Box>
        <Box as="main" flex="1" bg="gray.700" color="white" p={5}>
          <Box id="overview">
            <SatelliteOverview />
          </Box>
          <Box id="map" mt={10}>
            <SatelliteMap />
          </Box>
          <Box id="about" mt={10}>
            <AboutESA /> {/* New component instance for the About ESA section */}
          </Box>
        </Box>
        <Box as="footer" bg="gray.800" color="white" py={3}>
          <Flex align="center" justify="center">
            <Text fontSize="sm">© 2024 Galileo Satellite Tracker. All rights reserved.</Text>
          </Flex>
        </Box>
      </Flex>
    </ThemeProvider>
  );
}

export default App;
