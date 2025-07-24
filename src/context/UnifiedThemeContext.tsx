// 🎨 CYBERWALLET UNIFIED THEME SYSTEM 2025-2026
// Sistema de temas unificado con design tokens OKLCH semánticos
// Basado en principios de diseño visual y 12 leyes de UX/UI
// ✅ WCAG 2.2 AA/AAA compliance | Material Design 3 | 8pt Grid System

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import type { Theme, PaletteMode } from '@mui/material/styles';
import { getActiveTokens, generateCSSVariables, type ColorTokens } from '@/theme/tokens/colorTokens';
import { convertSemanticTokensForMui } from '@/theme/utils/colorConverter';
import { withAlpha } from '@/theme/utils/alphaUtils';

// 🎯 Tipos de sistema de colores
export type ColorScheme = PaletteMode;
export type ThemeMode = 'light' | 'dark' | 'auto';

// 📐 8pt Grid System - Google Material Design Standard
const GRID_BASE = 8;
const spacing = (factor: number) => `${GRID_BASE * factor}px`;

// 🎯 Extensiones de tipos para MUI con principios de diseño visual
declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      // 🎨 1. CONTRASTE - WCAG 2.2 AA/AAA ratios (4.5:1 / 7:1)
      bodyBackgroundPrimary: string;
      bodyBackgroundSecondary: string;
      glassBorder: string;
      neumoSurface: string;
      neumoLightShadow: string;
      neumoDarkShadow: string;
      
      // 🎨 2. COLOR - Sistema semántico funcional
      primary: string;
      secondary: string;
      accent: string;
      info: string;
      surface: string;
      
      // 📝 3. JERARQUÍA VISUAL - Tipografía con peso y tamaño
      textPrimary: string;
      textSecondary: string;
      textTertiary: string;
      textInverse: string;
      
      // 💰 4. COLOR SEMÁNTICO - Estados financieros críticos
      success: string;      // Verde = éxito, positivo
      warning: string;      // Ámbar = advertencia
      error: string;        // Rojo = error, negativo
      
      // 🔲 5. PROXIMIDAD - Bordes para agrupamiento visual
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

// 🎨 Context interface con principios UX
interface UnifiedThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  mode: 'light' | 'dark' | 'auto';
  toggleColorScheme: () => void;
  setMode: (mode: 'light' | 'dark' | 'auto') => void;
  systemPrefersDark: boolean;
  semanticTokens: ColorTokens;
}

const UnifiedThemeContext = createContext<UnifiedThemeContextType | undefined>(undefined);

// 🌟 GLASSMORPHISM EFFECT - Tendencia 2025 con blur y transparencia
const glassEffect = {
  medium: (colorScheme: PaletteMode) => ({
    background: colorScheme === 'dark' 
      ? 'rgba(13, 15, 17, 0.85)' 
      : 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(12px)',
    border: '1px solid',
    borderColor: colorScheme === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.1)',
  })
};

// 🎨 FUNCIÓN PRINCIPAL - CREAR TEMA PROFESIONAL 2025-2026
// Aplicando todos los principios de diseño visual
const createProfessionalTheme = (colorScheme: ColorScheme): Theme => {
  const isLight = colorScheme === 'light';
  
  // 🚀 Tokens semánticos OKLCH para máximo contraste WCAG AAA
  const oklchTokens = getActiveTokens(colorScheme === 'dark');
  
  // 🔧 CONVERTIR OKLCH A RGB PARA COMPATIBILIDAD CON MATERIAL-UI
  const semanticTokens = convertSemanticTokensForMui(oklchTokens);

  const baseTheme = createTheme({
    palette: {
      mode: colorScheme,
      
      // 🎨 1. CONTRASTE - Colores primarios con ratios WCAG 2.2
      primary: {
        main: semanticTokens.text.brand,           // 7:1 contrast ratio
        light: semanticTokens.border.interactive,
        dark: semanticTokens.text.brand,
        contrastText: semanticTokens.text.inverse, // Máximo contraste
      },

      // 🌿 2. COLOR - Secundarios complementarios
      secondary: {
        main: semanticTokens.border.interactive,
        light: semanticTokens.text.brand,
        dark: semanticTokens.text.brand,
        contrastText: semanticTokens.text.inverse,
      },

      // ✅ 3. COLOR SEMÁNTICO - Estados con significado universal
      success: {
        main: semanticTokens.financial.positive,    // Verde = éxito
        light: withAlpha(semanticTokens.financial.positive, 0.1),
        dark: semanticTokens.financial.positive,
        contrastText: semanticTokens.text.inverse,
      },

      warning: {
        main: semanticTokens.financial.warning,     // Ámbar = precaución  
        light: withAlpha(semanticTokens.financial.warning, 0.1),
        dark: semanticTokens.financial.warning,
        contrastText: semanticTokens.text.inverse,
      },

      error: {
        main: semanticTokens.financial.negative,    // Rojo = error/pérdida
        light: withAlpha(semanticTokens.financial.negative, 0.1),
        dark: semanticTokens.financial.negative,
        contrastText: semanticTokens.text.inverse,
      },

      info: {
        main: semanticTokens.financial.info,        // Azul = información
        light: withAlpha(semanticTokens.financial.info, 0.1),
        dark: semanticTokens.financial.info,
        contrastText: semanticTokens.text.inverse,
      },

      // 🎨 4. ESPACIADO Y ALINEACIÓN - Superficies con jerarquía
      background: {
        default: semanticTokens.surface.page,       // Fondo principal
        paper: semanticTokens.surface.primary,      // Cards y modales
      },

      // 📝 5. JERARQUÍA VISUAL - Tipografía con contraste escalonado
      text: {
        primary: semanticTokens.text.primary,       // Títulos principales
        secondary: semanticTokens.text.secondary,   // Subtítulos  
        disabled: semanticTokens.text.tertiary,     // Texto auxiliar
      },

      // 🔲 6. PROXIMIDAD - Divisores para agrupamiento
      divider: semanticTokens.border.subtle,

      // 🎨 Paleta personalizada con todos los principios aplicados
      custom: {
        // CONTRASTE Y SUPERFICIES
        bodyBackgroundPrimary: semanticTokens.surface.page,
        bodyBackgroundSecondary: semanticTokens.surface.secondary,
        glassBorder: semanticTokens.border.subtle,
        neumoSurface: semanticTokens.surface.primary,
        neumoLightShadow: colorScheme === 'dark' ? 'rgb(31, 35, 40)' : 'rgb(255, 255, 255)',
        neumoDarkShadow: colorScheme === 'dark' ? 'rgb(13, 15, 17)' : 'rgb(200, 205, 220)',
        
        // COLOR FUNCIONAL
        primary: semanticTokens.text.brand,
        secondary: semanticTokens.border.interactive,
        accent: semanticTokens.text.brand,
        info: semanticTokens.financial.info,
        surface: semanticTokens.surface.primary,
        
        // JERARQUÍA TEXTUAL
        textPrimary: semanticTokens.text.primary,
        textSecondary: semanticTokens.text.secondary,
        textTertiary: semanticTokens.text.tertiary,
        textInverse: semanticTokens.text.inverse,
        
        // COLOR SEMÁNTICO FINANCIERO
        success: semanticTokens.financial.positive,
        warning: semanticTokens.financial.warning,
        error: semanticTokens.financial.negative,
        
        // PROXIMIDAD Y AGRUPAMIENTO
        borderLight: semanticTokens.border.subtle,
        borderDefault: semanticTokens.border.default,
        borderStrong: semanticTokens.border.strong,
        borderInteractive: semanticTokens.border.interactive,
      },
    },

    // 📝 7. TIPOGRAFÍA - Escala modular basada en principios de legibilidad
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif', // Fuente optimizada para fintech
      
      // Pesos tipográficos profesionales
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      
      // Escala tipográfica basada en proporción áurea (1.618)
      h1: {
        fontSize: '2.5rem',      // 40px - Títulos principales
        lineHeight: 1.2,
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: '2rem',        // 32px - Subtítulos importantes
        lineHeight: 1.3,
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontSize: '1.5rem',      // 24px - Secciones
        lineHeight: 1.4,
        fontWeight: 600,
      },
      h4: {
        fontSize: '1.25rem',     // 20px - Subsecciones
        lineHeight: 1.4,
        fontWeight: 600,
      },
      h5: {
        fontSize: '1.125rem',    // 18px - Elementos destacados
        lineHeight: 1.5,
        fontWeight: 500,
      },
      h6: {
        fontSize: '1rem',        // 16px - Títulos menores
        lineHeight: 1.5,
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem',        // 16px - Texto principal
        lineHeight: 1.6,         // Legibilidad óptima
      },
      body2: {
        fontSize: '0.875rem',    // 14px - Texto secundario
        lineHeight: 1.5,
      },
      caption: {
        fontSize: '0.75rem',     // 12px - Etiquetas y notas
        lineHeight: 1.4,
      },
    },

    // 🎨 8. ESPACIADO - 8pt Grid System (estándar Google)
    spacing: GRID_BASE,

    // 🎯 9. CONSISTENCIA VISUAL - Componentes estandarizados
    components: {
      // BASELINE CSS - Configuración global del body
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            // 🌟 BACKGROUND GRADIENT - Usando RGB en lugar de OKLCH para compatibilidad
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
            fontSize: '16px',        // Base 16px para accesibilidad
            lineHeight: 1.6,         // Altura de línea óptima
            color: semanticTokens.text.primary,
            transition: 'all 0.2s ease-in-out', // Microinteracciones suaves
            
            // 🎯 INYECCIÓN DE VARIABLES CSS GLOBALES
            ...generateCSSVariables(oklchTokens),
          },
        },
      },

      // PAPER - Superficies con elevación
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: semanticTokens.surface.primary,
            border: `1px solid ${semanticTokens.border.subtle}`,
            borderRadius: spacing(1.5),    // 12px - Radio suave
            boxShadow: semanticTokens.shadow.md,
            transition: 'all 0.2s ease-in-out',
          },
        },
      },

      // CARDS - Contenedores principales con feedback visual
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: semanticTokens.surface.primary,
            border: `1px solid ${semanticTokens.border.subtle}`,
            borderRadius: spacing(2),      // 16px - Modernidad
            boxShadow: semanticTokens.shadow.md,
            transition: 'all 0.2s ease-in-out',
            
            // 🎯 FEEDBACK VISUAL - Hover states
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: semanticTokens.shadow.lg,
              border: `1px solid ${semanticTokens.border.interactive}`,
            },
          },
        },
      },

      // BUTTONS - CTAs con microinteracciones
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: spacing(1),      // 8px - Consistencia
            padding: `${spacing(1.5)} ${spacing(3)}`, // 12px 24px
            fontWeight: 500,
            textTransform: 'none',         // Legibilidad natural
            transition: 'all 0.2s ease-in-out',
            
            // 🎯 MOTION - Microinteracciones suaves
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

      // INPUT FIELDS - Estados claros y accesibles
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

    // 🎨 10. SOMBRAS - Elevación con jerarquía visual
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

    // 🎯 11. FORMA - Border radius consistente
    shape: {
      borderRadius: GRID_BASE,       // 8px base
    },

    // ⚡ 12. MOTION - Transiciones naturales y predecibles  
    transitions: {
      duration: {
        shortest: 150,    // Micro-feedback
        shorter: 200,     // Hover states
        short: 250,       // Componentes pequeños
        standard: 300,    // Componentes medianos
        complex: 375,     // Componentes complejos
        enteringScreen: 225,
        leavingScreen: 195,
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',  // Natural
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',    // Salida suave
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',       // Entrada suave
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',      // Decisivo
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

// 🎨 Provider del tema unificado con todos los principios aplicados
interface UnifiedThemeProviderProps {
  children: React.ReactNode;
  defaultColorScheme?: ColorScheme;
}

export const UnifiedThemeProvider: React.FC<UnifiedThemeProviderProps> = ({ 
  children, 
  defaultColorScheme = 'light' 
}) => {
  // 🎯 PREFERENCIAS DEL USUARIO - Respeta configuración del sistema
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setModeState] = useState<'light' | 'dark' | 'auto'>('auto');
  
  // Determinar el color scheme actual basado en el mode
  const colorScheme: ColorScheme = useMemo(() => {
    if (mode === 'auto') {
      return prefersDarkMode ? 'dark' : 'light';
    }
    return mode;
  }, [mode, prefersDarkMode]);

  // 🔄 FEEDBACK VISUAL - Cambio de tema suave
  const toggleColorScheme = useCallback(() => {
    setModeState((prevMode) => {
      if (prevMode === 'light') return 'dark';
      if (prevMode === 'dark') return 'auto';
      return 'light'; // auto -> light
    });
  }, []);

  const setMode = useCallback((newMode: 'light' | 'dark' | 'auto') => {
    setModeState(newMode);
  }, []);

  // 🎨 MEMOIZACIÓN - Performance optimizada
  const theme = useMemo(() => createProfessionalTheme(colorScheme), [colorScheme]);
  const semanticTokens = useMemo(() => getActiveTokens(colorScheme === 'dark'), [colorScheme]);

  // 💾 PERSISTENCIA - Recordar preferencia del usuario
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | 'auto' | null;
    if (savedMode) {
      setModeState(savedMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    
    // 🚨 TÉCNICA RADICAL: Forzar clase CSS en body para dark mode
    const body = document.body;
    body.className = body.className.replace(/\b(light|dark)\b/g, ''); // Limpiar clases previas
    
    if (colorScheme === 'dark') {
      body.classList.add('dark');
      body.setAttribute('data-theme', 'dark');
    } else {
      body.classList.add('light');
      body.setAttribute('data-theme', 'light');
    }
    
    console.log('🚨 RADICAL FIX - Body classes:', body.className);
    console.log('🚨 RADICAL FIX - Color scheme:', colorScheme);
  }, [mode, colorScheme]);

  const contextValue = useMemo(
    () => ({
      theme,
      colorScheme,
      mode,
      toggleColorScheme,
      setMode,
      systemPrefersDark: prefersDarkMode,
      semanticTokens,
    }),
    [theme, colorScheme, mode, toggleColorScheme, setMode, prefersDarkMode, semanticTokens]
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