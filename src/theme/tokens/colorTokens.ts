// src/theme/tokens/colorTokens.ts
// FINTECH 2025: Sistema de tokens semánticos con OKLCH para máximo contraste y accesibilidad

export interface ColorTokens {
  // Surface Tokens - Jerarquía de elevación
  surface: {
    page: string;      // Background principal de la página
    primary: string;   // Cards principales
    secondary: string; // Cards secundarias
    elevated: string;  // Modals, tooltips
    interactive: string; // Hover states
  };
  
  // Text Tokens - Contraste garantizado
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
    brand: string;
  };
  
  // Border Tokens - Separación visual
  border: {
    subtle: string;
    default: string;
    strong: string;
    interactive: string;
  };
  
  // Financial Tokens - Estados críticos para fintech
  financial: {
    positive: string;  // Ganancias, confirmaciones
    negative: string;  // Pérdidas, errores críticos
    warning: string;   // Alertas regulatorias
    info: string;      // Información neutral
  };
  
  // Shadow Tokens - Profundidad y glassmorphism
  shadow: {
    sm: string;
    md: string;
    lg: string;
    financial: string; // Sombra especial para elementos críticos
  };
}

// Paleta base OKLCH - Brand Seeds
const brandSeeds = {
  primary: {
    hue: 220,     // Azul corporativo
    chroma: 0.15, // Saturación moderada para fintech
  },
  accent: {
    hue: 280,     // Violeta CyberWallet
    chroma: 0.12,
  }
};

// Light Mode - Surface Elevation System mejorado con más vida
export const lightTokens: ColorTokens = {
  surface: {
    page: 'oklch(97% 0.01 220)',       // #F5F7FA - Gris muy claro
    primary: 'linear-gradient(135deg, oklch(100% 0 0) 0%, oklch(98.5% 0.005 220) 100%)', // Gradiente sutil
    secondary: 'oklch(96.5% 0.012 220)', // Más saturado que antes
    elevated: 'linear-gradient(135deg, oklch(100% 0 0) 0%, oklch(98% 0.008 220) 100%)', // Gradiente para modals
    interactive: 'oklch(94% 0.018 220)', // Más saturación en hover
  },
  
  text: {
    primary: 'oklch(20% 0.02 220)',   // #1A202C - Negro azulado
    secondary: 'oklch(45% 0.02 220)', // #4A5568 - Gris medio
    tertiary: 'oklch(65% 0.01 220)',  // #A0AEC0 - Gris claro
    inverse: 'oklch(100% 0 0)',       // #FFFFFF - Texto sobre dark
    brand: 'oklch(50% 0.15 220)',     // Azul de marca
  },
  
  border: {
    subtle: 'oklch(90% 0.01 220)',    // #E2E8F0 - Bordes suaves
    default: 'oklch(85% 0.02 220)',   // #CBD5E0 - Bordes normales
    strong: 'oklch(75% 0.03 220)',    // #A0AEC0 - Bordes definidos
    interactive: 'oklch(60% 0.1 220)', // Bordes interactivos
  },
  
  financial: {
    positive: 'oklch(45% 0.15 140)',  // Verde - Contraste ≥4.5:1
    negative: 'oklch(50% 0.18 25)',   // Rojo - Contraste ≥4.5:1
    warning: 'oklch(55% 0.16 80)',    // Amarillo/Naranja
    info: 'oklch(50% 0.12 220)',      // Azul informativo
  },
  
  shadow: {
    sm: '0 1px 3px oklch(20% 0.02 220 / 0.1)',
    md: '0 4px 12px oklch(20% 0.02 220 / 0.08), 0 1px 3px oklch(20% 0.02 220 / 0.12)',
    lg: '0 8px 25px oklch(20% 0.02 220 / 0.08), 0 4px 12px oklch(20% 0.02 220 / 0.12)',
    financial: '0 4px 20px oklch(50% 0.15 220 / 0.15), inset 0 1px 0 oklch(100% 0 0 / 0.9)',
  },
};

// Dark Mode - Adaptación contextual
export const darkTokens: ColorTokens = {
  surface: {
    page: 'oklch(12% 0.02 220)',      // #0A0E1A - Azul muy oscuro
    primary: 'oklch(18% 0.03 220)',   // #1A2332 - Cards principales
    secondary: 'oklch(15% 0.025 220)', // #121B28 - Cards secundarias
    elevated: 'oklch(22% 0.03 220)',  // #232F42 - Modals elevados
    interactive: 'oklch(25% 0.04 220)', // Hover states
  },
  
  text: {
    primary: 'oklch(95% 0.01 220)',   // #F7FAFC - Casi blanco
    secondary: 'oklch(75% 0.02 220)', // #CBD5E0 - Gris claro
    tertiary: 'oklch(55% 0.02 220)',  // #718096 - Gris medio
    inverse: 'oklch(20% 0.02 220)',   // #1A202C - Texto sobre light
    brand: 'oklch(70% 0.15 220)',     // Azul más claro para dark
  },
  
  border: {
    subtle: 'oklch(25% 0.03 220)',    // Bordes sutiles dark
    default: 'oklch(30% 0.04 220)',   // Bordes normales dark
    strong: 'oklch(40% 0.05 220)',    // Bordes definidos dark
    interactive: 'oklch(50% 0.12 220)', // Bordes interactivos dark
  },
  
  financial: {
    positive: 'oklch(65% 0.15 140)',  // Verde más claro para dark
    negative: 'oklch(65% 0.18 25)',   // Rojo más claro para dark
    warning: 'oklch(70% 0.16 80)',    // Amarillo más claro
    info: 'oklch(70% 0.12 220)',      // Azul más claro
  },
  
  shadow: {
    sm: '0 1px 3px oklch(0% 0 0 / 0.3)',
    md: '0 4px 12px oklch(0% 0 0 / 0.2), 0 1px 3px oklch(0% 0 0 / 0.3)',
    lg: '0 8px 25px oklch(0% 0 0 / 0.15), 0 4px 12px oklch(0% 0 0 / 0.2)',
    financial: '0 4px 20px oklch(50% 0.15 220 / 0.3), inset 0 1px 0 oklch(100% 0 0 / 0.05)',
  },
};

// Función de derivación automática de colores
export const deriveColorScale = (baseHue: number, baseChroma: number, steps: number = 10) => {
  const scale: string[] = [];
  
  for (let i = 0; i < steps; i++) {
    const lightness = 95 - (i * 8); // De 95% a 15%
    const chroma = baseChroma * (1 - i * 0.1); // Reduce saturación gradualmente
    scale.push(`oklch(${lightness}% ${chroma.toFixed(3)} ${baseHue})`);
  }
  
  return scale;
};

// Export tokens activos basado en el theme
export const getActiveTokens = (isDark: boolean): ColorTokens => {
  return isDark ? darkTokens : lightTokens;
};

// CSS Custom Properties para inyección global
export const generateCSSVariables = (tokens: ColorTokens) => {
  return {
    // Surface
    '--surface-page': tokens.surface.page,
    '--surface-primary': tokens.surface.primary,
    '--surface-secondary': tokens.surface.secondary,
    '--surface-elevated': tokens.surface.elevated,
    '--surface-interactive': tokens.surface.interactive,
    
    // Text
    '--text-primary': tokens.text.primary,
    '--text-secondary': tokens.text.secondary,
    '--text-tertiary': tokens.text.tertiary,
    '--text-inverse': tokens.text.inverse,
    '--text-brand': tokens.text.brand,
    
    // Border
    '--border-subtle': tokens.border.subtle,
    '--border-default': tokens.border.default,
    '--border-strong': tokens.border.strong,
    '--border-interactive': tokens.border.interactive,
    
    // Financial
    '--financial-positive': tokens.financial.positive,
    '--financial-negative': tokens.financial.negative,
    '--financial-warning': tokens.financial.warning,
    '--financial-info': tokens.financial.info,
    
    // Shadow
    '--shadow-sm': tokens.shadow.sm,
    '--shadow-md': tokens.shadow.md,
    '--shadow-lg': tokens.shadow.lg,
    '--shadow-financial': tokens.shadow.financial,
  };
};
