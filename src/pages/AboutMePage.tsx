import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  Container,
  Typography,
  Box,
  Avatar,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Chip,
  alpha,
  styled,
  Card,
  CardContent,
  Stack,
  Fab,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Skeleton,
  Drawer,
  SwipeableDrawer,
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Download as DownloadIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  ArrowBack as ArrowBackIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Business as BusinessIcon,
  Star as StarIcon,
  WhatsApp as WhatsAppIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';
import { getActiveTokens } from '@/theme/tokens/colorTokens';
import { migrateGetGlass } from '@/theme/utils/surfaceHelper';
import { useUnifiedTheme } from '../context/UnifiedThemeContext';

// Importar imágenes estáticamente
import profilePhoto from '../assets/profile-photo.png';
import istqbBanner from '../assets/Banner ISTQB.png';
import cvFile from '../assets/CV-QA-Simahan.pdf';

// 🚀 DYNAMIC IMPORTS: Carga lazy para componentes no críticos
const ParticleBackground = lazy(() => import('../components/ParticleBackground'));

// 🎨 Styled Components con Glassmorphism optimizados
const BackgroundContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  // 🎨 BACKGROUND DINÁMICO: Gradiente suave y sofisticado
  background: theme.palette.mode === 'dark' 
    ? `linear-gradient(135deg, 
        rgb(0, 0, 0) 0%, 
        rgb(15, 23, 42) 25%, 
        rgb(30, 41, 59) 50%, 
        rgb(15, 23, 42) 75%, 
        rgb(0, 0, 0) 100%
      )`
    : `linear-gradient(135deg, 
        rgb(248, 250, 252) 0%, 
        rgb(241, 245, 249) 25%, 
        rgb(226, 232, 240) 50%, 
        rgb(241, 245, 249) 75%, 
        rgb(248, 250, 252) 100%
      )`,
  color: theme.palette.mode === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(26, 32, 44)',
  
  // 🌟 PATRÓN SUTIL: Textura visual sin distraer
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: theme.palette.mode === 'dark'
      ? `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
         radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
         radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)`
      : `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
         radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
         radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.03) 0%, transparent 50%)`,
    zIndex: 0,
    pointerEvents: 'none',
  },
  
  // 🎭 ELEMENTOS FLOTANTES: Puntos decorativos
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: theme.palette.mode === 'dark'
      ? `radial-gradient(2px 2px at 20px 30px, rgba(59, 130, 246, 0.3), transparent),
         radial-gradient(2px 2px at 40px 70px, rgba(139, 92, 246, 0.3), transparent),
         radial-gradient(1px 1px at 90px 40px, rgba(16, 185, 129, 0.3), transparent),
         radial-gradient(1px 1px at 130px 80px, rgba(59, 130, 246, 0.3), transparent),
         radial-gradient(2px 2px at 160px 30px, rgba(139, 92, 246, 0.3), transparent)`
      : `radial-gradient(2px 2px at 20px 30px, rgba(59, 130, 246, 0.2), transparent),
         radial-gradient(2px 2px at 40px 70px, rgba(139, 92, 246, 0.2), transparent),
         radial-gradient(1px 1px at 90px 40px, rgba(16, 185, 129, 0.2), transparent),
         radial-gradient(1px 1px at 130px 80px, rgba(59, 130, 246, 0.2), transparent),
         radial-gradient(2px 2px at 160px 30px, rgba(139, 92, 246, 0.2), transparent)`,
    backgroundRepeat: 'repeat',
    backgroundSize: '200px 200px',
    zIndex: 0,
    pointerEvents: 'none',
    animation: 'floatingDots 20s ease-in-out infinite',
  },
  
  // 🌊 ANIMACIÓN SUTIL
  '@keyframes floatingDots': {
    '0%, 100%': {
      transform: 'translateY(0px) rotate(0deg)',
      opacity: 0.7,
    },
    '50%': {
      transform: 'translateY(-10px) rotate(180deg)',
      opacity: 1,
    },
  },
}));

const GeometricOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  pointerEvents: 'none',
  opacity: theme.palette.mode === 'dark' ? 0.03 : 0.02,
  backgroundImage: `
    linear-gradient(30deg, transparent 24%, 
      ${theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 25%, 
      ${theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 26%, 
      transparent 27%, transparent 74%, 
      ${theme.palette.mode === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)'} 75%, 
      ${theme.palette.mode === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)'} 76%, 
      transparent 77%, transparent),
    linear-gradient(-30deg, transparent 24%, 
      ${theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)'} 25%, 
      ${theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)'} 26%, 
      transparent 27%, transparent 74%, 
      ${theme.palette.mode === 'dark' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(244, 63, 94, 0.05)'} 75%, 
      ${theme.palette.mode === 'dark' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(244, 63, 94, 0.05)'} 76%, 
      transparent 77%, transparent)
  `,
  backgroundSize: '60px 104px',
  animation: 'geometricFloat 30s ease-in-out infinite',
  '@keyframes geometricFloat': {
    '0%, 100%': {
      transform: 'translateX(0px) translateY(0px)',
    },
    '33%': {
      transform: 'translateX(10px) translateY(-5px)',
    },
    '66%': {
      transform: 'translateX(-5px) translateY(10px)',
    },
  },
}));

const FloatingElements = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  pointerEvents: 'none',
  overflow: 'hidden',
  '& .floating-element': {
    position: 'absolute',
    borderRadius: '50%',
    animation: 'floatUpDown 8s ease-in-out infinite',
  },
  '& .floating-element:nth-of-type(1)': {
    top: '20%',
    left: '10%',
    width: '4px',
    height: '4px',
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.3)',
    animationDelay: '0s',
    boxShadow: `0 0 20px ${theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.6)' : 'rgba(59, 130, 246, 0.4)'}`,
  },
  '& .floating-element:nth-of-type(2)': {
    top: '60%',
    right: '15%',
    width: '6px',
    height: '6px',
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(139, 92, 246, 0.4)' : 'rgba(139, 92, 246, 0.3)',
    animationDelay: '2s',
    boxShadow: `0 0 25px ${theme.palette.mode === 'dark' ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.4)'}`,
  },
  '& .floating-element:nth-of-type(3)': {
    top: '80%',
    left: '20%',
    width: '3px',
    height: '3px',
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.3)',
    animationDelay: '4s',
    boxShadow: `0 0 15px ${theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.6)' : 'rgba(16, 185, 129, 0.4)'}`,
  },
  '& .floating-element:nth-of-type(4)': {
    top: '30%',
    right: '25%',
    width: '5px',
    height: '5px',
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(244, 63, 94, 0.4)' : 'rgba(244, 63, 94, 0.3)',
    animationDelay: '6s',
    boxShadow: `0 0 20px ${theme.palette.mode === 'dark' ? 'rgba(244, 63, 94, 0.6)' : 'rgba(244, 63, 94, 0.4)'}`,
  },
  '@keyframes floatUpDown': {
    '0%, 100%': {
      transform: 'translateY(0px) scale(1)',
      opacity: 0.7,
    },
    '50%': {
      transform: 'translateY(-20px) scale(1.2)',
      opacity: 1,
    },
  },
}));

const GlassHeroSection = styled(motion.section)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  paddingTop: theme.spacing(8),
}));

const GlassCard = styled(Card)(({ theme }) => ({
  ...migrateGetGlass.medium(theme.palette.mode),
  borderRadius: 24, // Equivalente a 2xl (24px)
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  // 🚨 TÉCNICA RADICAL: Forzar background visible en dark mode
  backgroundColor: theme.palette.mode === 'dark' ? 'rgb(30, 41, 59) !important' : 'rgba(255, 255, 255, 0.95)',
  border: theme.palette.mode === 'dark' ? '2px solid rgb(71, 85, 105) !important' : '1px solid rgba(203, 213, 224, 0.8)',
  '&:hover': {
    transform: 'translateY(-8px)',
    ...migrateGetGlass.strong(theme.palette.mode),
    backgroundColor: theme.palette.mode === 'dark' ? 'rgb(71, 85, 105) !important' : 'rgba(255, 255, 255, 0.98)',
  },
}));

const ProfileAvatar = styled(Box)(({ theme }) => ({
  // 🎯 RESPONSIVE: Tamaños adaptativos para avatar
  width: 200,
  height: 200,
  border: `4px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  boxShadow: `0 0 30px ${alpha(theme.palette.primary.main, 0.4)}`,
  margin: 'auto',
  borderRadius: '50%',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    width: 120,  // 120px en móviles pequeños
    height: 120,
    border: `3px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: 150,  // 150px en tablets
    height: 150,
  },
  [theme.breakpoints.up('lg')]: {
    width: 220,  // 220px en pantallas grandes
    height: 220,
    border: `5px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  },
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 0 40px ${alpha(theme.palette.primary.main, 0.6)}`,
  }
}));

const AnimatedAppBar = styled(AppBar)(({ theme }) => ({
  ...migrateGetGlass.medium(theme.palette.mode),
  backdropFilter: 'blur(20px)',
  // 🚨 TÉCNICA RADICAL: Forzar AppBar visible en dark mode
  backgroundColor: theme.palette.mode === 'dark' ? 'rgb(30, 41, 59) !important' : 'rgba(255, 255, 255, 0.95)',
  borderBottom: theme.palette.mode === 'dark' ? '2px solid rgb(71, 85, 105) !important' : '1px solid rgba(203, 213, 224, 0.8)',
}));

const ContactButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  padding: '12px 24px',
  textTransform: 'none',
  fontWeight: 600,
  // 🎯 CONTRASTE EXTREMO: Botones siempre visibles
  background: theme.palette.mode === 'dark' 
    ? `linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))` 
    : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: '#ffffff !important',
  border: theme.palette.mode === 'dark' 
    ? '2px solid rgb(59, 130, 246) !important' 
    : '2px solid transparent',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 20px rgba(59, 130, 246, 0.4) !important'
    : `0 2px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    background: theme.palette.mode === 'dark' 
      ? `linear-gradient(135deg, rgb(99, 170, 255), rgb(179, 132, 255))` 
      : `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 30px rgba(59, 130, 246, 0.6) !important'
      : `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
  },
}));

// 🎭 Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const AboutMePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { mode, toggleColorScheme } = useUnifiedTheme();
  
  // 🎯 TOKENS SEMÁNTICOS: Sistema unificado para contraste garantizado
  const semanticTokens = getActiveTokens(theme.palette.mode === 'dark');
  
  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Scroll management
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mobile menu handlers
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    handleMobileMenuClose();
  };

  const navigateToHome = () => {
    navigate('/');
    handleMobileMenuClose();
  };

  const experienceData = [
    {
      company: "BOZ IT DEVELOPMENT / INTERMEX",
      position: "QA Engineer – Seal Team (Blueprint Project)",
      period: "Ene 2025 – Actualidad",
      location: "Remoto (México)",
      description: [
        "Diseñé, analicé y ejecuté casos de prueba desde el Sprint 0, aplicando Left Shift Testing para detección temprana de defectos.",
        "Colaboré en el desarrollo de un blueprint estratégico utilizando .NET Aspire con Scalar, optimizando procesos empresariales.",
        "Implementé pruebas de carga con K6 para load testing y baseline, fortaleciendo automatización con Playwright."
      ],
      technologies: ["Postman", "Swagger", "Docker", "Azure DevOps", "K6", "Playwright", ".NET Aspire", "Scalar"]
    },
    {
      company: "BOZ IT DEVELOPMENT / INTERMEX",
      position: "Sr. QA Analyst – Proyecto Payers",
      period: "May 2023 – Ene 2025",
      location: "Remoto (México)",
      description: [
        "Ejecuté pruebas manuales especializadas para servicios de pagos y validación de transacciones en tiempo real.",
        "Gestioné ambientes de pruebas y coordiné resolución de errores en producción con equipos de desarrollo.",
        "Implementé mejoras en eficiencia del proceso de testing con certificaciones en análisis de pagadores y mitigación de riesgos."
      ],
      technologies: ["Postman", "SoapUI", "SQL", "Azure DevOps", "Payment Testing", "Risk Management"]
    },
    {
      company: "QUALIS LAB",
      position: "QA Analyst – Proyecto Homologaciones (Core Business)",
      period: "Jun 2022 – May 2023",
      location: "Argentina",
      description: [
        "Validé y certifiqué productos bancarios, asegurando cumplimiento de estándares de homologación rigurosos.",
        "Coordiné proactivamente con equipos de producto y gestioné tickets de soporte para clientes bancarios.",
        "Mejoré estabilidad del sistema en 20% colaborando en resolución de incidencias críticas durante UAT."
      ],
      technologies: ["Postman", "SQL", "Jira", "Swagger", "Banking Systems", "Homologation Testing"]
    },
    {
      company: "PENTA SECURITY SOLUTIONS",
      position: "QA Specialist",
      period: "Oct 2021 – Jun 2022",
      location: "Argentina",
      description: [
        "Realicé pruebas funcionales y de regresión en plataformas móviles y web para migración de billetera virtual.",
        "Diseñé casos de prueba basados en riesgos para web administrativa y validé procesos de pago críticos.",
        "Implementé automatizaciones con Selenium, Appium y Newman, reduciendo errores post-lanzamiento en 30%."
      ],
      technologies: ["Selenium", "JMeter", "Jira", "BrowserStack", "Appium", "Newman", "Kubernetes"]
    },
    {
      company: "TATA CONSULTANCY SERVICES",
      position: "QA Analyst – Proyecto 'Vendo cheques y facturas'",
      period: "Mar 2021 – Oct 2021",
      location: "Argentina",
      description: [
        "Realicé pruebas de validación manual para sistema bancario de cheques y facturas en office banking mobile.",
        "Diseñé y ejecuté casos de prueba con IQP y ALM, creando casuísticas para homologaciones mayoristas.",
        "Validé integraciones bancarias y ejecuté pruebas en microservicios garantizando cumplimiento normativo."
      ],
      technologies: ["Postman", "SonarQube", "Jira", "MongoDB", "OpenShift", "IQP", "ALM"]
    },
    {
      company: "DEFENSORÍA DEL PUEBLO – Provincia de Buenos Aires",
      position: "Desarrollador Java Junior (Backend y Frontend)",
      period: "Mar 2020 – Mar 2021",
      location: "Híbrido",
      description: [
        "Participé en diseño y desarrollo de sistema para digitalizar expedientes ciudadanos con Java + Spring Boot y React.js.",
        "Colaboré en implementación de pruebas funcionales y automatizadas en formularios accesibles.",
        "Reduje 18% los reportes por errores de carga de datos, mejorando eficiencia del proceso de gestión."
      ],
      technologies: ["Java", "Spring Boot", "React", "SQL", "Selenium", "TestRail", "JMeter", "MySQL"]
    }
  ];

  const technologies = [
    "ISTQB Foundation Level 4.0", "Manual Testing", "Regression Testing", "UAT", "Performance Testing", 
    "Selenium", "Appium", "Postman", "SoapUI", "Playwright", "K6", "Java", "Python", "JavaScript", 
    "MySQL", "SQL Server", "MongoDB", "Scrum", "Kanban", "Left Shift Testing", "Jira", "Confluence", 
    "TestRail", "ALM", "IQP", "Swagger", "Docker", "Azure DevOps", "SonarQube", "OpenShift", 
    "Kubernetes", "JMeter", "BrowserStack", "Newman", "Spring Boot", "React"
  ];

  return (
    <BackgroundContainer>
            radial-gradient(2px 2px at 20px 30px, rgba(59, 130, 246, 0.3), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(139, 92, 246, 0.3), transparent),
      {/* 🎨 GEOMETRIC OVERLAY - Textura geométrica sutil */}
      <GeometricOverlay />
      
      {/* ✨ FLOATING ELEMENTS - Elementos decorativos flotantes */}
      <FloatingElements>
        <div className="floating-element" />
        <div className="floating-element" />
        <div className="floating-element" />
        <div className="floating-element" />
      </FloatingElements>

      {/* 🌟 PARTICLE BACKGROUND - Fondo de partículas dinámico */}
      <Suspense fallback={<Box sx={{ minHeight: '100vh' }} />}>
        <ParticleBackground />
      </Suspense>
      
      {/* AppBar with Mobile Navigation */}
      <AnimatedAppBar position="fixed" elevation={0}>
        <Toolbar sx={{ 
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 1, sm: 2 },
          gap: { xs: 1, sm: 2 }
        }}>
          {/* Mobile Menu Button - Solo en móviles */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleMobileMenuToggle}
              sx={{ 
                mr: 1,
                minWidth: 40,
                width: 40,
                height: 40,
                // 🎯 CONTRASTE EXTREMO: Menú hamburguesa siempre visible
                background: semanticTokens.surface.interactive,
                border: `1px solid ${semanticTokens.border.interactive}`,
                boxShadow: semanticTokens.shadow.sm,
                backdropFilter: theme.palette.mode === 'dark' ? 'blur(20px)' : 'none',
                borderRadius: '50%',
                color: mode === 'dark' ? 'primary.main' : 'primary.main',
                '&:hover': {
                  backgroundColor: mode === 'dark' 
                    ? alpha(theme.palette.primary.main, 0.2) 
                    : alpha(theme.palette.primary.main, 0.2),
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <MenuIcon sx={{ fontSize: '20px' }} />
            </IconButton>
          )}

          {/* Back Button - Solo en desktop */}
          {!isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate(-1)}
              sx={{ 
                mr: { xs: 1, sm: 2 },
                minWidth: { xs: 40, sm: 48 },
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 }
              }}
            >
              <ArrowBackIcon sx={{ fontSize: { xs: '20px', sm: '24px' } }} />
            </IconButton>
          )}
          
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 600,
              fontSize: { xs: '0.9rem', sm: '1.25rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            Curriculum Vitae
          </Typography>
          
          <IconButton
            color="inherit"
            onClick={toggleColorScheme}
            sx={{
              // 🚀 SEMANTIC SURFACE: Sistema de superficie interactiva
              background: semanticTokens.surface.interactive,
              border: `1px solid ${semanticTokens.border.interactive}`,
              boxShadow: semanticTokens.shadow.sm,
              backdropFilter: theme.palette.mode === 'dark' ? 'blur(20px)' : 'none',
              borderRadius: '50%',
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              minWidth: { xs: 40, sm: 48 },
              color: mode === 'dark' ? 'primary.main' : 'primary.main',
              '&:hover': {
                backgroundColor: mode === 'dark' 
                  ? alpha(theme.palette.primary.main, 0.2) 
                  : alpha(theme.palette.primary.main, 0.2),
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            {mode === 'dark' ? 
              <LightModeIcon sx={{ fontSize: { xs: '18px', sm: '24px' } }} /> : 
              <DarkModeIcon sx={{ fontSize: { xs: '18px', sm: '24px' } }} />
            }
          </IconButton>
        </Toolbar>
      </AnimatedAppBar>

      {/* Mobile Navigation Drawer */}
      <SwipeableDrawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        onOpen={handleMobileMenuToggle}
        PaperProps={{
          sx: {
            width: 280,
            // 🎯 GLASS MORPHISM: Drawer con efecto cristal
            ...migrateGetGlass.medium(theme.palette.mode),
            backdropFilter: 'blur(20px)',
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(30, 41, 59, 0.95)' 
              : 'rgba(255, 255, 255, 0.95)',
            borderRight: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          }
        }}
      >
        <Box sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          pt: 2
        }}>
          {/* Header del Drawer */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            px: 2,
            pb: 2,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Navegación
            </Typography>
            <IconButton 
              onClick={handleMobileMenuClose}
              size="small"
              sx={{ 
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: alpha(theme.palette.primary.main, 0.1)
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Menu Items */}
          <List sx={{ flex: 1, pt: 1 }}>
            <ListItem 
              onClick={navigateToHome}
              sx={{ 
                cursor: 'pointer',
                borderRadius: '8px',
                mx: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                  '& .MuiListItemText-primary': {
                    color: 'primary.main',
                  }
                }
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Inicio" 
                primaryTypographyProps={{
                  fontWeight: 500
                }}
              />
            </ListItem>

            <ListItem 
              onClick={() => navigateToSection('professional-summary')}
              sx={{ 
                cursor: 'pointer',
                borderRadius: '8px',
                mx: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                  '& .MuiListItemText-primary': {
                    color: 'primary.main',
                  }
                }
              }}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Resumen Profesional" 
                primaryTypographyProps={{
                  fontWeight: 500
                }}
              />
            </ListItem>

            <ListItem 
              onClick={() => navigateToSection('certification')}
              sx={{ 
                cursor: 'pointer',
                borderRadius: '8px',
                mx: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                  '& .MuiListItemText-primary': {
                    color: 'primary.main',
                  }
                }
              }}
            >
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Certificación ISTQB" 
                primaryTypographyProps={{
                  fontWeight: 500
                }}
              />
            </ListItem>

            <ListItem 
              onClick={() => navigateToSection('technologies')}
              sx={{ 
                cursor: 'pointer',
                borderRadius: '8px',
                mx: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                  '& .MuiListItemText-primary': {
                    color: 'primary.main',
                  }
                }
              }}
            >
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Tecnologías" 
                primaryTypographyProps={{
                  fontWeight: 500
                }}
              />
            </ListItem>

            <ListItem 
              onClick={() => navigateToSection('experience')}
              sx={{ 
                cursor: 'pointer',
                borderRadius: '8px',
                mx: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                  '& .MuiListItemText-primary': {
                    color: 'primary.main',
                  }
                }
              }}
            >
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Experiencia Laboral" 
                primaryTypographyProps={{
                  fontWeight: 500
                }}
              />
            </ListItem>

            <ListItem 
              onClick={() => navigateToSection('education')}
              sx={{ 
                cursor: 'pointer',
                borderRadius: '8px',
                mx: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                  '& .MuiListItemText-primary': {
                    color: 'primary.main',
                  }
                }
              }}
            >
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Formación Académica" 
                primaryTypographyProps={{
                  fontWeight: 500
                }}
              />
            </ListItem>

            <Divider sx={{ my: 2, mx: 2 }} />
            
            {/* Acciones rápidas */}
            <ListItem 
              onClick={() => {
                window.open('https://github.com/andresdesert', '_blank');
                handleMobileMenuClose();
              }}
              sx={{ 
                cursor: 'pointer',
                borderRadius: '8px',
                mx: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                  '& .MuiListItemText-primary': {
                    color: 'primary.main',
                  }
                }
              }}
            >
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText 
                primary="GitHub" 
                primaryTypographyProps={{
                  fontWeight: 500
                }}
              />
            </ListItem>

            <ListItem 
              onClick={() => {
                window.open('https://www.linkedin.com/in/andres-simahan/', '_blank');
                handleMobileMenuClose();
              }}
              sx={{ 
                cursor: 'pointer',
                borderRadius: '8px',
                mx: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                  '& .MuiListItemText-primary': {
                    color: 'primary.main',
                  }
                }
              }}
            >
              <ListItemIcon>
                <LinkedInIcon />
              </ListItemIcon>
              <ListItemText 
                primary="LinkedIn" 
                primaryTypographyProps={{
                  fontWeight: 500
                }}
              />
            </ListItem>
          </List>

          {/* Footer del Drawer */}
          <Box sx={{ 
            p: 2, 
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            textAlign: 'center'
          }}>
            <Typography variant="caption" color="text.secondary">
              Andrés Simahan - Sr. QA Analyst
            </Typography>
          </Box>
        </Box>
      </SwipeableDrawer>

      {/* Hero Section - Layout Reestructurado */}
      <GlassHeroSection
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Container maxWidth="lg">
          <GlassCard sx={{ p: 4 }}>
            {/* 🏗️ LAYOUT PRINCIPAL: Dos columnas iguales */}
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              minHeight: '400px',
              alignItems: 'stretch' // Importante para mismo height
            }}>
              
              {/* ✅ COLUMNA 1: Foto y Datos Personales - 50% */}
              <Box sx={{ 
                flex: { xs: '1 1 100%', md: '1 1 50%' }, // 50% en desktop, 100% en móvil
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                p: { xs: 2, md: 3 },
                border: '1px solid rgba(255, 255, 255, 0.1)', // Debug border
                borderRadius: '12px',
                background: alpha(theme.palette.primary.main, 0.02)
              }}>
                <motion.div variants={itemVariants} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <ProfileAvatar sx={{ mb: 3, mx: 'auto' }}>
                    <OptimizedImage
                      src={profilePhoto}
                      alt="Andrés Simahan"
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      loading="eager"
                    />
                  </ProfileAvatar>
                  
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                    sx={{
                      fontSize: { 
                        xs: '1.8rem',
                        sm: '2.2rem',
                        md: '2.2rem', // Más pequeño en desktop para que quepa mejor
                        lg: '2.5rem'
                      },
                      lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
                      textAlign: 'center',
                      mb: { xs: 1, sm: 1.5, md: 1 }
                    }}
                  >
                    Andrés Simahan
                  </Typography>
                  
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    gutterBottom
                    sx={{ 
                      fontSize: { 
                        xs: '1.1rem',
                        sm: '1.3rem',
                        md: '1.3rem',
                        lg: '1.5rem'
                      },
                      fontWeight: { xs: 600, md: 500 },
                      textAlign: 'center',
                      mb: { xs: 1, sm: 1.5, md: 1 }
                    }}
                  >
                    SR. QA Analyst
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    gutterBottom
                    sx={{ 
                      fontSize: { 
                        xs: '0.85rem',
                        sm: '0.9rem',
                        md: '0.9rem',
                        lg: '1rem'
                      },
                      textAlign: 'center',
                      lineHeight: { xs: 1.4, md: 1.5 },
                      mb: { xs: 1.5, sm: 2, md: 2 },
                      '& .phone-link': {
                        color: 'inherit',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        padding: { xs: '4px 8px', sm: '2px 4px' },
                        borderRadius: '4px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: 'primary.main',
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(59, 130, 246, 0.1)' 
                            : 'rgba(59, 130, 246, 0.05)',
                          textDecoration: 'underline',
                        }
                      }
                    }}
                  >
                    📍 Buenos Aires, Argentina | 📞{' '}
                    <span 
                      className="phone-link"
                      onClick={() => window.open('https://wa.me/5491125144387', '_blank')}
                    >
                      +54 9 11 2514 4387
                    </span>
                  </Typography>
                  
                  <Chip
                    icon={<StarIcon />}
                    label="ISTQB Certified Foundation Level Tester"
                    color="primary"
                    variant="outlined"
                    sx={{
                      mb: { xs: 1.5, sm: 2 },
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      height: { xs: 'auto', sm: 32 },
                      padding: { xs: '6px 10px', sm: '6px 12px' },
                      background: semanticTokens.surface.secondary,
                      border: `1px solid ${semanticTokens.border.default}`,
                      backdropFilter: theme.palette.mode === 'dark' ? 'blur(10px)' : 'none',
                      fontWeight: 600,
                      alignSelf: 'center',
                      '& .MuiChip-label': {
                        padding: { xs: '0 6px', sm: '0 8px' },
                        fontSize: 'inherit',
                      },
                      '& .MuiChip-icon': {
                        fontSize: { xs: '14px', sm: '16px' },
                        marginLeft: { xs: '4px', sm: '6px' },
                      }
                    }}
                  />
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: { xs: 1, sm: 1.5 },
                    flexWrap: 'wrap', 
                    mb: { xs: 1.5, sm: 2 },
                    maxWidth: '100%'
                  }}>
                    <Chip
                      label="5+ años experiencia QA"
                      size="small"
                      color="secondary"
                      variant="outlined"
                      sx={{ 
                        fontWeight: 500,
                        fontSize: { xs: '0.65rem', sm: '0.7rem' },
                        height: { xs: 22, sm: 26 },
                        '& .MuiChip-label': {
                          padding: { xs: '0 4px', sm: '0 6px' }
                        }
                      }}
                    />
                    <Chip
                      label="Sector Fintech & Banking"
                      size="small"
                      color="secondary"
                      variant="outlined"
                      sx={{ 
                        fontWeight: 500,
                        fontSize: { xs: '0.65rem', sm: '0.7rem' },
                        height: { xs: 22, sm: 26 },
                        '& .MuiChip-label': {
                          padding: { xs: '0 4px', sm: '0 6px' }
                        }
                      }}
                    />
                  </Box>
                </motion.div>
              </Box>

              {/* ✅ COLUMNA 2: Resumen Profesional - 50% */}
              <Box sx={{ 
                flex: { xs: '1 1 100%', md: '1 1 50%' }, // 50% en desktop, 100% en móvil
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 2, md: 3 },
                border: '1px solid rgba(255, 255, 255, 0.1)', // Debug border
                borderRadius: '12px',
                background: alpha(theme.palette.secondary.main, 0.02)
              }}
              id="professional-summary"
              >
                <motion.div variants={itemVariants} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="h4" gutterBottom sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    textAlign: { xs: 'center', md: 'left' },
                    fontSize: { xs: '1.5rem', md: '1.8rem', lg: '2rem' }
                  }}>
                    <BusinessIcon sx={{ mr: 2, color: 'primary.main' }} />
                    Resumen Profesional
                  </Typography>
                  
                  <Typography variant="body1" paragraph sx={{ 
                    fontSize: { xs: '0.95rem', md: '1.05rem', lg: '1.1rem' }, 
                    lineHeight: { xs: 1.6, md: 1.7, lg: 1.8 },
                    textAlign: { xs: 'center', md: 'left' },
                    mb: 3
                  }}>
                    Especialista en calidad de software <strong>certificado ISTQB Foundation Level 4.0</strong>, con 
                    amplia experiencia en pruebas funcionales, manuales y de sistemas en entornos 
                    ágiles. Poseo un sólido bagaje en testing, validación e integración de procesos 
                    críticos en <strong>sectores financieros y tecnológicos</strong>. Actualmente, me encuentro 
                    perfeccionándome en <strong>automatización, pruebas de rendimiento con K6 y 
                    especializándome en ciberseguridad</strong>, impulsando la mejora continua y la 
                    optimización de procesos en proyectos de alta complejidad.
                  </Typography>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 2, sm: 2 }}
                      sx={{ 
                        justifyContent: { xs: 'center', md: 'flex-start' },
                        alignItems: 'center',
                        width: '100%'
                      }}
                    >
                      <ContactButton
                        startIcon={<DownloadIcon />}
                        onClick={() => window.open(cvFile, '_blank')}
                        sx={{ 
                          minWidth: { xs: '100%', sm: 140 },
                          minHeight: { xs: 48, sm: 44 },
                          fontSize: { xs: '0.9rem', sm: '0.875rem' },
                          padding: { xs: '12px 20px', sm: '12px 24px' },
                          borderRadius: { xs: '12px', sm: '50px' },
                        }}
                      >
                        Descargar CV
                      </ContactButton>
                      <Button
                        variant="outlined"
                        startIcon={<GitHubIcon />}
                        onClick={() => window.open('https://github.com/andresdesert', '_blank')}
                        sx={{ 
                          borderRadius: { xs: '12px', sm: '50px' },
                          textTransform: 'none', 
                          minWidth: { xs: '100%', sm: 120 },
                          minHeight: { xs: 48, sm: 44 },
                          fontSize: { xs: '0.9rem', sm: '0.875rem' },
                          padding: { xs: '12px 20px', sm: '12px 24px' },
                          borderColor: theme.palette.mode === 'dark' 
                            ? 'rgb(255, 255, 255) !important' 
                            : theme.palette.primary.main,
                          color: theme.palette.mode === 'dark' 
                            ? 'rgb(255, 255, 255) !important' 
                            : theme.palette.primary.main,
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(59, 130, 246, 0.1) !important' 
                            : 'transparent',
                          '&:hover': {
                            borderColor: theme.palette.mode === 'dark' 
                              ? 'rgb(59, 130, 246) !important' 
                              : theme.palette.primary.dark,
                            backgroundColor: theme.palette.mode === 'dark' 
                              ? 'rgba(59, 130, 246, 0.2) !important' 
                              : alpha(theme.palette.primary.main, 0.1),
                            transform: 'translateY(-1px)',
                          }
                        }}
                      >
                        GitHub
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<LinkedInIcon />}
                        onClick={() => window.open('https://www.linkedin.com/in/andres-simahan/', '_blank')}
                        sx={{ 
                          borderRadius: { xs: '12px', sm: '50px' },
                          textTransform: 'none', 
                          minWidth: { xs: '100%', sm: 120 },
                          minHeight: { xs: 48, sm: 44 },
                          fontSize: { xs: '0.9rem', sm: '0.875rem' },
                          padding: { xs: '12px 20px', sm: '12px 24px' },
                          borderColor: theme.palette.mode === 'dark' 
                            ? 'rgb(255, 255, 255) !important' 
                            : theme.palette.primary.main,
                          color: theme.palette.mode === 'dark' 
                            ? 'rgb(255, 255, 255) !important' 
                            : theme.palette.primary.main,
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(59, 130, 246, 0.1) !important' 
                            : 'transparent',
                          '&:hover': {
                            borderColor: theme.palette.mode === 'dark' 
                              ? 'rgb(59, 130, 246) !important' 
                              : theme.palette.primary.dark,
                            backgroundColor: theme.palette.mode === 'dark' 
                              ? 'rgba(59, 130, 246, 0.2) !important' 
                              : alpha(theme.palette.primary.main, 0.1),
                            transform: 'translateY(-1px)',
                          }
                        }}
                      >
                        LinkedIn
                      </Button>
                    </Stack>
                  </Box>
                </motion.div>
              </Box>
            </Box>
          </GlassCard>
        </Container>
      </GlassHeroSection>

      {/* ISTQB Certification Banner Section - Centrado y alineado */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        py: 4,
        px: 2 
      }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <GlassCard sx={{ mb: 6 }} id="certification">
              <CardContent sx={{ p: 4 }}>
                {/* Título centrado */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  mb: 4 
                }}>
                  <Typography variant="h4" sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: { xs: '1.6rem', md: '2rem' }
                  }}>
                    <StarIcon sx={{ mr: 2, color: 'primary.main' }} />
                    Certificación Profesional
                  </Typography>
                </Box>
                
                {/* Contenedor principal centrado */}
                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <Box sx={{ 
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    p: 3,
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.03)})`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    maxWidth: '900px', // Limitar ancho máximo
                    width: '100%'
                  }}>
                    {/* Banner Image - Centrado */}
                    <Box sx={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minWidth: { xs: 'auto', md: 280 },
                      width: { xs: '100%', md: 'auto' }
                    }}>
                      <OptimizedImage
                        src={istqbBanner} 
                        alt="ISTQB Certification Banner"
                        width="100%"
                        height="auto"
                        borderRadius="12px"
                        loading="lazy"
                        sx={{
                          boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
                          maxWidth: '280px',
                          width: '100%'
                        }}
                      />
                    </Box>

                    {/* Certification Details - Todo centrado */}
                    <Box sx={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      minWidth: 0 // Permite que el flex funcione correctamente
                    }}>
                      <Typography variant="h5" color="primary" gutterBottom sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '1.3rem', md: '1.5rem' }
                      }}>
                        Certificación ISTQB®
                      </Typography>
                      <Typography variant="h6" color="text.secondary" gutterBottom sx={{
                        fontSize: { xs: '1.1rem', md: '1.25rem' }
                      }}>
                        Foundation Level 4.0 Certified Tester
                      </Typography>
                      
                      <Box sx={{ mt: 2, mb: 3, width: '100%' }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          <strong>Organismo Certificador:</strong> iSQI Group
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          <strong>Fecha de Expedición:</strong> Enero 2025
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          <strong>ID de Credencial:</strong> 25-CTFL 4-256945-81
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ 
                          mt: 2, 
                          fontStyle: 'italic',
                          maxWidth: '400px',
                          mx: 'auto',
                          lineHeight: 1.5
                        }}>
                          Certificación internacional en fundamentos de testing de software, metodologías de QA y mejores prácticas en calidad.
                        </Typography>
                      </Box>

                      {/* Botón centrado */}
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        width: '100%' 
                      }}>
                        <Button
                          variant="outlined"
                          startIcon={<StarIcon />}
                          onClick={() => window.open('https://scr.istqb.org/?name=Andres+Simahan&number=25-CTFL+4-256945-81&orderBy=relevancy&orderDirection=&dateStart=&dateEnd=&expiryStart=&expiryEnd=&certificationBody=&examProvider=&certificationLevel=&country=', '_blank')}
                          sx={{ 
                            borderRadius: '50px', 
                            textTransform: 'none',
                            px: 3,
                            py: 1.5,
                            borderColor: theme.palette.mode === 'dark' 
                              ? 'rgb(245, 158, 11) !important' 
                              : 'primary.main',
                            color: theme.palette.mode === 'dark' 
                              ? 'rgb(245, 158, 11) !important' 
                              : 'primary.main',
                            backgroundColor: theme.palette.mode === 'dark' 
                              ? 'rgba(245, 158, 11, 0.1) !important' 
                              : 'transparent',
                            '&:hover': {
                              borderColor: theme.palette.mode === 'dark' 
                                ? 'rgb(251, 191, 36) !important' 
                                : theme.palette.primary.dark,
                              backgroundColor: theme.palette.mode === 'dark' 
                                ? 'rgba(245, 158, 11, 0.2) !important' 
                                : alpha(theme.palette.primary.main, 0.1),
                              transform: 'translateY(-1px)',
                            }
                          }}
                        >
                          Verificar Certificación
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </GlassCard>
          </motion.div>
        </Container>
      </Box>

      {/* Technologies Section */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="technologies">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GlassCard sx={{ mb: 6 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CodeIcon sx={{ mr: 2, color: 'primary.main' }} />
                Tecnologías & Herramientas
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Chip
                      label={tech}
                      color="primary"
                      variant="outlined"
                      sx={{
                        ...migrateGetGlass.subtle(theme.palette.mode),
                        fontWeight: 500,
                        '&:hover': {
                          transform: 'scale(1.05)',
                          ...migrateGetGlass.medium(theme.palette.mode),
                        },
                      }}
                    />
                  </motion.div>
                ))}
              </Box>
            </CardContent>
          </GlassCard>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GlassCard sx={{ mb: 6 }} id="experience">
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <WorkIcon sx={{ mr: 2, color: 'primary.main' }} />
                Experiencia Laboral
              </Typography>
              
              {experienceData.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ mb: 4, pb: 4, borderBottom: index < experienceData.length - 1 ? `1px solid ${alpha(theme.palette.divider, 0.2)}` : 'none' }}>
                    <Typography variant="h5" color="primary" gutterBottom>
                      {exp.position}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      {exp.company} • {exp.period}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontStyle: 'italic' }}>
                      📍 {exp.location}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {exp.description.map((desc, idx) => (
                        <Typography 
                          key={idx} 
                          variant="body1" 
                          sx={{ 
                            mb: 1.5,
                            pl: 2,
                            borderLeft: `3px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                            color: 'text.primary',
                            lineHeight: 1.7,
                            position: 'relative',
                            '&:before': {
                              content: '"•"',
                              position: 'absolute',
                              left: '-8px',
                              color: 'primary.main',
                              fontWeight: 'bold',
                            }
                          }}
                        >
                          {desc}
                        </Typography>
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                      {exp.technologies.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          color="secondary"
                          variant="outlined"
                          sx={{ 
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                              transform: 'translateY(-1px)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </CardContent>
          </GlassCard>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GlassCard id="education">
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <SchoolIcon sx={{ mr: 2, color: 'primary.main' }} />
                Formación Académica
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <StarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="ISTQB Foundation Level 4.0"
                    secondary="International Software Testing Qualifications Board - Certificación internacional en fundamentos de testing • Certificado"
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <StarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Especialización en Ciberseguridad"
                    secondary="EducaciónIT - Seguridad informática, ethical hacking y análisis de vulnerabilidades • En curso (2025)"
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <StarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Certificación Agile"
                    secondary="Tata Consultancy Services - Metodologías ágiles, Scrum y gestión de proyectos • 2023"
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <StarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Formación en Postman, JMeter, AWS y DB"
                    secondary="Instituto Web - Herramientas de testing y bases de datos • 2022"
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <StarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="QA Analyst Bootcamp"
                    secondary="Mindhub - Formación intensiva en testing y metodologías QA • 2021"
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <StarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Professional Testing"
                    secondary="UTN Argentina - Testing profesional y metodologías de calidad • 2020"
                  />
                </ListItem>
              </List>
            </CardContent>
          </GlassCard>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GlassCard sx={{ mb: 6 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CodeIcon sx={{ mr: 2, color: 'primary.main' }} />
                Proyectos Destacados
              </Typography>
              
              <Box sx={{ 
                p: 3, 
                borderRadius: '12px', 
                background: alpha(theme.palette.primary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
                }
              }}>
                <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                  CyberWallet Web
                </Typography>
                <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
                  Proyecto full-stack para demostrar habilidades en desarrollo de billeteras virtuales. 
                  Implementado con <strong>Java + Spring Boot</strong> (backend) y <strong>React.js + Material UI</strong> (frontend). 
                  Evidencia capacidad para integrar tecnologías, resolver desafíos y aplicar principios de diseño de software.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {["Java", "Spring Boot", "React.js", "Material UI", "PostgreSQL", "Docker", "Testing"].map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ 
                        fontSize: '0.75rem',
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  onClick={() => window.open('https://github.com/andresdesert/CyberWallet-Web.git', '_blank')}
                  sx={{ 
                    borderRadius: '50px', 
                    textTransform: 'none',
                    // 🎯 CONTRASTE EXTREMO: Botón proyecto siempre visible
                    borderColor: theme.palette.mode === 'dark' 
                      ? 'rgb(255, 255, 255) !important' 
                      : theme.palette.primary.main,
                    color: theme.palette.mode === 'dark' 
                      ? 'rgb(255, 255, 255) !important' 
                      : theme.palette.primary.main,
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? 'rgba(59, 130, 246, 0.1) !important' 
                      : 'transparent',
                    '&:hover': {
                      borderColor: theme.palette.mode === 'dark' 
                        ? 'rgb(59, 130, 246) !important' 
                        : theme.palette.primary.dark,
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(59, 130, 246, 0.2) !important' 
                        : alpha(theme.palette.primary.main, 0.1),
                      transform: 'translateY(-1px)',
                    }
                  }}
                >
                  Ver en GitHub
                </Button>
              </Box>
            </CardContent>
          </GlassCard>
        </motion.div>
      </Container>

      {/* Contact Section */}
      <Box sx={{ py: 8, background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.03)})` }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <GlassCard>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom color="primary">
                  ¿Interesado en colaborar?
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 4, fontSize: '1.1rem' }}>
                  Estoy disponible para nuevos proyectos y oportunidades de QA Engineering.
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <ContactButton
                    startIcon={<EmailIcon />}
                    onClick={() => window.open('mailto:deluxogvc@gmail.com', '_blank')}
                  >
                    Contactar
                  </ContactButton>
                  <Button
                    variant="outlined"
                    startIcon={<WhatsAppIcon />}
                    onClick={() => window.open('https://wa.me/5491125144387', '_blank')}
                    sx={{ 
                      borderRadius: '50px', 
                      textTransform: 'none',
                      // 🎯 CONTRASTE EXTREMO: Botón WhatsApp siempre visible
                      borderColor: theme.palette.mode === 'dark' 
                        ? 'rgb(37, 211, 102) !important' 
                        : '#25D366',
                      color: theme.palette.mode === 'dark' 
                        ? 'rgb(37, 211, 102) !important' 
                        : '#25D366',
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(37, 211, 102, 0.1) !important' 
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? 'rgba(37, 211, 102, 0.2) !important' 
                          : alpha('#25D366', 0.1),
                        borderColor: theme.palette.mode === 'dark' 
                          ? 'rgb(34, 197, 94) !important' 
                          : '#25D366',
                        transform: 'translateY(-1px)',
                      }
                    }}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    onClick={() => window.open('https://github.com/andresdesert/CyberWallet-Web.git', '_blank')}
                    sx={{ 
                      borderRadius: '50px', 
                      textTransform: 'none',
                      // 🎯 CONTRASTE EXTREMO: Botón final proyecto siempre visible
                      borderColor: theme.palette.mode === 'dark' 
                        ? 'rgb(255, 255, 255) !important' 
                        : theme.palette.primary.main,
                      color: theme.palette.mode === 'dark' 
                        ? 'rgb(255, 255, 255) !important' 
                        : theme.palette.primary.main,
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(59, 130, 246, 0.1) !important' 
                        : 'transparent',
                      '&:hover': {
                        borderColor: theme.palette.mode === 'dark' 
                          ? 'rgb(59, 130, 246) !important' 
                          : theme.palette.primary.dark,
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? 'rgba(59, 130, 246, 0.2) !important' 
                          : alpha(theme.palette.primary.main, 0.1),
                        transform: 'translateY(-1px)',
                      }
                    }}
                  >
                    Ver Proyecto
                  </Button>
                </Box>
              </CardContent>
            </GlassCard>
          </motion.div>
        </Container>
      </Box>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Fab
          color="primary"
          size={isMobile ? "large" : "medium"}
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            // 🎯 MOBILE-FRIENDLY: Posición adaptativa para FAB
            bottom: { xs: 20, sm: 32 },
            right: { xs: 16, sm: 32 },
            zIndex: 1000,
            // 🎯 RESPONSIVE: Tamaño adaptativo
            width: { xs: 56, sm: 48 },
            height: { xs: 56, sm: 48 },
            ...migrateGetGlass.medium(theme.palette.mode),
            // 🎯 CONTRASTE EXTREMO: FAB siempre visible
            border: theme.palette.mode === 'dark' 
              ? '2px solid rgb(59, 130, 246) !important' 
              : `2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
            backgroundColor: mode === 'dark' 
              ? 'rgba(59, 130, 246, 0.15) !important' 
              : alpha(theme.palette.primary.main, 0.9),
            color: mode === 'dark' 
              ? 'rgb(59, 130, 246) !important' 
              : 'white',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 8px 25px rgba(59, 130, 246, 0.4) !important'
              : `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: mode === 'dark' 
                ? 'rgba(59, 130, 246, 0.25) !important' 
                : theme.palette.primary.main,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 12px 35px rgba(59, 130, 246, 0.6) !important'
                : `0 12px 35px ${alpha(theme.palette.primary.main, 0.6)}`,
            },
            transition: 'all 0.3s ease',
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </BackgroundContainer>
  );
};

export default AboutMePage;
