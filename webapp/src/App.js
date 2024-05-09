import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import SatelliteOverview from './components/SatelliteOverview';

function App() {
  return (
    <ThemeProvider>
      <SatelliteOverview />
    </ThemeProvider>
  );
}

export default App;
