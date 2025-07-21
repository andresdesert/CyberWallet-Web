// src/components/Landing/Technology.tsx
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  useTheme,
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import StorageIcon from '@mui/icons-material/Storage';
import UpdateIcon from '@mui/icons-material/Update';

interface Feature {
  title: string;
  description: string;
  Icon: React.ElementType;
  color: string;
}

const features: Feature[] = [
  {
    title: 'Seguridad Avanzada',
    description: 'Protección de última generación con encriptación de grado militar',
    Icon: SecurityIcon,
    color: '#1976d2' // primary
  },
  {
    title: 'Alto Rendimiento',
    description: 'Transacciones instantáneas con procesamiento optimizado',
    Icon: SpeedIcon,
    color: '#2e7d32' // success
  },
  {
    title: 'Autenticación Biométrica',
    description: 'Acceso seguro mediante reconocimiento biométrico',
    Icon: FingerprintIcon,
    color: '#0288d1' // info
  },
  {
    title: 'IA Predictiva',
    description: 'Análisis inteligente de patrones y predicciones financieras',
    Icon: AnalyticsIcon,
    color: '#9c27b0' // secondary
  },
  {
    title: 'Blockchain',
    description: 'Tecnología blockchain para máxima transparencia y seguridad',
    Icon: StorageIcon,
    color: '#f57c00' // warning
  },
  {
    title: 'Actualizaciones Continuas',
    description: 'Mejoras constantes y nuevas características',
    Icon: UpdateIcon,
    color: '#d32f2f' // error
  }
];

const Technology: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.8)} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.9)} 0%, transparent 100%)`
      }}
    >
      <Container maxWidth="lg">
        {/* — Header — */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontFamily: 'InterVariable, sans-serif',
              fontWeight: 800,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            Tecnología de Vanguardia
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: 'InterVariable, sans-serif',
              color: theme.palette.text.secondary
            }}
          >
            Nuestra plataforma utiliza las últimas innovaciones en seguridad y fintech
          </Typography>
        </Box>

        {/* — Grid de Features — */}
        <Grid container spacing={4} alignItems="stretch">
          {features.map((f, idx) => (
            <Grid
              key={f.title}
              size={{ xs: 12, sm: 6, md: 4 }}
              sx={{ display: 'flex' }}
            >
              <motion.div
                style={{ width: '100%', height: '100%', perspective: 800 }}
                whileHover={{ scale: 1.03, rotateX: 1, rotateY: 1 }}
                transition={{ type: 'spring', stiffness: 120 }}
              >
                <Paper
                  component="section"
                  aria-label={f.title}
                  tabIndex={0}
                  elevation={0}
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    background: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.background.paper, 0.3)
                      : alpha(theme.palette.background.paper, 0.6),
                    backdropFilter: 'blur(12px)',
                    borderRadius: 4,
                    border: `1px solid ${alpha(f.color, theme.palette.mode === 'dark' ? 0.2 : 0.3)}`,
                    boxShadow: theme.palette.mode === 'dark'
                      ? `0 4px 16px ${alpha(f.color, 0.1)}`
                      : `0 4px 16px ${alpha('#000', 0.05)}`,
                    p: 3,
                    transition: 'all 0.3s ease-in-out',
                    '&:focus-visible': {
                      outline: `2px solid ${theme.palette.primary.main}`,
                      outlineOffset: '2px'
                    }
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: alpha(f.color, 0.1),
                      color: f.color,
                      borderRadius: '50%',
                      p: 1.5,
                      mb: 2,
                      display: 'inline-flex'
                    }}
                  >
                    <f.Icon fontSize="large" />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'InterVariable, sans-serif',
                      fontWeight: 700,
                      mb: 1
                    }}
                  >
                    {f.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'InterVariable, sans-serif',
                      color: theme.palette.text.secondary,
                      px: 1
                    }}
                  >
                    {f.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Technology;
