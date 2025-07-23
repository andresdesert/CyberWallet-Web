/**
 * Environment utilities for consistent behavior between dev and production
 */
import { useEffect, useState } from 'react';

/**
 * Hook para detectar si estamos en producción de manera confiable
 */
export const useEnvironment = () => {
  const [isClient, setIsClient] = useState(false);
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsProduction(
      typeof import.meta.env !== 'undefined' && 
      import.meta.env.PROD === true
    );
  }, []);

  return {
    isClient,
    isProduction,
    isDevelopment: !isProduction,
    isServer: !isClient,
  };
};

/**
 * Hook mejorado para useMediaQuery que funciona consistentemente en dev y prod
 * Implementa una estrategia de graceful degradation para móviles
 */
export const useMediaQuerySafe = (query: string, options?: { 
  defaultMatches?: boolean;
  gracefulDegradation?: boolean; // Nueva opción para mobile-first
}) => {
  const { gracefulDegradation = true, defaultMatches } = options || {};
  
  // 🎯 ESTRATEGIA MOBILE-FIRST: Asumir móvil hasta confirmar lo contrario
  const mobileFirstDefault = gracefulDegradation ? true : (defaultMatches || false);
  
  const [matches, setMatches] = useState(mobileFirstDefault);
  const [isClient, setIsClient] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia(query);
      
      // 🎯 IMMEDIATE UPDATE: Actualizar inmediatamente al montar
      setMatches(mediaQuery.matches);
      setIsHydrated(true);
      
      const handler = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };
      
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [query]);

  // 🎯 RETURN STRATEGY:
  // - En servidor: usar mobile-first default
  // - En cliente pre-hidratación: usar mobile-first default  
  // - En cliente post-hidratación: usar valor real
  return isClient && isHydrated ? matches : mobileFirstDefault;
};

/**
 * Hook específico para detectar móviles con estrategia mobile-first
 */
export const useIsMobile = (breakpoint: string = '(max-width: 899.95px)') => {
  return useMediaQuerySafe(breakpoint, { 
    gracefulDegradation: true, // Asumir móvil por defecto
    defaultMatches: true 
  });
};

/**
 * Hook para detectar tamaño de pantalla con fallbacks seguros
 */
export const useResponsiveBreakpoint = () => {
  const isMobile = useIsMobile('(max-width: 599.95px)'); // xs
  const isTablet = useIsMobile('(max-width: 899.95px)'); // sm-md
  const isDesktop = !useIsMobile('(max-width: 1199.95px)'); // lg+
  
  return {
    isMobile,
    isTablet: isTablet && !isMobile,
    isDesktop,
    // Fallback seguro para navegación móvil
    shouldShowMobileNav: isMobile || isTablet
  };
};
