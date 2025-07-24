// src/components/Navigation/UnifiedNavigation.tsx
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
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
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
  Language as LanguageIcon,
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
import { motion } from 'motion/react';
import log from 'loglevel';

// 🎨 Styled Components para navegación unificada
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.95),
  backdropFilter: 'blur(20px)',
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'all 0.3s ease',
  zIndex: theme.zIndex.drawer + 1,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    background: alpha(theme.palette.background.paper, 0.98),
    backdropFilter: 'blur(20px)',
    borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    width: 280,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

const NavigationItem = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    transform: 'translateX(4px)',
  },
  '&.active': {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    borderLeft: `3px solid ${theme.palette.primary.main}`,
  },
}));

const FloatingActionButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
  },
  zIndex: theme.zIndex.speedDial,
}));

// 🎯 Tipos para navegación unificada
interface NavigationItemType {
  path: string;
  label: string;
  icon: React.ReactElement;
  badge?: number | null;
  children?: NavigationItemType[];
  external?: boolean;
  action?: () => void;
}

interface UnifiedNavigationProps {
  variant?: 'landing' | 'dashboard' | 'default';
  showUserMenu?: boolean;
  showThemeToggle?: boolean;
  showLanguageToggle?: boolean;
  showNotifications?: boolean;
  showSpeedDial?: boolean;
  showScrollTop?: boolean;
  drawerWidth?: number;
  collapsed?: boolean;
  onCollapseToggle?: () => void;
}

// 🎯 Hook personalizado para navegación
const useNavigationState = (variant: string) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen(!drawerOpen);
    log.debug(`[Navigation] Drawer ${!drawerOpen ? 'opened' : 'closed'} for variant: ${variant}`);
  }, [drawerOpen, variant]);

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
    showScrollTop,
    anchorEl,
    speedDialOpen,
    expandedItems,
    handleDrawerToggle,
    handleMenuOpen,
    handleMenuClose,
    handleSpeedDialOpen,
    handleSpeedDialClose,
    handleExpandItem,
    setShowScrollTop,
  };
};

// 🎯 Componente principal de navegación unificada
const UnifiedNavigation: React.FC<UnifiedNavigationProps> = ({
  variant = 'default',
  showUserMenu = true,
  showThemeToggle = true,
  showLanguageToggle = true,
  showNotifications = true,
  showSpeedDial = true,
  showScrollTop = true,
  drawerWidth = 280,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { theme: appTheme, toggleColorScheme } = useUnifiedTheme();
  const { user, logout } = useAuth();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const navigationState = useNavigationState(variant);

  // 🎯 Navegación inteligente basada en el contexto
  const getNavigationItems = useCallback((): NavigationItemType[] => {
    const baseItems: NavigationItemType[] = [
      { path: '/', label: t('nav.home'), icon: <HomeIcon />, badge: null },
      { path: '/about-me', label: t('nav.about'), icon: <PersonIcon />, badge: null },
      { path: '/contacto', label: t('nav.contact'), icon: <ContactIcon />, badge: null },
    ];

    if (variant === 'dashboard') {
      return [
        { path: '/dashboard', label: t('nav.dashboard'), icon: <DashboardIcon />, badge: null },
        { 
          path: '/wallet', 
          label: t('nav.wallet'), 
          icon: <WalletIcon />, 
          badge: null,
          children: [
            { path: '/wallet/balance', label: t('nav.balance'), icon: <WalletIcon />, badge: null },
            { path: '/wallet/cards', label: t('nav.cards'), icon: <WalletIcon />, badge: null },
          ]
        },
        { 
          path: '/transactions', 
          label: t('nav.transactions'), 
          icon: <TransferIcon />, 
          badge: null,
          children: [
            { path: '/transactions/history', label: t('nav.history'), icon: <HistoryIcon />, badge: null },
            { path: '/transfer', label: t('nav.send'), icon: <TransferIcon />, badge: null },
            { path: '/receive', label: t('nav.receive'), icon: <WalletIcon />, badge: null },
          ]
        },
        { path: '/history', label: t('nav.history'), icon: <HistoryIcon />, badge: 3 },
        { path: '/profile', label: t('nav.profile'), icon: <PersonIcon />, badge: null },
        { path: '/settings', label: t('nav.settings'), icon: <SettingsIcon />, badge: null },
      ];
    }

    return baseItems;
  }, [variant, t]);

  // 🎯 Speed dial actions
  const getSpeedDialActions = useCallback(() => [
    { icon: <HomeIcon />, name: t('nav.home'), action: () => navigate('/') },
    { icon: <PersonIcon />, name: t('nav.about'), action: () => navigate('/about-me') },
    { icon: <ContactIcon />, name: t('nav.contact'), action: () => navigate('/contacto') },
    { icon: <GitHubIcon />, name: 'GitHub', action: () => window.open('https://github.com/andresdesert', '_blank') },
    { icon: <LinkedInIcon />, name: 'LinkedIn', action: () => window.open('https://linkedin.com/in/andres-simahan', '_blank') },
  ], [navigate, t]);

  // 🎯 Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 400;
      navigationState.setShowScrollTop(show);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationState]);

  // 🎯 Navigation handlers
  const handleNavigation = useCallback((path: string) => {
    if (path.startsWith('#')) {
      const id = path.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
    navigationState.handleDrawerToggle();
  }, [navigate, navigationState]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const isActive = useCallback((path: string) => {
    return location.pathname === path;
  }, [location.pathname]);

  // 🎯 User menu handlers
  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
    navigationState.handleMenuClose();
  }, [logout, navigate, navigationState]);

  // 🎯 Render navigation item recursively
  const renderNavigationItem = useCallback((item: NavigationItemType, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isItemActive = isActive(item.path);
    const isSubmenuOpen = navigationState.expandedItems.includes(item.path);

    return (
      <React.Fragment key={item.path}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: level * 0.1 }}
        >
          <NavigationItem
            onClick={() => {
              if (hasChildren) {
                navigationState.handleExpandItem(item.path);
              } else {
                handleNavigation(item.path);
              }
            }}
            className={isItemActive ? 'active' : ''}
            sx={{ pl: level * 2 + 2 }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
            {item.badge && (
              <Badge badgeContent={item.badge} color="primary" />
            )}
            {hasChildren && (
              <IconButton size="small">
                {isSubmenuOpen ? <ArrowDownIcon /> : <ArrowUpIcon />}
              </IconButton>
            )}
          </NavigationItem>
        </motion.div>

        {hasChildren && (
          <Collapse in={isSubmenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map((child) => renderNavigationItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  }, [isActive, handleNavigation, navigationState]);

  // 🎯 Render based on screen size
  if (isSmallMobile) {
    return (
      <>
        {/* Minimalist AppBar for small mobile */}
        <StyledAppBar position="fixed" elevation={0}>
          <Toolbar sx={{ justifyContent: 'space-between', minHeight: 56 }}>
            <IconButton
              color="inherit"
              onClick={navigationState.handleDrawerToggle}
              edge="start"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" noWrap sx={{ flexGrow: 1, textAlign: 'center' }}>
              CyberWallet
            </Typography>
            
            {showThemeToggle && (
              <IconButton
                color="inherit"
                onClick={toggleColorScheme}
                size="small"
              >
                {appTheme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            )}
          </Toolbar>
        </StyledAppBar>

        {/* Mobile Drawer */}
        <StyledDrawer
          anchor="left"
          open={navigationState.drawerOpen}
          onClose={navigationState.handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Andrés Simahan</Typography>
                <Typography variant="caption" color="text.secondary">
                  QA Engineer
                </Typography>
              </Box>
              <IconButton
                onClick={navigationState.handleDrawerToggle}
                sx={{ ml: 'auto' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {getNavigationItems().map((item) => renderNavigationItem(item))}
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            {/* Social Links */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <IconButton size="small" onClick={() => window.open('https://github.com/andresdesert', '_blank')}>
                <GitHubIcon />
              </IconButton>
              <IconButton size="small" onClick={() => window.open('https://linkedin.com/in/andres-simahan', '_blank')}>
                <LinkedInIcon />
              </IconButton>
              <IconButton size="small" onClick={() => window.open('mailto:deluxogvc@gmail.com', '_blank')}>
                <EmailIcon />
              </IconButton>
            </Box>
          </Box>
        </StyledDrawer>

        {/* Speed Dial for small mobile */}
        {showSpeedDial && (
          <SpeedDial
            ariaLabel="Navigation menu"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            open={navigationState.speedDialOpen}
            onOpen={navigationState.handleSpeedDialOpen}
            onClose={navigationState.handleSpeedDialClose}
          >
            {getSpeedDialActions().map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.action}
              />
            ))}
          </SpeedDial>
        )}

        {/* Scroll to top */}
        {showScrollTop && navigationState.showScrollTop && (
          <FloatingActionButton
            size="medium"
            onClick={scrollToTop}
          >
            <ArrowUpIcon />
          </FloatingActionButton>
        )}
      </>
    );
  }

  if (isMobile) {
    return (
      <>
        {/* Tablet AppBar */}
        <StyledAppBar position="fixed" elevation={0}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                onClick={navigationState.handleDrawerToggle}
                edge="start"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              
              <Typography variant="h6" noWrap>
                CyberWallet
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {showThemeToggle && (
                <Tooltip title="Cambiar tema">
                  <IconButton
                    color="inherit"
                    onClick={toggleColorScheme}
                    size="small"
                  >
                    {appTheme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Tooltip>
              )}
              
              <Tooltip title="Más opciones">
                <IconButton
                  color="inherit"
                  onClick={navigationState.handleMenuOpen}
                  size="small"
                >
                  <MoreIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </StyledAppBar>

        {/* Options Menu */}
        <Menu
          anchorEl={navigationState.anchorEl}
          open={Boolean(navigationState.anchorEl)}
          onClose={navigationState.handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {showLanguageToggle && (
            <MenuItem onClick={navigationState.handleMenuClose}>
              <ListItemIcon>
                <LanguageIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Idioma</ListItemText>
            </MenuItem>
          )}
          {showNotifications && (
            <MenuItem onClick={navigationState.handleMenuClose}>
              <ListItemIcon>
                <NotificationsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Notificaciones</ListItemText>
            </MenuItem>
          )}
          {showUserMenu && user && (
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cerrar Sesión</ListItemText>
            </MenuItem>
          )}
        </Menu>

        {/* Tablet Drawer */}
        <StyledDrawer
          anchor="left"
          open={navigationState.drawerOpen}
          onClose={navigationState.handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          <Box sx={{ p: 3, width: drawerWidth }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 48, height: 48 }}>
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Andrés Simahan</Typography>
                <Typography variant="body2" color="text.secondary">
                  QA Engineer • ISTQB Certified
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <List>
              {getNavigationItems().map((item) => renderNavigationItem(item))}
            </List>
          </Box>
        </StyledDrawer>

        {/* Scroll to top */}
        {showScrollTop && navigationState.showScrollTop && (
          <FloatingActionButton
            size="medium"
            onClick={scrollToTop}
          >
            <ArrowUpIcon />
          </FloatingActionButton>
        )}
      </>
    );
  }

  // Desktop Layout
  return (
    <>
      {/* Desktop AppBar */}
      <StyledAppBar position="fixed" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" noWrap sx={{ mr: 4 }}>
              CyberWallet
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              {getNavigationItems().map((item) => (
                <Tooltip key={item.path} title={item.label}>
                  <IconButton
                    color="inherit"
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      backgroundColor: isActive(item.path) 
                        ? alpha(theme.palette.primary.main, 0.1) 
                        : 'transparent',
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {showThemeToggle && (
              <Tooltip title="Cambiar tema">
                <IconButton
                  color="inherit"
                  onClick={toggleColorScheme}
                  size="small"
                >
                  {appTheme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Tooltip>
            )}
            
            {showLanguageToggle && (
              <Tooltip title="Idioma">
                <IconButton
                  color="inherit"
                  size="small"
                >
                  <LanguageIcon />
                </IconButton>
              </Tooltip>
            )}
            
            {showNotifications && (
              <Tooltip title="Notificaciones">
                <IconButton
                  color="inherit"
                  size="small"
                >
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}
            
            {showUserMenu && user && (
              <Tooltip title="Mi cuenta">
                <IconButton
                  color="inherit"
                  onClick={navigationState.handleMenuOpen}
                  size="small"
                >
                  <AccountIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </StyledAppBar>

      {/* User Menu */}
      <Menu
        anchorEl={navigationState.anchorEl}
        open={Boolean(navigationState.anchorEl)}
        onClose={navigationState.handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => { navigate('/profile'); navigationState.handleMenuClose(); }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mi Perfil</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { navigate('/settings'); navigationState.handleMenuClose(); }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Configuración</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cerrar Sesión</ListItemText>
        </MenuItem>
      </Menu>

      {/* Scroll to top */}
      {showScrollTop && navigationState.showScrollTop && (
        <FloatingActionButton
          size="medium"
          onClick={scrollToTop}
        >
          <ArrowUpIcon />
        </FloatingActionButton>
      )}
    </>
  );
};

export default UnifiedNavigation; 