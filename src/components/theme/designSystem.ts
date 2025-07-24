// 🎨 DESIGN SYSTEM - Tokens de diseño y constantes del sistema
import { alpha } from '@mui/material/styles';

/**
 * Espaciado consistente basado en múltiplos de 8px
 */
export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
} as const;

/**
 * Tipografía del sistema
 */
export const typography = {
    fontFamily: {
        primary: 'InterVariable, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        mono: 'JetBrains Mono, "Fira Code", Consolas, monospace',
    },
    fontSize: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
        '5xl': '3rem',     // 48px
    },
    fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
    },
    lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
    },
} as const;

/**
 * Bordes y radios
 */
export const borders = {
    width: {
        thin: '1px',
        medium: '2px',
        thick: '4px',
    },
    radius: {
        none: 0,
        sm: '0.125rem',  // 2px
        base: '0.25rem', // 4px
        md: '0.375rem',  // 6px
        lg: '0.5rem',    // 8px
        xl: '0.75rem',   // 12px
        '2xl': '1rem',   // 16px
        '3xl': '1.5rem', // 24px
        full: '9999px',
    },
} as const;

/**
 * Sombras del sistema
 */
export const shadows = {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
} as const;

/**
 * Z-index del sistema
 */
export const zIndex = {
    hide: -1,
    base: 0,
    raised: 10,
    dropdown: 1000,
    sticky: 1020,
    overlay: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
    toast: 1070,
    max: 2147483647,
} as const;

/**
 * Transiciones estándar
 */
export const transitions = {
    duration: {
        fast: '150ms',
        base: '250ms',
        slow: '350ms',
        slower: '500ms',
    },
    easing: {
        linear: 'linear',
        ease: 'ease',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
} as const;

/**
 * Breakpoints responsive
 */
export const breakpoints = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
} as const;

/**
 * Colores semánticos base (se extienden con los tokens del tema)
 */
export const semanticColors = {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
} as const;

/**
 * Utilidad para crear variantes de color con alpha
 */
export const createColorVariants = (baseColor: string) => ({
    50: alpha(baseColor, 0.05),
    100: alpha(baseColor, 0.1),
    200: alpha(baseColor, 0.2),
    300: alpha(baseColor, 0.3),
    400: alpha(baseColor, 0.4),
    500: baseColor,
    600: alpha(baseColor, 0.8),
    700: alpha(baseColor, 0.9),
    800: alpha(baseColor, 0.95),
    900: alpha(baseColor, 0.98),
});

export type SpacingKey = keyof typeof spacing;
export type TypographyFontFamily = keyof typeof typography.fontFamily;
export type TypographyFontSize = keyof typeof typography.fontSize;
export type BorderRadius = keyof typeof borders.radius;
export type Shadow = keyof typeof shadows;
