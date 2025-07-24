import React from 'react';
import { 
  Box, 
  Container, 
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import Hero from '../components/Landing/Hero';
import TechnologySection from '../components/Landing/TechnologySection';
import Testimonials from '../components/Landing/Testimonials';
import EducationalFooter from '../components/Landing/EducationalFooter';
import LandingHeader from '../layout/LandingHeader';
import LandingSidebar from '../layout/LandingSidebar';
import { UnifiedNavigation } from '@/components/Navigation';
import { useTranslation } from 'react-i18next';
import { useResponsiveBreakpoint } from '@/hooks/useEnvironment';

const LandingPage: React.FC = () => {
  const { t } = useTranslation('landing');
  const theme = useTheme();
  
  // 🎯 NUEVA ESTRATEGIA: Mobile-first con graceful degradation
  const { shouldShowMobileNav, isMobile } = useResponsiveBreakpoint();

  // Función para volver arriba suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100%',
      background: theme.palette.mode === 'dark'
        ? `linear-gradient(135deg, #181f2a 0%, #232b3e 100%)`
        : `linear-gradient(135deg, #f6f7fb 0%, #e9ecf3 100%)`,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.palette.mode === 'dark'
          ? `radial-gradient(circle at 60% 40%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`
          : `radial-gradient(circle at 60% 40%, ${alpha(theme.palette.primary.main, 0.06)} 0%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 0
      }
    }}>
      <LandingHeader />
      
      <Container 
        maxWidth="xl" 
        sx={{ 
          width: '100%', 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          position: 'relative', 
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Hero />
        
        <Box sx={{ 
          mt: { xs: 6, sm: 8, md: 10 }, 
          mx: 'auto', 
          textAlign: 'center', 
          maxWidth: '1200px', 
          position: 'relative', 
          zIndex: 1 
        }}>
          <TechnologySection />
        </Box>
        
        <Box sx={{ 
          mt: { xs: 6, sm: 8, md: 10 }, 
          mx: 'auto', 
          textAlign: 'center', 
          maxWidth: '1200px', 
          position: 'relative', 
          zIndex: 1 
        }}>
          <Testimonials />
        </Box>
        
        <Box sx={{ 
          mt: { xs: 6, sm: 8, md: 10 }, 
          mb: 4, 
          mx: 'auto', 
          textAlign: 'center', 
          maxWidth: '1200px', 
          position: 'relative', 
          zIndex: 1 
        }}>
          <EducationalFooter />
        </Box>
        
        <Box sx={{ mt: 4, mb: 8, textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={scrollToTop}
            size={isMobile ? "medium" : "large"}
            startIcon={<KeyboardArrowUp />}
            sx={{ 
              px: { xs: 3, sm: 4 }, 
              py: { xs: 1, sm: 1.5 },
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
              },
              transition: 'all 0.3s ease'
            }}
          >
            Volver Arriba
          </Button>
        </Box>
      </Container>
      
      {/* 🎯 MÓVIL: Sidebar de navegación con estrategia mobile-first */}
      {shouldShowMobileNav && <LandingSidebar />}
      
      {/* 🎯 NAVEGACIÓN UNIFICADA: Reemplaza todos los componentes de navegación */}
      <UnifiedNavigation 
        variant="landing"
        showUserMenu={false}
        showThemeToggle={true}
        showLanguageToggle={true}
        showNotifications={false}
        showSpeedDial={true}
        showScrollTop={true}
      />
    </Box>
  );
};

export default LandingPage;
