import { ChakraProvider, extendTheme } from '@chakra-ui/react';
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

const theme = extendTheme({ config });

export const ThemeProvider = ({ children }) => (
  <ChakraProvider theme={theme}>
    {children}
  </ChakraProvider>
);
