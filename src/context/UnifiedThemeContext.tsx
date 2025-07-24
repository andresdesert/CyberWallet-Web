// 🎨 CYBERWALLET UNIFIED THEME SYSTEM 2025-2026
// Sistema de temas unificado con design tokens OKLCH semánticos
// Optimizado para GitHub Pages production

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import type { Theme, PaletteMode } from '@mui/material/styles';
import { getActiveTokens, generateCSSVariables, type ColorTokens } from '@/theme/tokens/colorTokens';
import { convertSemanticTokensForMui } from '@/theme/utils/colorConverter';
import { withAlpha } from '@/theme/utils/alphaUtils';

// 🎯 Tipos del sistema
type ColorScheme = PaletteMode;
export type ThemeMode = 'light' | 'dark';

// 📐 8pt Grid System
const GRID_BASE = 8;
const spacing = (factor: number) => `${GRID_BASE * factor}px`;

// 🎯 Extensiones de tipos para MUI
declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      // Superficies
      bodyBackgroundPrimary: string;
      bodyBackgroundSecondary: string;
      glassBorder: string;
      neumoSurface: string;
      neumoLightShadow: string;
      neumoDarkShadow: string;
      
      // Colores base
      primary: string;
      secondary: string;
      accent: string;
      info: string;
      surface: string;
      
      // Textos
      textPrimary: string;
      textSecondary: string;
      textTertiary: string;
      textInverse: string;
      
      // Estados semánticos
      success: string;
      warning: string;
      error: string;
      
      // Bordes
      borderLight: string;
      borderDefault: string;
      borderStrong: string;
      borderInteractive: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      bodyBackgroundPrimary?: string;
      bodyBackgroundSecondary?: string;
      glassBorder?: string;
      neumoSurface?: string;
      neumoLightShadow?: string;
      neumoDarkShadow?: string;
      primary?: string;
      secondary?: string;
      accent?: string;
      info?: string;
      surface?: string;
      textPrimary?: string;
      textSecondary?: string;
      textTertiary?: string;
      textInverse?: string;
      success?: string;
      warning?: string;
      error?: string;
      borderLight?: string;
      borderDefault?: string;
      borderStrong?: string;
      borderInteractive?: string;
    };
  }
}

// 🎯 Context interface
interface UnifiedThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  mode: ThemeMode;
  toggleColorScheme: () => void;
  setMode: (mode: ThemeMode) => void;
  systemPrefersDark: boolean;
  semanticTokens: ColorTokens;
}

const UnifiedThemeContext = createContext<UnifiedThemeContextType | undefined>(undefined);

// 🎨 FUNCIÓN PRINCIPAL - CREAR TEMA PROFESIONAL
const createProfessionalTheme = (colorScheme: ColorScheme): Theme => {
  const isLight = colorScheme === 'light';
  
  // 🚀 Tokens semánticos OKLCH
  const oklchTokens = getActiveTokens(colorScheme === 'dark');
  const semanticTokens = convertSemanticTokensForMui(oklchTokens);

  const baseTheme = createTheme({
    palette: {
      mode: colorScheme,
      
      // 🎨 Colores primarios
      primary: {
        main: semanticTokens.text.brand,
        light: semanticTokens.border.interactive,
        dark: semanticTokens.text.brand,
        contrastText: semanticTokens.text.inverse,
      },

      secondary: {
        main: semanticTokens.border.interactive,
        light: semanticTokens.text.brand,
        dark: semanticTokens.text.brand,
        contrastText: semanticTokens.text.inverse,
      },

      // ✅ Estados semánticos
      success: {
        main: semanticTokens.financial.positive,
        light: withAlpha(semanticTokens.financial.positive, 0.1),
        dark: semanticTokens.financial.positive,
        contrastText: semanticTokens.text.inverse,
      },

      warning: {
        main: semanticTokens.financial.warning,
        light: withAlpha(semanticTokens.financial.warning, 0.1),
        dark: semanticTokens.financial.warning,
        contrastText: semanticTokens.text.inverse,
      },

      error: {
        main: semanticTokens.financial.negative,
        light: withAlpha(semanticTokens.financial.negative, 0.1),
        dark: semanticTokens.financial.negative,
        contrastText: semanticTokens.text.inverse,
      },

      info: {
        main: semanticTokens.financial.info,
        light: withAlpha(semanticTokens.financial.info, 0.1),
        dark: semanticTokens.financial.info,
        contrastText: semanticTokens.text.inverse,
      },

      // 🎨 Superficies
      background: {
        default: semanticTokens.surface.page,
        paper: semanticTokens.surface.primary,
      },

      // 📝 Textos
      text: {
        primary: semanticTokens.text.primary,
        secondary: semanticTokens.text.secondary,
        disabled: semanticTokens.text.tertiary,
      },

      divider: semanticTokens.border.subtle,

      // 🎨 Paleta personalizada
      custom: {
        // Superficies
        bodyBackgroundPrimary: semanticTokens.surface.page,
        bodyBackgroundSecondary: semanticTokens.surface.secondary,
        glassBorder: semanticTokens.border.subtle,
        neumoSurface: semanticTokens.surface.primary,
        neumoLightShadow: colorScheme === 'dark' ? 'rgb(31, 35, 40)' : 'rgb(255, 255, 255)',
        neumoDarkShadow: colorScheme === 'dark' ? 'rgb(13, 15, 17)' : 'rgb(200, 205, 220)',
        
        // Colores
        primary: semanticTokens.text.brand,
        secondary: semanticTokens.border.interactive,
        accent: semanticTokens.text.brand,
        info: semanticTokens.financial.info,
        surface: semanticTokens.surface.primary,
        
        // Textos
        textPrimary: semanticTokens.text.primary,
        textSecondary: semanticTokens.text.secondary,
        textTertiary: semanticTokens.text.tertiary,
        textInverse: semanticTokens.text.inverse,
        
        // Estados
        success: semanticTokens.financial.positive,
        warning: semanticTokens.financial.warning,
        error: semanticTokens.financial.negative,
        
        // Bordes
        borderLight: semanticTokens.border.subtle,
        borderDefault: semanticTokens.border.default,
        borderStrong: semanticTokens.border.strong,
        borderInteractive: semanticTokens.border.interactive,
      },
    },

    // 📝 Tipografía
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      
      h1: {
        fontSize: '2.5rem',
        lineHeight: 1.2,
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: '2rem',
        lineHeight: 1.3,
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontSize: '1.5rem',
        lineHeight: 1.4,
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.25rem',
        lineHeight: 1.4,
        fontWeight: 600,
      },
      h5: {
        fontSize: '1.125rem',
        lineHeight: 1.5,
        fontWeight: 500,
      },
      h6: {
        fontSize: '1rem',
        lineHeight: 1.5,
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.4,
      },
    },

    spacing: GRID_BASE,

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: colorScheme === 'dark' 
              ? `linear-gradient(135deg, 
                  rgb(20, 22, 28) 0%, 
                  rgb(15, 17, 22) 100%)`
              : `linear-gradient(135deg, 
                  rgb(248, 249, 252) 0%, 
                  rgb(240, 242, 248) 100%)`,
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '16px',
            lineHeight: 1.6,
            color: semanticTokens.text.primary,
            transition: 'all 0.2s ease-in-out',
            
            ...generateCSSVariables(oklchTokens),
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: semanticTokens.surface.primary,
            border: `1px solid ${semanticTokens.border.subtle}`,
            borderRadius: spacing(1.5),
            boxShadow: semanticTokens.shadow.md,
            transition: 'all 0.2s ease-in-out',
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: semanticTokens.surface.primary,
            border: `1px solid ${semanticTokens.border.subtle}`,
            borderRadius: spacing(2),
            boxShadow: semanticTokens.shadow.md,
            transition: 'all 0.2s ease-in-out',
            
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: semanticTokens.shadow.lg,
              border: `1px solid ${semanticTokens.border.interactive}`,
            },
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: spacing(1),
            padding: `${spacing(1.5)} ${spacing(3)}`,
            fontWeight: 500,
            textTransform: 'none',
            transition: 'all 0.2s ease-in-out',
            
            '&:hover': {
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
          contained: {
            backgroundColor: semanticTokens.text.brand,
            color: semanticTokens.text.inverse,
            boxShadow: semanticTokens.shadow.sm,
            
            '&:hover': {
              backgroundColor: semanticTokens.border.interactive,
              boxShadow: semanticTokens.shadow.md,
            },
          },
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: semanticTokens.surface.primary,
              borderRadius: spacing(1),
              
              '& fieldset': {
                borderColor: semanticTokens.border.default,
              },
              '&:hover fieldset': {
                borderColor: semanticTokens.border.interactive,
              },
              '&.Mui-focused fieldset': {
                borderColor: semanticTokens.text.brand,
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },

    shadows: [
      'none',
      semanticTokens.shadow.sm,
      semanticTokens.shadow.sm,
      semanticTokens.shadow.md,
      semanticTokens.shadow.md,
      semanticTokens.shadow.lg,
      semanticTokens.shadow.financial,
      ...Array(18).fill(semanticTokens.shadow.financial),
    ] as any,

    shape: {
      borderRadius: GRID_BASE,
    },

    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
  });

  return responsiveFontSizes(baseTheme);
};

// 🎯 Hook para usar el contexto del tema
export const useUnifiedTheme = (): UnifiedThemeContextType => {
  const context = useContext(UnifiedThemeContext);
  if (context === undefined) {
    throw new Error('useUnifiedTheme must be used within a UnifiedThemeProvider');
  }
  return context;
};

// 🎨 Provider del tema unificado
interface UnifiedThemeProviderProps {
  children: React.ReactNode;
  defaultColorScheme?: ColorScheme;
}

export const UnifiedThemeProvider: React.FC<UnifiedThemeProviderProps> = ({ 
  children, 
  defaultColorScheme = 'dark'
}) => {
  const [mode, setModeState] = useState<ThemeMode>('dark'); // 🌙 Dark by default
  
  // Determinar el color scheme actual
  const colorScheme: ColorScheme = mode;

  // 🔄 Toggle color scheme (solo entre light y dark)
  const toggleColorScheme = useCallback(() => {
    setModeState((prevMode) => {
      return prevMode === 'light' ? 'dark' : 'light';
    });
  }, []);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
  }, []);

  // 🎨 Memoización del tema
  const theme = useMemo(() => createProfessionalTheme(colorScheme), [colorScheme]);
  const semanticTokens = useMemo(() => getActiveTokens(colorScheme === 'dark'), [colorScheme]);

  // 💾 Persistencia
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
    if (savedMode) {
      setModeState(savedMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    
    // Aplicar clase CSS al body
    const body = document.body;
    body.className = body.className.replace(/\b(light|dark)\b/g, '');
    
    if (colorScheme === 'dark') {
      body.classList.add('dark');
      body.setAttribute('data-theme', 'dark');
    } else {
      body.classList.add('light');
      body.setAttribute('data-theme', 'light');
    }
  }, [mode, colorScheme]);

  const contextValue = useMemo(
    () => ({
      theme,
      colorScheme,
      mode,
      toggleColorScheme,
      setMode,
      systemPrefersDark: false, // No más detección automática
      semanticTokens,
    }),
    [theme, colorScheme, mode, toggleColorScheme, setMode, semanticTokens]
  );

  return (
    <UnifiedThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </UnifiedThemeContext.Provider>
  );
};

export default UnifiedThemeProvider;
