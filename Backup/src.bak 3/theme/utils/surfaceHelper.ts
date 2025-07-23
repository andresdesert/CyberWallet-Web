// 🎨 SURFACE SYSTEM HELPER - Reemplazo directo para getGlass
// Sistema de superficies semánticas con tokens OKLCH convertidos

import { getActiveTokens } from '@/theme/tokens/colorTokens';

// 🚀 SEMANTIC GLASS EFFECTS - Compatible con getGlass pero usando tokens semánticos
export const getSemanticSurface = {
  subtle: (isDark: boolean) => {
    const tokens = getActiveTokens(isDark);
    return {
      background: tokens.surface.secondary,
      border: `1px solid ${tokens.border.subtle}`,
      boxShadow: tokens.shadow.sm,
      backdropFilter: isDark ? 'blur(10px)' : 'blur(5px)',
    };
  },
  
  medium: (isDark: boolean) => {
    const tokens = getActiveTokens(isDark);
    return {
      background: tokens.surface.primary,
      border: `1px solid ${tokens.border.default}`,
      boxShadow: tokens.shadow.md,
      backdropFilter: isDark ? 'blur(20px)' : 'blur(10px)',
    };
  },
  
  strong: (isDark: boolean) => {
    const tokens = getActiveTokens(isDark);
    return {
      background: tokens.surface.elevated,
      border: `1px solid ${tokens.border.strong}`,
      boxShadow: tokens.shadow.lg,
      backdropFilter: isDark ? 'blur(30px)' : 'blur(15px)',
    };
  },
  
  interactive: (isDark: boolean) => {
    const tokens = getActiveTokens(isDark);
    return {
      background: tokens.surface.interactive,
      border: `1px solid ${tokens.border.interactive}`,
      boxShadow: tokens.shadow.financial,
      backdropFilter: isDark ? 'blur(25px)' : 'blur(12px)',
    };
  },
};

// 🎯 DIRECT REPLACEMENT PATTERNS - Para migración rápida
export const migrateGetGlass = {
  // 🚨 TÉCNICA RADICAL: Colores hardcodeados extremadamente visibles
  subtle: (themeMode: 'light' | 'dark') => {
    if (themeMode === 'dark') {
      return {
        background: 'rgb(51, 65, 85)',     // Gris medio MUY visible
        border: '1px solid rgb(100, 116, 139)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
      };
    } else {
      return {
        background: 'rgba(255, 255, 255, 0.9)',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
      };
    }
  },
  
  medium: (themeMode: 'light' | 'dark') => {
    if (themeMode === 'dark') {
      return {
        background: 'rgb(30, 41, 59)',     // Gris oscuro azulado MUY visible
        border: '1px solid rgb(71, 85, 105)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(20px)',
      };
    } else {
      return {
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid rgba(203, 213, 224, 0.8)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.12)',
        backdropFilter: 'blur(10px)',
      };
    }
  },
  
  strong: (themeMode: 'light' | 'dark') => {
    if (themeMode === 'dark') {
      return {
        background: 'rgb(71, 85, 105)',    // Gris claro para modals MUY visible
        border: '1px solid rgb(148, 163, 184)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(30px)',
      };
    } else {
      return {
        background: 'rgba(255, 255, 255, 0.98)',
        border: '1px solid rgba(160, 174, 192, 0.8)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.12)',
        backdropFilter: 'blur(15px)',
      };
    }
  },
};
