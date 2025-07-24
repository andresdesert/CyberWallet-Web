import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  useTheme,
  Chip,
  Badge,
  Tooltip,
  Stack,
  useMediaQuery,
  Collapse,
  ListItemButton,
  Menu,
  MenuItem,
  Fade,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  AccountBalanceWallet,
  History,
  Send,
  GetApp,
  SwapHoriz,
  Person,
  Settings,
  Notifications,
  Help,
  Logout,
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  TrendingUp,
  Security,
  CreditCard,
  NotificationsActive,
  Search,
  MoreVert,
  Star,
  Launch,
  Brightness4,
  Brightness7,
  Info,
  Upload,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { useUnifiedTheme } from '@/context/UnifiedThemeContext';

interface NavigationItem {
  text: string;
  icon: React.ReactElement;
  path: string;
  badge?: number;
  children?: NavigationItem[];
}

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { user, logout } = useAuth();
  const { toggleColorScheme, colorScheme } = useUnifiedTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState<null | HTMLElement>(null);

  const navigationItems: NavigationItem[] = [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/dashboard',
    },
    {
      text: 'Billetera',
      icon: <AccountBalanceWallet />,
      path: '/wallet',
      children: [
        { text: 'Detalles', icon: <Info />, path: '/wallet-details' },
        { text: 'CVU/Alias', icon: <CreditCard />, path: '/cvu-alias' },
      ],
    },
    {
      text: 'Transferencias',
      icon: <SwapHoriz />,
      path: '/transfers',
      children: [
        { text: 'Enviar', icon: <Send />, path: '/transfer' },
        { text: 'Cargar', icon: <GetApp />, path: '/load-funds' },
        { text: 'Retirar', icon: <Upload />, path: '/withdraw' },
      ],
    },
    {
      text: 'Historial',
      icon: <History />,
      path: '/history',
      badge: 3,
    },
    {
      text: 'Perfil',
      icon: <Person />,
      path: '/profile',
    },
    {
      text: 'Configuración',
      icon: <Settings />,
      path: '/settings',
    },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleSubmenuToggle = (text: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [text]: !prev[text]
    }));
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationMenuAnchor(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleUserMenuClose();
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isItemActive = isActive(item.path);
    const isSubmenuOpen = openSubmenus[item.text];

    return (
      <React.Fragment key={item.text}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: level * 0.1 }}
        >
          <ListItemButton
            onClick={() => {
              if (hasChildren) {
                handleSubmenuToggle(item.text);
              } else {
                navigate(item.path);
                if (isMobile) {
                  setDrawerOpen(false);
                }
              }
            }}
            sx={{
              minHeight: 48,
              justifyContent: drawerOpen ? 'initial' : 'center',
              px: 'var(--spacing-md)',
              py: 'var(--spacing-sm)',
              ml: level * 2,
              borderRadius: 'var(--border-radius-lg)',
              mb: 'var(--spacing-xs)',
              backgroundColor: isItemActive 
                ? 'var(--semantic-primary-subtle)' 
                : 'transparent',
              color: isItemActive 
                ? 'var(--semantic-primary-intense)' 
                : 'var(--text-primary)',
              border: isItemActive 
                ? '1px solid var(--semantic-primary-muted)'
                : '1px solid transparent',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: 'var(--surface-elevated)',
                transform: 'translateX(4px)',
                borderColor: 'var(--semantic-primary-muted)',
                boxShadow: 'var(--shadow-sm)',
              },
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: isItemActive ? '4px' : '0px',
                backgroundColor: 'var(--semantic-primary)',
                transition: 'width 0.3s ease',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: drawerOpen ? 3 : 'auto',
                justifyContent: 'center',
                color: isItemActive ? 'var(--semantic-primary-intense)' : 'var(--text-secondary)',
                transition: 'color 0.2s ease',
              }}
            >
              <Badge 
                badgeContent={item.badge} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.7rem',
                    minWidth: 16,
                    height: 16,
                    backgroundColor: 'var(--semantic-error)',
                  }
                }}
              >
                {item.icon}
              </Badge>
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                opacity: drawerOpen ? 1 : 0,
                '& .MuiTypography-root': {
                  fontWeight: isItemActive ? 700 : 500,
                  fontSize: level > 0 ? '0.875rem' : '1rem',
                  color: 'inherit',
                }
              }}
            />
            {hasChildren && drawerOpen && (
              <motion.div
                animate={{ rotate: isSubmenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
              </motion.div>
            )}
          </ListItemButton>
        </motion.div>

        {hasChildren && (
          <Collapse in={isSubmenuOpen && drawerOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map((child) => renderNavigationItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawerWidth = collapsed ? 68 : 280;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar Superior Moderno */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          background: 'var(--glass-background-strong)',
          backdropFilter: 'var(--glass-backdrop)',
          borderBottom: '1px solid var(--glass-border)',
          boxShadow: 'var(--shadow-lg)',
          color: 'var(--text-primary)',
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          px: 'var(--spacing-lg)',
          minHeight: { xs: 64, sm: 72 },
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{
                  display: { md: 'none' },
                  // 🎯 CONTRASTE EXTREMO: Menú móvil siempre visible
                  backgroundColor: colorScheme === 'dark' 
                    ? 'rgba(59, 130, 246, 0.15) !important' 
                    : 'rgba(255, 255, 255, 0.9)',
                  border: colorScheme === 'dark' 
                    ? '1px solid rgb(59, 130, 246) !important' 
                    : '1px solid rgba(0, 0, 0, 0.1)',
                  color: colorScheme === 'dark' 
                    ? 'rgb(255, 255, 255) !important' 
                    : 'rgb(0, 0, 0)',
                  minWidth: 48,
                  minHeight: 48,
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    backgroundColor: colorScheme === 'dark' 
                      ? 'rgba(59, 130, 246, 0.25) !important' 
                      : 'rgba(255, 255, 255, 1)',
                    transform: 'scale(1.05)',
                    boxShadow: colorScheme === 'dark' 
                      ? '0 4px 20px rgba(59, 130, 246, 0.3) !important' 
                      : '0 2px 10px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            </motion.div>
            
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{
                  bgcolor: 'var(--semantic-primary)',
                  color: 'var(--on-primary)',
                  width: 40,
                  height: 40,
                  fontWeight: 700,
                  fontSize: 16,
                }}>
                  CW
                </Avatar>
                <Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-heading)',
                      lineHeight: 1.2,
                    }}
                  >
                    CyberWallet
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      label="Pro"
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        backgroundColor: 'var(--semantic-success)',
                        color: 'var(--on-success)',
                      }}
                    />
                    <Chip
                      label="v2.0"
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        borderColor: 'var(--semantic-primary-muted)',
                        color: 'var(--text-secondary)',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Tooltip title="Buscar">
                <IconButton 
                  color="inherit" 
                  size="large"
                  sx={{
                    // 🎯 CONTRASTE EXTREMO: Botón búsqueda siempre visible
                    backgroundColor: colorScheme === 'dark' 
                      ? 'rgba(255, 255, 255, 0.1) !important' 
                      : 'rgba(0, 0, 0, 0.05)',
                    border: colorScheme === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.2) !important' 
                      : '1px solid rgba(0, 0, 0, 0.1)',
                    color: colorScheme === 'dark' 
                      ? 'rgb(255, 255, 255) !important' 
                      : 'rgb(0, 0, 0)',
                    minWidth: { xs: 44, sm: 48 },
                    minHeight: { xs: 44, sm: 48 },
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      backgroundColor: colorScheme === 'dark' 
                        ? 'rgba(255, 255, 255, 0.2) !important' 
                        : 'rgba(0, 0, 0, 0.1)',
                      transform: 'scale(1.05)',
                      boxShadow: colorScheme === 'dark' 
                        ? '0 4px 15px rgba(255, 255, 255, 0.2) !important' 
                        : '0 2px 8px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <Search />
                </IconButton>
              </Tooltip>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Tooltip title="Notificaciones">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={handleNotificationMenuOpen}
                  sx={{
                    // 🎯 CONTRASTE EXTREMO: Botón notificaciones siempre visible
                    backgroundColor: colorScheme === 'dark' 
                      ? 'rgba(255, 255, 255, 0.1) !important' 
                      : 'rgba(0, 0, 0, 0.05)',
                    border: colorScheme === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.2) !important' 
                      : '1px solid rgba(0, 0, 0, 0.1)',
                    color: colorScheme === 'dark' 
                      ? 'rgb(255, 255, 255) !important' 
                      : 'rgb(0, 0, 0)',
                    minWidth: { xs: 44, sm: 48 },
                    minHeight: { xs: 44, sm: 48 },
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      backgroundColor: colorScheme === 'dark' 
                        ? 'rgba(255, 255, 255, 0.2) !important' 
                        : 'rgba(0, 0, 0, 0.1)',
                      transform: 'scale(1.05)',
                      boxShadow: colorScheme === 'dark' 
                        ? '0 4px 15px rgba(255, 255, 255, 0.2) !important' 
                        : '0 2px 8px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <Badge 
                    badgeContent={4} 
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: 'var(--semantic-error)',
                        color: 'var(--on-error)',
                      }
                    }}
                  >
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Tooltip title={colorScheme === 'dark' ? "Modo claro" : "Modo oscuro"}>
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={toggleColorScheme}
                  sx={{
                    // 🎯 CONTRASTE EXTREMO: Toggle tema siempre visible con mejores efectos
                    backgroundColor: colorScheme === 'dark' 
                      ? 'rgba(245, 158, 11, 0.15) !important' 
                      : 'rgba(59, 130, 246, 0.1)',
                    border: colorScheme === 'dark' 
                      ? '2px solid rgb(245, 158, 11) !important' 
                      : '2px solid rgb(59, 130, 246)',
                    color: colorScheme === 'dark' 
                      ? 'rgb(245, 158, 11) !important' 
                      : 'rgb(59, 130, 246)',
                    minWidth: { xs: 44, sm: 48 },
                    minHeight: { xs: 44, sm: 48 },
                    backdropFilter: 'blur(15px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: colorScheme === 'dark' 
                        ? 'rgba(245, 158, 11, 0.25) !important' 
                        : 'rgba(59, 130, 246, 0.2)',
                      borderColor: colorScheme === 'dark' 
                        ? 'rgb(251, 191, 36) !important' 
                        : 'rgb(99, 170, 255)',
                      transform: 'scale(1.1) rotate(15deg)',
                      boxShadow: colorScheme === 'dark' 
                        ? '0 8px 25px rgba(245, 158, 11, 0.4) !important' 
                        : '0 6px 20px rgba(59, 130, 246, 0.3)',
                    }
                  }}
                >
                  {colorScheme === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Tooltip title="Perfil de usuario">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={handleUserMenuOpen}
                  sx={{
                    // 🎯 CONTRASTE EXTREMO: Botón perfil siempre visible
                    backgroundColor: colorScheme === 'dark' 
                      ? 'rgba(255, 255, 255, 0.1) !important' 
                      : 'rgba(0, 0, 0, 0.05)',
                    border: colorScheme === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.2) !important' 
                      : '1px solid rgba(0, 0, 0, 0.1)',
                    color: colorScheme === 'dark' 
                      ? 'rgb(255, 255, 255) !important' 
                      : 'rgb(0, 0, 0)',
                    minWidth: { xs: 44, sm: 48 },
                    minHeight: { xs: 44, sm: 48 },
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      backgroundColor: colorScheme === 'dark' 
                        ? 'rgba(255, 255, 255, 0.2) !important' 
                        : 'rgba(0, 0, 0, 0.1)',
                      transform: 'scale(1.05)',
                      boxShadow: colorScheme === 'dark' 
                        ? '0 4px 15px rgba(255, 255, 255, 0.2) !important' 
                        : '0 2px 8px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: 'var(--semantic-secondary)',
                      color: 'var(--on-secondary)',
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {user?.alias?.charAt(0).toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </motion.div>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar/Drawer Moderno */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'var(--glass-background-strong)',
            backdropFilter: 'var(--glass-backdrop)',
            borderRight: '1px solid var(--glass-border)',
            boxShadow: 'var(--shadow-lg)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflowX: 'hidden',
            mt: { xs: 0, sm: '64px' }, // Add margin top to avoid topbar overlap
            height: { xs: '100%', sm: 'calc(100% - 64px)' }, // Adjust height accordingly
          },
        }}
      >
        <Toolbar />
        
        {/* Header del Drawer */}
        <Box sx={{ 
          p: 'var(--spacing-lg)', 
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--gradient-primary-subtle)',
        }}>
          {drawerOpen && (
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-heading)',
            }}>
              Navegación
            </Typography>
          )}
          
          {!isMobile && (
            <Tooltip title={collapsed ? "Expandir" : "Contraer"}>
              <IconButton 
                onClick={handleCollapseToggle}
                size="small"
                sx={{
                  // 🎯 CONTRASTE EXTREMO: Botón colapsar siempre visible
                  backgroundColor: colorScheme === 'dark' 
                    ? 'rgba(59, 130, 246, 0.1) !important' 
                    : 'rgba(0, 0, 0, 0.05)',
                  border: colorScheme === 'dark' 
                    ? '1px solid rgb(59, 130, 246) !important' 
                    : '1px solid rgba(0, 0, 0, 0.1)',
                  color: colorScheme === 'dark' 
                    ? 'rgb(59, 130, 246) !important' 
                    : 'rgb(0, 0, 0)',
                  minWidth: { xs: 36, sm: 40 },
                  minHeight: { xs: 36, sm: 40 },
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    backgroundColor: colorScheme === 'dark' 
                      ? 'rgba(59, 130, 246, 0.2) !important' 
                      : 'rgba(0, 0, 0, 0.1)',
                    transform: 'scale(1.1)',
                    boxShadow: colorScheme === 'dark' 
                      ? '0 4px 15px rgba(59, 130, 246, 0.3) !important' 
                      : '0 2px 8px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                {collapsed ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Lista de Navegación */}
        <Box sx={{ 
          overflow: 'auto', 
          px: 'var(--spacing-md)', 
          py: 'var(--spacing-sm)',
          flexGrow: 1,
          mt: { xs: 0, sm: 0 }, // Remove extra margin since we already have it on the drawer
        }}>
          <List>
            {navigationItems.map(renderNavigationItem)}
          </List>
        </Box>

        {/* Footer del Drawer */}
        {drawerOpen && (
          <Box sx={{ 
            p: 'var(--spacing-lg)',
            borderTop: '1px solid var(--glass-border)',
            background: 'var(--gradient-primary-subtle)',
          }}>
            <Typography variant="caption" sx={{ 
              color: 'var(--text-secondary)',
              textAlign: 'center',
              display: 'block',
            }}>
              © 2025 CyberWallet
            </Typography>
          </Box>
        )}
      </Drawer>

      {/* Contenido Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 'var(--spacing-lg)',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, sm: 9 },
          background: 'var(--background-default)',
          minHeight: 'calc(100vh - 72px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {children}
        </motion.div>
      </Box>

      {/* Menú de Usuario */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        TransitionComponent={Fade}
        sx={{
          '& .MuiPaper-root': {
            background: 'var(--glass-background-strong)',
            backdropFilter: 'var(--glass-backdrop)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--border-radius-lg)',
            minWidth: 200,
            boxShadow: 'var(--shadow-xl)',
          },
        }}
      >
        <MenuItem 
          onClick={() => { navigate('/profile'); handleUserMenuClose(); }}
          sx={{
            color: 'var(--text-primary)',
            '&:hover': {
              backgroundColor: 'var(--surface-elevated)',
            }
          }}
        >
          <Person sx={{ mr: 1, color: 'var(--text-secondary)' }} />
          Perfil
        </MenuItem>
        <MenuItem 
          onClick={() => { navigate('/settings'); handleUserMenuClose(); }}
          sx={{
            color: 'var(--text-primary)',
            '&:hover': {
              backgroundColor: 'var(--surface-elevated)',
            }
          }}
        >
          <Settings sx={{ mr: 1, color: 'var(--text-secondary)' }} />
          Configuración
        </MenuItem>
        <Divider sx={{ borderColor: 'var(--glass-border)' }} />
        <MenuItem 
          onClick={handleLogout}
          sx={{
            color: 'var(--semantic-error)',
            '&:hover': {
              backgroundColor: 'var(--semantic-error-subtle)',
            }
          }}
        >
          <Logout sx={{ mr: 1 }} />
          Cerrar Sesión
        </MenuItem>
      </Menu>

      {/* Menú de Notificaciones */}
      <Menu
        anchorEl={notificationMenuAnchor}
        open={Boolean(notificationMenuAnchor)}
        onClose={handleNotificationMenuClose}
        TransitionComponent={Fade}
        sx={{
          '& .MuiPaper-root': {
            background: 'var(--glass-background-strong)',
            backdropFilter: 'var(--glass-backdrop)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--border-radius-lg)',
            minWidth: 320,
            maxWidth: 400,
            boxShadow: 'var(--shadow-xl)',
          },
        }}
      >
        <Box sx={{ p: 'var(--spacing-md)', borderBottom: '1px solid var(--glass-border)' }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}>
            Notificaciones
          </Typography>
        </Box>
        
        <MenuItem sx={{
          color: 'var(--text-primary)',
          '&:hover': { backgroundColor: 'var(--surface-elevated)' }
        }}>
          <NotificationsActive sx={{ mr: 2, color: 'var(--semantic-info)' }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Nueva transferencia recibida
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
              Hace 5 minutos
            </Typography>
          </Box>
        </MenuItem>
        
        <MenuItem sx={{
          color: 'var(--text-primary)',
          '&:hover': { backgroundColor: 'var(--surface-elevated)' }
        }}>
          <TrendingUp sx={{ mr: 2, color: 'var(--semantic-success)' }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Pago procesado exitosamente
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
              Hace 1 hora
            </Typography>
          </Box>
        </MenuItem>
        
        <MenuItem sx={{
          color: 'var(--text-primary)',
          '&:hover': { backgroundColor: 'var(--surface-elevated)' }
        }}>
          <Security sx={{ mr: 2, color: 'var(--semantic-warning)' }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Actualización de seguridad
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
              Hace 2 horas
            </Typography>
          </Box>
        </MenuItem>
        
        <Divider sx={{ borderColor: 'var(--glass-border)' }} />
        <MenuItem onClick={handleNotificationMenuClose} sx={{
          justifyContent: 'center',
          color: 'var(--semantic-primary)',
          fontWeight: 500,
          '&:hover': { backgroundColor: 'var(--semantic-primary-subtle)' }
        }}>
          <Launch sx={{ mr: 1, fontSize: 16 }} />
          Ver todas las notificaciones
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Layout;