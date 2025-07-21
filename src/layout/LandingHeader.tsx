import React, { useState, useEffect, useCallback } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme,
    alpha,
    Container,
    Chip,
    Fade,
    Menu,
    MenuItem,
    Tooltip
} from '@mui/material';
import {
    Menu as MenuIcon,
    Close as CloseIcon,
    Language as LanguageIcon,
    Security as SecurityIcon,
    Speed as SpeedIcon,
    LinkedIn as LinkedInIcon,
    GitHub as GitHubIcon,
    Email as EmailIcon,
    Brightness4,
    Brightness7,
    SettingsBrightness
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CyberWalletLogo from '@/components/ui/CyberWalletLogo';
import { FadeInUp, HoverScale, SlideInRight } from '@/components/ui/MicroInteractions';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useUnifiedTheme } from '@/context/UnifiedThemeContext';

// 🎯 Hook personalizado para manejar scroll sticky moderno
const useStickyHeader = () => {
    const [scrollState, setScrollState] = useState({
        scrollY: 0,
        isScrolled: false,
        isScrollingUp: false,
        isAtTop: true,
    });

    const updateScrollState = useCallback(() => {
        const currentScrollY = window.scrollY;
        const isScrolled = currentScrollY > 20;
        const isScrollingUp = currentScrollY < scrollState.scrollY && currentScrollY > 100;
        const isAtTop = currentScrollY < 10;

        setScrollState(prev => ({
            scrollY: currentScrollY,
            isScrolled,
            isScrollingUp,
            isAtTop,
        }));
    }, [scrollState.scrollY]);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateScrollState();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [updateScrollState]);

    return scrollState;
};

// 🎨 Sistema de estilos dinámicos para el header
const getHeaderStyles = (theme: any, scrollState: any, isMobile: boolean) => {
    const { isScrolled, isAtTop, scrollY } = scrollState;
    
    // Calcular opacidad del backdrop dinámicamente
    const backdropOpacity = Math.min(scrollY / 100, 0.95);
    const shadowIntensity = Math.min(scrollY / 50, 1);
    const blurIntensity = Math.min(8 + (scrollY / 20), 20);

    return {
        background: isAtTop 
            ? 'transparent'
            : `rgba(${theme.palette.mode === 'dark' ? '18, 22, 34' : '255, 255, 255'}, ${backdropOpacity})`,
        
        backdropFilter: isScrolled ? `blur(${blurIntensity}px) saturate(200%)` : 'none',
        
        borderBottom: isScrolled 
            ? `1px solid ${alpha(theme.palette.divider, 0.1)}` 
            : 'none',
            
        boxShadow: isScrolled 
            ? `0 ${4 * shadowIntensity}px ${24 * shadowIntensity}px ${alpha('#000', theme.palette.mode === 'dark' ? 0.3 : 0.1)}`
            : 'none',
            
        transform: 'none',
        
        // 📱 Altura optimizada para móviles - más compacta pero accesible
        minHeight: isMobile ? '48px' : '80px',
        maxHeight: isMobile ? '48px' : 'auto',
        
        // 📱 Asegurar que el header sea completamente visible
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'dark'
                ? `linear-gradient(90deg, rgba(18,22,34,${backdropOpacity}) 0%, rgba(16,20,32,${backdropOpacity * 0.9}) 100%)`
                : `linear-gradient(90deg, rgba(255,255,255,${backdropOpacity}) 0%, rgba(248,250,252,${backdropOpacity * 0.95}) 100%)`,
            zIndex: -1,
            opacity: isScrolled ? 1 : 0,
            transition: 'opacity 0.3s ease',
        }
    };
};

const LandingHeader: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { t, i18n } = useTranslation('landing');
    const { colorScheme, toggleColorScheme } = useUnifiedTheme(); // 🎯 FIX: usar nombres correctos
    
    // 🎯 Hook de scroll sticky personalizado
    const scrollState = useStickyHeader();

    // 🎨 Elementos de navegación con iconos
    const navItems = [
        { label: t('header_inicio') || 'Inicio', href: '#hero', icon: <SecurityIcon /> },
        { label: t('header_caracteristicas') || 'Características', href: '#tecnologia-vanguardia', icon: <SpeedIcon /> },
        { label: t('header_sobre_mi') || 'Sobre Mí', href: '/about-me', icon: <LinkedInIcon /> },
        { label: t('header_contacto') || 'Contacto', href: '/contacto', icon: <EmailIcon /> }
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (language: string) => {
        i18n.changeLanguage(language);
        handleMenuClose();
    };

    const handleNavClick = (href: string) => {
        if (href.startsWith('/')) {
            navigate(href);
        } else if (href.startsWith('#')) {
            const elementId = href.substring(1);
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const handleContactClick = (type: 'linkedin' | 'github' | 'email') => {
        const urls = {
            linkedin: 'https://www.linkedin.com/in/andres-simahan/',
            github: 'https://github.com/andresdesert?tab=repositories',
            email: 'mailto:deluxogvc@gmail.com'
        };
        window.open(urls[type], '_blank');
    };

    // 🎨 Drawer content mejorado y optimizado para móviles
    const drawer = (
        <Box sx={{ width: '100%', p: 2, maxWidth: 320 }}> {/* Ancho completo en móviles pequeños */}
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                mb: 3,
                pb: 2,
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CyberWalletLogo size={36} />
                    <Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
                            CyberWallet
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Fintech 2025
                        </Typography>
                    </Box>
                </Box>
                <IconButton 
                    onClick={handleDrawerToggle}
                    size="small"
                    sx={{
                        background: alpha(theme.palette.primary.main, 0.1),
                        width: 36,
                        height: 36,
                        '&:hover': {
                            background: alpha(theme.palette.primary.main, 0.2),
                            transform: 'rotate(90deg)',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    <CloseIcon sx={{ fontSize: '18px' }} />
                </IconButton>
            </Box>
            
            <List sx={{ gap: 1 }}>
                {navItems.map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <ListItem 
                            component="button"
                            onClick={() => {
                                handleNavClick(item.href);
                                setMobileOpen(false);
                            }}
                            sx={{
                                borderRadius: 3,
                                mb: 1,
                                background: alpha(theme.palette.primary.main, 0.05),
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                '&:hover': {
                                    background: alpha(theme.palette.primary.main, 0.15),
                                    transform: 'translateX(8px)',
                                    borderColor: alpha(theme.palette.primary.main, 0.3),
                                },
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            <Box sx={{ mr: 2, color: theme.palette.primary.main }}>
                                {item.icon}
                            </Box>
                            <ListItemText 
                                primary={item.label}
                                sx={{
                                    '& .MuiTypography-root': {
                                        fontWeight: 600,
                                        fontSize: '1.1rem'
                                    }
                                }}
                            />
                        </ListItem>
                    </motion.div>
                ))}
            </List>

            {/* 🌐 Zona de contacto en móvil con mejor diseño */}
            <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                    {t('header_contacto_rapido') || 'Contacto Rápido'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    {[
                        { type: 'linkedin' as const, icon: <LinkedInIcon />, color: '#0077B5' },
                        { type: 'github' as const, icon: <GitHubIcon />, color: '#333' },
                        { type: 'email' as const, icon: <EmailIcon />, color: '#EA4335' }
                    ].map(({ type, icon, color }) => (
                        <Tooltip key={type} title={type.charAt(0).toUpperCase() + type.slice(1)}>
                            <IconButton
                                onClick={() => handleContactClick(type)}
                                sx={{
                                    background: alpha(color, 0.1),
                                    color: color,
                                    '&:hover': {
                                        background: alpha(color, 0.2),
                                        transform: 'scale(1.1)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {icon}
                            </IconButton>
                        </Tooltip>
                    ))}
                </Box>
            </Box>

            {/* 🚀 CTAs en móvil */}
            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* 🌓 Toggle de tema móvil */}
                <Button 
                    variant="outlined"
                    fullWidth
                    startIcon={colorScheme === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    onClick={() => {
                        toggleColorScheme();
                    }}
                    sx={{
                        borderRadius: 3,
                        py: 1.5,
                        borderWidth: 2,
                        borderColor: alpha(theme.palette.info.main, 0.3),
                        color: theme.palette.info.main,
                        '&:hover': {
                            borderWidth: 2,
                            borderColor: theme.palette.info.main,
                            background: alpha(theme.palette.info.main, 0.1),
                        },
                    }}
                >
                    {colorScheme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
                </Button>
                
                <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => {
                        navigate('/register');
                        setMobileOpen(false);
                    }}
                    sx={{
                        borderRadius: 3,
                        py: 1.5,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    {t('header_cta_registro') || 'Crear Cuenta'}
                </Button>
                <Button 
                    variant="outlined" 
                    fullWidth
                    onClick={() => {
                        navigate('/login');
                        setMobileOpen(false);
                    }}
                    sx={{
                        borderRadius: 3,
                        py: 1.5,
                        borderWidth: 2,
                        '&:hover': {
                            borderWidth: 2,
                            background: alpha(theme.palette.primary.main, 0.1),
                        },
                    }}
                >
                    {t('header_cta_login') || 'Iniciar Sesión'}
                </Button>
            </Box>
        </Box>
    );

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    ...getHeaderStyles(theme, scrollState, isMobile),
                    zIndex: 1300,
                    // 📱 Indicador visual de scroll horizontal en móviles
                    ...(isMobile && {
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            right: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '4px',
                            height: '20px',
                            background: `linear-gradient(180deg, transparent 0%, ${alpha(theme.palette.primary.main, 0.3)} 50%, transparent 100%)`,
                            borderRadius: '2px',
                            opacity: 0.6,
                            pointerEvents: 'none',
                            animation: 'pulse 2s infinite',
                            '@keyframes pulse': {
                                '0%, 100%': { opacity: 0.3 },
                                '50%': { opacity: 0.7 },
                            },
                        }
                    }),
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: scrollState.isScrolled
                            ? theme.palette.mode === 'dark'
                                ? `linear-gradient(90deg, rgba(18,22,34,0.95) 0%, rgba(16,20,32,0.9) 100%)`
                                : `linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)`
                            : 'transparent',
                        zIndex: -1,
                        opacity: scrollState.isScrolled ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                    }
                }}
            >
                <Container 
                    maxWidth="xl" 
                    sx={{ 
                        px: { xs: 0, sm: 2 }, // Sin padding en móviles para scroll completo
                        // 📱 Habilitar scroll horizontal en móviles como respaldo
                        ...(isMobile && {
                            overflowX: 'auto',
                            overflowY: 'visible',
                            '&::-webkit-scrollbar': {
                                height: '2px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'transparent',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: alpha(theme.palette.primary.main, 0.3),
                                borderRadius: '2px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: alpha(theme.palette.primary.main, 0.5),
                            },
                        })
                    }}
                >
                    <Toolbar sx={{ 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        py: scrollState.isScrolled ? (isMobile ? 0.25 : 0.5) : (isMobile ? 0.5 : 1.5), 
                        minHeight: isMobile ? '48px' : '80px',
                        maxHeight: isMobile ? '48px' : 'auto',
                        px: isMobile ? 1 : 0, // Padding mínimo en móviles
                        transition: 'padding 0.3s ease, min-height 0.3s ease',
                        // 📱 Configuración de scroll horizontal como respaldo
                        width: isMobile ? 'max-content' : '100%',
                        minWidth: isMobile ? '100%' : 'auto',
                        overflow: 'visible',
                        // 📱 Asegurar que el contenido sea scrolleable horizontalmente
                        ...(isMobile && {
                            gap: 1,
                            flexWrap: 'nowrap',
                        })
                    }}>
                        {/* 🎨 Logo con animación optimizado para móviles */}
                        <motion.div
                            animate={{ 
                                scale: scrollState.isScrolled ? (isMobile ? 0.9 : 0.9) : 1,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                cursor: 'pointer',
                                minWidth: 0,
                                flex: isMobile ? '0 0 auto' : '1 1 auto',
                                maxWidth: isMobile ? 'auto' : 'none',
                            }}>
                                {/* 🎯 Logo más compacto en móviles */}
                                <CyberWalletLogo size={
                                    isMobile 
                                        ? (scrollState.isScrolled ? 28 : 32) 
                                        : (scrollState.isScrolled ? 40 : 48)
                                } />
                                {/* Texto del logo solo en desktop */}
                                {!isMobile && (
                                    <Box sx={{ ml: 2 }}>
                                        <Typography 
                                            variant="h6" 
                                            fontWeight="bold"
                                            sx={{ 
                                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                                backgroundClip: 'text',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                fontSize: scrollState.isScrolled ? '1.1rem' : '1.25rem',
                                                transition: 'font-size 0.3s ease'
                                            }}
                                        >
                                            CyberWallet
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </motion.div>

                        {/* 🖥️ Navegación Desktop */}
                        {!isMobile && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                {navItems.map((item) => (
                                    <HoverScale key={item.label}>
                                        <Button
                                            onClick={() => handleNavClick(item.href)}
                                            sx={{
                                                color: theme.palette.text.primary,
                                                fontWeight: 500,
                                                borderRadius: 2,
                                                px: 2,
                                                py: 1,
                                                position: 'relative',
                                                '&:hover': {
                                                    background: alpha(theme.palette.primary.main, 0.1),
                                                    '&::after': {
                                                        transform: 'scaleX(1)',
                                                    }
                                                },
                                                '&::after': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: '50%',
                                                    transform: 'translateX(-50%) scaleX(0)',
                                                    width: '80%',
                                                    height: 2,
                                                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                                    borderRadius: 1,
                                                    transition: 'transform 0.3s ease',
                                                }
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    </HoverScale>
                                ))}

                                {/* 🌓 Toggle de tema */}
                                <Tooltip title={`Cambiar a modo ${colorScheme === 'dark' ? 'claro' : 'oscuro'}`}>
                                    <IconButton
                                        onClick={toggleColorScheme}
                                        sx={{
                                            background: alpha(theme.palette.primary.main, 0.1),
                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                            '&:hover': {
                                                background: alpha(theme.palette.primary.main, 0.2),
                                                borderColor: alpha(theme.palette.primary.main, 0.3),
                                                transform: 'scale(1.1)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {colorScheme === 'dark' ? <Brightness7 /> : <Brightness4 />}
                                    </IconButton>
                                </Tooltip>

                                {/* 🌐 Selector de idioma */}
                                <Tooltip title="Cambiar idioma">
                                    <IconButton
                                        onClick={handleMenuOpen}
                                        sx={{
                                            background: alpha(theme.palette.secondary.main, 0.1),
                                            border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                                            '&:hover': {
                                                background: alpha(theme.palette.secondary.main, 0.2),
                                                borderColor: alpha(theme.palette.secondary.main, 0.3),
                                                transform: 'scale(1.1)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <LanguageIcon />
                                    </IconButton>
                                </Tooltip>

                                {/* 🚀 CTAs Desktop */}
                                <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate('/login')}
                                        sx={{
                                            borderRadius: 2,
                                            borderWidth: 2,
                                            borderColor: theme.palette.primary.main,
                                            color: theme.palette.primary.main,
                                            '&:hover': {
                                                borderWidth: 2,
                                                borderColor: theme.palette.primary.dark,
                                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                                transform: 'translateY(-1px)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {t('header_cta_login') || 'Ingresar'}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => navigate('/register')}
                                        sx={{
                                            borderRadius: 2,
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                            '&:hover': {
                                                transform: 'translateY(-1px)',
                                                boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {t('header_cta_registro') || 'Crear Cuenta'}
                                    </Button>
                                </Box>
                            </Box>
                        )}

                        {/* 📱 Controles móviles optimizados con scroll horizontal */}
                        {isMobile && (
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 0.5,
                                minWidth: 0,
                                flex: '0 0 auto',
                                ml: 'auto',
                                // 📱 Navegación horizontal scrolleable como respaldo
                                overflowX: 'auto',
                                overflowY: 'visible',
                                maxWidth: '60vw', // Limitar ancho para permitir scroll
                                '&::-webkit-scrollbar': {
                                    height: '2px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: 'transparent',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: alpha(theme.palette.primary.main, 0.4),
                                    borderRadius: '2px',
                                },
                            }}>
                                {/* 🚀 Mini navegación horizontal en móviles */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    gap: 0.25, 
                                    alignItems: 'center',
                                    minWidth: 'max-content', // Forzar contenido a no cortarse
                                    pr: 1, // Padding derecho para scroll completo
                                }}>
                                    {/* 📍 Botones de navegación rápida en móviles */}
                                    {navItems.slice(0, 2).map((item, index) => ( // Solo mostrar 2 elementos principales
                                        <IconButton
                                            key={item.label}
                                            onClick={() => handleNavClick(item.href)}
                                            size="small"
                                            sx={{
                                                background: alpha(theme.palette.secondary.main, 0.1),
                                                border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                                                width: 28,
                                                height: 28,
                                                minWidth: 28,
                                                padding: 0,
                                                '&:hover': {
                                                    background: alpha(theme.palette.secondary.main, 0.2),
                                                },
                                                transition: 'all 0.2s ease',
                                            }}
                                        >
                                            {React.cloneElement(item.icon, { sx: { fontSize: '14px' } })}
                                        </IconButton>
                                    ))}

                                    {/* 🌓 Toggle de tema compacto */}
                                    <IconButton
                                        onClick={toggleColorScheme}
                                        size="small"
                                        sx={{
                                            background: alpha(theme.palette.primary.main, 0.1),
                                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                            width: 28,
                                            height: 28,
                                            minWidth: 28,
                                            padding: 0,
                                            '&:hover': {
                                                background: alpha(theme.palette.primary.main, 0.2),
                                                transform: 'scale(1.05)',
                                            },
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        {colorScheme === 'dark' ? 
                                            <Brightness7 sx={{ fontSize: '14px' }} /> : 
                                            <Brightness4 sx={{ fontSize: '14px' }} />
                                        }
                                    </IconButton>
                                    
                                    {/* 📱 Botón menú hamburguesa */}
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        edge="end"
                                        onClick={handleDrawerToggle}
                                        size="small"
                                        sx={{
                                            background: alpha(theme.palette.primary.main, 0.15),
                                            border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                            width: 32, // Ligeramente más grande para destacar
                                            height: 32,
                                            minWidth: 32,
                                            padding: 0,
                                            '&:hover': {
                                                background: alpha(theme.palette.primary.main, 0.25),
                                                transform: 'scale(1.1)',
                                                borderColor: alpha(theme.palette.primary.main, 0.5),
                                            },
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        <MenuIcon sx={{ fontSize: '16px', fontWeight: 'bold' }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        )}

                        {/* 📱 Versión anterior como respaldo
                        {isMobile && (
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 0.25, // Menos gap para pantallas muy pequeñas
                                minWidth: 0,
                                flex: '0 0 auto',
                                ml: 'auto', // Empujar a la derecha
                            }}>
                                <IconButton
                                    onClick={toggleColorScheme}
                                    size="small"
                                    sx={{
                                        background: alpha(theme.palette.primary.main, 0.1),
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                        width: 32, // Más pequeño para pantallas pequeñas
                                        height: 32,
                                        minWidth: 32,
                                        padding: 0,
                                        '&:hover': {
                                            background: alpha(theme.palette.primary.main, 0.2),
                                            transform: 'scale(1.05)',
                                        },
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {colorScheme === 'dark' ? 
                                        <Brightness7 sx={{ fontSize: '16px' }} /> : 
                                        <Brightness4 sx={{ fontSize: '16px' }} />
                                    }
                                </IconButton>
                                
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="end"
                                    onClick={handleDrawerToggle}
                                    size="small"
                                    sx={{
                                        background: alpha(theme.palette.primary.main, 0.1),
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                        width: 32, // Más compacto
                                        height: 32,
                                        minWidth: 32,
                                        padding: 0,
                                        '&:hover': {
                                            background: alpha(theme.palette.primary.main, 0.2),
                                            transform: 'scale(1.05)',
                                        },
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <MenuIcon sx={{ fontSize: '16px' }} />
                                </IconButton>
                            </Box>
                        )}
                        */}

                        {/* 📱 Botón móvil */}
                        {/* ELIMINADO - Reemplazado por la sección de controles móviles optimizada arriba */}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* 📱 Drawer móvil optimizado para pantallas pequeñas */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: { xs: '80vw', sm: 300 }, // 80% del viewport en móviles muy pequeños
                        maxWidth: 300,
                        background: alpha(theme.palette.background.paper, 0.98),
                        backdropFilter: 'blur(20px) saturate(200%)',
                        borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        boxShadow: `0 8px 32px ${alpha('#000', 0.2)}`,
                        // 📱 Asegurar que el drawer sea accesible
                        top: 0,
                        height: '100vh',
                        overflow: 'auto',
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* 🌐 Menú de idioma mejorado */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                TransitionComponent={Fade}
                PaperProps={{
                    sx: {
                        background: alpha(theme.palette.background.paper, 0.95),
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        borderRadius: 2,
                        minWidth: 200,
                        boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
                    }
                }}
            >
                <MenuItem onClick={() => handleLanguageChange('es')}>
                    <LanguageIcon sx={{ mr: 2 }} />
                    <Box>
                        <Typography variant="body2" fontWeight={600}>
                            Español
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Argentina
                        </Typography>
                    </Box>
                </MenuItem>
                <MenuItem onClick={() => handleLanguageChange('en')}>
                    <LanguageIcon sx={{ mr: 2 }} />
                    <Box>
                        <Typography variant="body2" fontWeight={600}>
                            English
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            International
                        </Typography>
                    </Box>
                </MenuItem>
            </Menu>

            {/* 📏 Spacer para header fixed - Optimizado para móviles */}
            <Toolbar sx={{ 
                minHeight: isMobile ? '48px' : '80px',
                maxHeight: isMobile ? '48px' : '80px',
                transition: 'min-height 0.3s ease',
                // 📱 Asegurar que el espaciado sea consistente
                padding: 0,
                margin: 0,
            }} />
        </>
    );
};

export default LandingHeader;
