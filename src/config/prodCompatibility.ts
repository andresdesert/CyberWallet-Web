// 🏗️ PRODUCTION COMPATIBILITY - Configuración para compatibilidad en producción
import { PaletteMode } from '@mui/material/styles';

/**
 * Configuración para GitHub Pages y producción
 */
export const prodConfig = {
    // Base URL para GitHub Pages
    BASE_URL: process.env.NODE_ENV === 'production' ? '/CyberWallet-Web' : '',
    
    // API endpoints
    API_BASE_URL: process.env.NODE_ENV === 'production' 
        ? 'https://api.cyberwallet.com' 
        : 'http://localhost:3001',
    
    // Configuración de rutas
    ROUTES: {
        HOME: '/',
        LOGIN: '/login',
        REGISTER: '/register',
        DASHBOARD: '/dashboard',
        PROFILE: '/profile',
        ABOUT: '/about-cv',
        CONTACT: '/contacto',
    },
    
    // Configuración de assets
    ASSETS: {
        IMAGES_PATH: '/assets/images',
        ICONS_PATH: '/assets/icons',
        FONTS_PATH: '/assets/fonts',
    },
    
    // Feature flags para producción
    FEATURES: {
        ANIMATIONS: true,
        SERVICE_WORKER: process.env.NODE_ENV === 'production',
        ANALYTICS: process.env.NODE_ENV === 'production',
        ERROR_REPORTING: process.env.NODE_ENV === 'production',
        MOCK_DATA: process.env.NODE_ENV !== 'production',
    },
    
    // Configuración de rendimiento
    PERFORMANCE: {
        LAZY_LOADING: true,
        IMAGE_OPTIMIZATION: true,
        BUNDLE_SPLITTING: true,
        PRELOAD_CRITICAL: true,
    },
} as const;

/**
 * Utilidad para obtener la URL completa con base path
 */
export const getFullUrl = (path: string): string => {
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${prodConfig.BASE_URL}${cleanPath}`;
};

/**
 * Configuración de tema para producción
 */
export const prodThemeConfig = {
    defaultMode: 'dark' as PaletteMode,
    persistMode: true,
    systemPreference: true,
    
    // Colores optimizados para producción
    colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
    },
    
    // Configuración de contraste para accesibilidad
    contrast: {
        normal: 4.5,
        high: 7,
    },
} as const;

/**
 * Headers de seguridad para producción
 */
export const securityHeaders = {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:; script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https: http:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https: http:; font-src 'self' https://fonts.gstatic.com https:; img-src 'self' data: https: http: *; connect-src 'self' https://api.cyberwallet.com https: http: *;",
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
} as const;

/**
 * Configuración de caché para producción
 */
export const cacheConfig = {
    // Cache de recursos estáticos (1 año)
    staticAssets: {
        maxAge: 31536000,
        immutable: true,
    },
    
    // Cache de API (5 minutos)
    apiResponses: {
        maxAge: 300,
        staleWhileRevalidate: 600,
    },
    
    // Cache de páginas (1 hora)
    pages: {
        maxAge: 3600,
        staleWhileRevalidate: 86400,
    },
} as const;

export type ProdConfigKey = keyof typeof prodConfig;
export type RouteKey = keyof typeof prodConfig.ROUTES;
