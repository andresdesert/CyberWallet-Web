// 🎨 CONTRAST RATIOS - Utilidades para calcular y validar ratios de contraste WCAG
import { alpha } from '@mui/material/styles';

/**
 * Calcula el ratio de contraste entre dos colores
 * Basado en las pautas WCAG 2.1
 */
export const calculateContrastRatio = (color1: string, color2: string): number => {
    const getLuminance = (color: string): number => {
        // Convertir color hex a RGB
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16) / 255;
        const g = parseInt(hex.substr(2, 2), 16) / 255;
        const b = parseInt(hex.substr(4, 2), 16) / 255;

        // Calcular luminancia relativa
        const gamma = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        
        return 0.2126 * gamma(r) + 0.7152 * gamma(g) + 0.0722 * gamma(b);
    };

    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const lightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    return (lightest + 0.05) / (darkest + 0.05);
};

/**
 * Valida si un ratio de contraste cumple con estándares WCAG
 */
export const validateContrast = (ratio: number, level: 'AA' | 'AAA' = 'AA'): boolean => {
    const minRatio = level === 'AAA' ? 7 : 4.5;
    return ratio >= minRatio;
};

/**
 * Genera un color con el contraste apropiado
 */
export const generateAccessibleColor = (
    baseColor: string, 
    targetRatio: number = 4.5
): string => {
    // Implementación básica - en una app real usaríamos algoritmos más sofisticados
    const luminance = calculateContrastRatio(baseColor, '#ffffff');
    
    if (luminance < targetRatio) {
        // Si el contraste es insuficiente, oscurecer el color
        return alpha(baseColor, 0.8);
    }
    
    return baseColor;
};

/**
 * Ratios de contraste predefinidos para diferentes elementos
 */
export const contrastRatios = {
    text: {
        primary: 4.5,   // WCAG AA Normal
        secondary: 3.0, // WCAG AA Large
        disabled: 2.5,
    },
    background: {
        subtle: 1.2,
        moderate: 2.0,
        strong: 3.0,
    },
    accent: {
        primary: 4.5,
        secondary: 3.0,
        tertiary: 2.0,
    },
} as const;

export type ContrastLevel = keyof typeof contrastRatios;
