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
        ? `linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)`
        : `linear-gradient(135deg, #f7fafc 0%, #edf2f7 50%, #f7fafc 100%)`,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // Responsive padding
      px: { xs: 0, sm: 0 }, // Sin padding horizontal extra
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.palette.mode === 'dark'
          ? `radial-gradient(circle at 60% 40%, ${alpha('#4299e1', 0.04)} 0%, transparent 70%),
             radial-gradient(circle at 20% 80%, ${alpha('#9f7aea', 0.03)} 0%, transparent 60%)`
          : `radial-gradient(circle at 60% 40%, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 70%)`,
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
          mt: { xs: 5, sm: 6, md: 8 }, 
          mx: 'auto', 
          textAlign: 'center', 
          maxWidth: '1200px', 
          position: 'relative', 
          zIndex: 1 
        }}>
          <TechnologySection />
        </Box>
        
        <Box sx={{ 
          mt: { xs: 4, sm: 6, md: 7 }, 
          mx: 'auto', 
          textAlign: 'center', 
          maxWidth: '1200px', 
          position: 'relative', 
          zIndex: 1 
        }}>
          <Testimonials />
        </Box>
        
        <Box sx={{ 
          mt: { xs: 4, sm: 6, md: 7 }, 
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
      
      {/* 🎯 NOTA: UnifiedNavigation deshabilitado para landing page 
          ya que LandingHeader maneja toda la navegación necesaria */}
    </Box>
  );
};

export default LandingPage;
