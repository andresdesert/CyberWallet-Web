// 🎨 CLEAN VERSION OF UNIFIED THEME CONTEXT
// Versión simplificada sin dependencias complejas para desarrollo

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import type { PaletteMode } from '@mui/material/styles';

// 🎯 Tipos básicos
export type ColorScheme = PaletteMode;
export type ThemeMode = 'light' | 'dark';

// 🎯 Interface del contexto
interface UnifiedThemeContextType {
  colorScheme: ColorScheme;
  themeMode: ThemeMode;
  toggleColorScheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

// 🎯 Contexto
const UnifiedThemeContext = createContext<UnifiedThemeContextType | undefined>(undefined);

// 🎯 Hook personalizado
export const useUnifiedTheme = (): UnifiedThemeContextType => {
  const context = useContext(UnifiedThemeContext);
  if (!context) {
    throw new Error('useUnifiedTheme must be used within UnifiedThemeProvider');
  }
  return context;
};

// 🎯 Provider simplificado
export const UnifiedThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  
  // Calcular scheme actual (siempre el modo seleccionado)
  const colorScheme: ColorScheme = themeMode;

  // Toggle simple entre light y dark
  const toggleColorScheme = useCallback(() => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // Tema MUI con colores violeta preservados
  const muiTheme = useMemo(() => createTheme({
    palette: {
      mode: colorScheme,
      primary: {
        main: colorScheme === 'dark' ? '#8B45BF' : '#6366f1', // Violeta preservado
      },
      secondary: {
        main: colorScheme === 'dark' ? '#A855F7' : '#d97706', // Violeta claro / Naranja
      },
    },
    typography: {
      fontFamily: ['Inter', 'system-ui', '-apple-system', 'sans-serif'].join(','),
    },
    shape: {
      borderRadius: 12,
    },
  }), [colorScheme]);

  const contextValue: UnifiedThemeContextType = {
    colorScheme,
    themeMode,
    toggleColorScheme,
    setThemeMode,
  };

  return (
    <UnifiedThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </UnifiedThemeContext.Provider>
  );
};

export default UnifiedThemeProvider;
