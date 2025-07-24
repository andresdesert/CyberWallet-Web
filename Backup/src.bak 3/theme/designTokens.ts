// src/theme/designTokens.ts
// 🎨 Design Tokens - Sistema de diseño moderno 2025

// 🌈 Paleta de colores científicamente optimizada
const colors = {
  light: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    neutral: {
      0: '#ffffff',
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    // 🎯 Colores semánticos
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#94a3b8',
      inverse: '#f8fafc',
      disabled: '#cbd5e1',
    },
    surfaces: {
      background: '#ffffff',
      paper: '#f8fafc',
      elevated: '#ffffff',
      variant: '#f1f5f9',
    },
    border: {
      light: 'rgba(203, 213, 225, 0.3)',
      default: '#e2e8f0',
      strong: '#cbd5e1',
      interactive: '#0ea5e9',
    },
    accent: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    semantic: {
      error: {
        main: '#ef4444',
        light: '#f87171',
        dark: '#dc2626',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706',
        contrastText: '#ffffff',
      },
      info: {
        main: '#0ea5e9',
        light: '#38bdf8',
        dark: '#0284c7',
        contrastText: '#ffffff',
      },
      success: {
        main: '#22c55e',
        light: '#4ade80',
        dark: '#16a34a',
        contrastText: '#ffffff',
      },
    },
  },
  dark: {
    primary: {
      50: '#082f49',
      100: '#0c4a6e',
      200: '#075985',
      300: '#0369a1',
      400: '#0284c7',
      500: '#0ea5e9',
      600: '#38bdf8',
      700: '#7dd3fc',
      800: '#bae6fd',
      900: '#e0f2fe',
      950: '#f0f9ff',
    },
    secondary: {
      50: '#3b0764',
      100: '#581c87',
      200: '#6b21a8',
      300: '#7c3aed',
      400: '#9333ea',
      500: '#a855f7',
      600: '#c084fc',
      700: '#d8b4fe',
      800: '#e9d5ff',
      900: '#f3e8ff',
      950: '#faf5ff',
    },
    success: {
      50: '#052e16',
      100: '#14532d',
      200: '#166534',
      300: '#15803d',
      400: '#16a34a',
      500: '#22c55e',
      600: '#4ade80',
      700: '#86efac',
      800: '#bbf7d0',
      900: '#dcfce7',
      950: '#f0fdf4',
    },
    error: {
      50: '#450a0a',
      100: '#7f1d1d',
      200: '#991b1b',
      300: '#b91c1c',
      400: '#dc2626',
      500: '#ef4444',
      600: '#f87171',
      700: '#fca5a5',
      800: '#fecaca',
      900: '#fee2e2',
      950: '#fef2f2',
    },
    warning: {
      50: '#451a03',
      100: '#78350f',
      200: '#92400e',
      300: '#b45309',
      400: '#d97706',
      500: '#f59e0b',
      600: '#fbbf24',
      700: '#fcd34d',
      800: '#fde68a',
      900: '#fef3c7',
      950: '#fffbeb',
    },
    neutral: {
      0: '#000000',
      50: '#020617',
      100: '#0f172a',
      200: '#1e293b',
      300: '#334155',
      400: '#475569',
      500: '#64748b',
      600: '#94a3b8',
      700: '#cbd5e1',
      800: '#e2e8f0',
      900: '#f1f5f9',
      950: '#f8fafc',
    },
    // 🎯 Colores semánticos
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      tertiary: '#94a3b8',
      inverse: '#0f172a',
      disabled: '#475569',
    },
    surfaces: {
      background: '#020617',
      paper: '#0f172a',
      elevated: '#1e293b',
      variant: '#334155',
    },
    border: {
      light: 'rgba(255, 255, 255, 0.1)',
      default: '#334155',
      strong: '#475569',
      interactive: '#38bdf8',
    },
    accent: {
      50: '#082f49',
      100: '#0c4a6e',
      200: '#075985',
      300: '#0369a1',
      400: '#0284c7',
      500: '#0ea5e9',
      600: '#38bdf8',
      700: '#7dd3fc',
      800: '#bae6fd',
      900: '#e0f2fe',
      950: '#f0f9ff',
    },
    semantic: {
      error: {
        main: '#ef4444',
        light: '#f87171',
        dark: '#dc2626',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706',
        contrastText: '#ffffff',
      },
      info: {
        main: '#0ea5e9',
        light: '#38bdf8',
        dark: '#0284c7',
        contrastText: '#ffffff',
      },
      success: {
        main: '#22c55e',
        light: '#4ade80',
        dark: '#16a34a',
        contrastText: '#ffffff',
      },
    },
  },
};

// 📝 Tipografía
const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
  },
  families: {
    display: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    primary: 'Inter, system-ui, sans-serif',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  scale: {
    xs: { fontSize: '0.75rem', lineHeight: 1.5 },
    sm: { fontSize: '0.875rem', lineHeight: 1.5 },
    base: { fontSize: '1rem', lineHeight: 1.6 },
    lg: { fontSize: '1.125rem', lineHeight: 1.6 },
    xl: { fontSize: '1.25rem', lineHeight: 1.5 },
    '2xl': { fontSize: '1.5rem', lineHeight: 1.4 },
    '3xl': { fontSize: '1.875rem', lineHeight: 1.3 },
    '4xl': { fontSize: '2.25rem', lineHeight: 1.2 },
  },
};

// 📏 Espaciado
const spacing = {
  0: '0',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
} as const;

// 🔘 Border radius
const radius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

// 📱 Breakpoints
const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
};

// ⚡ Transiciones
const transitions = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
  },
  easing: {
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// 🌑 Sombras
const shadows = {
  light: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    floating: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    glow: '0 0 15px rgba(14, 165, 233, 0.3)',
  },
  dark: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
    floating: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
    glow: '0 0 15px rgba(56, 189, 248, 0.4)',
  },
};

// ✨ Efectos
const effects = {
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  gradient: {
    surface: {
      light: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
      dark: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))',
    },
    mesh: {
      light: 'radial-gradient(at 40% 20%, rgb(14, 165, 233) 0px, transparent 50%), radial-gradient(at 80% 0%, rgb(168, 85, 247) 0px, transparent 50%)',
      dark: 'radial-gradient(at 40% 20%, rgb(56, 189, 248) 0px, transparent 50%), radial-gradient(at 80% 0%, rgb(192, 132, 252) 0px, transparent 50%)',
    },
    primary: {
      light: 'linear-gradient(135deg, rgb(14, 165, 233), rgb(168, 85, 247))',
      dark: 'linear-gradient(135deg, rgb(56, 189, 248), rgb(192, 132, 252))',
    },
  },
  glass: {
    light: {
      subtle: {
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px) saturate(150%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
      medium: {
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
      },
      strong: {
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(28px) saturate(200%)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15)',
      },
    },
    dark: {
      subtle: {
        background: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(20px) saturate(150%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      medium: {
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
      },
      strong: {
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(28px) saturate(200%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)',
      },
    },
  },
};

// 🎯 Design Tokens principales
export const DESIGN_TOKENS = {
  colors,
  typography,
  spacing,
  radius,
  effects,
  breakpoints,
  transitions,
  shadows,
};

// 🛠️ Utilidades
export const getGradient = {
  surface: (mode: 'light' | 'dark') => DESIGN_TOKENS.effects.gradient.surface[mode],
  mesh: (mode: 'light' | 'dark') => DESIGN_TOKENS.effects.gradient.mesh[mode],
};

export const getGlass = {
  subtle: (mode: 'light' | 'dark') => DESIGN_TOKENS.effects.glass[mode].subtle,
  medium: (mode: 'light' | 'dark') => DESIGN_TOKENS.effects.glass[mode].medium,
  strong: (mode: 'light' | 'dark') => DESIGN_TOKENS.effects.glass[mode].strong,
};

// 🎨 Utilidades de color legacy (para compatibilidad)
export const colorUtils = {
  alpha: (color: string, alpha: number) => `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`,
  lighten: (color: string, amount: number) => color, // Simplificado por ahora
  darken: (color: string, amount: number) => color, // Simplificado por ahora
  withAlpha: (color: string, alpha: number) => `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`,
};

// ✨ Efecto glass legacy (para compatibilidad)
export const glassEffect = {
  subtle: (mode: 'light' | 'dark') => DESIGN_TOKENS.effects.glass[mode].subtle,
  medium: (mode: 'light' | 'dark') => DESIGN_TOKENS.effects.glass[mode].medium,
  strong: (mode: 'light' | 'dark') => DESIGN_TOKENS.effects.glass[mode].strong,
};

export default DESIGN_TOKENS;