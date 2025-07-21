import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';

// Iconos importados de Material Design Icons
import ShieldIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import BrainIcon from '@mui/icons-material/Psychology';
import BlockchainIcon from '@mui/icons-material/AccountTree';

interface TechnologyFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const technologies: TechnologyFeature[] = [
  {
    icon: <ShieldIcon sx={{ fontSize: 40 }} />,
    title: 'Seguridad Avanzada',
    description: 'Protección de última generación con encriptación de grado militar',
    color: '#2196f3' // blue
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40 }} />,
    title: 'Alto Rendimiento',
    description: 'Transacciones instantáneas con procesamiento optimizado',
    color: '#4caf50' // green
  },
  {
    icon: <FingerprintIcon sx={{ fontSize: 40 }} />,
    title: 'Autenticación Biométrica',
    description: 'Acceso seguro mediante reconocimiento biométrico',
    color: '#9c27b0' // purple
  },
  {
    icon: <BrainIcon sx={{ fontSize: 40 }} />,
    title: 'IA Predictiva',
    description: 'Análisis inteligente de patrones y predicciones financieras',
    color: '#e91e63' // pink
  },
  {
    icon: <BlockchainIcon sx={{ fontSize: 40 }} />,
    title: 'Blockchain',
    description: 'Tecnología blockchain para máxima transparencia y seguridad',
    color: '#ff9800' // orange
  }
];

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const TechnologySection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="tecnologia-vanguardia"
      sx={{
        py: 'clamp(4rem, 10vw, 8rem)',
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 100%)`
          : `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 100%)`
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            component="h2"
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              fontFamily: 'InterVariable, sans-serif'
            }}
          >
            Tecnología de Vanguardia
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 600,
              mx: 'auto',
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              fontWeight: 400,
              lineHeight: 1.6,
              letterSpacing: '0.015em',
              fontFamily: 'InterVariable, sans-serif'
            }}
          >
            Nuestra plataforma utiliza las últimas innovaciones en seguridad y fintech
          </Typography>
        </Box>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Grid 
            container 
            spacing={{ xs: 3, md: 4 }}
            sx={{ 
              justifyContent: 'center',
              alignItems: 'stretch'
            }}
          >
            {technologies.map((tech, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tech.title}>
                <motion.div variants={itemVariant} transition={{ type: "spring", stiffness: 100 }} style={{ height: '100%' }}>
                  <Paper
                    elevation={0}
                    sx={{
                      height: '100%',
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      background: alpha(theme.palette.background.paper, 0.6),
                      backdropFilter: 'blur(12px)',
                      borderRadius: 4,
                      border: `1px solid ${alpha(tech.color, 0.1)}`,
                      boxShadow: `0 8px 32px ${alpha(tech.color, 0.1)}`,
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 48px ${alpha(tech.color, 0.2)}`,
                        '& .icon': {
                          transform: 'scale(1.1)',
                          color: tech.color
                        }
                      }
                    }}
                  >
                    <Box
                      className="icon"
                      sx={{
                        color: alpha(tech.color, 0.8),
                        mb: 2,
                        transition: 'all 0.3s ease-in-out',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: alpha(tech.color, 0.1),
                      }}
                    >
                      {tech.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                        fontFamily: 'InterVariable, sans-serif'
                      }}
                    >
                      {tech.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                        fontFamily: 'InterVariable, sans-serif'
                      }}
                    >
                      {tech.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TechnologySection;
