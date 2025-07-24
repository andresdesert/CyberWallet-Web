// src/context/RouteThemeContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

interface RouteThemeConfig {
  background: 'particles' | 'waves' | 'gradient' | 'none';
  accentColor: string;
  darkMode?: boolean;
}

const defaultTheme: RouteThemeConfig = {
  background: 'none',
  accentColor: '#1976d2',
};

const RouteThemeContext = createContext<RouteThemeConfig>(defaultTheme);

export const useRouteTheme = () => useContext(RouteThemeContext);

// Diccionario base de temas por ruta
const routeThemes: Record<string, RouteThemeConfig> = {
  '/': { background: 'particles', accentColor: '#00bcd4' },
  '/login': { background: 'waves', accentColor: '#673ab7' },
  '/register': { background: 'gradient', accentColor: '#4caf50' },
  '/register/step1': { background: 'gradient', accentColor: '#4caf50' },
  '/register/step2': { background: 'gradient', accentColor: '#4caf50' },
  '/register/step3': { background: 'gradient', accentColor: '#4caf50' },
  '/dashboard': { background: 'none', accentColor: '#ff9800' },
  '/transfer': { background: 'none', accentColor: '#03a9f4' },
  '/profile': { background: 'none', accentColor: '#795548' },
  '/load-funds': { background: 'none', accentColor: '#009688' },
  '/update-alias': { background: 'none', accentColor: '#3f51b5' },
  '/forgot-password': { background: 'waves', accentColor: '#e91e63' },
  '/reset-password': { background: 'waves', accentColor: '#f44336' },
};

// Función para resolver rutas dinámicas o parciales
const resolveThemePath = (pathname: string): string => {
  // Match exacto primero
  if (routeThemes[pathname]) return pathname;

  // Rutas dinámicas
  if (pathname.startsWith('/reset-password')) return '/reset-password';
  if (pathname.startsWith('/register/step')) return '/register';

  return '/'; // Fallback: LandingPage
};

export const RouteThemeProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState<RouteThemeConfig>(defaultTheme);

  useEffect(() => {
    const resolved = resolveThemePath(pathname);
    setTheme(routeThemes[resolved] || defaultTheme);
  }, [pathname]);

  return (
    <RouteThemeContext.Provider value={theme}>
      {children}
    </RouteThemeContext.Provider>
  );
};
