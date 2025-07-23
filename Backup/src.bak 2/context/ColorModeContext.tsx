// src/context/ColorModeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import getTheme from '@/components/theme/theme';

export type ModeType = 'light' | 'comfort' | 'dark';

interface ColorModeContextProps {
  toggleColorMode: () => void;
  setMode: (mode: ModeType) => void;
  mode: ModeType;
}

const ColorModeContext = createContext<ColorModeContextProps | undefined>(undefined);

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
};

const getInitialMode = (): ModeType => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('colorMode');
    if (saved && ['light', 'comfort', 'dark'].includes(saved)) {
      return saved as ModeType;
    }
  }
  return 'light';
};

interface ColorModeProviderProps {
  children: ReactNode;
}

const ColorModeProvider: React.FC<ColorModeProviderProps> = ({ children }) => {
  const [mode, setModeState] = useState<ModeType>(getInitialMode);

  useEffect(() => {
    localStorage.setItem('colorMode', mode);
  }, [mode]);

  const toggleColorMode = () => {
    setModeState((prevMode) => {
      switch (prevMode) {
        case 'light':
          return 'comfort';
        case 'comfort':
          return 'dark';
        case 'dark':
          return 'light';
        default:
          return 'light';
      }
    });
  };

  const setMode = (newMode: ModeType) => {
    setModeState(newMode);
  };

  // Crear el tema con el modo correcto
  const theme = getTheme(mode === 'dark' ? 'dark' : 'light', { comfort: mode === 'comfort' });

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, setMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;