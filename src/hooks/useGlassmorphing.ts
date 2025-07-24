// 🌟 HOOK GLASSMORPHING FINTECH - Sistema unificado de superficies
// Hook para aplicar glassmorphing consistente en toda la aplicación

import { useTheme } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/material/styles';

export interface GlassmorphingVariant {
  hero: SxProps<Theme>;
  card: SxProps<Theme>;
  subtle: SxProps<Theme>;
  button: SxProps<Theme>;
  navigation: SxProps<Theme>;
}

export const useGlassmorphing = (): GlassmorphingVariant => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return {
    // 🎯 HERO - Efecto principal para secciones destacadas
    hero: {
      background: isDark 
        ? 'linear-gradient(135deg, rgba(75, 85, 139, 0.15), rgba(139, 69, 191, 0.12), rgba(75, 85, 139, 0.15))'
        : 'linear-gradient(135deg, rgba(99, 179, 237, 0.12), rgba(168, 85, 247, 0.08), rgba(99, 179, 237, 0.12))',
      backdropFilter: 'blur(25px)',
      borderRadius: 4,
      border: `2px solid ${isDark ? 'rgba(139, 69, 191, 0.3)' : 'rgba(99, 179, 237, 0.25)'}`,
      boxShadow: isDark
        ? '0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 32px rgba(139, 69, 191, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        : '0 16px 50px rgba(0, 0, 0, 0.08), 0 6px 20px rgba(99, 179, 237, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
      position: 'relative',
      overflow: 'hidden',
      
      // Efecto de brillo superior
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: isDark
          ? 'linear-gradient(90deg, transparent, rgba(139, 69, 191, 0.6), transparent)'
          : 'linear-gradient(90deg, transparent, rgba(99, 179, 237, 0.5), transparent)',
        borderRadius: '4px 4px 0 0',
      },
      
      // Transiciones suaves
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: isDark
          ? '0 24px 70px rgba(0, 0, 0, 0.5), 0 12px 40px rgba(139, 69, 191, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
          : '0 20px 60px rgba(0, 0, 0, 0.1), 0 8px 28px rgba(99, 179, 237, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        border: `2px solid ${isDark ? 'rgba(139, 69, 191, 0.4)' : 'rgba(99, 179, 237, 0.35)'}`,
      },
    },

    // 🎨 CARD - Efecto para tarjetas y contenedores
    card: {
      background: isDark 
        ? 'linear-gradient(135deg, rgba(75, 85, 139, 0.12), rgba(139, 69, 191, 0.08))'
        : 'linear-gradient(135deg, rgba(99, 179, 237, 0.08), rgba(168, 85, 247, 0.05))',
      backdropFilter: 'blur(20px)',
      borderRadius: 3,
      border: `1px solid ${isDark ? 'rgba(139, 69, 191, 0.2)' : 'rgba(99, 179, 237, 0.18)'}`,
      boxShadow: isDark
        ? '0 12px 40px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(139, 69, 191, 0.1)'
        : '0 8px 32px rgba(0, 0, 0, 0.06), 0 3px 12px rgba(99, 179, 237, 0.08)',
      
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-1px)',
        border: `1px solid ${isDark ? 'rgba(139, 69, 191, 0.3)' : 'rgba(99, 179, 237, 0.25)'}`,
        boxShadow: isDark
          ? '0 16px 50px rgba(0, 0, 0, 0.4), 0 6px 20px rgba(139, 69, 191, 0.15)'
          : '0 12px 40px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(99, 179, 237, 0.12)',
      },
    },

    // 🌊 SUBTLE - Efecto sutil para elementos secundarios
    subtle: {
      background: isDark 
        ? 'rgba(75, 85, 139, 0.08)'
        : 'rgba(99, 179, 237, 0.05)',
      backdropFilter: 'blur(15px)',
      borderRadius: 2,
      border: `1px solid ${isDark ? 'rgba(139, 69, 191, 0.15)' : 'rgba(99, 179, 237, 0.12)'}`,
      boxShadow: isDark
        ? '0 8px 24px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(139, 69, 191, 0.05)'
        : '0 4px 16px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(99, 179, 237, 0.05)',
    },

    // 🔘 BUTTON - Efecto para botones glassmorphing
    button: {
      background: isDark 
        ? 'linear-gradient(135deg, rgba(139, 69, 191, 0.2), rgba(168, 85, 247, 0.15))'
        : 'linear-gradient(135deg, rgba(99, 179, 237, 0.15), rgba(66, 153, 225, 0.12))',
      backdropFilter: 'blur(20px)',
      borderRadius: 2,
      border: `1px solid ${isDark ? 'rgba(139, 69, 191, 0.3)' : 'rgba(99, 179, 237, 0.25)'}`,
      color: isDark ? '#F8F9FA' : '#1A202C',
      
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        background: isDark 
          ? 'linear-gradient(135deg, rgba(139, 69, 191, 0.3), rgba(168, 85, 247, 0.25))'
          : 'linear-gradient(135deg, rgba(99, 179, 237, 0.25), rgba(66, 153, 225, 0.2))',
        transform: 'translateY(-1px)',
        boxShadow: isDark
          ? '0 8px 24px rgba(139, 69, 191, 0.2)'
          : '0 6px 20px rgba(99, 179, 237, 0.15)',
      },
    },

    // 🧭 NAVIGATION - Efecto para barras de navegación
    navigation: {
      background: isDark 
        ? 'rgba(26, 29, 41, 0.85)'
        : 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${isDark ? 'rgba(139, 69, 191, 0.2)' : 'rgba(99, 179, 237, 0.18)'}`,
      boxShadow: isDark
        ? '0 4px 16px rgba(0, 0, 0, 0.2)'
        : '0 2px 12px rgba(0, 0, 0, 0.05)',
    },
  };
};

export default useGlassmorphing;
