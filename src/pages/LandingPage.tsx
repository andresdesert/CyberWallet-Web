import React from 'react';
import {
  Container,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Componentes locales
import LandingHeader from '@/layout/LandingHeader';
import LandingSidebar from '@/layout/LandingSidebar';
import Hero from '@/components/Landing/Hero';
import TechnologySection from '@/components/Landing/TechnologySection';
import Testimonials from '@/components/Landing/Testimonials';
import EducationalFooter from '@/components/Landing/EducationalFooter';

const LandingPage: React.FC = () => {
  const { t } = useTranslation('landing');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
      <Container maxWidth="xl" sx={{ py: 4, mx: 'auto', textAlign: 'center', position: 'relative', zIndex: 1, px: { xs: 2, md: 4 } }}>
        <Hero />
        <Box sx={{ mt: 8, mx: 'auto', textAlign: 'center', maxWidth: '1200px', position: 'relative', zIndex: 1 }}>
          <TechnologySection />
        </Box>
        <Box sx={{ mt: 8, mx: 'auto', textAlign: 'center', maxWidth: '1200px', position: 'relative', zIndex: 1 }}>
          <Testimonials />
        </Box>
        <Box sx={{ mt: 8, mb: 4, mx: 'auto', textAlign: 'center', maxWidth: '1200px', position: 'relative', zIndex: 1 }}>
          <EducationalFooter />
        </Box>
        <Box sx={{ mt: 4, mb: 8, textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={scrollToTop}
            size="large"
            startIcon={<KeyboardArrowUp />}
            sx={{ 
              px: 4, 
              py: 1.5,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
              },
              transition: 'all 0.3s ease'
            }}
          >
            Volver Arriba
          </Button>
        </Box>
      </Container>
      {isMobile && <LandingSidebar />}
    </Box>
  );
};

export default LandingPage;
