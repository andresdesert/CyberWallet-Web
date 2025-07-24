import { lazy, Suspense } from "react";
import type { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline, CircularProgress, Typography, useTheme, alpha } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n";
import { UnifiedThemeProvider } from '@/context/UnifiedThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

// 🎨 Componente de carga ultra-simple
const UltraSimpleLoadingFallback: FC = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`
                    : `linear-gradient(135deg, ${alpha('#fff', 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at 30% 70%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 50%),
                                radial-gradient(circle at 70% 30%, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 50%)`,
                    pointerEvents: 'none'
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 4,
                    borderRadius: 2,
                    background: theme.palette.mode === 'dark'
                        ? alpha(theme.palette.background.paper, 0.4)
                        : alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    boxShadow: theme.palette.mode === 'dark'
                        ? '0 4px 30px rgba(0, 0, 0, 0.1)'
                        : '0 4px 30px rgba(0, 0, 0, 0.05)',
                }}
            >
                <CircularProgress
                    size={48}
                    sx={{
                        mb: 2,
                        color: theme.palette.mode === 'dark'
                            ? theme.palette.primary.light
                            : theme.palette.primary.main
                    }}
                />
                <Typography
                    variant="h6"
                    sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 500,
                        textAlign: 'center',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        '@keyframes pulse': {
                            '0%, 100%': {
                                opacity: 1,
                            },
                            '50%': {
                                opacity: 0.5,
                            },
                        },
                    }}
                >
                    Cargando...
                </Typography>
            </Box>
        </Box>
    );
};

// 🚧 Componente temporal para páginas en desarrollo
const ComingSoonPage: FC<{ pageName: string }> = ({ pageName }) => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            backgroundColor: "#fafafa",
            textAlign: "center",
            p: 4,
        }}
    >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
            🚧 {pageName}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Esta página está en desarrollo y estará disponible pronto.
        </Typography>
        <Typography variant="caption" color="text.secondary">
            Mientras tanto, puedes usar el Dashboard para las funciones principales.
        </Typography>
    </Box>
);

// 📄 Páginas lazy - TODAS las páginas del proyecto
const LazyLandingPage = lazy(() => import("@/pages/LandingPage"));
const LazyLoginPage = lazy(() => import("@/pages/LoginPage"));
const LazyRegisterPage = lazy(() => import("@/pages/RegisterPage"));
const LazyForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const LazyDashboardPage = lazy(() => import("@/pages/ModernDashboard"));
const LazyProfilePage = lazy(() => import("@/pages/ProfilePage"));
const LazySettingsPage = lazy(() => import("@/pages/SettingsPage"));
const LazyAboutMePage = lazy(() => import("@/pages/AboutMePage"));
const LazyContactoPage = lazy(() => import("@/pages/ContactoPage"));
const LazyNotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const App: FC = () => {
    console.log('🔵 [APP] App component starting...');
    
    return (
        <ErrorBoundary>
            <UnifiedThemeProvider>
                <AuthProvider>
                    <SnackbarProvider
                        maxSnack={3}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        autoHideDuration={4000}
                    >
                        <I18nextProvider i18n={i18n}>
                            <CssBaseline />
                            
                            <Routes>
                                {/* Página principal */}
                                <Route 
                                    path="/" 
                                    element={
                                        <Suspense fallback={<UltraSimpleLoadingFallback />}>
                                            <LazyLandingPage />
                                        </Suspense>
                                    } 
                                />

                                {/* Login */}
                                <Route 
                                    path="/login" 
                                    element={
                                        <Suspense fallback={<UltraSimpleLoadingFallback />}>
                                            <LazyLoginPage />
                                        </Suspense>
                                    } 
                                />

                                {/* Registro */}
                                <Route 
                                    path="/register" 
                                    element={
                                        <Suspense fallback={<UltraSimpleLoadingFallback />}>
                                            <LazyRegisterPage />
                                        </Suspense>
                                    } 
                                />

                                {/* Recuperar contraseña */}
                                <Route 
                                    path="/forgot-password" 
                                    element={
                                        <Suspense fallback={<UltraSimpleLoadingFallback />}>
                                            <LazyForgotPasswordPage />
                                        </Suspense>
                                    } 
                                />

                                {/* Dashboard */}
                                <Route 
                                    path="/dashboard" 
                                    element={
                                        <Suspense fallback={<UltraSimpleLoadingFallback />}>
                                            <LazyDashboardPage />
                                        </Suspense>
                                    } 
                                />

                                {/* Profile */}
                                <Route 
                                    path="/profile" 
                                    element={
                                        <Suspense fallback={<UltraSimpleLoadingFallback />}>
                                            <LazyProfilePage />
                                        </Suspense>
                                    } 
                                />

                                {/* Settings */}
                                <Route 
                                    path="/settings" 
                                    element={
                                        <Suspense fallback={<UltraSimpleLoadingFallback />}>
                                            <LazySettingsPage />
                                        </Suspense>
                                    } 
                                />

                                {/* Sobre Mí */}
                                <Route 
                                    path="/about-me" 
                                    element={
                                        <Suspense fallback={<UltraSimpleLoadingFallback />}>
                                            <LazyAboutMePage />
                                        </Suspense>
                                    } 
                                />

                                {/* Contacto */}
                                <Route 
                                    path="/contacto" 
                                    element={
                                        <Suspense fallback={<UltraSimpleLoadingFallback />}>
                                            <LazyContactoPage />
                                        </Suspense>
                                    } 
                                />

                                {/* Rutas de wallet */}
                                <Route 
                                    path="/wallet" 
                                    element={<ComingSoonPage pageName="Mi Billetera" />} 
                                />
                                <Route 
                                    path="/wallet/*" 
                                    element={<ComingSoonPage pageName="Detalles de Billetera" />} 
                                />

                                {/* Rutas de transferencias */}
                                <Route 
                                    path="/transfer" 
                                    element={<ComingSoonPage pageName="Transferir Dinero" />} 
                                />
                                <Route 
                                    path="/load-funds" 
                                    element={<ComingSoonPage pageName="Cargar Fondos" />} 
                                />
                                <Route 
                                    path="/withdraw" 
                                    element={<ComingSoonPage pageName="Retirar Dinero" />} 
                                />

                                {/* Rutas de historial y transacciones */}
                                <Route 
                                    path="/history" 
                                    element={<ComingSoonPage pageName="Historial" />} 
                                />
                                <Route 
                                    path="/transactions" 
                                    element={<ComingSoonPage pageName="Transacciones" />} 
                                />
                                <Route 
                                    path="/transactions/*" 
                                    element={<ComingSoonPage pageName="Historial de Transacciones" />} 
                                />

                                {/* Rutas de analytics y security */}
                                <Route 
                                    path="/analytics" 
                                    element={<ComingSoonPage pageName="Análisis Financiero" />} 
                                />
                                <Route 
                                    path="/security" 
                                    element={<ComingSoonPage pageName="Configuración de Seguridad" />} 
                                />

                                {/* Rutas adicionales de settings */}
                                <Route 
                                    path="/settings/*" 
                                    element={<ComingSoonPage pageName="Configuración Avanzada" />} 
                                />

                                {/* Página 404 */}
                                <Route 
                                    path="*" 
                                    element={
                                        <Suspense fallback={<UltraSimpleLoadingFallback />}>
                                            <LazyNotFoundPage />
                                        </Suspense>
                                    } 
                                />
                            </Routes>
                        </I18nextProvider>
                    </SnackbarProvider>
                </AuthProvider>
            </UnifiedThemeProvider>
        </ErrorBoundary>
    );
};

export default App;
