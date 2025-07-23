import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    useTheme,
    alpha,
    Paper
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FadeInUp } from '@/components/ui/MicroInteractions';

const EducationalFooter: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box sx={{ py: 8 }}>
            <Container maxWidth="lg">
                <FadeInUp>
                    <Paper
                        sx={{
                            p: { xs: 4, md: 6 },
                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                            backdropFilter: 'blur(20px)',
                            borderRadius: 4,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            variant="overline"
                            sx={{
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                                letterSpacing: 2,
                                mb: 2,
                                display: 'block'
                            }}
                        >
                            PROYECTO EDUCATIVO
                        </Typography>

                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                fontWeight: 800,
                                mb: 3,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Descubre más sobre el desarrollador
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                color: theme.palette.text.secondary,
                                maxWidth: 800,
                                mx: 'auto',
                                mb: 4,
                                fontSize: '1.1rem',
                                lineHeight: 1.6
                            }}
                        >
                            CyberWallet es un proyecto de código abierto creado con fines educativos y como parte de mi portafolio profesional. 
                            Detrás de esta aplicación hay un desarrollador apasionado por crear experiencias digitales seguras y elegantes.
                            ¿Te gustaría conocer más sobre mi experiencia y habilidades?
                        </Typography>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/about-me')}
                                startIcon={<PersonIcon />}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    borderRadius: 3,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.25)}`,
                                    '&:hover': {
                                        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                        transform: 'translateY(-2px)',
                                        boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Conoce al Desarrollador
                            </Button>
                        </motion.div>

                        {/* Licencia y atribución */}
                        <Typography
                            variant="caption"
                            sx={{
                                display: 'block',
                                mt: 4,
                                color: theme.palette.text.secondary,
                                opacity: 0.8
                            }}
                        >
                            Este proyecto está bajo la licencia MIT y es completamente de código abierto.
                            Creado con pasión por la tecnología y el desarrollo de software.
                        </Typography>
                    </Paper>
                </FadeInUp>
            </Container>
        </Box>
    );
};

export default EducationalFooter;
