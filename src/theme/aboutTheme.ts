// src/theme/aboutTheme.ts
import { createTheme } from '@mui/material/styles';

const createAboutTheme = (prefersDarkMode: boolean) => createTheme({
    palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
        background: {
            default: prefersDarkMode ? '#0e0e10' : '#f5f5f5',
            paper: prefersDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.9)',
        },
        primary: {
            main: '#4C91F0',
        },
        secondary: {
            main: '#F04C85',
        },
        text: {
            primary: prefersDarkMode ? '#ffffff' : '#333333',
            secondary: prefersDarkMode ? '#b3b3b3' : '#666666',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: prefersDarkMode 
                        ? 'radial-gradient(circle at top left, #1a1a1d, #0e0e10)'
                        : 'radial-gradient(circle at top left, #f8f9fa, #f5f5f5)',
                },
            },
        },
    },
    typography: {
        fontFamily: "'Inter', sans-serif",
        fontWeightRegular: 400,
        fontWeightBold: 700,
    },
});

export default createAboutTheme;
