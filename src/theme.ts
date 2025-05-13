import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      50: '#E6F8FA',
      100: '#C2EDF1',
      200: '#9DE1E8',
      300: '#79D6DF',
      400: '#54CAD6',
      500: '#30BFCD',
      600: '#2699A4',
      700: '#1D737B',
      800: '#134C52',
      900: '#0A2629',
    },
    accent: {
      50: '#F2EAFD',
      100: '#DFD0FB',
      200: '#CBB5F9',
      300: '#B89AF7',
      400: '#A47FF5',
      500: '#9064F3',
      600: '#7450C2',
      700: '#573C92',
      800: '#3B2861',
      900: '#1D1431',
    },
  },
  fonts: {
    heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
        ghost: {
          color: 'gray.600',
          _hover: {
            bg: 'gray.100',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'lg',
          boxShadow: 'md',
          overflow: 'hidden',
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
});