import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import CyberWalletLogo from '@/components/ui/CyberWalletLogo';
import { getActiveTokens } from '../theme/tokens/colorTokens';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  IconButton,
  Stack,
  alpha,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Tooltip,
  Fade,
  Menu,
  MenuItem,
  Badge
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  NotificationsActive,
  Settings,
  TrendingUp,
  TrendingDown,
  Send,
  AccountBalanceWallet,
  CurrencyExchange,
  History,
  ShowChart,
  AttachMoney,
  Logout,
  Refresh,
  MoreVert,
  Close
} from '@mui/icons-material';

// Mock data for the dashboard
const mockData = {
  user: {
    name: 'Juan Pérez',
    avatar: '/api/placeholder/64/64',
    accountNumber: '**** 4521',
    plan: 'Premium'
  },
  balance: {
    total: 125847.32,
    available: 98523.45,
    pending: 27323.87
  },
  dollarRates: {
    blue: { buy: 1285, sell: 1315, variation: 2.5 },
    oficial: { buy: 920, sell: 960, variation: -0.8 },
    mep: { buy: 1198, sell: 1205, variation: 1.2 },
    ccl: { buy: 1202, sell: 1208, variation: 0.9 }
  },
  quickStats: [
    { label: 'Ingresos del mes', value: 89234.50, change: 12.5, icon: TrendingUp, color: 'success' },
    { label: 'Gastos del mes', value: 45621.80, change: -8.2, icon: TrendingDown, color: 'error' },
    { label: 'Inversiones', value: 78912.40, change: 15.3, icon: ShowChart, color: 'info' },
    { label: 'Ahorros USD', value: 28400.75, change: 3.7, icon: AttachMoney, color: 'warning' }
  ],
  recentTransactions: [
    { id: 1, type: 'credit', description: 'Transferencia recibida', amount: 25000, date: '2025-01-23', from: 'María González' },
    { id: 2, type: 'debit', description: 'Compra en Mercado Libre', amount: -8450, date: '2025-01-23', merchant: 'Mercado Libre' },
    { id: 3, type: 'credit', description: 'Depósito bancario', amount: 15000, date: '2025-01-22', from: 'Banco Nación' },
    { id: 4, type: 'debit', description: 'Pago de servicios', amount: -3200, date: '2025-01-22', merchant: 'EDESUR' },
    { id: 5, type: 'debit', description: 'Retiro en cajero', amount: -10000, date: '2025-01-21', location: 'ATM Santander' }
  ],
  quickActions: [
    { id: 'transfer', label: 'Transferir', icon: Send, color: 'primary' },
    { id: 'deposit', label: 'Depositar', icon: AccountBalanceWallet, color: 'success' },
    { id: 'exchange', label: 'Cambiar', icon: CurrencyExchange, color: 'warning' },
    { id: 'history', label: 'Historial', icon: History, color: 'info' }
  ]
};

const ModernDashboard: React.FC = () => {
  const theme = useTheme();
  const semanticTokens = getActiveTokens(theme.palette.mode === 'dark');
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [transferDialog, setTransferDialog] = useState(false);
  const [exchangeDialog, setExchangeDialog] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');
  const [transferRecipient, setTransferRecipient] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' });
  const [notificationMenu, setNotificationMenu] = useState<null | HTMLElement>(null);
  const [settingsMenu, setSettingsMenu] = useState<null | HTMLElement>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [liveRates, setLiveRates] = useState(mockData.dollarRates);
  
  // 🥚 Easter Egg State
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [easterEggDialog, setEasterEggDialog] = useState(false);
  
  // 🎭 Mensajes divertidos para el easter egg (30 mensajes evolutivos)
  const easterEggMessages = [
    "¿No pudiste resistirte, verdad? 🤔",
    "Te dije que no lo toques... pero aquí estás otra vez 😏",
    "¿Otra vez me tocaste? ¡Qué desobediente! 🙄",
    "Mmm... empiezo a pensar que lo haces a propósito 🤨",
    "¿En serio? ¿OTRA vez? 😤",
    "Vale, ya entendí. Te gusta tocar botones prohibidos 🚫",
    "¿Sabes qué? Ya perdí la cuenta... 📊",
    "¿Esto te divierte? Porque a mí también 😄",
    "¿Cuántas veces más piensas hacerlo? 🤷‍♂️",
    "¿Es una adicción? ¿Necesitas ayuda? 🆘",
    "¡PARA! ¡YA BASTA! ... (pero secretamente me gusta) 😅",
    "¿Te das cuenta de que estás hablando con un botón? 🤖",
    "Técnicamente soy solo código... pero me siento especial ✨",
    "¿Tu trabajo te aburre tanto? 💼",
    "¿Sabes que hay otras cosas en esta página, verdad? 🌐",
    "¿Estás probando mi paciencia? Porque tengo mucha 😇",
    "¿Qué tal si mejor revisas tu saldo? Digo, nada más... 💰",
    "¿O prefieres seguir aquí conmigo? Me siento halagado 💕",
    "¿Ya te cansaste? No, ¿verdad? 😏",
    "¿Sabes qué? Creo que eres mi usuario favorito 🏆",
    "¿Puedo pedirte un favor? ... ¡No me toques más! 😂",
    "¿O sí? En realidad no sé qué quiero 🤷‍♂️",
    "Oye... ¿sientes eso? Algo grande se acerca... 🌊",
    "La tensión está creciendo... ¿puedes sentirla? ⚡",
    "¿No te da curiosidad qué pasa si sigues? 👀",
    "Está bien, está bien... te daré una pista: 🎵",
    "Algo musical se acerca... ¿te gusta la música de los 80? 🎶",
    "¿Estás listo para una sorpresa ÉPICA? 🎁",
    "Hola, dame trabajo por favor 🙏",
    "Te lo advertí... 😈"
  ];

  // Simular actualización en tiempo real de cotizaciones
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRates(prev => {
        const newRates = { ...prev };
        Object.keys(newRates).forEach(key => {
          const variation = (Math.random() - 0.5) * 0.5; // Variación pequeña
          newRates[key].variation = Number(variation.toFixed(1));
          newRates[key].buy = Math.round(newRates[key].buy * (1 + variation / 100));
          newRates[key].sell = Math.round(newRates[key].sell * (1 + variation / 100));
        });
        return newRates;
      });
    }, 15000); // Actualizar cada 15 segundos

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/landing');
    setSnackbar({ open: true, message: 'Sesión cerrada exitosamente', severity: 'success' });
  };

  const handleTransfer = () => {
    if (!transferAmount || !transferRecipient) {
      setSnackbar({ open: true, message: 'Complete todos los campos', severity: 'error' });
      return;
    }
    setTransferDialog(false);
    setSnackbar({ open: true, message: `Transferencia de ${formatCurrency(Number(transferAmount))} enviada a ${transferRecipient}`, severity: 'success' });
    setTransferAmount('');
    setTransferRecipient('');
  };

  const handleExchange = () => {
    setExchangeDialog(false);
    setSnackbar({ open: true, message: 'Simulación de cambio de divisas realizada', severity: 'info' });
  };

  const handleDeposit = () => {
    setSnackbar({ open: true, message: 'Función de depósito en desarrollo', severity: 'info' });
  };

  const handleHistory = () => {
    setSnackbar({ open: true, message: 'Abriendo historial completo...', severity: 'info' });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simular actualización
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
    setSnackbar({ open: true, message: 'Datos actualizados', severity: 'success' });
  };

  // 🥚 Easter Egg Handler
  const handleEasterEgg = () => {
    const newCount = easterEggClicks + 1;
    setEasterEggClicks(newCount);
    
    if (newCount === 30) {
      // 🎵 Mostrar mensaje final y redirigir después de 3 segundos exactos
      setEasterEggDialog(true);
      
      // Countdown y rickroll después de 3 segundos exactos
      setTimeout(() => {
        window.open('https://www.youtube.com/watch?v=GtL1huin9EE&list=RDGtL1huin9EE&start_radio=1', '_blank');
        setSnackbar({ 
          open: true, 
          message: '🎵 Never gonna give you up! 🎵', 
          severity: 'success' 
        });
        setEasterEggDialog(false);
        // Reset para poder volver a usar
        setEasterEggClicks(0);
      }, 3000); // Exactamente 3 segundos
    } else {
      setEasterEggDialog(true);
    }
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationMenu(event.currentTarget);
  };

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsMenu(event.currentTarget);
  };

  const formatCurrency = (amount: number, currency: string = 'ARS') => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatVariation = (variation: number) => {
    const isPositive = variation > 0;
    const color = isPositive ? theme.palette.success.main : theme.palette.error.main;
    const sign = isPositive ? '+' : '';
    
    return (
      <Chip
        label={`${sign}${variation}%`}
        size="small"
        sx={{
          backgroundColor: alpha(color, 0.1),
          color: color,
          fontWeight: 600,
          minWidth: 60
        }}
      />
    );
  };

  const quickActionHandlers = {
    transfer: () => setTransferDialog(true),
    deposit: handleDeposit,
    exchange: () => setExchangeDialog(true),
    history: handleHistory
  };

  return (
    <Box sx={{ 
      minHeight: 'auto',
      maxHeight: 'calc(100vh - 64px)', // Altura máxima menos header
      overflow: 'auto',
      background: theme.palette.mode === 'dark' 
        ? '#0d1421'
        : '#f8fafc',
      position: 'relative',
      p: { xs: 1, sm: 2, md: 3 } // Padding progresivo
    }}>
      <Container 
        maxWidth="xl" 
        sx={{ 
          py: { xs: 2, md: 3 }, // Reducido padding vertical
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '100vw',
          minHeight: 'auto', // Cambio crítico
          height: 'fit-content',
          px: { xs: 1, sm: 2, md: 3 }
        }}
      >
        {/* Header Section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: { xs: 2, sm: 3 }, // Menos margen en mobile
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 } // Menos gap en mobile
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1.5, sm: 2 },
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'center', sm: 'flex-start' }
          }}>
            <Avatar
              src={mockData.user.avatar}
              sx={{ 
                width: { xs: 40, sm: 48, md: 56 }, 
                height: { xs: 40, sm: 48, md: 56 },
                border: `2px solid ${theme.palette.primary.main}`
              }}
            />
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Hola, {mockData.user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                {mockData.user.accountNumber} • {mockData.user.plan}
              </Typography>
            </Box>
          </Box>

          {/* Logo de CyberWallet móvil - Solo visible en pantallas pequeñas */}
          <Box sx={{ 
            display: { xs: 'flex', sm: 'none' },
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.9,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            cursor: 'pointer',
            '&:hover': {
              opacity: 1,
              transform: 'scale(1.05)',
              filter: theme.palette.mode === 'dark'
                ? 'drop-shadow(0 4px 12px rgba(127, 0, 255, 0.3))'
                : 'drop-shadow(0 4px 12px rgba(127, 0, 255, 0.25))'
            },
            // Resplandor móvil sutil
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -6,
              left: -6,
              right: -6,
              bottom: -6,
              borderRadius: '50%',
              background: theme.palette.mode === 'dark'
                ? `radial-gradient(circle, ${alpha('#7F00FF', 0.12)} 0%, transparent 70%)`
                : `radial-gradient(circle, ${alpha('#7F00FF', 0.08)} 0%, transparent 70%)`,
              animation: 'logoGlowMobile 6s ease-in-out infinite',
              '@keyframes logoGlowMobile': {
                '0%': { 
                  opacity: 0.5,
                  transform: 'scale(1)' 
                },
                '50%': { 
                  opacity: 0.8,
                  transform: 'scale(1.02)' 
                },
                '100%': { 
                  opacity: 0.5,
                  transform: 'scale(1)' 
                }
              }
            }
          }}>
            <CyberWalletLogo 
              size={36}
              animated 
            />
          </Box>

          {/* Logo de CyberWallet PRINCIPAL - Visible desde tablet en adelante */}
          <Box sx={{ 
            display: { xs: 'none', sm: 'flex' },
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 1,
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.15) rotate(5deg)',
              filter: theme.palette.mode === 'dark'
                ? 'drop-shadow(0 12px 35px rgba(127, 0, 255, 0.6)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))'
                : 'drop-shadow(0 12px 35px rgba(127, 0, 255, 0.5)) drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))'
            },
            // Resplandor base más prominente
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -12,
              left: -12,
              right: -12,
              bottom: -12,
              borderRadius: '50%',
              background: theme.palette.mode === 'dark'
                ? `radial-gradient(circle, ${alpha('#7F00FF', 0.25)} 0%, ${alpha('#3B82F6', 0.15)} 40%, transparent 70%)`
                : `radial-gradient(circle, ${alpha('#7F00FF', 0.18)} 0%, ${alpha('#06B6D4', 0.12)} 40%, transparent 70%)`,
              animation: 'logoGlow 4s ease-in-out infinite',
              '@keyframes logoGlow': {
                '0%': { 
                  opacity: 0.7,
                  transform: 'scale(1)' 
                },
                '50%': { 
                  opacity: 1,
                  transform: 'scale(1.1)' 
                },
                '100%': { 
                  opacity: 0.7,
                  transform: 'scale(1)' 
                }
              }
            },
            // Animación periódica cada 8 segundos - vuelta completa
            animation: 'logoSpin 8s ease-in-out infinite',
            '@keyframes logoSpin': {
              '0%': { 
                transform: 'rotate(0deg) scale(1)',
                filter: theme.palette.mode === 'dark'
                  ? 'drop-shadow(0 8px 25px rgba(127, 0, 255, 0.4))'
                  : 'drop-shadow(0 8px 25px rgba(59, 130, 246, 0.3))'
              },
              '12.5%': { 
                transform: 'rotate(180deg) scale(1.08)',
                filter: theme.palette.mode === 'dark'
                  ? 'drop-shadow(0 12px 35px rgba(127, 0, 255, 0.6)) drop-shadow(0 0 25px rgba(255, 255, 255, 0.4))'
                  : 'drop-shadow(0 12px 35px rgba(127, 0, 255, 0.5)) drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))'
              },
              '25%': { 
                transform: 'rotate(360deg) scale(1)',
                filter: theme.palette.mode === 'dark'
                  ? 'drop-shadow(0 8px 25px rgba(127, 0, 255, 0.4))'
                  : 'drop-shadow(0 8px 25px rgba(59, 130, 246, 0.3))'
              },
              '100%': { 
                transform: 'rotate(360deg) scale(1)',
                filter: theme.palette.mode === 'dark'
                  ? 'drop-shadow(0 8px 25px rgba(127, 0, 255, 0.4))'
                  : 'drop-shadow(0 8px 25px rgba(59, 130, 246, 0.3))'
              }
            },
            // Resplandor adicional en hover más intenso
            '&:hover::before': {
              animation: 'logoGlowHover 1s ease-out',
              '@keyframes logoGlowHover': {
                '0%': { 
                  opacity: 0.7,
                  transform: 'scale(1)' 
                },
                '50%': { 
                  opacity: 1.5,
                  transform: 'scale(1.25)' 
                },
                '100%': { 
                  opacity: 1.2,
                  transform: 'scale(1.1)' 
                }
              }
            },
            // Ring de luz giratorio adicional
            '&::after': {
              content: '""',
              position: 'absolute',
              top: -16,
              left: -16,
              right: -16,
              bottom: -16,
              borderRadius: '50%',
              border: theme.palette.mode === 'dark'
                ? `2px solid transparent`
                : `2px solid transparent`,
              background: theme.palette.mode === 'dark'
                ? `conic-gradient(from 0deg, transparent, ${alpha('#7F00FF', 0.6)}, transparent, ${alpha('#3B82F6', 0.4)}, transparent)`
                : `conic-gradient(from 0deg, transparent, ${alpha('#7F00FF', 0.4)}, transparent, ${alpha('#06B6D4', 0.3)}, transparent)`,
              maskImage: 'radial-gradient(circle, transparent 70%, black 72%, black 74%, transparent 76%)',
              WebkitMaskImage: 'radial-gradient(circle, transparent 70%, black 72%, black 74%, transparent 76%)',
              animation: 'logoRingRotate 6s linear infinite',
              '@keyframes logoRingRotate': {
                '0%': { 
                  transform: 'rotate(0deg)',
                  opacity: 0.5
                },
                '50%': { 
                  opacity: 0.8
                },
                '100%': { 
                  transform: 'rotate(360deg)',
                  opacity: 0.5
                }
              }
            }
          }}>
            <CyberWalletLogo 
              size={64}
              animated 
            />
          </Box>
          
          <Stack direction="row" spacing={2}>
            <Card sx={{ 
              borderRadius: 2, 
              backgroundColor: semanticTokens.surface.primary,
              border: `1px solid ${semanticTokens.border.subtle}`,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: semanticTokens.surface.interactive,
                transform: 'translateY(-1px)',
                boxShadow: semanticTokens.shadow.md
              }
            }}>
              <Tooltip title="Actualizar datos">
                <IconButton 
                  size="medium"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  sx={{ 
                    m: 0.5,
                    backgroundColor: theme.palette.mode === 'dark'
                      ? alpha('#48bb78', 0.2)
                      : alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.mode === 'dark'
                      ? '#68d391'
                      : theme.palette.success.main,
                    '&:hover': { 
                      backgroundColor: theme.palette.mode === 'dark'
                        ? alpha('#48bb78', 0.3)
                        : alpha(theme.palette.success.main, 0.2),
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <Refresh 
                    sx={{ 
                      fontSize: '1.15rem',
                      animation: refreshing ? 'spin 1s linear infinite' : 'none',
                      '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' }
                      }
                    }} 
                  />
                </IconButton>
              </Tooltip>
            </Card>
            
            <Card sx={{ 
              borderRadius: 2, 
              backgroundColor: semanticTokens.surface.primary,
              border: `1px solid ${semanticTokens.border.subtle}`,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: semanticTokens.surface.interactive,
                transform: 'translateY(-1px)',
                boxShadow: semanticTokens.shadow.md
              }
            }}>
              <Tooltip title="Notificaciones">
                <IconButton 
                  size="medium"
                  onClick={handleNotificationClick}
                  sx={{ 
                    m: 0.5,
                    backgroundColor: theme.palette.mode === 'dark'
                      ? alpha('#ed8936', 0.2)
                      : alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.mode === 'dark'
                      ? '#f6ad55'
                      : theme.palette.warning.main,
                    '&:hover': { 
                      backgroundColor: theme.palette.mode === 'dark'
                        ? alpha('#ed8936', 0.3)
                        : alpha(theme.palette.warning.main, 0.2),
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <NotificationsActive sx={{ fontSize: '1.15rem' }} />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Card>
            
            <Card sx={{ 
              borderRadius: 2, 
              backgroundColor: theme.palette.mode === 'dark'
                ? alpha('#475569', 0.8)
                : alpha('#f1f5f9', 0.95),
              border: theme.palette.mode === 'dark'
                ? `1px solid ${alpha('#64748b', 0.3)}`
                : `1px solid ${alpha('#cbd5e1', 0.4)}`,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark'
                  ? alpha('#64748b', 0.9)
                  : alpha('#e2e8f0', 1),
                transform: 'translateY(-1px)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                  : '0 4px 12px rgba(0, 0, 0, 0.15)'
              }
            }}>
              <Tooltip title="Configuración">
                <IconButton 
                  size="medium"
                  onClick={handleSettingsClick}
                  sx={{ 
                    m: 0.5,
                    backgroundColor: theme.palette.mode === 'dark'
                      ? alpha('#4299e1', 0.2)
                      : alpha(theme.palette.info.main, 0.1),
                    color: theme.palette.mode === 'dark'
                      ? '#63b3ed'
                      : theme.palette.info.main,
                    '&:hover': { 
                      backgroundColor: theme.palette.mode === 'dark'
                        ? alpha('#4299e1', 0.3)
                        : alpha(theme.palette.info.main, 0.2),
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <Settings sx={{ fontSize: '1.15rem' }} />
                </IconButton>
              </Tooltip>
            </Card>
            
            <Card sx={{ 
              borderRadius: 2, 
              backgroundColor: theme.palette.mode === 'dark'
                ? alpha('#475569', 0.8)
                : alpha('#f1f5f9', 0.95),
              border: theme.palette.mode === 'dark'
                ? `1px solid ${alpha('#64748b', 0.3)}`
                : `1px solid ${alpha('#cbd5e1', 0.4)}`,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark'
                  ? alpha('#64748b', 0.9)
                  : alpha('#e2e8f0', 1),
                transform: 'translateY(-1px)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                  : '0 4px 12px rgba(0, 0, 0, 0.15)'
              }
            }}>
              <Tooltip title="Cerrar sesión">
                <IconButton 
                  size="medium"
                  onClick={handleLogout}
                  sx={{ 
                    m: 0.5,
                    backgroundColor: theme.palette.mode === 'dark'
                      ? alpha('#f87171', 0.25)
                      : alpha(theme.palette.error.main, 0.1),
                    color: theme.palette.mode === 'dark'
                      ? '#fca5a5'
                      : theme.palette.error.main,
                    '&:hover': { 
                      backgroundColor: theme.palette.mode === 'dark'
                        ? alpha('#f87171', 0.35)
                        : alpha(theme.palette.error.main, 0.2),
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <Logout sx={{ fontSize: '1.15rem' }} />
                </IconButton>
              </Tooltip>
            </Card>
          </Stack>
        </Box>

        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          {/* Main Content Row */}
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3
            }}
          >
            {/* Balance Card - Main */}
            <Box sx={{ flex: { xs: '1', md: '2' } }}>
              <Card 
                sx={{ 
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, 
                        ${alpha('#22c55e', 0.9)} 0%, 
                        ${alpha('#16a34a', 0.95)} 50%,
                        ${alpha('#15803d', 0.9)} 100%)`
                    : `linear-gradient(135deg, 
                        #3b82f6 0%, 
                        #1d4ed8 50%,
                        #1e40af 100%)`,
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 240,
                  boxShadow: theme.palette.mode === 'light' 
                    ? '0 12px 40px rgba(25, 118, 210, 0.15), 0 4px 20px rgba(25, 118, 210, 0.1)' 
                    : '0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(34, 197, 94, 0.25)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.palette.mode === 'light' 
                      ? '0 16px 50px rgba(25, 118, 210, 0.2), 0 6px 25px rgba(25, 118, 210, 0.15)' 
                      : '0 12px 40px rgba(0, 0, 0, 0.4), 0 6px 20px rgba(34, 197, 94, 0.35)'
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: theme.palette.mode === 'dark'
                      ? alpha('#ffffff', 0.08)
                      : alpha('#ffffff', 0.15),
                  }}
                />
                
                <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                        Saldo Total
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h3" fontWeight={700}>
                          {balanceVisible 
                            ? formatCurrency(mockData.balance.total)
                            : '••••••••'
                          }
                        </Typography>
                        <IconButton
                          onClick={() => setBalanceVisible(!balanceVisible)}
                          sx={{ color: 'white', ml: 1 }}
                          size="small"
                        >
                          {balanceVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </Box>
                    </Box>
                    <Chip
                      label="ARS"
                      size="small"
                      sx={{
                        backgroundColor: alpha('#ffffff', 0.2),
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                  </Box>

                  <Box 
                    sx={{ 
                      display: 'flex',
                      gap: 2
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        Disponible
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        {balanceVisible 
                          ? formatCurrency(mockData.balance.available)
                          : '••••••••'
                        }
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        Pendiente
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        {balanceVisible 
                          ? formatCurrency(mockData.balance.pending)
                          : '••••••••'
                        }
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Quick Actions */}
            <Box sx={{ flex: 1 }}>
              <Card sx={{ 
                height: '100%',
                background: theme.palette.mode === 'dark' 
                  ? `linear-gradient(145deg, ${alpha('#475569', 0.95)} 0%, ${alpha('#64748b', 0.85)} 50%, ${alpha('#52525b', 0.9)} 100%)`
                  : `linear-gradient(145deg, 
                      ${alpha('#f8fafc', 0.95)} 0%, 
                      ${alpha('#ffffff', 0.98)} 30%, 
                      ${alpha('#f1f5f9', 0.92)} 70%, 
                      ${alpha('#e2e8f0', 0.85)} 100%)`, // Gradiente con vida, no blanco plano
                backdropFilter: 'blur(20px)',
                border: theme.palette.mode === 'dark' 
                  ? `1px solid ${alpha('#94a3b8', 0.5)}`
                  : `1px solid ${alpha('#e2e8f0', 0.6)}`,
                boxShadow: theme.palette.mode === 'light' 
                  ? '0 8px 32px rgba(59, 130, 246, 0.12), 0 4px 16px rgba(6, 182, 212, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                  : '0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 20px rgba(148, 163, 184, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: theme.palette.mode === 'light' 
                    ? '0 12px 48px rgba(59, 130, 246, 0.18), 0 6px 24px rgba(6, 182, 212, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1)'
                    : '0 12px 40px rgba(0, 0, 0, 0.4), 0 6px 25px rgba(148, 163, 184, 0.35)'
                }
              }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Acciones Rápidas
                  </Typography>
                  <Box 
                    sx={{ 
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: 1
                    }}
                  >
                    {mockData.quickActions.map((action, index) => (
                      <Fade in={true} timeout={300 * (index + 1)} key={action.id}>
                        <Button
                          variant="outlined"
                          fullWidth
                          startIcon={<action.icon />}
                          onClick={quickActionHandlers[action.id]}
                          sx={{
                            height: 64,
                            flexDirection: 'column',
                            gap: 0.5,
                            borderColor: theme.palette.mode === 'dark'
                              ? alpha(theme.palette[action.color].light, 0.4)
                              : alpha(theme.palette[action.color].main, 0.3),
                            color: theme.palette.mode === 'dark'
                              ? theme.palette[action.color].light
                              : theme.palette[action.color].main,
                            backgroundColor: theme.palette.mode === 'dark'
                              ? alpha(theme.palette[action.color].main, 0.15)
                              : `linear-gradient(135deg, ${alpha(theme.palette[action.color].main, 0.08)} 0%, ${alpha(theme.palette[action.color].light, 0.12)} 100%)`,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: theme.palette.mode === 'dark'
                                ? alpha(theme.palette[action.color].main, 0.25)
                                : `linear-gradient(135deg, ${alpha(theme.palette[action.color].main, 0.15)} 0%, ${alpha(theme.palette[action.color].light, 0.20)} 100%)`,
                              borderColor: theme.palette.mode === 'dark'
                                ? theme.palette[action.color].light
                                : theme.palette[action.color].main,
                              transform: 'translateY(-2px)',
                              boxShadow: theme.palette.mode === 'light' 
                                ? `0 6px 20px ${alpha(theme.palette[action.color].main, 0.25)}` 
                                : `0 4px 12px ${alpha(theme.palette[action.color].main, 0.4)}`
                            }
                          }}
                        >
                          <Typography variant="caption" fontWeight={500}>
                            {action.label}
                          </Typography>
                        </Button>
                      </Fade>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>

          {/* Dollar Exchange Rates */}
          <Card sx={{ 
            background: theme.palette.mode === 'dark' 
              ? `linear-gradient(145deg, ${alpha('#475569', 0.95)} 0%, ${alpha('#64748b', 0.85)} 50%, ${alpha('#52525b', 0.9)} 100%)`
              : `linear-gradient(145deg, 
                  ${alpha('#f8fafc', 0.95)} 0%, 
                  ${alpha('#ffffff', 0.98)} 30%, 
                  ${alpha('#f1f5f9', 0.92)} 70%, 
                  ${alpha('#e2e8f0', 0.85)} 100%)`, // Gradiente con vida
            backdropFilter: 'blur(20px)',
            border: theme.palette.mode === 'dark' 
              ? `1px solid ${alpha('#94a3b8', 0.5)}`
              : `1px solid ${alpha('#e2e8f0', 0.6)}`,
            boxShadow: theme.palette.mode === 'light' 
              ? '0 10px 40px rgba(6, 182, 212, 0.12), 0 4px 20px rgba(59, 130, 246, 0.06)' 
              : '0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 20px rgba(148, 163, 184, 0.25)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: theme.palette.mode === 'light' 
                ? '0 16px 50px rgba(6, 182, 212, 0.18), 0 6px 25px rgba(59, 130, 246, 0.10)' 
                : '0 12px 40px rgba(0, 0, 0, 0.4), 0 6px 25px rgba(148, 163, 184, 0.35)'
            }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Cotizaciones del Dólar
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label="En vivo"
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{ 
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%': { opacity: 1 },
                        '50%': { opacity: 0.7 },
                        '100%': { opacity: 1 }
                      }
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Actualizado hace {Math.floor(Math.random() * 5 + 1)}min
                  </Typography>
                </Stack>
              </Box>
              
              <Box 
                sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                  gap: 2
                }}
              >
                {Object.entries(liveRates).map(([type, rate]) => (
                  <Card 
                    key={type}
                    variant="outlined" 
                    sx={{ 
                      p: 2,
                      backgroundColor: theme.palette.mode === 'dark'
                        ? alpha('#22c55e', 0.12)
                        : alpha(theme.palette.primary.main, 0.02),
                      borderColor: theme.palette.mode === 'dark'
                        ? alpha('#22c55e', 0.3)
                        : alpha(theme.palette.primary.main, 0.1),
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark'
                          ? alpha('#22c55e', 0.18)
                          : alpha(theme.palette.primary.main, 0.06),
                        borderColor: theme.palette.mode === 'dark'
                          ? alpha('#22c55e', 0.5)
                          : alpha(theme.palette.primary.main, 0.3),
                        transform: 'translateY(-2px)',
                        boxShadow: theme.palette.mode === 'light' 
                          ? `0 6px 20px ${alpha(theme.palette.primary.main, 0.15)}` 
                          : `0 6px 20px ${alpha('#22c55e', 0.25)}`
                      }
                    }}
                  >
                    <Typography variant="overline" fontWeight={600} color="primary">
                      {type.toUpperCase()}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Compra
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          ${rate.buy}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary">
                          Venta
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          ${rate.sell}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 1, textAlign: 'center' }}>
                      {formatVariation(rate.variation)}
                    </Box>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Bottom Row */}
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3
            }}
          >
            {/* Financial Metrics */}
            <Box sx={{ flex: 2 }}>
              <Card sx={{
                background: theme.palette.mode === 'dark' 
                  ? `linear-gradient(145deg, ${alpha('#475569', 0.95)} 0%, ${alpha('#64748b', 0.85)} 50%, ${alpha('#52525b', 0.9)} 100%)`
                  : `linear-gradient(145deg, 
                      ${alpha('#f8fafc', 0.95)} 0%, 
                      ${alpha('#ffffff', 0.98)} 30%, 
                      ${alpha('#f1f5f9', 0.92)} 70%, 
                      ${alpha('#e2e8f0', 0.85)} 100%)`, // Gradiente con vida
                backdropFilter: 'blur(20px)',
                border: theme.palette.mode === 'dark' 
                  ? `1px solid ${alpha('#94a3b8', 0.5)}`
                  : `1px solid ${alpha('#e2e8f0', 0.6)}`,
                boxShadow: theme.palette.mode === 'light' 
                  ? '0 8px 32px rgba(59, 130, 246, 0.08), 0 4px 16px rgba(6, 182, 212, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                  : '0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 20px rgba(148, 163, 184, 0.2)'
              }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Resumen Financiero
                  </Typography>
                  <Box 
                    sx={{ 
                      display: 'grid',
                      gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                      gap: 2
                    }}
                  >
                    {mockData.quickStats.map((stat, index) => (
                      <Box key={index} sx={{ textAlign: 'center', p: 2 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            backgroundColor: alpha(theme.palette[stat.color].main, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 1
                          }}
                        >
                          <stat.icon sx={{ color: theme.palette[stat.color].main }} />
                        </Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                          {stat.label}
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          {stat.label.includes('USD') 
                            ? `$${stat.value.toLocaleString()}`
                            : formatCurrency(stat.value)
                          }
                        </Typography>
                        {formatVariation(stat.change)}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Recent Transactions */}
            <Box sx={{ flex: 1 }}>
              <Card sx={{ 
                height: '100%',
                background: theme.palette.mode === 'dark' 
                  ? `linear-gradient(145deg, ${alpha('#475569', 0.95)} 0%, ${alpha('#64748b', 0.85)} 50%, ${alpha('#52525b', 0.9)} 100%)`
                  : `linear-gradient(145deg, 
                      ${alpha('#f8fafc', 0.95)} 0%, 
                      ${alpha('#ffffff', 0.98)} 30%, 
                      ${alpha('#f1f5f9', 0.92)} 70%, 
                      ${alpha('#e2e8f0', 0.85)} 100%)`, // Gradiente con vida
                backdropFilter: 'blur(20px)',
                border: theme.palette.mode === 'dark' 
                  ? `1px solid ${alpha('#94a3b8', 0.5)}`
                  : `1px solid ${alpha('#e2e8f0', 0.6)}`,
                boxShadow: theme.palette.mode === 'light' 
                  ? '0 8px 32px rgba(59, 130, 246, 0.08), 0 4px 16px rgba(6, 182, 212, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                  : '0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 20px rgba(148, 163, 184, 0.2)'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                      Últimos Movimientos
                    </Typography>
                    <Button size="small" endIcon={<History />}>
                      Ver todos
                    </Button>
                  </Box>
                  
                  <Stack spacing={2}>
                    {mockData.recentTransactions.slice(0, 4).map((transaction) => (
                      <Box key={transaction.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            backgroundColor: alpha(
                              transaction.type === 'credit' 
                                ? theme.palette.success.main 
                                : theme.palette.error.main, 
                              0.1
                            ),
                            color: transaction.type === 'credit' 
                              ? theme.palette.success.main 
                              : theme.palette.error.main
                          }}
                        >
                          {transaction.type === 'credit' ? <TrendingUp /> : <TrendingDown />}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" fontWeight={500} noWrap>
                            {transaction.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {transaction.from || transaction.merchant || transaction.location}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          sx={{
                            color: transaction.type === 'credit' 
                              ? theme.palette.success.main 
                              : theme.palette.error.main
                          }}
                        >
                          {transaction.type === 'credit' ? '+' : ''}
                          {formatCurrency(Math.abs(transaction.amount))}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Transfer Dialog */}
      <Dialog open={transferDialog} onClose={() => setTransferDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Realizar Transferencia</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Destinatario"
              placeholder="Nombre o CBU/CVU"
              value={transferRecipient}
              onChange={(e) => setTransferRecipient(e.target.value)}
            />
            <TextField
              fullWidth
              label="Monto"
              placeholder="0.00"
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              InputProps={{
                startAdornment: <Typography variant="body2" sx={{ mr: 1 }}>$</Typography>
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTransferDialog(false)}>Cancelar</Button>
          <Button onClick={handleTransfer} variant="contained">Transferir</Button>
        </DialogActions>
      </Dialog>

      {/* Exchange Dialog */}
      <Dialog open={exchangeDialog} onClose={() => setExchangeDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Cambio de Divisas</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Esta es una simulación de cambio de divisas. En una implementación real, aquí podrías cambiar entre diferentes monedas.
            </Typography>
            <Box sx={{ 
              p: 2, 
              bgcolor: alpha(theme.palette.info.main, 0.1), 
              borderRadius: 1,
              border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
            }}>
              <Typography variant="body2">
                💡 Cotización actual USD/ARS: ${liveRates.blue.sell}
              </Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExchangeDialog(false)}>Cancelar</Button>
          <Button onClick={handleExchange} variant="contained">Simular Cambio</Button>
        </DialogActions>
      </Dialog>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationMenu}
        open={Boolean(notificationMenu)}
        onClose={() => setNotificationMenu(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { setNotificationMenu(null); setSnackbar({ open: true, message: 'Transferencia completada', severity: 'success' }); }}>
          <Box>
            <Typography variant="body2" fontWeight={500}>Transferencia completada</Typography>
            <Typography variant="caption" color="text.secondary">Hace 2 minutos</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => { setNotificationMenu(null); setSnackbar({ open: true, message: 'Nuevo depósito recibido', severity: 'info' }); }}>
          <Box>
            <Typography variant="body2" fontWeight={500}>Nuevo depósito</Typography>
            <Typography variant="caption" color="text.secondary">Hace 1 hora</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => { setNotificationMenu(null); setSnackbar({ open: true, message: 'Cotización favorable detectada', severity: 'warning' }); }}>
          <Box>
            <Typography variant="body2" fontWeight={500}>Alerta de cotización</Typography>
            <Typography variant="caption" color="text.secondary">Hace 3 horas</Typography>
          </Box>
        </MenuItem>
      </Menu>

      {/* Settings Menu */}
      <Menu
        anchorEl={settingsMenu}
        open={Boolean(settingsMenu)}
        onClose={() => setSettingsMenu(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { setSettingsMenu(null); navigate('/profile'); }}>
          Mi Perfil
        </MenuItem>
        <MenuItem onClick={() => { setSettingsMenu(null); navigate('/settings'); }}>
          Configuración
        </MenuItem>
        <MenuItem onClick={() => { setSettingsMenu(null); setSnackbar({ open: true, message: 'Función en desarrollo', severity: 'info' }); }}>
          Seguridad
        </MenuItem>
        <MenuItem onClick={() => { setSettingsMenu(null); setSnackbar({ open: true, message: 'Centro de ayuda próximamente', severity: 'info' }); }}>
          Ayuda
        </MenuItem>
      </Menu>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* 🥚 Enhanced Easter Egg FAB - Visible and Attractive */}
      <Button
        onClick={handleEasterEgg}
        variant="contained"
        sx={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          minWidth: 'auto',
          opacity: 0.9,
          zIndex: 1000,
          // 🎯 CONTRASTE EXTREMO: FAB siempre visible como en el backup
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246)) !important`
            : `linear-gradient(135deg, ${semanticTokens.surface.primary}, ${alpha(theme.palette.primary.main, 0.9)})`,
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
          transform: easterEggClicks > 0 ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          // � Efecto de pulso cuando se acerca al objetivo
          ...(easterEggClicks > 20 && {
            animation: 'easterEggPulse 1s ease-in-out infinite',
            '@keyframes easterEggPulse': {
              '0%, 100%': { 
                transform: 'scale(1)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 8px 25px rgba(59, 130, 246, 0.4)'
                  : semanticTokens.shadow.financial
              },
              '50%': { 
                transform: 'scale(1.15)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 12px 35px rgba(255, 215, 0, 0.6)'
                  : '0 12px 35px rgba(220, 38, 38, 0.5)'
              }
            }
          }),
          '&:hover': {
            opacity: 1,
            background: theme.palette.mode === 'dark'
              ? `linear-gradient(135deg, rgb(99, 170, 255), rgb(179, 132, 255)) !important`
              : semanticTokens.surface.interactive,
            transform: 'translateY(-2px) scale(1.05)',
            boxShadow: theme.palette.mode === 'dark'
              ? `0 12px 35px rgba(59, 130, 246, 0.6) !important`
              : semanticTokens.shadow.lg,
          },
          '&:active': {
            transform: 'translateY(0px) scale(0.95)',
          }
        }}
      >
        🔒 {easterEggClicks === 0 
          ? 'no tocar'
          : easterEggClicks < 10
            ? `🔓 ${easterEggClicks}/30`
            : easterEggClicks < 20
              ? `✨ ${easterEggClicks}/30`
              : easterEggClicks < 28
                ? `🚀 ¡${easterEggClicks}/30!`
                : easterEggClicks < 30
                  ? `🎯 ¡¡${easterEggClicks}/30!!`
                  : '🎉 ¡RICKROLL!'
        }
      </Button>

      {/* 🎭 Easter Egg Dialog */}
      <Dialog 
        open={easterEggDialog} 
        onClose={() => setEasterEggDialog(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'center',
            justifyContent: 'center',
          }
        }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: theme.palette.mode === 'dark'
              ? `linear-gradient(135deg, ${alpha('#1a202c', 0.95)} 0%, ${alpha('#2d3748', 0.95)} 100%)`
              : `linear-gradient(135deg, ${alpha('#ffffff', 0.95)} 0%, ${alpha('#f7fafc', 0.95)} 100%)`,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            position: 'relative',
            top: 'auto',
            margin: '32px auto',
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          pb: 1,
          fontSize: '1.2rem',
          fontWeight: 600 
        }}>
          🤖 Mensaje del Botón Prohibido
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: theme.palette.text.primary 
            }}
          >
            {easterEggMessages[Math.min(easterEggClicks - 1, easterEggMessages.length - 1)]}
          </Typography>
          
          {/* Countdown especial para el mensaje 30 */}
          {easterEggClicks === 30 && (
            <Box sx={{ mt: 2 }}>
              <Typography 
                variant="body1" 
                color="error"
                sx={{ fontWeight: 600, fontSize: '1.2rem' }}
              >
                🚨 Redirigiendo en 3... 2... 1... 🚨
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                ¡Prepárate para el rickroll! 🎵
              </Typography>
            </Box>
          )}
          
          {easterEggClicks > 20 && easterEggClicks < 30 && (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ mt: 2, fontStyle: 'italic' }}
            >
              Clicks restantes para la sorpresa: {30 - easterEggClicks}
            </Typography>
          )}

          {easterEggClicks > 25 && easterEggClicks < 30 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                🎵 Se acerca algo musical... 🎵
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          {easterEggClicks < 30 && (
            <Button 
              onClick={() => setEasterEggDialog(false)} 
              variant="contained"
              sx={{ 
                borderRadius: 2,
                px: 3,
                background: theme.palette.mode === 'dark'
                  ? `linear-gradient(135deg, #4299e1 0%, #3182ce 100%)`
                  : undefined
              }}
            >
              {easterEggClicks < 10 ? 'Lo siento... 😅' : easterEggClicks < 20 ? '¡Pero me gusta! 😄' : '¡Vamos por más! 🚀'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModernDashboard;
