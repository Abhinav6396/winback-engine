import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  // Add your theme customizations here
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.800',
      },
    },
  },
  colors: {
    brand: {
      50: '#e6f7ff',
      100: '#b3e0ff',
      200: '#80c8ff',
      300: '#4daeff',
      400: '#1a94ff',
      500: '#007bff',
      600: '#0062cc',
      700: '#004a99',
      800: '#003166',
      900: '#001933',
    },
  },
});

export default theme;
