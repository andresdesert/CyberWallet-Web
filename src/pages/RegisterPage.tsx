import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Container,
  Alert,
  Collapse,
  IconButton,
  useTheme,
  alpha,
  Card,
  CardContent
} from '@mui/material';
import { 
  Info, 
  Close, 
  Login,
  AutoAwesome,
  ContentCopy,
  Rocket,
  Security,
  Speed
} from '@mui/icons-material';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { getActiveTokens } from '@/theme/tokens/colorTokens';
import CyberWalletLogo from '@/components/ui/CyberWalletLogo';

const RegisterPage: React.FC = () => {
    const [showDemoAlert, setShowDemoAlert] = useState(true);
    const navigate = useNavigate();
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const semanticTokens = getActiveTokens(isDark);
    
    // Demo credentials for reference
    const demoCredentials = {
        email: 'demo@cyberwallet.com',
        password: 'demo123'
    };

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text).then(() => {
            // TODO: Replace with proper notification system
            console.warn(`${type} copiado al portapapeles`);
        });
    };

    const autoLogin = () => {
        // Simular login automático y redirigir al dashboard
        navigate('/dashboard');
    };

    const goToLogin = () => {
        navigate('/login');
    };

    const goHome = () => {
        navigate('/');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 1, sm: 2 },
                position: 'relative',
                overflow: 'auto',
                boxSizing: 'border-box',
            }}
        >
            {/* Efectos de fondo animados */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: { xs: 200, sm: 300 },
                    height: { xs: 200, sm: 300 },
                    background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
                    borderRadius: '50%',
                    animation: 'float 6s ease-in-out infinite',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '15%',
                    right: '15%',
                    width: { xs: 150, sm: 250 },
                    height: { xs: 150, sm: 250 },
                    background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.12)} 0%, transparent 70%)`,
                    borderRadius: '50%',
                    animation: 'float 8s ease-in-out infinite reverse',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: '60%',
                    left: '5%',
                    width: { xs: 100, sm: 180 },
                    height: { xs: 100, sm: 180 },
                    background: `radial-gradient(circle, ${alpha(theme.palette.info.main, 0.1)} 0%, transparent 70%)`,
                    borderRadius: '50%',
                    animation: 'pulse 4s ease-in-out infinite',
                }}
            />

            <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Demo Mode Alert */}
                    <Collapse in={showDemoAlert}>
                        <Alert
                            severity="warning"
                            icon={<Info />}
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => setShowDemoAlert(false)}
                                >
                                    <Close fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ 
                                mb: 3,
                                borderRadius: '16px',
                                background: theme.palette.mode === 'dark'
                                    ? `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.08)})`
                                    : `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.08)}, ${alpha(theme.palette.primary.main, 0.06)})`,
                                border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                                backdropFilter: 'blur(10px)',
                                '& .MuiAlert-message': {
                                    width: '100%',
                                    textAlign: 'center',
                                },
                            }}
                        >
                            <Typography variant="body2" fontWeight="700" sx={{ mb: 1, color: 'warning.main' }}>
                                🚀 Esta es solo una demostración
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                No necesitas registrarte. Esta aplicación está en modo demo con datos simulados.
                            </Typography>
                            
                            {/* Credenciales demo */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 1,
                                    p: 1.5,
                                    bgcolor: theme.palette.mode === 'dark'
                                        ? alpha(theme.palette.background.paper, 0.7)
                                        : alpha(theme.palette.common.white, 0.8),
                                    borderRadius: '12px',
                                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                                    minWidth: 250,
                                }}>
                                    <Typography variant="body2" fontWeight="600" sx={{ flex: 1, fontSize: '0.875rem' }}>
                                        📧 {demoCredentials.email}
                                    </Typography>
                                    <IconButton size="small" onClick={() => copyToClipboard(demoCredentials.email, 'Email')}>
                                        <ContentCopy fontSize="small" />
                                    </IconButton>
                                </Box>
                                
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 1,
                                    p: 1.5,
                                    bgcolor: theme.palette.mode === 'dark'
                                        ? alpha(theme.palette.background.paper, 0.7)
                                        : alpha(theme.palette.common.white, 0.8),
                                    borderRadius: '12px',
                                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                                    minWidth: 250,
                                }}>
                                    <Typography variant="body2" fontWeight="600" sx={{ flex: 1, fontSize: '0.875rem' }}>
                                        🔑 {demoCredentials.password}
                                    </Typography>
                                    <IconButton size="small" onClick={() => copyToClipboard(demoCredentials.password, 'Contraseña')}>
                                        <ContentCopy fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Alert>
                    </Collapse>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, sm: 4 },
                            borderRadius: '24px',
                            background: theme.palette.mode === 'dark'
                                ? `linear-gradient(135deg, ${semanticTokens.surface.primary} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`
                                : `linear-gradient(135deg, 
                                    rgba(255, 255, 255, 0.95) 0%, 
                                    rgba(248, 250, 252, 0.9) 50%, 
                                    rgba(243, 244, 246, 0.95) 100%)`,
                            backdropFilter: 'blur(20px)',
                            border: theme.palette.mode === 'dark'
                                ? `3px solid ${alpha(theme.palette.primary.main, 0.2)}`
                                : `3px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                            boxShadow: theme.palette.mode === 'dark'
                                ? `0 25px 70px ${alpha(theme.palette.background.default, 0.6)}, 0 12px 40px ${alpha(theme.palette.primary.main, 0.2)}`
                                : `0 30px 80px ${alpha(theme.palette.primary.main, 0.12)}, 0 16px 50px ${alpha(theme.palette.secondary.main, 0.08)}`,
                            position: 'relative',
                            overflow: 'hidden',
                            textAlign: 'center',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            }
                        }}
                    >
                        {/* Logo y título */}
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <CyberWalletLogo size={80} animated />
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <Typography
                                variant="h3"
                                component="h1"
                                sx={{
                                    fontWeight: 700,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    mb: 2,
                                    mt: 3,
                                    fontSize: { xs: '2rem', sm: '2.5rem' },
                                    animation: 'glow 2s ease-in-out infinite alternate',
                                }}
                            >
                                Página Demo
                            </Typography>
                            
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    color: 'text.secondary',
                                    mb: 4,
                                    lineHeight: 1.6,
                                    fontSize: { xs: '1rem', sm: '1.25rem' },
                                }}
                            >
                                ¡No necesitas registrarte! <br />
                                Esta es una demostración completa con datos simulados.
                            </Typography>
                        </motion.div>

                        {/* Características demo */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
                                <Card sx={{ 
                                    flex: 1, 
                                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)}, ${alpha(theme.palette.info.main, 0.06)})`,
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                }}>
                                    <CardContent sx={{ textAlign: 'center', p: 2 }}>
                                        <Rocket sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                        <Typography variant="body2" fontWeight="600">
                                            Acceso Inmediato
                                        </Typography>
                                    </CardContent>
                                </Card>
                                
                                <Card sx={{ 
                                    flex: 1, 
                                    background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.08)}, ${alpha(theme.palette.success.main, 0.06)})`,
                                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                                }}>
                                    <CardContent sx={{ textAlign: 'center', p: 2 }}>
                                        <Security sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                                        <Typography variant="body2" fontWeight="600">
                                            Datos Simulados
                                        </Typography>
                                    </CardContent>
                                </Card>
                                
                                <Card sx={{ 
                                    flex: 1, 
                                    background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.08)}, ${alpha(theme.palette.warning.main, 0.06)})`,
                                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                                }}>
                                    <CardContent sx={{ textAlign: 'center', p: 2 }}>
                                        <Speed sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                                        <Typography variant="body2" fontWeight="600">
                                            Experiencia Completa
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </motion.div>

                        {/* Botones de acción */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    onClick={autoLogin}
                                    startIcon={<AutoAwesome />}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 3,
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        color: theme.palette.primary.contrastText,
                                        fontWeight: 600,
                                        fontSize: { xs: '1rem', sm: '1.1rem' },
                                        boxShadow: theme.shadows[8],
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                            transform: 'translateY(-2px)',
                                            boxShadow: theme.shadows[12],
                                        },
                                    }}
                                >
                                    Ingresar Automáticamente
                                </Button>
                                
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    size="large"
                                    onClick={goToLogin}
                                    startIcon={<Login />}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 3,
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary.main,
                                        fontWeight: 600,
                                        fontSize: { xs: '1rem', sm: '1.1rem' },
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                            transform: 'translateY(-1px)',
                                        },
                                    }}
                                >
                                    Ir al Login
                                </Button>
                            </Box>
                            
                            <Button
                                variant="text"
                                onClick={goHome}
                                sx={{
                                    color: 'text.secondary',
                                    textDecoration: 'underline',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: 'primary.main',
                                    },
                                }}
                            >
                                Volver al Inicio
                            </Button>
                        </motion.div>
                    </Paper>
                </motion.div>
            </Container>

            <style>
                {`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(2deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.05); opacity: 1; }
                }
                
                @keyframes glow {
                    0% { filter: brightness(1); }
                    100% { filter: brightness(1.1); }
                }
                `}
            </style>
        </Box>
    );
};

export default RegisterPage;
