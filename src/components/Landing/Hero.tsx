import React from 'react';
import {
    Box,
    Typography,
    Container,
    Button,
    Tooltip,
    alpha,
    useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FadeInUp } from '@/components/ui/MicroInteractions';
import CyberWalletLogo from '@/components/ui/CyberWalletLogo';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { t } = useTranslation('landing');

    return (
        <Box
            id="home"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                background: `radial-gradient(circle at 50% 50%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
                py: { xs: 8, sm: 12 },
                px: { xs: 2, sm: 4 }
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    textAlign: 'center',
                    maxWidth: 800,
                    mx: 'auto'
                }}>
                    {/* 🎨 Logo prominente con microinteracciones */}
                    <FadeInUp delay={0.1}>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ 
                                duration: 0.8, 
                                ease: [0.25, 0.46, 0.45, 0.94],
                                delay: 0.1 
                            }}
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.3 }
                            }}
                            style={{
                                display: 'inline-flex',
                                marginBottom: theme.spacing(6),
                                padding: theme.spacing(3),
                                borderRadius: theme.spacing(4),
                                background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.default, 0.9)})`,
                                backdropFilter: 'blur(25px)',
                                border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
                                position: 'relative',
                                zIndex: 10,
                            }}
                        >
                            <CyberWalletLogo 
                                size={150}
                                animated={true}
                            />
                        </motion.div>
                    </FadeInUp>

                    {/* 🎯 Texto de marca */}
                    <FadeInUp delay={0.15}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontSize: { xs: '1.1rem', sm: '1.3rem' },
                                fontWeight: 600,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2,
                                letterSpacing: '0.05em'
                            }}
                        >
                            CyberWallet
                        </Typography>
                    </FadeInUp>

                    {/* 🎯 Título principal */}
                    <FadeInUp delay={0.2}>
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                                fontWeight: 800,
                                lineHeight: 1.1,
                                mb: 3,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontFamily: 'var(--font-heading)',
                                textShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                            }}
                        >
                            {t('hero_titulo')}
                        </Typography>
                    </FadeInUp>
                        
                    <FadeInUp delay={0.25}>
                        <Typography
                            variant="h2"
                            component="h2"
                            sx={{
                                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                                fontWeight: 500,
                                color: theme.palette.text.secondary,
                                mb: 4,
                                lineHeight: 1.4
                            }}
                        >
                            {t('hero_slogan')}
                        </Typography>
                    </FadeInUp>
                        
                    <FadeInUp delay={0.3}>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '1.1rem',
                                color: theme.palette.text.secondary,
                                mb: 6,
                                lineHeight: 1.6,
                                maxWidth: 600
                            }}
                        >
                            {t('hero_descripcion')}
                        </Typography>
                    </FadeInUp>
                        
                    <FadeInUp delay={0.35}>
                        <Box sx={{ 
                            display: 'flex', 
                            gap: { xs: 2, sm: 3 }, 
                            flexWrap: 'wrap', 
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: { xs: 'column', sm: 'row' }
                        }}>
                            {/* Botón principal: Registrarse */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => navigate('/register')}
                                    startIcon={<span style={{ fontSize: '1.2rem' }}>🚀</span>}
                                    sx={{
                                        px: { xs: 4, sm: 6 },
                                        py: 2,
                                        fontSize: { xs: '1rem', sm: '1.2rem' },
                                        fontWeight: 700,
                                        borderRadius: '16px',
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        boxShadow: `0 8px 32px ${theme.palette.primary.main}40`,
                                        border: `2px solid ${theme.palette.primary.main}`,
                                        minWidth: { xs: 200, sm: 220 },
                                        textTransform: 'none',
                                        '&:hover': {
                                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                            boxShadow: `0 12px 40px ${theme.palette.primary.main}60`,
                                            transform: 'translateY(-2px)',
                                        }
                                    }}
                                >
                                    Comenzar Ahora
                                </Button>
                            </motion.div>
                            
                            {/* Botón secundario: Iniciar Sesión */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Tooltip 
                                    title="Puedes iniciar sesión con cualquier credencial, este proyecto es una demo funcional"
                                    arrow
                                    placement="bottom"
                                >
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={() => navigate('/login')}
                                        sx={{
                                            px: { xs: 2, sm: 3 },
                                            py: 1.5,
                                            fontSize: { xs: '0.9rem', sm: '1rem' },
                                            fontWeight: 500,
                                            color: theme.palette.primary.main,
                                            textTransform: 'none',
                                            borderRadius: '12px',
                                            borderColor: alpha(theme.palette.primary.main, 0.5),
                                            backdropFilter: 'blur(8px)',
                                            backgroundColor: alpha(
                                                theme.palette.mode === 'dark' 
                                                    ? theme.palette.common.white 
                                                    : theme.palette.common.black,
                                                0.05
                                            ),
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                                borderColor: theme.palette.primary.main,
                                            }
                                        }}
                                    >
                                        Iniciar Sesión
                                    </Button>
                                </Tooltip>
                            </motion.div>
                        </Box>
                        
                        {/* Segunda fila de botones */}
                        <Box sx={{ 
                            display: 'flex', 
                            gap: { xs: 1.5, sm: 2 }, 
                            flexWrap: 'wrap', 
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt: { xs: 2, sm: 3 },
                            flexDirection: { xs: 'column', sm: 'row' }
                        }}>
                            {/* Botón: Sobre Mi */}
                            <Button
                                variant="text"
                                onClick={() => navigate('/about-cv')}
                                sx={{
                                    px: { xs: 2, sm: 3 },
                                    py: 1,
                                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                                    fontWeight: 500,
                                    color: theme.palette.text.secondary,
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        color: theme.palette.primary.main,
                                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                    }
                                }}
                            >
                                Sobre Mí
                            </Button>
                            
                            {/* Botón: Características */}
                            <Button
                                variant="text"
                                onClick={() => {
                                    // Scroll suave a la sección de tecnología
                                    const techSection = document.getElementById('technology-section');
                                    if (techSection) {
                                        techSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                sx={{
                                    px: { xs: 2, sm: 3 },
                                    py: 1,
                                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                                    fontWeight: 500,
                                    color: theme.palette.text.secondary,
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        color: theme.palette.primary.main,
                                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                    }
                                }}
                            >
                                Características
                            </Button>
                        </Box>
                    </FadeInUp>
                </Box>
            </Container>
        </Box>
    );
};

export default Hero;