import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  TextField,
  Container,
  Alert,
  Collapse,
  IconButton,
  Chip,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
  Card,
  CardContent,
  Avatar,
  useTheme,
  alpha
} from '@mui/material';
import { 
  Info, 
  Close, 
  Home, 
  ArrowBack, 
  ArrowForward, 
  Person,
  Badge,
  LocationOn,
  AccountCircle,
  ContentCopy,
  AutoAwesome,
  Login
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getActiveTokens } from '@/theme/tokens/colorTokens';

const steps = ['Datos personales', 'Datos de identidad', 'Dirección'];

const RegisterPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
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
            alert(`${type} copiado al portapapeles!`);
        });
    };

    const goToLogin = () => {
        navigate('/login');
    };
    
    // Mock form data
    const [formData, setFormData] = useState({
        // Datos personales
        nombre: 'Juan Carlos',
        apellido: 'Pérez',
        email: 'juan.perez@email.com',
        telefono: '+54 9 11 1234-5678',
        fechaNacimiento: '1990-05-15',
        
        // Datos de identidad
        tipoDocumento: 'DNI',
        numeroDocumento: '35123456',
        cuil: '20-35123456-7',
        
        // Dirección
        calle: 'Av. Corrientes',
        numero: '1234',
        piso: '5',
        departamento: 'B',
        codigoPostal: '1043',
        ciudad: 'Buenos Aires',
        provincia: 'CABA'
    });

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleGoToLogin = () => {
        navigate('/login');
    };

    const handleGoHome = () => {
        navigate('/');
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const renderStepIcon = (index: number) => {
        const icons = [Person, Badge, LocationOn];
        const Icon = icons[index];
        return (
            <Avatar
                sx={{
                    bgcolor: currentStep >= index ? 'primary.main' : 'grey.300',
                    color: 'white',
                    width: 40,
                    height: 40
                }}
            >
                <Icon />
            </Avatar>
        );
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: 
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Stack spacing={3}>
                            <Typography variant="h6" color="primary" gutterBottom>
                                Información Personal
                            </Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                                <TextField
                                    label="Nombre"
                                    value={formData.nombre}
                                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    label="Apellido"
                                    value={formData.apellido}
                                    onChange={(e) => handleInputChange('apellido', e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Box>
                            <TextField
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                                <TextField
                                    label="Teléfono"
                                    value={formData.telefono}
                                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    label="Fecha de Nacimiento"
                                    type="date"
                                    value={formData.fechaNacimiento}
                                    onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Box>
                        </Stack>
                    </motion.div>
                );
                
            case 1: 
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Stack spacing={3}>
                            <Typography variant="h6" color="primary" gutterBottom>
                                Datos de Identidad
                            </Typography>
                            <FormControl fullWidth>
                                <InputLabel>Tipo de Documento</InputLabel>
                                <Select
                                    value={formData.tipoDocumento}
                                    onChange={(e) => handleInputChange('tipoDocumento', e.target.value)}
                                    label="Tipo de Documento"
                                >
                                    <MenuItem value="DNI">DNI</MenuItem>
                                    <MenuItem value="PASAPORTE">Pasaporte</MenuItem>
                                    <MenuItem value="LC">Libreta Cívica</MenuItem>
                                </Select>
                            </FormControl>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                                <TextField
                                    label="Número de Documento"
                                    value={formData.numeroDocumento}
                                    onChange={(e) => handleInputChange('numeroDocumento', e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    label="CUIL/CUIT"
                                    value={formData.cuil}
                                    onChange={(e) => handleInputChange('cuil', e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Box>
                            <Alert severity="info" sx={{ borderRadius: '12px' }}>
                                <Typography variant="body2">
                                    📷 En un registro real, aquí subirías fotos del frente y dorso de tu documento.
                                </Typography>
                            </Alert>
                        </Stack>
                    </motion.div>
                );
                
            case 2: 
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Stack spacing={3}>
                            <Typography variant="h6" color="primary" gutterBottom>
                                Dirección de Residencia
                            </Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' }, gap: 2 }}>
                                <TextField
                                    label="Calle"
                                    value={formData.calle}
                                    onChange={(e) => handleInputChange('calle', e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    label="Número"
                                    value={formData.numero}
                                    onChange={(e) => handleInputChange('numero', e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Box>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
                                <TextField
                                    label="Piso"
                                    value={formData.piso}
                                    onChange={(e) => handleInputChange('piso', e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    label="Depto"
                                    value={formData.departamento}
                                    onChange={(e) => handleInputChange('departamento', e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    label="Código Postal"
                                    value={formData.codigoPostal}
                                    onChange={(e) => handleInputChange('codigoPostal', e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Box>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                                <TextField
                                    label="Ciudad"
                                    value={formData.ciudad}
                                    onChange={(e) => handleInputChange('ciudad', e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                                <FormControl fullWidth>
                                    <InputLabel>Provincia</InputLabel>
                                    <Select
                                        value={formData.provincia}
                                        onChange={(e) => handleInputChange('provincia', e.target.value)}
                                        label="Provincia"
                                    >
                                        <MenuItem value="CABA">CABA</MenuItem>
                                        <MenuItem value="Buenos Aires">Buenos Aires</MenuItem>
                                        <MenuItem value="Córdoba">Córdoba</MenuItem>
                                        <MenuItem value="Santa Fe">Santa Fe</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Acepto los términos y condiciones"
                            />
                        </Stack>
                    </motion.div>
                );
                
            default: 
                return <Typography>Error: paso inválido</Typography>;
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                maxHeight: '100vh',
                width: '100%',
                maxWidth: '100vw',
                background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[900]} 100%)`
                    : `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.secondary.main}10 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
                position: 'relative',
                overflow: 'hidden',
                // 🎯 CRÍTICO: Constraints para evitar stretching en producción
                aspectRatio: 'auto',
                boxSizing: 'border-box',
            }}
        >
            {/* Background decorations */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -100,
                    left: -100,
                    width: 200,
                    height: 200,
                    background: `radial-gradient(circle, ${theme.palette.primary.main}20 0%, transparent 70%)`,
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

            <Container maxWidth="md">
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
                                mx: 'auto',
                                maxWidth: 700,
                                borderRadius: '16px',
                                background: `linear-gradient(135deg, ${theme.palette.warning.main}10, ${theme.palette.primary.main}08)`,
                                border: `1px solid ${theme.palette.warning.main}30`,
                                '& .MuiAlert-message': {
                                    width: '100%',
                                    textAlign: 'center',
                                }
                            }}
                        >
                            <Box sx={{ width: '100%' }}>
                                <Typography variant="body2" fontWeight="700" sx={{ mb: 1, color: 'warning.main' }}>
                                    🎭 Esto es solo una demostración
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    No necesitas registrarte. Esta aplicación está en modo demo con datos simulados.
                                </Typography>
                                
                                {/* Credenciales demo en forma de T */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 3 }}>
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
                                </Box>

                                {/* Botones de acción */}
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        startIcon={<Login />}
                                        onClick={goToLogin}
                                        sx={{
                                            borderRadius: '20px',
                                            textTransform: 'none',
                                            px: 3,
                                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            '&:hover': {
                                                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                            }
                                        }}
                                    >
                                        Ir al Login
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<Home />}
                                        onClick={handleGoHome}
                                        sx={{
                                            borderRadius: '20px',
                                            textTransform: 'none',
                                            px: 3,
                                        }}
                                    >
                                        Volver al Inicio
                                    </Button>
                                </Stack>
                            </Box>
                        </Alert>
                    </Collapse>

                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, sm: 4 },
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
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Typography 
                                    variant="h4" 
                                    fontWeight={700}
                                    sx={{
                                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: 1
                                    }}
                                >
                                    Crear Cuenta
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Completa los siguientes pasos para registrarte
                                </Typography>
                            </motion.div>
                        </Box>

                        {/* Navigation Buttons */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
                            <Button
                                variant="outlined"
                                startIcon={<Home />}
                                onClick={handleGoHome}
                                sx={{ borderRadius: '20px' }}
                            >
                                Inicio
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<AccountCircle />}
                                onClick={handleGoToLogin}
                                sx={{ borderRadius: '20px' }}
                            >
                                Iniciar Sesión
                            </Button>
                        </Box>

                        <Divider sx={{ mb: 4 }} />

                        {/* Stepper */}
                        <Box sx={{ mb: 4 }}>
                            <Stepper 
                                activeStep={currentStep} 
                                alternativeLabel
                                sx={{
                                    '& .MuiStepConnector-line': {
                                        borderColor: theme.palette.divider,
                                        borderTopWidth: 2,
                                    },
                                    '& .Mui-active .MuiStepConnector-line': {
                                        borderColor: theme.palette.primary.main,
                                    },
                                    '& .Mui-completed .MuiStepConnector-line': {
                                        borderColor: theme.palette.primary.main,
                                    }
                                }}
                            >
                                {steps.map((label, index) => (
                                    <Step key={index}>
                                        <StepLabel
                                            StepIconComponent={() => renderStepIcon(index)}
                                            sx={{
                                                '& .MuiStepLabel-label': {
                                                    fontWeight: currentStep === index ? 600 : 400,
                                                    color: currentStep >= index ? 'primary.main' : 'text.secondary'
                                                }
                                            }}
                                        >
                                            {label}
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>

                        {/* Form Content */}
                        <Card 
                            sx={{ 
                                mb: 4, 
                                borderRadius: '16px',
                                background: semanticTokens.surface.primary,
                                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>
                                {renderStepContent()}
                            </CardContent>
                        </Card>

                        {/* Navigation Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button 
                                disabled={currentStep === 0} 
                                onClick={handleBack}
                                startIcon={<ArrowBack />}
                                sx={{ borderRadius: '20px' }}
                            >
                                Atrás
                            </Button>
                            
                            <Typography variant="body2" color="text.secondary">
                                Paso {currentStep + 1} de {steps.length}
                            </Typography>
                            
                            {currentStep === steps.length - 1 ? (
                                <Button 
                                    variant="contained"
                                    onClick={handleGoToLogin}
                                    endIcon={<AccountCircle />}
                                    sx={{ borderRadius: '20px' }}
                                >
                                    Ir al Login Demo
                                </Button>
                            ) : (
                                <Button 
                                    onClick={handleNext}
                                    variant="contained"
                                    endIcon={<ArrowForward />}
                                    sx={{ borderRadius: '20px' }}
                                >
                                    Siguiente
                                </Button>
                            )}
                        </Box>

                        {/* Demo Notice */}
                        <Alert 
                            severity="info" 
                            sx={{ 
                                mt: 4, 
                                borderRadius: '12px',
                                background: alpha(theme.palette.info.main, 0.1)
                            }}
                        >
                            <Typography variant="body2">
                                💡 <strong>Recordatorio:</strong> Este es un formulario de demostración. 
                                Los datos se precargan automáticamente para mostrar la funcionalidad.
                            </Typography>
                        </Alert>
                    </Paper>
                </motion.div>
            </Container>

            <style>
                {`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                `}
            </style>
        </Box>
    );
};

export default RegisterPage;
