// Utilidades para gestionar rutas con consistencia entre desarrollo y producción (GitHub Pages)

/**
 * Determina si la aplicación está ejecutándose en producción
 */
export const isProduction = typeof import.meta.env !== 'undefined' && import.meta.env.PROD === true;

/**
 * La ruta base para la aplicación
 */
export const BASE_PATH = isProduction ? '/CyberWallet-Web' : '';

/**
 * Obtiene la ruta correcta para un recurso estático, considerando si estamos en desarrollo o producción
 * @param path Ruta relativa al recurso (ej. '/imagen.png', '/archivo.pdf')
 * @returns La ruta correcta para usar en la aplicación
 */
export function getAssetPath(path: string): string {
  // Si la ruta ya incluye http, es una URL completa, la devolvemos como está
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  
  // Aseguramos que la ruta comience con '/'
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Concatenamos con la ruta base si estamos en producción
  return `${BASE_PATH}${normalizedPath}`;
}
