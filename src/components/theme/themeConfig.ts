// 🎨 THEME CONFIG - Configuración centralizada del sistema de temas
import { PaletteMode } from '@mui/material/styles';
import { spacing, typography, borders, shadows, transitions } from './designSystem';

/**
 * Configuración base del tema
 */
export interface ThemeConfig {
    mode: PaletteMode;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    borderRadius: string;
    shadows: boolean;
    animations: boolean;
    contrastMode: 'normal' | 'high';
    comfortMode: boolean;
}

/**
 * Configuración por defecto
 */
export const defaultThemeConfig: ThemeConfig = {
    mode: 'dark',
    primaryColor: '#6366f1', // Indigo
    secondaryColor: '#8b5cf6', // Violet
    fontFamily: typography.fontFamily.primary,
    borderRadius: borders.radius.base,
    shadows: true,
    animations: true,
    contrastMode: 'normal',
    comfortMode: false,
};

/**
 * Configuraciones predefinidas de temas
 */
export const themePresets = {
    cyberpunk: {
        ...defaultThemeConfig,
        mode: 'dark' as PaletteMode,
        primaryColor: '#00ffff', // Cyan
        secondaryColor: '#ff0080', // Magenta
    },
    professional: {
        ...defaultThemeConfig,
        mode: 'light' as PaletteMode,
        primaryColor: '#2563eb', // Blue
        secondaryColor: '#7c3aed', // Purple
        shadows: false,
        borderRadius: borders.radius.sm,
    },
    comfort: {
        ...defaultThemeConfig,
        comfortMode: true,
        animations: false,
        shadows: false,
        contrastMode: 'high' as const,
    },
    minimal: {
        ...defaultThemeConfig,
        mode: 'light' as PaletteMode,
        primaryColor: '#000000',
        secondaryColor: '#666666',
        shadows: false,
        animations: false,
        borderRadius: borders.radius.none,
    },
} as const;

/**
 * Opciones de personalización disponibles
 */
export const customizationOptions = {
    primaryColors: [
        { name: 'Indigo', value: '#6366f1' },
        { name: 'Blue', value: '#3b82f6' },
        { name: 'Purple', value: '#8b5cf6' },
        { name: 'Pink', value: '#ec4899' },
        { name: 'Red', value: '#ef4444' },
        { name: 'Orange', value: '#f97316' },
        { name: 'Yellow', value: '#eab308' },
        { name: 'Green', value: '#22c55e' },
        { name: 'Teal', value: '#14b8a6' },
        { name: 'Cyan', value: '#06b6d4' },
    ],
    borderRadiusOptions: [
        { name: 'None', value: borders.radius.none },
        { name: 'Small', value: borders.radius.sm },
        { name: 'Medium', value: borders.radius.base },
        { name: 'Large', value: borders.radius.lg },
        { name: 'Extra Large', value: borders.radius.xl },
    ],
    fontFamilyOptions: [
        { name: 'Inter', value: typography.fontFamily.primary },
        { name: 'Monospace', value: typography.fontFamily.mono },
        { name: 'System', value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
    ],
} as const;

/**
 * Utilidades para validar configuración
 */
export const validateThemeConfig = (config: Partial<ThemeConfig>): boolean => {
    const required: (keyof ThemeConfig)[] = ['mode', 'primaryColor', 'secondaryColor'];
    return required.every(key => key in config && config[key] !== undefined);
};

/**
 * Claves de localStorage para persistencia
 */
export const STORAGE_KEYS = {
    THEME_CONFIG: 'cyberwallet-theme-config',
    USER_PREFERENCES: 'cyberwallet-user-preferences',
    THEME_MODE: 'cyberwallet-theme-mode',
} as const;

export type ThemePreset = keyof typeof themePresets;
export type PrimaryColorOption = typeof customizationOptions.primaryColors[number];
export type BorderRadiusOption = typeof customizationOptions.borderRadiusOptions[number];
