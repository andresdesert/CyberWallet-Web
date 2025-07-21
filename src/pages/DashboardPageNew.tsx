import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
  Chip,
  Button,
  Stack,
  Card,
  CardContent,
  Avatar,
  Grid,
  Fab,
  alpha,
  Divider,
  LinearProgress,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import Layout from '@/layout/Layout';
import {
  AccountBalanceWallet,
  TrendingUp,
  TrendingDown,
  Visibility,
  VisibilityOff,
  Settings,
  History,
  Send,
  AttachMoney,
  Security,
  CurrencyExchange,
  Refresh,
  KeyboardArrowUp,
  KeyboardArrowDown,
  Add,
  Remove,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCotizaciones } from '@/hooks/useCotizaciones';
import { useUnifiedTheme } from '@/context/UnifiedThemeContext';
import { getActiveTokens } from '@/theme/tokens/colorTokens'; // 🎯 Tokens semánticos OKLCH
import log from 'loglevel';

// Enhanced Motion Components
const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);
const MotionFab = motion.create(Fab);

// Mock data with enhanced structure
const mockWalletData = {
  alias: 'crypto.wizard',
  balance: 125480.50,
  cvu: '0000003100012345678901',
  currency: 'ARS',
  level: 'Premium',
  score: 8.7,
  growth: 12.5,
  monthlyLimit: 500000,
  monthlyUsed: 285000,
  dailyLimit: 50000,
  dailyUsed: 45000,
  transactions: 247,
  accountHealth: 95,
  securityLevel: 'Alto',
  verificationStatus: 'Verificado',
};

// Enhanced metrics with better categorization
const getFinancialMetrics = (balanceVisible: boolean, dollarRates: { nombre: string; venta: number }[]) => {
  const usdRate = dollarRates.find(rate => rate.nombre === 'Blue')?.venta || 1200;
  const usdBalance = mockWalletData.balance / usdRate;

  return [
    {
      title: 'Balance Total',
      value: balanceVisible ? mockWalletData.balance : null,
      displayValue: balanceVisible ? `$${mockWalletData.balance.toLocaleString('es-AR')}` : '****',
      change: mockWalletData.growth,
      icon: AccountBalanceWallet,
      trend: 'up' as const,
      color: 'primary' as const,
      subtitle: 'ARS',
    },
    {
      title: 'En USD (Blue)',
      value: balanceVisible ? usdBalance : null,
      displayValue: balanceVisible ? `USD $${usdBalance.toFixed(2)}` : '****',
      change: 2.1,
      icon: AttachMoney,
      trend: 'up' as const,
      color: 'success' as const,
      subtitle: `$${usdRate} ARS`,
    },
    {
      title: 'Ingresos del Mes',
      value: balanceVisible ? 45000 : null,
      displayValue: balanceVisible ? '$45.000' : '****',
      change: 8.2,
      icon: TrendingUp,
      trend: 'up' as const,
      color: 'success' as const,
      subtitle: 'Enero 2025',
    },
    {
      title: 'Gastos del Mes',
      value: balanceVisible ? 28500 : null,
      displayValue: balanceVisible ? '$28.500' : '****',
      change: -3.1,
      icon: TrendingDown,
      trend: 'down' as const,
      color: 'error' as const,
      subtitle: 'Promedio diario: $950',
    },
  ];
};

// Enhanced Quick Actions
const quickActions = [
  { label: 'Transferir', icon: Send, action: 'transfer', color: 'primary' },
  { label: 'Cargar', icon: Add, action: 'deposit', color: 'success' },
  { label: 'Retirar', icon: Remove, action: 'withdraw', color: 'warning' },
  { label: 'Historial', icon: History, action: 'history', color: 'info' },
];

// Enhanced Metric Card Component
interface MetricCardProps {
  title: string;
  displayValue: string;
  change: number;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'neutral';
  color: 'primary' | 'success' | 'error' | 'warning' | 'info';
  subtitle: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  displayValue,
  change,
  icon: Icon,
  trend,
  color,
  subtitle,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // 🎯 FINTECH 2025: Tokens semánticos para contraste garantizado
  const semanticTokens = getActiveTokens(theme.palette.mode === 'dark');

  const getTrendIcon = () => {
    if (trend === 'up') return <KeyboardArrowUp color="success" />;
    if (trend === 'down') return <KeyboardArrowDown color="error" />;
    return null;
  };

  return (
    <MotionCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        // 🚀 NUEVA IMPLEMENTACIÓN: Sistema de elevación de superficie profesional
        background: semanticTokens.surface.primary, // Card principal blanco/dark
        border: `1px solid ${semanticTokens.border.subtle}`, // Borde sutil
        boxShadow: semanticTokens.shadow.md, // Sombra semántica
        backdropFilter: theme.palette.mode === 'dark' ? 'blur(20px)' : 'none',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          border: `1px solid ${semanticTokens.border.interactive}`, // Borde interactivo
          boxShadow: semanticTokens.shadow.financial, // Sombra financiera especial
          transform: 'translateY(-2px)',
          background: semanticTokens.surface.interactive, // Hover state
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: alpha(theme.palette[color].main, 0.1),
              color: theme.palette[color].main,
              width: 48,
              height: 48,
            }}
          >
            <Icon />
          </Avatar>
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 0.5,
            fontSize: isMobile ? '1.5rem' : '1.8rem',
          }}
        >
          {displayValue}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
          {title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            {subtitle}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {getTrendIcon()}
            <Typography
              variant="caption"
              color={trend === 'up' ? 'success' : trend === 'down' ? 'error' : 'inherit'}
              sx={{ fontWeight: 600, fontSize: '0.75rem' }}
            >
              {change > 0 ? '+' : ''}{change}%
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </MotionCard>
  );
};

// Currency Exchange Component
const CurrencyExchangeCard: React.FC<{ dollarRates: { nombre: string; compra: number; venta: number }[] }> = ({ dollarRates }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const semanticTokens = getActiveTokens(theme.palette.mode === 'dark'); // 🎯 Tokens semánticos

  if (!dollarRates.length) {
    return (
      <Card sx={{ 
        borderRadius: '16px',
        background: semanticTokens.surface.primary, // 🚀 Superficie semántica
        border: `1px solid ${semanticTokens.border.subtle}`,
        boxShadow: semanticTokens.shadow.md,
        backdropFilter: theme.palette.mode === 'dark' ? 'blur(20px)' : 'none',
      }}>
        <CardContent>
          <Skeleton variant="text" width="40%" height={32} />
          <Skeleton variant="rectangular" width="100%" height={120} sx={{ mt: 2 }} />
        </CardContent>
      </Card>
    );
  }

  return (
    <MotionCard
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      sx={{ 
        borderRadius: '16px',
        // 🚀 Sistema de superficie semántico OKLCH
        background: semanticTokens.surface.primary,
        border: `1px solid ${semanticTokens.border.subtle}`,
        boxShadow: semanticTokens.shadow.md,
        backdropFilter: theme.palette.mode === 'dark' ? 'blur(20px)' : 'none',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          border: `1px solid ${semanticTokens.border.interactive}`,
          boxShadow: semanticTokens.shadow.lg,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CurrencyExchange sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Cotizaciones USD
            </Typography>
          </Box>
          <IconButton 
            size="small" 
            color="primary"
            sx={{
              // 🎯 CONTRASTE EXTREMO: Botón refresh siempre visible
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(59, 130, 246, 0.1) !important' 
                : alpha(theme.palette.primary.main, 0.1),
              border: theme.palette.mode === 'dark' 
                ? '1px solid rgb(59, 130, 246) !important' 
                : `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
              color: theme.palette.mode === 'dark' 
                ? 'rgb(59, 130, 246) !important' 
                : 'primary.main',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(59, 130, 246, 0.2) !important' 
                  : alpha(theme.palette.primary.main, 0.2),
                transform: 'scale(1.1)',
              }
            }}
          >
            <Refresh />
          </IconButton>
        </Box>

        <Stack spacing={2}>
          {dollarRates.slice(0, isMobile ? 3 : 5).map((rate, index) => (
            <motion.div
              key={rate.nombre}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  borderRadius: '12px',
                  // 🎯 Surface-200 semántica para secciones secundarias
                  background: semanticTokens.surface.secondary,
                  border: `1px solid ${semanticTokens.border.subtle}`,
                  boxShadow: semanticTokens.shadow.sm,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { 
                    background: semanticTokens.surface.interactive,
                    border: `1px solid ${semanticTokens.border.interactive}`,
                    boxShadow: semanticTokens.shadow.md,
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {rate.nombre}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date().toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" fontWeight={600}>
                    ${rate.venta?.toFixed(2) || rate.compra?.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Stack>
      </CardContent>
    </MotionCard>
  );
};

// Quick Actions Component
const QuickActionsCard: React.FC<{ onActionClick: (action: string) => void }> = ({ onActionClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const semanticTokens = getActiveTokens(theme.palette.mode === 'dark'); // 🎯 Tokens semánticos

  const getActionColor = (color: string) => {
    switch (color) {
      case 'primary': return theme.palette.primary.main;
      case 'success': return theme.palette.success.main;
      case 'warning': return theme.palette.warning.main;
      case 'info': return theme.palette.info.main;
      case 'error': return theme.palette.error.main;
      default: return theme.palette.primary.main;
    }
  };

  return (
    <MotionCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      sx={{ 
        borderRadius: '16px',
        // 🚀 Sistema de superficie semántico
        background: semanticTokens.surface.primary,
        border: `1px solid ${semanticTokens.border.subtle}`,
        boxShadow: semanticTokens.shadow.md,
        backdropFilter: theme.palette.mode === 'dark' ? 'blur(20px)' : 'none',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          border: `1px solid ${semanticTokens.border.interactive}`,
          boxShadow: semanticTokens.shadow.lg,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Acciones Rápidas
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(2, 1fr)' }, 
          gap: 2 
        }}>
          {quickActions.map((action, index) => (
            <motion.div
              key={action.action}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                fullWidth
                variant="outlined"
                startIcon={<action.icon />}
                onClick={() => onActionClick(action.action)}
                sx={{
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: 1,
                  p: 2,
                  borderRadius: '12px',
                  // 🎯 CONTRASTE EXTREMO: Botones de acción siempre visibles
                  borderColor: theme.palette.mode === 'dark' 
                    ? `rgb(255, 255, 255) !important` 
                    : alpha(getActionColor(action.color), 0.2),
                  color: theme.palette.mode === 'dark' 
                    ? `rgb(255, 255, 255) !important` 
                    : getActionColor(action.color),
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? `rgba(59, 130, 246, 0.1) !important` 
                    : alpha(getActionColor(action.color), 0.02),
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: theme.palette.mode === 'dark' 
                      ? `rgb(59, 130, 246) !important` 
                      : getActionColor(action.color),
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? `rgba(59, 130, 246, 0.2) !important` 
                      : alpha(getActionColor(action.color), 0.08),
                    transform: 'translateY(-1px)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? `0 4px 12px rgba(59, 130, 246, 0.3) !important`
                      : `0 2px 8px ${alpha(getActionColor(action.color), 0.15)}`,
                  },
                }}
              >
                <Typography variant="body2" fontWeight={600}>
                  {action.label}
                </Typography>
              </Button>
            </motion.div>
          ))}
        </Box>
      </CardContent>
    </MotionCard>
  );
};

// Account Health Component
const AccountHealthCard: React.FC = () => {
  const theme = useTheme();
  const semanticTokens = getActiveTokens(theme.palette.mode === 'dark'); // 🎯 Tokens semánticos

  return (
    <MotionCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      sx={{ 
        borderRadius: '16px',
        // 🚀 Sistema de superficie semántico
        background: semanticTokens.surface.primary,
        border: `1px solid ${semanticTokens.border.subtle}`,
        boxShadow: semanticTokens.shadow.md,
        backdropFilter: theme.palette.mode === 'dark' ? 'blur(20px)' : 'none',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          border: `1px solid ${semanticTokens.border.interactive}`,
          boxShadow: semanticTokens.shadow.lg,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Security sx={{ mr: 1, color: 'success.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Estado de Cuenta
            </Typography>
          </Box>
          <Chip
            label={`${mockWalletData.accountHealth}%`}
            color="success"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>

        <Stack spacing={3}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Salud de Cuenta
              </Typography>
              <Typography variant="body2" fontWeight={600} color="success.main">
                Excelente
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={mockWalletData.accountHealth}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.success.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  backgroundColor: theme.palette.success.main,
                  borderRadius: 4,
                },
              }}
            />
          </Box>

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Límite Mensual
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                ${mockWalletData.monthlyUsed.toLocaleString()} / ${mockWalletData.monthlyLimit.toLocaleString()}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(mockWalletData.monthlyUsed / mockWalletData.monthlyLimit) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.warning.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  backgroundColor: theme.palette.warning.main,
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        </Stack>

        <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label={mockWalletData.verificationStatus} color="success" size="small" />
          <Chip label={mockWalletData.securityLevel} color="primary" size="small" />
          <Chip label={mockWalletData.level} color="info" size="small" />
        </Box>
      </CardContent>
    </MotionCard>
  );
};

// Main Dashboard Component
const DashboardPageNew: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useUnifiedTheme(); // 🎯 FIX: usar colorScheme en lugar de mode

  // 🎯 SEMANTIC TOKENS: Sistema unificado OKLCH para contraste garantizado
  const semanticTokens = getActiveTokens(theme.palette.mode === 'dark');

  // 🔍 DEBUG: Log de tokens para verificar diferencias
  useEffect(() => {
    console.log('🎯 DEBUG TOKENS - Mode:', theme.palette.mode);
    console.log('🚀 Surface Primary:', semanticTokens.surface.primary);
    console.log('🚀 Surface Secondary:', semanticTokens.surface.secondary);
    console.log('🚀 Background Default:', theme.palette.background.default);
    console.log('🚀 Background Paper (semantic):', semanticTokens.surface.primary);
  }, [theme.palette.mode, semanticTokens]);

  // States
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // 🚀 MODAL STATES: Estados para modales de acciones rápidas
  const [actionModal, setActionModal] = useState<{
    open: boolean;
    type: 'transfer' | 'deposit' | 'withdraw' | 'history' | null;
  }>({ open: false, type: null });
  const [actionLoading, setActionLoading] = useState(false);
  const [actionForm, setActionForm] = useState({
    amount: '',
    destination: '',
    description: '',
    method: 'credit_card'
  });

  // Hooks
  const { cotizaciones: dollarRates, isLoading: cotizacionesLoading } = useCotizaciones();

  // Computed values
  const financialMetrics = useMemo(() => 
    getFinancialMetrics(balanceVisible, dollarRates), 
    [balanceVisible, dollarRates]
  );

  // Effects
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'transfer':
        setActionModal({ open: true, type: 'transfer' });
        setActionForm({ amount: '', destination: '', description: '', method: 'credit_card' });
        break;
      case 'deposit':
        setActionModal({ open: true, type: 'deposit' });
        setActionForm({ amount: '', destination: '', description: '', method: 'credit_card' });
        break;
      case 'withdraw':
        setActionModal({ open: true, type: 'withdraw' });
        setActionForm({ amount: '', destination: '', description: '', method: 'bank_transfer' });
        break;
      case 'history':
        setActionModal({ open: true, type: 'history' });
        break;
      default:
        enqueueSnackbar(`Función ${action} próximamente disponible`, { variant: 'info' });
    }
  };

  // 🚀 MODAL HANDLERS: Manejadores de modales de acciones
  const handleCloseActionModal = () => {
    setActionModal({ open: false, type: null });
    setActionForm({ amount: '', destination: '', description: '', method: 'credit_card' });
    setActionLoading(false);
  };

  const handleFormChange = (field: string, value: string) => {
    setActionForm(prev => ({ ...prev, [field]: value }));
  };

  const handleExecuteAction = async () => {
    if (!actionModal.type) return;
    
    setActionLoading(true);
    
    // 🎭 MOCK SIMULATION: Simular operación asíncrona
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2s delay
      
      const actionNames = {
        transfer: 'Transferencia',
        deposit: 'Carga de dinero',
        withdraw: 'Retiro',
        history: 'Historial'
      };
      
      if (actionModal.type === 'history') {
        enqueueSnackbar('Redirigiendo al historial de transacciones...', { variant: 'info' });
      } else {
        const amount = actionForm.amount || '0';
        enqueueSnackbar(
          `✅ ${actionNames[actionModal.type]} de $${amount} realizada exitosamente`, 
          { variant: 'success' }
        );
      }
      
      handleCloseActionModal();
    } catch (error) {
      enqueueSnackbar('❌ Error al procesar la operación', { variant: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    enqueueSnackbar('Datos actualizados', { variant: 'success' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      
      {/* Enhanced Animated Background with Semantic Surface System */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -2,
          background: theme.palette.mode === 'dark'
            ? `
              radial-gradient(circle at 15% 40%, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 60%), 
              radial-gradient(circle at 85% 30%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 50%), 
              radial-gradient(circle at 50% 85%, ${alpha(theme.palette.info.main, 0.06)} 0%, transparent 50%),
              linear-gradient(135deg, ${theme.palette.background.default} 0%, ${semanticTokens.surface.primary} 100%)
            `
            : `
              // Light mode: Page background with proper surface hierarchy
              radial-gradient(circle at 20% 50%, ${alpha('#3b82f6', 0.08)} 0%, transparent 50%), 
              radial-gradient(circle at 80% 20%, ${alpha('#8b5cf6', 0.06)} 0%, transparent 45%), 
              radial-gradient(circle at 40% 90%, ${alpha('#06b6d4', 0.05)} 0%, transparent 50%),
              linear-gradient(135deg, #F5F7FA 0%, #EDF2F7 50%, #E2E8F0 100%)
            `,
        }}
      />

      {/* Enhanced Floating Particles with better visibility */}
      {[...Array(10)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'fixed',
            width: { xs: 60 + i * 8, md: 80 + i * 12 },
            height: { xs: 60 + i * 8, md: 80 + i * 12 },
            borderRadius: '50%',
            background: theme.palette.mode === 'dark'
              ? `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.04)} 50%, transparent 80%)`
              : `radial-gradient(circle, ${alpha('#3b82f6', 0.15)} 0%, ${alpha('#8b5cf6', 0.12)} 40%, ${alpha('#06b6d4', 0.08)} 70%, transparent 90%)`,
            zIndex: -1,
            animation: `float${i + 1} ${8 + i * 2}s ease-in-out infinite`,
            top: `${5 + i * 9}%`,
            left: `${3 + i * 11}%`,
            filter: theme.palette.mode === 'dark' ? 'blur(1px)' : 'blur(1px)',
            opacity: theme.palette.mode === 'dark' ? 0.6 : 0.7,
            '@keyframes float1': {
              '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
              '33%': { transform: 'translate(30px, -30px) rotate(120deg) scale(1.1)' },
              '66%': { transform: 'translate(-25px, 25px) rotate(240deg) scale(0.9)' },
            },
            '@keyframes float2': {
              '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
              '50%': { transform: 'translate(-40px, -25px) rotate(180deg) scale(1.2)' },
            },
            '@keyframes float3': {
              '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
              '25%': { transform: 'translate(25px, 35px) rotate(90deg) scale(0.8)' },
              '75%': { transform: 'translate(-35px, -15px) rotate(270deg) scale(1.1)' },
            },
            '@keyframes float4': {
              '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
              '33%': { transform: 'translate(-30px, 30px) rotate(120deg) scale(1.3)' },
              '66%': { transform: 'translate(40px, -20px) rotate(240deg) scale(0.7)' },
            },
            '@keyframes float5': {
              '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
              '50%': { transform: 'translate(20px, -40px) rotate(180deg) scale(1.1)' },
            },
            '@keyframes float6': {
              '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
              '25%': { transform: 'translate(-35px, 25px) rotate(90deg) scale(0.9)' },
              '75%': { transform: 'translate(30px, 35px) rotate(270deg) scale(1.2)' },
            },
            '@keyframes float7': {
              '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
              '33%': { transform: 'translate(45px, -25px) rotate(120deg) scale(0.8)' },
              '66%': { transform: 'translate(-20px, 40px) rotate(240deg) scale(1.1)' },
            },
            '@keyframes float8': {
              '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
              '50%': { transform: 'translate(-25px, -45px) rotate(180deg) scale(1.3)' },
            },
            '@keyframes float9': {
              '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
              '33%': { transform: 'translate(35px, 30px) rotate(120deg) scale(0.9)' },
              '66%': { transform: 'translate(-30px, -35px) rotate(240deg) scale(1.2)' },
            },
            '@keyframes float10': {
              '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
              '50%': { transform: 'translate(40px, 20px) rotate(180deg) scale(0.8)' },
            },
          }}
        />
      ))}

      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              justifyContent: 'space-between', 
              mb: 2,
              gap: 2,
            }}>
              <Box>
                <Typography
                  variant={isMobile ? 'h5' : 'h4'}
                  sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}
                >
                  ¡Hola, {user?.alias || 'Usuario'}! 👋
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Aquí tienes un resumen de tus finanzas
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title={balanceVisible ? 'Ocultar saldos' : 'Mostrar saldos'}>
                  <IconButton
                    onClick={() => setBalanceVisible(!balanceVisible)}
                    sx={{ 
                      background: semanticTokens.surface.interactive,
                      border: `1px solid ${semanticTokens.border.subtle}`,
                      backdropFilter: 'blur(12px)',
                      '&:hover': {
                        background: semanticTokens.surface.elevated,
                        borderColor: semanticTokens.border.interactive,
                      }
                    }}
                  >
                    {balanceVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </Tooltip>

                <Tooltip title="Actualizar datos">
                  <IconButton
                    onClick={handleRefresh}
                    disabled={refreshing}
                    sx={{ 
                      background: semanticTokens.surface.interactive,
                      border: `1px solid ${semanticTokens.border.subtle}`,
                      backdropFilter: 'blur(12px)',
                      '&:hover': {
                        background: semanticTokens.surface.elevated,
                        borderColor: semanticTokens.border.interactive,
                      }
                    }}
                  >
                    <Refresh sx={{ 
                      animation: refreshing ? 'spin 1s linear infinite' : 'none',
                      '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                      },
                    }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Configuración">
                  <IconButton
                    onClick={() => navigate('/settings')}
                    sx={{ 
                      background: semanticTokens.surface.interactive,
                      border: `1px solid ${semanticTokens.border.subtle}`,
                      backdropFilter: 'blur(12px)',
                      '&:hover': {
                        background: semanticTokens.surface.elevated,
                        borderColor: semanticTokens.border.interactive,
                      }
                    }}
                  >
                    <Settings />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </MotionBox>

        {/* Financial Metrics */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
              Resumen Financiero
            </Typography>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { 
                xs: 'repeat(2, 1fr)', 
                sm: 'repeat(2, 1fr)', 
                md: 'repeat(4, 1fr)' 
              }, 
              gap: { xs: 2, md: 3 } 
            }}>
              {financialMetrics.map((metric, index) => (
                <MetricCard key={metric.title} {...metric} />
              ))}
            </Box>
          </Box>
        </MotionBox>

        {/* Main Content Grid */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            md: 'repeat(2, 1fr)', 
            lg: 'repeat(3, 1fr)' 
          }, 
          gap: { xs: 2, md: 3 } 
        }}>
          {/* Currency Exchange - Takes full width on mobile, spans 3 columns on lg */}
          <Box sx={{ gridColumn: { xs: '1', lg: '1 / -1' } }}>
            <CurrencyExchangeCard dollarRates={dollarRates} />
          </Box>
          
          {/* Quick Actions and Account Health side by side */}
          <QuickActionsCard onActionClick={handleQuickAction} />
          <AccountHealthCard />
        </Box>

        {/* Floating Action Button for Quick Transfer */}
        <AnimatePresence>
          {!isMobile && (
            <MotionFab
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              color="primary"
              aria-label="Transferencia rápida"
              sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: 1000,
                // 🎯 CONTRASTE EXTREMO: FAB siempre visible
                background: theme.palette.mode === 'dark'
                  ? `linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246)) !important`
                  : semanticTokens.surface.primary,
                border: theme.palette.mode === 'dark' 
                  ? `2px solid rgb(59, 130, 246) !important` 
                  : `1px solid ${semanticTokens.border.interactive}`,
                color: theme.palette.mode === 'dark' 
                  ? 'rgb(255, 255, 255) !important' 
                  : 'primary.main',
                backdropFilter: 'blur(16px)',
                boxShadow: theme.palette.mode === 'dark'
                  ? `0 8px 25px rgba(59, 130, 246, 0.4) !important`
                  : semanticTokens.shadow.financial,
                '&:hover': {
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, rgb(99, 170, 255), rgb(179, 132, 255)) !important`
                    : semanticTokens.surface.interactive,
                  transform: 'translateY(-2px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? `0 12px 35px rgba(59, 130, 246, 0.6) !important`
                    : semanticTokens.shadow.lg,
                }
              }}
              onClick={() => handleQuickAction('transfer')}
            >
              <Send />
            </MotionFab>
          )}
        </AnimatePresence>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <MotionFab
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              size="small"
              color="secondary"
              aria-label="Ir arriba"
              sx={{
                position: 'fixed',
                bottom: isMobile ? 24 : 96,
                right: 24,
                zIndex: 999,
                // 🎯 CONTRASTE EXTREMO: Scroll button siempre visible
                background: theme.palette.mode === 'dark'
                  ? `linear-gradient(135deg, rgb(139, 92, 246), rgb(244, 63, 94)) !important`
                  : `linear-gradient(135deg, ${theme.palette.secondary.main}, ${alpha(theme.palette.secondary.dark, 0.9)})`,
                color: 'rgb(255, 255, 255) !important',
                border: theme.palette.mode === 'dark' 
                  ? '2px solid rgb(139, 92, 246) !important' 
                  : `2px solid ${alpha('#ffffff', 0.3)}`,
                boxShadow: theme.palette.mode === 'dark'
                  ? `0 8px 25px rgba(139, 92, 246, 0.4) !important`
                  : `
                    0 8px 25px ${alpha(theme.palette.secondary.main, 0.4)},
                    0 4px 12px ${alpha(theme.palette.grey[800], 0.2)}
                  `,
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, rgb(179, 132, 255), rgb(251, 113, 133)) !important`
                    : `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
                  boxShadow: theme.palette.mode === 'dark'
                    ? `0 12px 35px rgba(139, 92, 246, 0.6) !important`
                    : `
                      0 12px 35px ${alpha(theme.palette.secondary.main, 0.5)},
                      0 6px 20px ${alpha(theme.palette.grey[800], 0.25)}
                    `,
                  transform: 'translateY(-2px)',
                },
              }}
              onClick={scrollToTop}
            >
              <KeyboardArrowUp />
            </MotionFab>
          )}
        </AnimatePresence>

        {/* 🚀 QUICK ACTIONS MODAL: Modal para acciones rápidas */}
        <Dialog
          open={actionModal.open}
          onClose={handleCloseActionModal}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '16px',
              background: semanticTokens.surface.primary,
              border: `1px solid ${semanticTokens.border.default}`,
              backdropFilter: theme.palette.mode === 'dark' ? 'blur(20px)' : 'none',
            }
          }}
        >
          <DialogTitle sx={{ 
            pb: 2,
            borderBottom: `1px solid ${semanticTokens.border.subtle}`,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            {actionModal.type === 'transfer' && <Send color="primary" />}
            {actionModal.type === 'deposit' && <Add color="success" />}
            {actionModal.type === 'withdraw' && <Remove color="warning" />}
            {actionModal.type === 'history' && <History color="info" />}
            
            {actionModal.type === 'transfer' && 'Transferir Dinero'}
            {actionModal.type === 'deposit' && 'Cargar Dinero'}
            {actionModal.type === 'withdraw' && 'Retirar Dinero'}
            {actionModal.type === 'history' && 'Historial de Transacciones'}
          </DialogTitle>
          
          <DialogContent sx={{ p: 3 }}>
            {actionModal.type === 'history' ? (
              <Box>
                <Typography variant="body1" paragraph>
                  📊 Aquí podrás ver todas tus transacciones recientes, filtrar por fechas y exportar reportes.
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: '12px', 
                    background: alpha(theme.palette.success.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                  }}>
                    <Typography variant="body2" color="success.main" fontWeight={600}>
                      💰 Última carga: $50.000 ARS - Hace 2 días
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: '12px', 
                    background: alpha(theme.palette.info.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
                  }}>
                    <Typography variant="body2" color="info.main" fontWeight={600}>
                      🔄 Última transferencia: $15.000 ARS - Hace 1 semana
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: '12px', 
                    background: alpha(theme.palette.warning.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
                  }}>
                    <Typography variant="body2" color="warning.main" fontWeight={600}>
                      💸 Último retiro: $25.000 ARS - Hace 3 días
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ) : (
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Monto"
                  type="number"
                  value={actionForm.amount}
                  onChange={(e) => handleFormChange('amount', e.target.value)}
                  placeholder="0.00"
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1, color: 'text.secondary' }}>$</Typography>,
                    endAdornment: <Typography sx={{ ml: 1, color: 'text.secondary' }}>ARS</Typography>,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    }
                  }}
                />

                {actionModal.type === 'transfer' && (
                  <TextField
                    fullWidth
                    label="Destinatario"
                    value={actionForm.destination}
                    onChange={(e) => handleFormChange('destination', e.target.value)}
                    placeholder="Email o CBU del destinatario"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      }
                    }}
                  />
                )}

                <FormControl fullWidth>
                  <InputLabel>Método</InputLabel>
                  <Select
                    value={actionForm.method}
                    label="Método"
                    onChange={(e) => handleFormChange('method', e.target.value)}
                    sx={{
                      borderRadius: '12px',
                    }}
                  >
                    {actionModal.type === 'deposit' && [
                      <MenuItem key="credit_card" value="credit_card">💳 Tarjeta de Crédito</MenuItem>,
                      <MenuItem key="debit_card" value="debit_card">💳 Tarjeta de Débito</MenuItem>,
                      <MenuItem key="bank_transfer" value="bank_transfer">🏦 Transferencia Bancaria</MenuItem>,
                      <MenuItem key="mercado_pago" value="mercado_pago">💙 Mercado Pago</MenuItem>
                    ]}
                    {actionModal.type === 'withdraw' && [
                      <MenuItem key="bank_transfer" value="bank_transfer">🏦 Transferencia Bancaria</MenuItem>,
                      <MenuItem key="cash_pickup" value="cash_pickup">💵 Retiro en Efectivo</MenuItem>
                    ]}
                    {actionModal.type === 'transfer' && [
                      <MenuItem key="instant" value="instant">⚡ Transferencia Instantánea</MenuItem>,
                      <MenuItem key="scheduled" value="scheduled">📅 Transferencia Programada</MenuItem>
                    ]}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Descripción (opcional)"
                  value={actionForm.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  placeholder="Concepto de la operación"
                  multiline
                  rows={2}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    }
                  }}
                />

                {/* 💡 INFO SECTION */}
                <Box sx={{ 
                  p: 2, 
                  borderRadius: '12px', 
                  background: alpha(theme.palette.info.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
                }}>
                  <Typography variant="body2" color="info.main">
                    {actionModal.type === 'transfer' && '🔒 Las transferencias son seguras y están protegidas con encriptación de extremo a extremo.'}
                    {actionModal.type === 'deposit' && '💰 Las cargas de dinero se procesan instantáneamente. Comisión: 2.5%'}
                    {actionModal.type === 'withdraw' && '⏱️ Los retiros se procesan en 24-48 horas hábiles. Comisión: 1.5%'}
                  </Typography>
                </Box>
              </Stack>
            )}
          </DialogContent>
          
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button
              onClick={handleCloseActionModal}
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                px: 3
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleExecuteAction}
              variant="contained"
              disabled={actionLoading || (!actionForm.amount && actionModal.type !== 'history')}
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                px: 4,
                minWidth: 120
              }}
            >
              {actionLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <>
                  {actionModal.type === 'transfer' && '💸 Transferir'}
                  {actionModal.type === 'deposit' && '💰 Cargar'}
                  {actionModal.type === 'withdraw' && '💵 Retirar'}
                  {actionModal.type === 'history' && '📊 Ver Historial'}
                </>
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default DashboardPageNew;
