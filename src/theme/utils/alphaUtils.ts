// 🎨 ALPHA UTILITIES FOR MUI COMPATIBILITY
// Funciones para manejar transparencia con colores RGB/HSL en lugar de OKLCH

// 🔧 WITH ALPHA: Añade transparencia a colores RGB/HSL compatibles con MUI
export function withAlpha(color: string, alpha: number): string {
  // Ensure alpha is between 0 and 1
  const clampedAlpha = Math.max(0, Math.min(1, alpha));
  
  // Handle RGB format
  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch;
    return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
  }
  
  // Handle RGBA format (just update alpha)
  const rgbaMatch = color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)$/);
  if (rgbaMatch) {
    const [, r, g, b] = rgbaMatch;
    return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
  }
  
  // Handle HSL format
  const hslMatch = color.match(/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/);
  if (hslMatch) {
    const [, h, s, l] = hslMatch;
    return `hsla(${h}, ${s}%, ${l}%, ${clampedAlpha})`;
  }
  
  // Handle HSLA format (just update alpha)
  const hslaMatch = color.match(/^hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*([0-9.]+)\)$/);
  if (hslaMatch) {
    const [, h, s, l] = hslaMatch;
    return `hsla(${h}, ${s}%, ${l}%, ${clampedAlpha})`;
  }
  
  // Handle hex format
  const hexMatch = color.match(/^#([0-9a-f]{3,6})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    let r: number, g: number, b: number;
    
    if (hex.length === 3) {
      // Short hex format (#RGB)
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      // Long hex format (#RRGGBB)
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
    
    return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
  }
  
  // If no format matches, try to use the color as-is with rgba()
  // This is a fallback that might work with CSS color names
  console.warn(`Unsupported color format for alpha: ${color}`);
  return color;
}

// 🎯 EXTRACT ALPHA: Extrae el valor alpha de un color con transparencia
export function extractAlpha(color: string): number {
  const rgbaMatch = color.match(/^rgba\(\d+,\s*\d+,\s*\d+,\s*([0-9.]+)\)$/);
  if (rgbaMatch) {
    return parseFloat(rgbaMatch[1]);
  }
  
  const hslaMatch = color.match(/^hsla\(\d+,\s*\d+%,\s*\d+%,\s*([0-9.]+)\)$/);
  if (hslaMatch) {
    return parseFloat(hslaMatch[1]);
  }
  
  // If no alpha found, assume opaque
  return 1;
}

// 🌈 LIGHTEN: Hace un color más claro (útil para hover states)
export function lighten(color: string, amount: number): string {
  // Convert RGB to HSL, increase lightness, convert back
  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!rgbMatch) {
    console.warn(`Cannot lighten color: ${color}`);
    return color;
  }
  
  const [, rStr, gStr, bStr] = rgbMatch;
  const r = parseInt(rStr) / 255;
  const g = parseInt(gStr) / 255;
  const b = parseInt(bStr) / 255;
  
  // Convert to HSL
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number, l: number;
  
  l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }
  
  // Increase lightness
  l = Math.min(1, l + amount);
  
  // Convert back to RGB
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  
  let rNew: number, gNew: number, bNew: number;
  
  if (s === 0) {
    rNew = gNew = bNew = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    rNew = hue2rgb(p, q, h + 1/3);
    gNew = hue2rgb(p, q, h);
    bNew = hue2rgb(p, q, h - 1/3);
  }
  
  return `rgb(${Math.round(rNew * 255)}, ${Math.round(gNew * 255)}, ${Math.round(bNew * 255)})`;
}

// 🌑 DARKEN: Hace un color más oscuro
export function darken(color: string, amount: number): string {
  return lighten(color, -amount);
}
