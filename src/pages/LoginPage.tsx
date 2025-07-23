import React, { useState } from 'react';
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    IconButton,
    InputAdornment,
    Paper,
    Link,
    Divider,
    useTheme,
    Alert,
    Collapse,
    Chip,
    alpha,
} from '@mui/material';
import { getActiveTokens } from '@/theme/tokens/colorTokens';
import { 
    Visibility, 
    VisibilityOff, 
    Login as LoginIcon,
    Info,
    Close,
    ContentCopy,
    AutoAwesome
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { motion } from 'motion/react';
import CyberWalletLogo from '@/components/ui/CyberWalletLogo';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const semanticTokens = getActiveTokens(isDark);

    const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showDemoAlert, setShowDemoAlert] = useState(true);

    const demoCredentials = {
        email: 'demo@cyberwallet.com',
        password: 'demo123'
    };

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert(`${type} copiado al portapapeles!`);
        });
    };

    const autoFillCredentials = () => {
        setFormData({
            emailOrUsername: demoCredentials.email,
            password: demoCredentials.password
        });
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleLogin = () => {
        // Mock login: Redirigir al dashboard
        navigate('/dashboard');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Efectos de fondo mejorados */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -200,
                    left: -200,
                    width: 400,
                    height: 400,
                    background: `radial-gradient(circle, ${theme.palette.primary.main}15 0%, transparent 70%)`,
                    borderRadius: '50%',
                    animation: 'float 6s ease-in-out infinite',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -150,
                    right: -150,
                    width: 300,
                    height: 300,
                    background: `radial-gradient(circle, ${theme.palette.secondary.main}15 0%, transparent 70%)`,
                    borderRadius: '50%',
                    animation: 'float 8s ease-in-out infinite reverse',
                }}
            />

            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                width: '100%',
                maxWidth: 500,
                mx: 'auto'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                >
                    {/* Demo Mode Alert */}
                    <Collapse in={showDemoAlert}>
                        <Alert
                            severity="info"
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
                                width: 520, // Un poco más ancho que el formulario
                                borderRadius: '16px',
                                background: `linear-gradient(135deg, ${theme.palette.info.main}10, ${theme.palette.primary.main}08)`,
                                border: `1px solid ${theme.palette.info.main}30`,
                                '& .MuiAlert-message': {
                                    width: '100%',
                                    textAlign: 'center',
                                }
                            }}
                        >
                        <Box sx={{ width: '100%' }}>
                            <Typography variant="body2" fontWeight="700" sx={{ mb: 1, color: 'info.main' }}>
                                🎭 Modo Demo Activo
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Esta es una versión de demostración. Los datos mostrados son simulados.
                            </Typography>
                            
                            {/* Credenciales en forma de T */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                {/* Fila superior - Email */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 1,
                                    p: 1.5,
                                    bgcolor: semanticTokens.surface.secondary,
                                    borderRadius: '12px',
                                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                                    minWidth: 280
                                }}>
                                    <Typography variant="body2" fontWeight="600" color="text.primary">
                                        📧 demo@cyberwallet.com
                                    </Typography>
                                    <IconButton 
                                        size="small" 
                                        onClick={() => copyToClipboard(demoCredentials.email, 'Email')}
                                        sx={{ ml: 'auto' }}
                                    >
                                        <ContentCopy fontSize="small" />
                                    </IconButton>
                                </Box>

                                {/* Fila inferior - Password */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 1,
                                    p: 1.5,
                                    bgcolor: semanticTokens.surface.secondary,
                                    borderRadius: '12px',
                                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                                    minWidth: 280
                                }}>
                                    <Typography variant="body2" fontWeight="600" color="text.primary">
                                        🔑 demo123
                                    </Typography>
                                    <IconButton 
                                        size="small" 
                                        onClick={() => copyToClipboard(demoCredentials.password, 'Contraseña')}
                                        sx={{ ml: 'auto' }}
                                    >
                                        <ContentCopy fontSize="small" />
                                    </IconButton>
                                </Box>

                                {/* Botón de autocompletado */}
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<AutoAwesome />}
                                    onClick={autoFillCredentials}
                                    sx={{
                                        mt: 1,
                                        borderRadius: '20px',
                                        textTransform: 'none',
                                        px: 3,
                                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        '&:hover': {
                                            background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                        }
                                    }}
                                >
                                    Autocompletar credenciales
                                </Button>
                            </Box>
                        </Box>
                    </Alert>
                </Collapse>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, sm: 4 },
                        maxWidth: 420,
                        width: '100%',
                        borderRadius: '24px',
                        background: theme.palette.mode === 'dark'
                            ? `linear-gradient(135deg, ${semanticTokens.surface.primary} 0%, ${theme.palette.grey[800]} 100%)`
                            : `linear-gradient(135deg, ${theme.palette.common.white} 0%, ${theme.palette.grey[50]} 100%)`,
                        backdropFilter: 'blur(20px)',
                        border: `3px solid ${theme.palette.primary.main}20`,
                        boxShadow: theme.palette.mode === 'dark'
                            ? `0 20px 60px ${theme.palette.background.default}60, 0 8px 32px ${theme.palette.primary.main}20`
                            : `0 20px 60px ${theme.palette.grey[200]}80, 0 8px 32px ${theme.palette.primary.main}15`,
                        position: 'relative',
                        overflow: 'hidden',
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
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 4, position: 'relative', zIndex: 2 }}>
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <CyberWalletLogo size={64} animated />
                        </motion.div>
                        
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 1,
                                mt: 2,
                                fontFamily: 'var(--font-heading)',
                            }}
                        >
                            Bienvenido
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                color: 'var(--text-secondary)',
                                lineHeight: 1.6,
                            }}
                        >
                            Inicia sesión en tu cuenta
                        </Typography>
                    </Box>

                    {/* Formulario */}
                    <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                        <TextField
                            fullWidth
                            label="Email o nombre de usuario"
                            variant="outlined"
                            value={formData.emailOrUsername}
                            onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })}
                            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                            sx={{
                                mb: 'var(--spacing-lg)',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 'var(--border-radius-lg)',
                                    backgroundColor: 'var(--surface-elevated)',
                                    backdropFilter: 'var(--glass-backdrop)',
                                    '& fieldset': {
                                        borderColor: 'var(--border-default)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'var(--semantic-primary)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'var(--semantic-primary)',
                                        boxShadow: 'var(--focus-ring)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'var(--text-secondary)',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'var(--semantic-primary)',
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Contraseña"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                            sx={{ color: 'var(--text-secondary)' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mb: 'var(--spacing-lg)',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 'var(--border-radius-lg)',
                                    backgroundColor: 'var(--surface-elevated)',
                                    backdropFilter: 'var(--glass-backdrop)',
                                    '& fieldset': {
                                        borderColor: 'var(--border-default)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'var(--semantic-primary)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'var(--semantic-primary)',
                                        boxShadow: 'var(--focus-ring)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'var(--text-secondary)',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'var(--semantic-primary)',
                                },
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            onClick={handleLogin}
                            startIcon={<LoginIcon />}
                            sx={{
                                py: 'var(--spacing-md)',
                                borderRadius: 'var(--border-radius-lg)',
                                background: 'var(--gradient-primary)',
                                color: 'var(--on-primary)',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                boxShadow: 'var(--shadow-lg)',
                                mb: 'var(--spacing-lg)',
                                '&:hover': {
                                    background: 'var(--gradient-primary-intense)',
                                    boxShadow: 'var(--shadow-xl)',
                                    transform: 'translateY(-2px)',
                                },
                                '&:disabled': {
                                    background: 'var(--text-disabled)',
                                    color: 'var(--surface-paper)',
                                },
                            }}
                        >
                            Iniciar Sesión
                        </Button>
                    </Box>

                    <Divider sx={{ 
                        mb: 'var(--spacing-lg)',
                        borderColor: 'var(--border-light)',
                    }} />

                    {/* Enlaces */}
                    <Box sx={{ textAlign: 'center', mb: 'var(--spacing-md)' }}>
                        <Link
                            component={RouterLink}
                            to="/forgot-password"
                            sx={{
                                color: 'var(--semantic-primary)',
                                textDecoration: 'none',
                                fontWeight: 500,
                                '&:hover': {
                                    textDecoration: 'underline',
                                    color: 'var(--semantic-primary-intense)',
                                },
                            }}
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 1 }}>
                            ¿No tienes una cuenta?
                        </Typography>
                        <Link
                            component={RouterLink}
                            to="/register"
                            sx={{
                                color: 'var(--semantic-secondary)',
                                textDecoration: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    textDecoration: 'underline',
                                    color: 'var(--semantic-secondary-intense)',
                                },
                            }}
                        >
                            Crear cuenta nueva
                        </Link>
                    </Box>

                    <Box sx={{ textAlign: 'center', mt: 'var(--spacing-md)' }}>
                        <Link
                            onClick={() => navigate('/')}
                            sx={{
                                color: 'var(--semantic-primary)',
                                textDecoration: 'none',
                                fontWeight: 500,
                                '&:hover': {
                                    textDecoration: 'underline',
                                    color: 'var(--semantic-primary-intense)',
                                },
                            }}
                        >
                            Volver al Inicio
                        </Link>
                    </Box>

                    {/* Efectos decorativos */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -50,
                            right: -50,
                            width: 100,
                            height: 100,
                            background: 'var(--gradient-primary-subtle)',
                            borderRadius: 'var(--border-radius-full)',
                            opacity: 0.1,
                            zIndex: 0,
                        }}
                    />
                </Paper>
                </motion.div>
            </Box>
        </Box>
    );
};

export default LoginPage;