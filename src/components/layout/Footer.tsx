import { Email, GitHub, LinkedIn, WhatsApp, LocationOn } from '@mui/icons-material';
import { Box, Container, IconButton, Link, Typography, Divider } from '@mui/material';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, md: 6 },
        px: 2,
        mt: 'auto',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(13, 15, 17, 0.95) 0%, rgba(31, 35, 40, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.95) 100%)',
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        backdropFilter: 'blur(20px)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.03) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.03) 0%, transparent 50%)'
              : 'radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.02) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.02) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 4,
            }}
          >
            {/* Información Personal */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  background: (theme) => 
                    `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Andrés Simahan
              </Typography>
              <Typography 
                variant="subtitle1" 
                color="text.secondary" 
                sx={{ 
                  fontWeight: 500,
                  mb: 2 
                }}
              >
                Sr. QA Analyst & Performance Testing Specialist
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 1 }}>
                <LocationOn sx={{ color: 'text.secondary', fontSize: '1.1rem' }} />
                <Typography variant="body2" color="text.secondary">
                  Buenos Aires, Argentina
                </Typography>
              </Box>
            </Box>

            {/* Información de Contacto */}
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 3
                }}
              >
                Contacto
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: 'center' }}>
                  <Email sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
                  <Link 
                    href="mailto:andres.simahan@gmail.com" 
                    color="inherit"
                    sx={{ 
                      textDecoration: 'none',
                      '&:hover': { 
                        color: 'primary.main',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    andres.simahan@gmail.com
                  </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: 'center' }}>
                  <WhatsApp sx={{ color: '#25D366', fontSize: '1.2rem' }} />
                  <Link 
                    href="https://wa.me/5491134253488" 
                    target="_blank" 
                    color="inherit"
                    sx={{ 
                      textDecoration: 'none',
                      '&:hover': { 
                        color: '#25D366',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    +54 9 11 3425-3488
                  </Link>
                </Box>
              </Box>
            </Box>

            {/* Redes Sociales */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'right' } }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 3
                }}
              >
                Sígueme
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, gap: 2 }}>
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconButton
                    component="a"
                    href="https://github.com/andresdesert"
                    target="_blank"
                    aria-label="GitHub"
                    sx={{ 
                      color: 'text.primary',
                      backgroundColor: (theme) => 
                        theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.05)' 
                          : 'rgba(0, 0, 0, 0.05)',
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      '&:hover': {
                        backgroundColor: (theme) => 
                          theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.1)' 
                            : 'rgba(0, 0, 0, 0.1)',
                        color: 'primary.main',
                      }
                    }}
                  >
                    <GitHub />
                  </IconButton>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconButton
                    component="a"
                    href="https://www.linkedin.com/in/andres-simahan/"
                    target="_blank"
                    aria-label="LinkedIn"
                    sx={{ 
                      color: 'text.primary',
                      backgroundColor: (theme) => 
                        theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.05)' 
                          : 'rgba(0, 0, 0, 0.05)',
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      '&:hover': {
                        backgroundColor: '#0077B5',
                        color: 'white',
                      }
                    }}
                  >
                    <LinkedIn />
                  </IconButton>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconButton
                    component="a"
                    href="https://wa.me/5491134253488"
                    target="_blank"
                    aria-label="WhatsApp"
                    sx={{ 
                      color: 'text.primary',
                      backgroundColor: (theme) => 
                        theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.05)' 
                          : 'rgba(0, 0, 0, 0.05)',
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      '&:hover': {
                        backgroundColor: '#25D366',
                        color: 'white',
                      }
                    }}
                  >
                    <WhatsApp />
                  </IconButton>
                </motion.div>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 4, opacity: 0.6 }} />

          {/* Copyright */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                fontWeight: 400,
                opacity: 0.8
              }}
            >
              © {new Date().getFullYear()} Andrés Simahan. Todos los derechos reservados.
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ 
                fontWeight: 300,
                opacity: 0.6,
                mt: 0.5,
                display: 'block'
              }}
            >
              Desarrollado con ❤️ y las mejores prácticas de UX/UI 2025
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;