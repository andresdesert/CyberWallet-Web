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
  Badge,
  Switch,
  FormControlLabel,
  alpha,
  Divider,
  LinearProgress,
  Skeleton,
} from '@mui/material';
import Layout from '@/layout/Layout';
import {
  AccountBalanceWallet,
  TrendingUp,
  TrendingDown,
  SwapHoriz,
  Visibility,
  VisibilityOff,
  Settings,
  History,
  Send,
  GetApp,
  AttachMoney,
  Analytics,
  Security,
  Speed,
  AccountBalance,
  CreditCard,
  Receipt,
  PieChart,
  BarChart,
  Assessment,
  MonetizationOn,
  EuroSymbol,
  CurrencyExchange,
  Refresh,
  KeyboardArrowUp,
  KeyboardArrowDown,
  MoreVert,
  Add,
  Remove,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCotizaciones } from '@/hooks/useCotizaciones';
import { getGlass } from '@/theme/designTokens';
import { useUnifiedTheme } from '@/context/UnifiedThemeContext';
import { getActiveTokens } from '@/theme/tokens/colorTokens';
import log from 'loglevel';

// Enhanced Motion Components
const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);
const MotionFab = motion.create(Fab);

// Animation variants for better UX
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

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
  lastUpdate: new Date().toISOString(),
  accountHealth: 95,
  rewardsPoints: 1250,
  cardType: 'Visa Platinum',
  cardNumber: '4532 **** **** 9012',
  cardExpiry: '12/25',
  cardHolder: 'JUAN PÉREZ',
  securityLevel: 'Alto',
  verificationStatus: 'Verificado',
};

// Enhanced metrics with better categorization
interface DollarRate {
  nombre: string;
  venta: number;
}

interface QuickAction {
  label: string;
  icon: React.ComponentType;
  action: string;
  color: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'secondary';
  description: string;
}

const getFinancialMetrics = (balanceVisible: boolean, dollarRates: DollarRate[]) => {
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
      priority: 1,
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
      priority: 2,
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
      priority: 3,
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
      priority: 4,
    },
  ];
};

// Enhanced Quick Actions with better UX
const quickActions: QuickAction[] = [
  {
    label: 'Transferir',
    icon: Send,
    action: 'transfer',
    color: 'primary',
    description: 'Enviar dinero por CVU o alias',
  },
  {
    label: 'Cargar',
    icon: Add,
    action: 'deposit',
    color: 'success',
    description: 'Agregar fondos a tu billetera',
  },
  {
    label: 'Retirar',
    icon: Remove,
    action: 'withdraw',
    color: 'warning',
    description: 'Retirar a cuenta bancaria',
  },
  {
    label: 'Historial',
    icon: History,
    action: 'history',
    color: 'info',
    description: 'Ver todas las transacciones',
  },
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
  delay: number;
  priority: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  displayValue,
  change,
  icon: Icon,
  trend,
  color,
  subtitle,
  delay,
  priority,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getTrendIcon = () => {
    if (trend === 'up') return <KeyboardArrowUp color="success" />;
    if (trend === 'down') return <KeyboardArrowDown color="error" />;
    return null;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'success';
    if (trend === 'down') return 'error';
    return 'inherit';
  };

  return (
    <MotionCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      sx={{
        ...getGlass.medium(theme.palette.mode),
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.05)}, ${alpha(theme.palette[color].main, 0.02)})`,
        border: `1px solid ${alpha(theme.palette[color].main, 0.1)}`,
        '&:hover': {
          border: `1px solid ${alpha(theme.palette[color].main, 0.3)}`,
          boxShadow: `0 8px 32px ${alpha(theme.palette[color].main, 0.15)}`,
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
          
          {priority <= 2 && (
            <Chip
              size="small"
              label="Destacado"
              color={color}
              variant="outlined"
              sx={{ fontSize: '0.7rem' }}
            />
          )}
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

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, fontWeight: 500 }}
        >
          {title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: '0.75rem' }}
          >
            {subtitle}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {getTrendIcon()}
            <Typography
              variant="caption"
              color={getTrendColor()}
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
const CurrencyExchangeCard: React.FC<{ dollarRates: any[] }> = ({ dollarRates }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!dollarRates.length) {
    return (
      <Card sx={{ ...getGlass.medium(theme.palette.mode), borderRadius: '16px' }}>
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
        ...getGlass.medium(theme.palette.mode),
        borderRadius: '16px',
        overflow: 'hidden',
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
          <IconButton size="small" color="primary">
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
                  background: alpha(theme.palette.background.default, 0.5),
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {rate.nombre}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {rate.fechaActualizacion ? new Date(rate.fechaActualizacion).toLocaleDateString() : 'Actualizado'}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" fontWeight={600}>
                      ${rate.venta?.toFixed(2) || rate.compra?.toFixed(2)}
                    </Typography>
                    {rate.change && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {rate.change === 'up' && <KeyboardArrowUp color="success" fontSize="small" />}
                        {rate.change === 'down' && <KeyboardArrowDown color="error" fontSize="small" />}
                        <Typography
                          variant="caption"
                          color={rate.change === 'up' ? 'success.main' : rate.change === 'down' ? 'error.main' : 'text.secondary'}
                          fontWeight={500}
                        >
                          {rate.change}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Stack>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<Assessment />}
          sx={{ mt: 2, borderRadius: '12px' }}
          onClick={() => window.open('/market-analysis', '_blank')}
        >
          Ver Análisis Completo
        </Button>
      </CardContent>
    </MotionCard>
  );
};

// Quick Actions Component
const QuickActionsCard: React.FC<{ onActionClick: (action: string) => void }> = ({ onActionClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MotionCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      sx={{
        ...getGlass.medium(theme.palette.mode),
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Acciones Rápidas
        </Typography>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(2, 1fr)' }, 
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
                  borderColor: alpha(
                    theme.palette[action.color]?.main || theme.palette.primary.main, 
                    0.3
                  ),
                  color: theme.palette[action.color]?.main || theme.palette.primary.main,
                  '&:hover': {
                    borderColor: theme.palette[action.color]?.main || theme.palette.primary.main,
                    background: alpha(
                      theme.palette[action.color]?.main || theme.palette.primary.main, 
                      0.05
                    ),
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" fontWeight={600}>
                      {action.label}
                    </Typography>
                    {!isMobile && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        {action.description}
                      </Typography>
                    )}
                  </Box>
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

  return (
    <MotionCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      sx={{
        ...getGlass.medium(theme.palette.mode),
        borderRadius: '16px',
        overflow: 'hidden',
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
          {/* Account Health */}
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

          {/* Monthly Limit */}
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

          {/* Daily Limit */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Límite Diario
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                ${mockWalletData.dailyUsed.toLocaleString()} / ${mockWalletData.dailyLimit.toLocaleString()}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(mockWalletData.dailyUsed / mockWalletData.dailyLimit) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.info.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  backgroundColor: theme.palette.info.main,
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        </Stack>

        <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
          <Chip label={mockWalletData.verificationStatus} color="success" size="small" />
          <Chip label={mockWalletData.securityLevel} color="primary" size="small" />
          <Chip label={mockWalletData.level} color="info" size="small" />
        </Box>
      </CardContent>
    </MotionCard>
  );
};

// Main Dashboard Component
const DashboardPageRefactored: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { mode } = useUnifiedTheme();

  // States
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Hooks
  const { cotizaciones: dollarRates, isLoading: cotizacionesLoading, isError: cotizacionesError } = useCotizaciones();

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
        navigate('/transfer');
        break;
      case 'deposit':
        navigate('/deposit');
        break;
      case 'withdraw':
        navigate('/withdraw');
        break;
      case 'history':
        navigate('/transactions');
        break;
      default:
        enqueueSnackbar(`Función ${action} próximamente disponible`, { variant: 'info' });
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    enqueueSnackbar('Datos actualizados', { variant: 'success' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
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
                    sx={{
                      fontWeight: 700,
                      color: 'text.primary',
                      mb: 0.5,
                    }}
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
                        ...getGlass.subtle(theme.palette.mode),
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
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
                        ...getGlass.subtle(theme.palette.mode),
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
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
                        ...getGlass.subtle(theme.palette.mode),
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <Settings />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </motion.div>

          {/* Financial Metrics */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 3,
                }}
              >
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
                  <Box 
                    key={metric.title}
                    sx={{
                      order: { xs: metric.priority, md: 'unset' }
                    }}
                  >
                    <MetricCard
                      {...metric}
                      delay={index}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>

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
            {/* Currency Exchange - Priority on mobile */}
            <Box>
              <CurrencyExchangeCard dollarRates={dollarRates} />
            </Box>

            {/* Quick Actions */}
            <Box>
              <QuickActionsCard onActionClick={handleQuickAction} />
            </Box>

            {/* Account Health */}
            <Box sx={{ gridColumn: { lg: 'span 1' } }}>
              <AccountHealthCard />
            </Box>
          </Box>
        </motion.div>

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
                ...getGlass.medium(theme.palette.mode),
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
                ...getGlass.subtle(theme.palette.mode),
              }}
              onClick={scrollToTop}
            >
              <KeyboardArrowUp />
            </MotionFab>
          )}
        </AnimatePresence>
      </Container>
    </Layout>
  );
};

export default DashboardPageRefactored;
