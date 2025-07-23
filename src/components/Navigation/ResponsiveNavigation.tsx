// 🎯 RESPONSIVE NAVIGATION - Navegación adaptativa para móvil y desktop
import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import UnifiedNavigation from './UnifiedNavigation';
import MobileNavigation from './MobileNavigation';

interface ResponsiveNavigationProps {
  variant?: 'landing' | 'dashboard' | 'default';
  showUserMenu?: boolean;
  showThemeToggle?: boolean;
  showLanguageToggle?: boolean;
  showNotifications?: boolean;
  showSpeedDial?: boolean;
  showScrollTop?: boolean;
  drawerWidth?: number;
  collapsed?: boolean;
  onCollapseToggle?: () => void;
}

const ResponsiveNavigation: React.FC<ResponsiveNavigationProps> = (props) => {
  const theme = useTheme();
  
  // Detectar si es móvil (mínimo 350px)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Usar navegación móvil para pantallas pequeñas
  if (isMobile) {
    return <MobileNavigation {...props} />;
  }
  
  // Usar navegación unificada para desktop
  return <UnifiedNavigation {...props} />;
};

export default ResponsiveNavigation; 