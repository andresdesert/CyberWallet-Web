import { createTheme, alpha } from '@mui/material/styles';

// Definir los colores base
const baseColors = {
  dark: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#1A1A2E',
    surface: '#2C2C3E',
    text: '#E0E0E0',
  },
  light: {
    primary: '#0056B3',
    secondary: '#8A2BE2',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#2C2C3E',
  },
};

// Crear el tema personalizado
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: baseColors.dark.primary,
      light: alpha(baseColors.dark.primary, 0.8),
      dark: alpha(baseColors.dark.primary, 1.2),
    },
    secondary: {
      main: baseColors.dark.secondary,
      light: alpha(baseColors.dark.secondary, 0.8),
      dark: alpha(baseColors.dark.secondary, 1.2),
    },
    background: {
      default: baseColors.dark.background,
      paper: baseColors.dark.surface,
    },
    text: {
      primary: baseColors.dark.text,
      secondary: alpha(baseColors.dark.text, 0.7),
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
      fontSize: '3rem',
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
      fontSize: '2rem',
      letterSpacing: '0em',
    },
    h4: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '0.00735em',
    },
    body1: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '1rem',
      letterSpacing: '0.00938em',
      lineHeight: 1.75,
    },
    body2: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '0.875rem',
      letterSpacing: '0.01071em',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: `0 8px 16px ${alpha(baseColors.dark.primary, 0.2)}`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
