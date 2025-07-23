import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    useTheme,
    useMediaQuery,
    alpha,
    styled,
    Container,
} from '@mui/material';
import {
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    Login as LoginIcon,
    PersonAdd as RegisterIcon,
    Translate as TranslateIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUnifiedTheme } from '../context/UnifiedThemeContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import CyberWalletLogo from '@/components/ui/CyberWalletLogo';
import LandingSidebar from '@/layout/LandingSidebar';

// 🎨 Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: theme.palette.mode === 'dark'
        ? `rgba(26, 26, 46, 0.95)`
        : `rgba(255, 255, 255, 0.95)`,
    backdropFilter: 'blur(20px)',
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
    transition: 'all 0.3s ease',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.02)',
    },
    transition: 'transform 0.2s ease',
}));

const NavButton = styled(Button)(({ theme }) => ({
    fontWeight: 600,
    textTransform: 'none',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1, 2.5),
    '&:hover': {
        background: alpha(theme.palette.primary.main, 0.1),
        transform: 'translateY(-1px)',
    },
    transition: 'all 0.2s ease',
}));

const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
    background: alpha(theme.palette.primary.main, 0.1),
    '&:hover': {
        background: alpha(theme.palette.primary.main, 0.2),
        transform: 'scale(1.1)',
    },
    transition: 'all 0.2s ease',
}));

const LandingHeader: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { colorScheme, toggleColorScheme } = useUnifiedTheme();
    const { i18n } = useTranslation();
    
    // 📱 Mobile-first responsive
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    
    const [scrolled, setScrolled] = useState(false);

    // 📜 Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogoClick = () => {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const toggleLanguage = () => {
        const currentLang = i18n.language;
        const newLang = currentLang === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    return (
        <>
            <StyledAppBar 
                position="fixed" 
                elevation={scrolled ? 4 : 0}
                sx={{
                    zIndex: theme.zIndex.appBar,
                    background: scrolled 
                        ? (theme.palette.mode === 'dark'
                            ? `rgba(26, 26, 46, 0.98)`
                            : `rgba(255, 255, 255, 0.98)`)
                        : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: scrolled 
                        ? `1px solid ${alpha(theme.palette.divider, 0.1)}`
                        : 'none',
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar
                        disableGutters
                        sx={{
                            height: { xs: 64, md: 72 },
                            justifyContent: 'space-between',
                            px: { xs: 1, sm: 2 },
                        }}
                    >
                        {/* 🎯 Mobile Menu Button */}
                        {isMobile && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LandingSidebar />
                            </Box>
                        )}

                        {/* 🎨 Logo Section */}
                        <LogoContainer onClick={handleLogoClick}>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <CyberWalletLogo 
                                    size={isMobile ? 32 : 40}
                                    animated={true}
                                />
                            </motion.div>
                            
                            {!isMobile && (
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    <Typography
                                        variant="h5"
                                        component="span"
                                        sx={{
                                            fontWeight: 800,
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            letterSpacing: '-0.02em',
                                        }}
                                    >
                                        CyberWallet
                                    </Typography>
                                </motion.div>
                            )}
                        </LogoContainer>

                        {/* 🎯 Actions Section */}
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: { xs: 1, sm: 2 } 
                        }}>
                            {/* Language Toggle */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ThemeToggleButton
                                    onClick={toggleLanguage}
                                    size={isMobile ? "small" : "medium"}
                                    aria-label="Toggle language"
                                >
                                    <TranslateIcon fontSize={isMobile ? "small" : "medium"} />
                                </ThemeToggleButton>
                            </motion.div>
                            
                            {/* Theme Toggle */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ThemeToggleButton
                                    onClick={toggleColorScheme}
                                    size={isMobile ? "small" : "medium"}
                                    aria-label="Toggle theme"
                                >
                                    {colorScheme === 'dark' ? 
                                        <LightModeIcon fontSize={isMobile ? "small" : "medium"} /> : 
                                        <DarkModeIcon fontSize={isMobile ? "small" : "medium"} />
                                    }
                                </ThemeToggleButton>
                            </motion.div>

                            {/* 📱 Desktop Navigation */}
                            {!isMobile && (
                                <Box sx={{ display: 'flex', gap: 1.5, ml: 2 }}>
                                    {/* Navigation Links */}
                                    <motion.div
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.15 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <NavButton
                                            variant="text"
                                            onClick={() => {
                                                navigate('/about-me');
                                                setTimeout(() => {
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }, 100);
                                            }}
                                            size={isTablet ? "small" : "medium"}
                                        >
                                            Sobre Mí
                                        </NavButton>
                                    </motion.div>

                                    <motion.div
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.18 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <NavButton
                                            variant="text"
                                            onClick={() => {
                                                const featuresSection = document.getElementById('features-section');
                                                if (featuresSection) {
                                                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }}
                                            size={isTablet ? "small" : "medium"}
                                        >
                                            Características
                                        </NavButton>
                                    </motion.div>

                                    <motion.div
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <NavButton
                                            variant="outlined"
                                            startIcon={<LoginIcon />}
                                            onClick={handleLogin}
                                            size={isTablet ? "small" : "medium"}
                                        >
                                            Iniciar Sesión
                                        </NavButton>
                                    </motion.div>

                                    <motion.div
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <NavButton
                                            variant="contained"
                                            startIcon={<RegisterIcon />}
                                            onClick={handleRegister}
                                            size={isTablet ? "small" : "medium"}
                                            sx={{
                                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                                boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
                                                '&:hover': {
                                                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                                    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                                                },
                                            }}
                                        >
                                            Registrarse
                                        </NavButton>
                                    </motion.div>
                                </Box>
                            )}

                            {/* 📱 Mobile Actions */}
                            {isMobile && (
                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                    <IconButton
                                        onClick={handleLogin}
                                        size="small"
                                        sx={{
                                            color: theme.palette.primary.main,
                                            '&:hover': {
                                                background: alpha(theme.palette.primary.main, 0.1),
                                            }
                                        }}
                                    >
                                        <LoginIcon fontSize="small" />
                                    </IconButton>
                                    
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={handleRegister}
                                        startIcon={<RegisterIcon fontSize="small" />}
                                        sx={{
                                            minWidth: 'auto',
                                            px: 1.5,
                                            py: 0.5,
                                            fontSize: '0.75rem',
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            '&:hover': {
                                                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                            }
                                        }}
                                    >
                                        Registro
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </StyledAppBar>

            {/* Spacer for fixed header */}
            <Box sx={{ height: { xs: 64, md: 72 } }} />
        </>
    );
};

export default LandingHeader;
