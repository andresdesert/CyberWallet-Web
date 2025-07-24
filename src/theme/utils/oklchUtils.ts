// 🧮 OKLCH COLOR CONVERSION UTILITIES
// Funciones matemáticas para convertir OKLCH a RGB/HSL
// Basado en especificaciones W3C CSS Color Module Level 4

// 🔧 PARSER OKLCH: Extrae valores L, C, H de string OKLCH
export function parseOklch(oklchString: string): { l: number; c: number; h: number } {
  // Match pattern: oklch(lightness chroma hue)
  const match = oklchString.match(/oklch\(\s*([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)\s*\)/i);
  
  if (!match) {
    throw new Error(`Invalid OKLCH format: ${oklchString}`);
  }
  
  const lightness = parseFloat(match[1]);
  const chroma = parseFloat(match[2]);
  const hue = parseFloat(match[3]);
  
  return {
    l: lightness / 100, // Convert percentage to decimal
    c: chroma,
    h: hue
  };
}

// 🎯 OKLCH → OKLAB: Primera conversión en el pipeline
export function oklchToOklab(l: number, c: number, h: number): [number, number, number] {
  // Convert hue from degrees to radians
  const hueRad = (h * Math.PI) / 180;
  
  // Calculate a and b components
  const a = c * Math.cos(hueRad);
  const b = c * Math.sin(hueRad);
  
  return [l, a, b];
}

// 🌈 OKLAB → RGB: Conversión final a RGB lineal
export function oklabToRgb([l, a, b]: [number, number, number]): [number, number, number] {
  // OKLAB to linear RGB conversion matrix
  // Based on W3C specifications
  
  // Step 1: OKLAB to LMS
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;
  
  // Step 2: LMS to linear RGB
  const lLinear = Math.pow(l_, 3);
  const mLinear = Math.pow(m_, 3);
  const sLinear = Math.pow(s_, 3);
  
  // Step 3: Apply RGB conversion matrix
  let r = +4.0767416621 * lLinear - 3.3077115913 * mLinear + 0.2309699292 * sLinear;
  let g = -1.2684380046 * lLinear + 2.6097574011 * mLinear - 0.3413193965 * sLinear;
  let b2 = -0.0041960863 * lLinear - 0.7034186147 * mLinear + 1.7076147010 * sLinear;
  
  // Step 4: Apply gamma correction (linear to sRGB)
  r = linearToSrgb(r);
  g = linearToSrgb(g);
  b2 = linearToSrgb(b2);
  
  return [r, g, b2];
}

// 📐 GAMMA CORRECTION: Linear RGB a sRGB
function linearToSrgb(value: number): number {
  if (value <= 0.0031308) {
    return 12.92 * value;
  } else {
    return 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
  }
}

// 🎨 RGB → HSL: Para casos que necesiten HSL específicamente
export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  
  // Lightness
  const l = (max + min) / 2;
  
  // Saturation
  let s = 0;
  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
  }
  
  // Hue
  let h = 0;
  if (diff !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / diff + 2) / 6;
        break;
      case b:
        h = ((r - g) / diff + 4) / 6;
        break;
    }
  }
  
  return [h * 360, s * 100, l * 100];
}

// 🔢 CLAMP UTILITY: Asegura valores dentro de rango
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// ✅ VALIDATION: Verifica que los valores RGB estén en rango válido
export function validateRgb(r: number, g: number, b: number): boolean {
  return (
    r >= 0 && r <= 1 &&
    g >= 0 && g <= 1 &&
    b >= 0 && b <= 1
  );
}
