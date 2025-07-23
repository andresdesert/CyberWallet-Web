// 🎨 OKLCH TO RGB/HSL CONVERTER FOR MATERIAL-UI COMPATIBILITY
// Convierte colores OKLCH a formatos compatibles con Material-UI
// Solución para el error "MUI: Unsupported 'oklch(12% 0.02 220)' color"

import { parseOklch, oklchToOklab, oklabToRgb } from './oklchUtils';

// ✅ FUNCIÓN PRINCIPAL: Convierte OKLCH a RGB para compatibilidad con MUI
export function oklchToRgb(oklchString: string): string {
  try {
    // Parse OKLCH string
    const { l, c, h } = parseOklch(oklchString);
    
    // Convert OKLCH → OKLAB → RGB
    const [r, g, b] = oklabToRgb(oklchToOklab(l, c, h));
    
    // Clamp values to 0-255 range
    const rClamped = Math.round(Math.max(0, Math.min(255, r * 255)));
    const gClamped = Math.round(Math.max(0, Math.min(255, g * 255)));
    const bClamped = Math.round(Math.max(0, Math.min(255, b * 255)));
    
    return `rgb(${rClamped}, ${gClamped}, ${bClamped})`;
  } catch (error) {
    console.warn(`Failed to convert OKLCH color "${oklchString}":`, error);
    // Fallback to a neutral gray if conversion fails
    return 'rgb(128, 128, 128)';
  }
}

// 🎯 FUNCIÓN ALTERNATIVA: Convierte OKLCH a HSL para casos específicos
export function oklchToHsl(oklchString: string): string {
  try {
    const { l, c, h } = parseOklch(oklchString);
    const [r, g, b] = oklabToRgb(oklchToOklab(l, c, h));
    
    // Convert RGB to HSL
    const rNorm = r;
    const gNorm = g;
    const bNorm = b;
    
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const diff = max - min;
    
    // Lightness
    const lightness = (max + min) / 2;
    
    // Saturation
    let saturation = 0;
    if (diff !== 0) {
      saturation = lightness > 0.5 ? diff / (2 - max - min) : diff / (max + min);
    }
    
    // Hue
    let hue = 0;
    if (diff !== 0) {
      switch (max) {
        case rNorm:
          hue = ((gNorm - bNorm) / diff + (gNorm < bNorm ? 6 : 0)) / 6;
          break;
        case gNorm:
          hue = ((bNorm - rNorm) / diff + 2) / 6;
          break;
        case bNorm:
          hue = ((rNorm - gNorm) / diff + 4) / 6;
          break;
      }
    }
    
    const hslH = Math.round(hue * 360);
    const hslS = Math.round(saturation * 100);
    const hslL = Math.round(lightness * 100);
    
    return `hsl(${hslH}, ${hslS}%, ${hslL}%)`;
  } catch (error) {
    console.warn(`Failed to convert OKLCH color "${oklchString}" to HSL:`, error);
    return 'hsl(0, 0%, 50%)'; // Neutral gray fallback
  }
}

// 🔧 FUNCIÓN DETECTORA: Verifica si un string es un color OKLCH
export function isOklchColor(colorString: string): boolean {
  return /^oklch\(/i.test(colorString.trim());
}

// 🛠️ FUNCIÓN CONVERTIDORA INTELIGENTE: Auto-detecta y convierte
export function convertToMuiCompatible(colorString: string): string {
  if (isOklchColor(colorString)) {
    return oklchToRgb(colorString);
  }
  return colorString; // Ya es compatible con MUI
}

// 📋 FUNCIÓN BATCH: Convierte un objeto de colores de OKLCH a RGB
export function convertColorObjectToMuiCompatible<T extends Record<string, any>>(
  colorObject: T
): T {
  const converted = { ...colorObject };
  
  function processValue(value: any): any {
    if (typeof value === 'string' && isOklchColor(value)) {
      return oklchToRgb(value);
    }
    if (typeof value === 'object' && value !== null) {
      return convertColorObjectToMuiCompatible(value);
    }
    return value;
  }
  
  for (const key in converted) {
    converted[key] = processValue(converted[key]);
  }
  
  return converted;
}

// 🎨 FUNCIÓN ESPECÍFICA PARA TEMA: Convierte tokens semánticos
export function convertSemanticTokensForMui(tokens: any) {
  const isDark = tokens.surface?.page?.includes('12%'); // Detectar modo dark por el lightness bajo
  
  // 🚨 TÉCNICA RADICAL: Colores extremadamente contrastados para dark mode
  if (isDark) {
    return {
      surface: {
        page: 'rgb(0, 0, 0)',           // Negro absoluto
        primary: 'rgb(30, 41, 59)',     // Gris oscuro azulado MUY visible
        secondary: 'rgb(51, 65, 85)',   // Gris medio MUY visible
        elevated: 'rgb(71, 85, 105)',   // Gris claro para modals
        interactive: 'rgb(100, 116, 139)', // Gris interactivo MUY visible
      },
      text: {
        primary: 'rgb(255, 255, 255)',  // Blanco puro
        secondary: 'rgb(226, 232, 240)', // Casi blanco
        tertiary: 'rgb(148, 163, 184)',  // Gris claro
        inverse: 'rgb(0, 0, 0)',         // Negro para contraste
        brand: 'rgb(59, 130, 246)',      // Azul brillante
      },
      border: {
        subtle: 'rgb(71, 85, 105)',      // Bordes MUY visibles
        default: 'rgb(100, 116, 139)',   // Bordes normales MUY visibles
        strong: 'rgb(148, 163, 184)',    // Bordes fuertes MUY visibles
        interactive: 'rgb(59, 130, 246)', // Azul brillante
      },
      financial: {
        positive: 'rgb(34, 197, 94)',    // Verde brillante
        negative: 'rgb(239, 68, 68)',    // Rojo brillante
        warning: 'rgb(245, 158, 11)',    // Amarillo brillante
        info: 'rgb(59, 130, 246)',       // Azul brillante
      },
      shadow: {
        sm: '0 1px 3px rgba(0, 0, 0, 0.8)',
        md: '0 4px 12px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.8)',
        lg: '0 8px 25px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.6)',
        financial: '0 4px 20px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
    };
  } else {
    return {
      surface: {
        page: 'rgb(248, 250, 252)',     // Background claro
        primary: 'rgb(255, 255, 255)',  // Cards blancas
        secondary: 'rgb(250, 252, 255)', // Cards secundarias light
        elevated: 'rgb(255, 255, 255)',  // Modals light
        interactive: 'rgb(245, 248, 255)', // Hover light
      },
      text: {
        primary: 'rgb(26, 32, 44)',     // Texto principal dark para light mode
        secondary: 'rgb(74, 85, 104)',  // Texto secundario gris medio
        tertiary: 'rgb(160, 174, 192)', // Texto terciario gris claro
        inverse: 'rgb(255, 255, 255)',  // Texto inverso blanco
        brand: 'rgb(59, 130, 246)',     // Brand azul para light mode
      },
      border: {
        subtle: 'rgb(226, 232, 240)',   // Bordes light sutiles
        default: 'rgb(203, 213, 224)',  // Bordes light normales
        strong: 'rgb(160, 174, 192)',   // Bordes light fuertes
        interactive: 'rgb(59, 130, 246)', // Bordes interactive azul
      },
      financial: convertColorObjectToMuiCompatible(tokens.financial),
      shadow: {
        sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
        md: '0 4px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.12)',
        lg: '0 8px 25px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.12)',
        financial: '0 4px 20px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
      },
    };
  }
}
