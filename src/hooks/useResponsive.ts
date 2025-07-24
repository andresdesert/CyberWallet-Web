import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

/**
 * Hook personalizado para gestión avanzada de responsividad
 * Basado en Material Design 3 breakpoints
 */
export const useResponsive = () => {
  const theme = useTheme();

  // Breakpoints específicos
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isExtraLarge = useMediaQuery(theme.breakpoints.up('xl'));

  // Rangos útiles
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isTabletOrDesktop = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  // Orientación
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const isPortrait = useMediaQuery('(orientation: portrait)');

  // Preferencias del usuario
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const prefersHighContrast = useMediaQuery('(prefers-contrast: high)');

  // Funciones utilitarias
  const getResponsiveValue = <T>(values: {
    xs?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
  }): T | undefined => {
    if (isExtraLarge && values.xl !== undefined) return values.xl;
    if (isLargeDesktop && values.lg !== undefined) return values.lg;
    if (isDesktop && values.md !== undefined) return values.md;
    if (isTablet && values.sm !== undefined) return values.sm;
    if (isMobile && values.xs !== undefined) return values.xs;
    
    // Fallback: encontrar el valor disponible más cercano
    return values.xl ?? values.lg ?? values.md ?? values.sm ?? values.xs;
  };

  const getGridColumns = () => getResponsiveValue({
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  }) || 1;

  const getCardSize = () => getResponsiveValue({
    xs: { width: '100%', maxWidth: '100%' },
    sm: { width: '100%', maxWidth: '500px' },
    md: { width: '48%', maxWidth: '600px' },
    lg: { width: '32%', maxWidth: '400px' },
    xl: { width: '24%', maxWidth: '350px' }
  }) || { width: '100%', maxWidth: '100%' };

  const getSpacing = () => getResponsiveValue({
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  }) || 2;

  const getFontSizes = () => ({
    h1: getResponsiveValue({
      xs: 'clamp(1.75rem, 4vw, 2.5rem)',
      sm: 'clamp(2rem, 4.5vw, 3rem)',
      md: 'clamp(2.25rem, 5vw, 3.5rem)',
      lg: 'clamp(2.5rem, 5.5vw, 4rem)',
      xl: 'clamp(2.75rem, 6vw, 4.5rem)'
    }),
    h2: getResponsiveValue({
      xs: 'clamp(1.5rem, 3.5vw, 2rem)',
      sm: 'clamp(1.75rem, 4vw, 2.5rem)',
      md: 'clamp(2rem, 4.5vw, 3rem)',
      lg: 'clamp(2.25rem, 5vw, 3.5rem)',
      xl: 'clamp(2.5rem, 5.5vw, 4rem)'
    }),
    h3: getResponsiveValue({
      xs: 'clamp(1.25rem, 3vw, 1.75rem)',
      sm: 'clamp(1.5rem, 3.5vw, 2rem)',
      md: 'clamp(1.75rem, 4vw, 2.5rem)',
      lg: 'clamp(2rem, 4.5vw, 3rem)',
      xl: 'clamp(2.25rem, 5vw, 3.5rem)'
    }),
    body1: getResponsiveValue({
      xs: 'clamp(0.875rem, 2.5vw, 1rem)',
      sm: 'clamp(1rem, 2.75vw, 1.125rem)',
      md: 'clamp(1.125rem, 3vw, 1.25rem)',
      lg: 'clamp(1.25rem, 3.25vw, 1.375rem)',
      xl: 'clamp(1.375rem, 3.5vw, 1.5rem)'
    })
  });

  return {
    // Breakpoints específicos
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isExtraLarge,
    
    // Rangos útiles
    isMobileOrTablet,
    isTabletOrDesktop,
    
    // Orientación
    isLandscape,
    isPortrait,
    
    // Preferencias
    prefersReducedMotion,
    prefersHighContrast,
    
    // Funciones utilitarias
    getResponsiveValue,
    getGridColumns,
    getCardSize,
    getSpacing,
    getFontSizes,
    
    // Breakpoints de MUI disponibles
    theme: {
      breakpoints: theme.breakpoints
    }
  };
};

export default useResponsive;
