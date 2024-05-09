import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import SatelliteOverview from './components/SatelliteOverview';
import SatelliteMap from './components/SatelliteMap';

function App() {
  return (
    <ThemeProvider>
      <SatelliteOverview />
      <SatelliteMap />
    </ThemeProvider>
  );
}

export default App;
