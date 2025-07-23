/**
 * Configuración específica para GitHub Pages
 * Maneja rutas y assets correctamente en el entorno de GitHub Pages
 */

export const isGitHubPages = () => {
  return process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES === 'true';
};

export const getBasePath = () => {
  return isGitHubPages() ? '/CyberWallet-Web' : '';
};

export const getAssetPath = (path: string) => {
  const basePath = getBasePath();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
};

export const getApiUrl = () => {
  return process.env.NODE_ENV === 'production' 
    ? 'https://api.cyberwallet.com' 
    : 'http://localhost:3001';
};

export const githubPagesConfig = {
  basePath: getBasePath(),
  assetPath: getAssetPath,
  apiUrl: getApiUrl(),
  isGitHubPages: isGitHubPages(),
  
  // Configuración de rutas
  routes: {
    home: '/',
    login: '/login',
    register: '/register',
    dashboard: '/dashboard',
    about: '/about-cv',
    contact: '/contacto',
  },
  
  // Configuración de assets
  assets: {
    images: '/assets/images',
    icons: '/assets/icons',
    fonts: '/assets/fonts',
  },
  
  // Configuración de CSP más permisiva para GitHub Pages
  csp: {
    'default-src': ["'self'", 'https:', 'http:', 'data:', 'blob:'],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'blob:', 'data:', 'https:', 'http:', '*'],
    'script-src-elem': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'blob:', 'data:', 'https:', 'http:', '*'],
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https:', 'http:', 'data:'],
    'style-src-elem': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'data:', 'https:', 'http:'],
    'font-src': ["'self'", 'https://fonts.googleapis.com', 'https://fonts.gstatic.com', 'data:', 'blob:', "'unsafe-inline'", 'https:', 'http:'],
    'img-src': ["'self'", 'data:', 'blob:', 'https:', 'http:', '*'],
    'connect-src': ["'self'", 'https://andresdesert.github.io', 'ws://localhost:*', 'wss://localhost:*', 'http://localhost:*', 'https:', 'data:', '*'],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-src': ["'self'", 'data:', 'https:', 'http:'],
    'worker-src': ["'self'", 'blob:'],
    'media-src': ["'self'", 'data:', 'blob:', 'https:', 'http:'],
  }
};

/**
 * Genera la cadena CSP para GitHub Pages
 */
export const generateCSP = () => {
  const csp = githubPagesConfig.csp;
  return Object.entries(csp)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
};

/**
 * Utilidad para construir URLs completas
 */
export const buildUrl = (path: string, params?: Record<string, string>) => {
  const basePath = getBasePath();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  let url = `${basePath}${cleanPath}`;
  
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }
  
  return url;
};

/**
 * Utilidad para verificar si estamos en GitHub Pages
 */
export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

/**
 * Configuración de desarrollo vs producción
 */
export const getEnvironmentConfig = () => {
  return {
    isDev: !isProduction(),
    isProd: isProduction(),
    isGitHubPages: isGitHubPages(),
    basePath: getBasePath(),
    apiUrl: getApiUrl(),
  };
}; 