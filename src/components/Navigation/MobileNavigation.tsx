// 🎯 MOBILE NAVIGATION - Optimizado para pantallas pequeñas (mínimo 350px)
import React, { useState, useEffect, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  alpha,
  styled,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  Collapse,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  ContactSupport as ContactIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  Close as CloseIcon,
  KeyboardArrowUp as ArrowUpIcon,
  KeyboardArrowDown as ArrowDownIcon,
  MoreVert as MoreIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  AccountBalanceWallet as WalletIcon,
  SwapHoriz as TransferIcon,
  History as HistoryIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUnifiedTheme } from '@/context/UnifiedThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

// 🎨 Styled Components optimizados para móvil
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.95),
  backdropFilter: 'blur(20px)',
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: `0 2px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'all 0.3s ease',
  zIndex: theme.zIndex.drawer + 1,
  minHeight: '56px', // Altura mínima para móvil
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    background: alpha(theme.palette.background.paper, 0.98),
    backdropFilter: 'blur(20px)',
    borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    width: '100%', // Full width en móvil
    maxWidth: '320px', // Máximo ancho para tablets
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

const NavigationItem = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  minHeight: '48px', // Altura mínima para touch
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    transform: 'translateX(4px)',
  },
  '&.active': {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    borderLeft: `3px solid ${theme.palette.primary.main}`,
  },
  // Optimización para touch
  '& .MuiListItemIcon-root': {
    minWidth: '40px', // Espacio mínimo para iconos
  },
  '& .MuiListItemText-primary': {
    fontSize: '1rem', // Tamaño de texto legible
    fontWeight: 500,
  },
}));

const FloatingActionButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2), // Más cerca del borde
  right: theme.spacing(2),
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 6px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
  },
  zIndex: theme.zIndex.speedDial,
  // Tamaño optimizado para móvil
  width: '56px',
  height: '56px',
}));

// 🎯 Tipos para navegación móvil
interface NavigationItemType {
  path: string;
  label: string;
  icon: React.ReactElement;
  badge?: number | null;
  children?: NavigationItemType[];
  external?: boolean;
  action?: () => void;
}

interface MobileNavigationProps {
  variant?: 'landing' | 'dashboard' | 'default';
  showUserMenu?: boolean;
  showThemeToggle?: boolean;
  showNotifications?: boolean;
  showSpeedDial?: boolean;
  showScrollTop?: boolean;
}

// 🎯 Hook personalizado para navegación móvil
const useMobileNavigationState = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen(!drawerOpen);
  }, [drawerOpen]);

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSpeedDialOpen = useCallback(() => {
    setSpeedDialOpen(true);
  }, []);

  const handleSpeedDialClose = useCallback(() => {
    setSpeedDialOpen(false);
  }, []);

  const handleExpandItem = useCallback((itemPath: string) => {
    setExpandedItems(prev => 
      prev.includes(itemPath) 
        ? prev.filter(path => path !== itemPath)
        : [...prev, itemPath]
    );
  }, []);

  return {
    drawerOpen,
    scrollTopVisible,
    anchorEl,
    speedDialOpen,
    expandedItems,
    handleDrawerToggle,
    handleMenuOpen,
    handleMenuClose,
    handleSpeedDialOpen,
    handleSpeedDialClose,
    handleExpandItem,
    setScrollTopVisible,
  };
};

// 🎯 Componente principal de navegación móvil
const MobileNavigation: React.FC<MobileNavigationProps> = ({
  variant = 'default',
  showUserMenu = true,
  showThemeToggle = true,
  showNotifications = true,
  showSpeedDial = true,
  showScrollTop = true,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { colorScheme, toggleColorScheme } = useUnifiedTheme();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  
  // Detectar si es móvil (mínimo 350px)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  const {
    drawerOpen,
    scrollTopVisible,
    anchorEl,
    speedDialOpen,
    expandedItems,
    handleDrawerToggle,
    handleMenuOpen,
    handleMenuClose,
    handleSpeedDialOpen,
    handleSpeedDialClose,
    handleExpandItem,
    setScrollTopVisible,
  } = useMobileNavigationState();

  // 🎯 Navegación items optimizados para móvil
  const navigationItems: NavigationItemType[] = [
    {
      path: '/',
      label: t('nav.home'),
      icon: <HomeIcon />,
    },
    {
      path: '/about-cv',
      label: t('nav.about'),
      icon: <PersonIcon />,
    },
    {
      path: '/dashboard',
      label: t('nav.dashboard'),
      icon: <DashboardIcon />,
      badge: user ? null : undefined,
    },
    {
      path: '/contacto',
      label: t('nav.contact'),
      icon: <ContactIcon />,
    },
  ];

  // 🎯 Acciones del SpeedDial optimizadas para móvil
  const speedDialActions = [
    {
      icon: <HomeIcon />,
      name: t('nav.home'),
      action: () => navigate('/'),
    },
    {
      icon: <DashboardIcon />,
      name: t('nav.dashboard'),
      action: () => navigate('/dashboard'),
    },
    {
      icon: <PersonIcon />,
      name: t('nav.profile'),
      action: () => navigate('/profile'),
    },
    {
      icon: <SettingsIcon />,
      name: t('nav.settings'),
      action: () => navigate('/settings'),
    },
  ];

  // 🎯 Scroll to top
  useEffect(() => {
    const handleScroll = () => {
      setScrollTopVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollTopVisible]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 🎯 Navegación optimizada para móvil
  const handleNavigation = (path: string) => {
    navigate(path);
    handleDrawerToggle(); // Cerrar drawer automáticamente
  };

  // 🎯 Renderizado condicional para móvil
  if (!isMobile) {
    return null; // No mostrar en desktop
  }

  return (
    <>
      {/* 🎯 AppBar móvil optimizado */}
      <StyledAppBar position="fixed" elevation={0}>
        <Toolbar sx={{ minHeight: '56px', px: 1 }}>
          {/* 🍔 Menú hamburguesa */}
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>

          {/* 🏷️ Título */}
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1, 
              fontSize: isSmallMobile ? '1.1rem' : '1.25rem',
              fontWeight: 600,
            }}
          >
            CyberWallet
          </Typography>

          {/* 🎨 Controles de la derecha */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {/* 🌓 Toggle de tema */}
            {showThemeToggle && (
              <IconButton
                color="inherit"
                onClick={toggleColorScheme}
                size="small"
              >
                {colorScheme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            )}

            {/* 🔔 Notificaciones */}
            {showNotifications && (
              <IconButton
                color="inherit"
                size="small"
              >
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}

            {/* 👤 Menú de usuario */}
            {showUserMenu && (
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                size="small"
              >
                <Avatar
                  sx={{ 
                    width: 32, 
                    height: 32,
                    fontSize: '0.875rem',
                  }}
                >
                  {user?.email?.charAt(0)?.toUpperCase() || 'U'}
                </Avatar>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </StyledAppBar>

      {/* 🎯 Drawer móvil optimizado */}
      <StyledDrawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mejor performance en móvil
        }}
      >
        <Box sx={{ width: '100%', pt: 1 }}>
          {/* 🎯 Header del drawer */}
          <Box sx={{ p: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                CyberWallet
              </Typography>
              <IconButton onClick={handleDrawerToggle} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
            {user && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 40, height: 40 }}>
                  {user.email?.charAt(0)?.toUpperCase() || 'U'}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {user.email || 'Usuario'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          {/* 🎯 Lista de navegación */}
          <List sx={{ pt: 1 }}>
            {navigationItems.map((item) => (
              <React.Fragment key={item.path}>
                <NavigationItem
                  className={location.pathname === item.path ? 'active' : ''}
                  onClick={() => handleNavigation(item.path)}
                  sx={{ py: 1.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '1rem',
                      fontWeight: location.pathname === item.path ? 600 : 500,
                    }}
                  />
                  {item.badge !== undefined && (
                    <Badge badgeContent={item.badge} color="primary" />
                  )}
                </NavigationItem>
                {item.children && (
                  <Collapse in={expandedItems.includes(item.path)} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <NavigationItem
                          key={child.path}
                          className={location.pathname === child.path ? 'active' : ''}
                          onClick={() => handleNavigation(child.path)}
                          sx={{ pl: 4, py: 1 }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {child.icon}
                          </ListItemIcon>
                          <ListItemText primary={child.label} />
                        </NavigationItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>

          {/* 🎯 Divider y acciones adicionales */}
          <Divider sx={{ my: 2 }} />
          <List>
            <NavigationItem onClick={() => handleNavigation('/settings')}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t('nav.settings')} />
            </NavigationItem>
            {user && (
              <NavigationItem onClick={logout}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={t('nav.logout')} />
              </NavigationItem>
            )}
          </List>
        </Box>
      </StyledDrawer>

      {/* 🎯 SpeedDial para acciones rápidas */}
      {showSpeedDial && (
        <SpeedDial
          ariaLabel="Acciones rápidas"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: theme.zIndex.speedDial,
          }}
          icon={<SpeedDialIcon />}
          open={speedDialOpen}
          onOpen={handleSpeedDialOpen}
          onClose={handleSpeedDialClose}
        >
          {speedDialActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.action}
            />
          ))}
        </SpeedDial>
      )}

      {/* 🎯 Botón scroll to top */}
      <AnimatePresence>
        {scrollTopVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FloatingActionButton
              color="primary"
              onClick={handleScrollToTop}
              sx={{
                position: 'fixed',
                bottom: 16,
                left: 16,
                zIndex: theme.zIndex.speedDial,
              }}
            >
              <ArrowUpIcon />
            </FloatingActionButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎯 Menú de usuario */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
          },
        }}
      >
        <MenuItem onClick={() => { handleNavigation('/profile'); handleMenuClose(); }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          {t('nav.profile')}
        </MenuItem>
        <MenuItem onClick={() => { handleNavigation('/settings'); handleMenuClose(); }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          {t('nav.settings')}
        </MenuItem>
        <Divider />
        {user && (
          <MenuItem onClick={() => { logout(); handleMenuClose(); }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            {t('nav.logout')}
          </MenuItem>
        )}
      </Menu>

      {/* 🎯 Espacio para el AppBar */}
      <Box sx={{ height: '56px' }} />
    </>
  );
};

export default MobileNavigation; 