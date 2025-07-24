import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import { UnifiedThemeProvider } from '@/context/UnifiedThemeContext';
import '@/index.css';
import '@/styles/radical-dark-mode-fix.css'; // 🚨 RADICAL DARK MODE FIX
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { AuthProvider } from '@/context/AuthContext';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import logger from '@/utils/logger';

// 🔍 DEBUG: Logs detallados para auditoría
console.log('🔵 [MAIN] Iniciando carga de main.tsx');
console.log('🔵 [MAIN] NODE_ENV:', process.env.NODE_ENV);
console.log('🔵 [MAIN] Imports completados exitosamente');

// 🎯 Inicialización optimizada del logger para desarrollo full-stack
if (process.env.NODE_ENV === 'development') {
  logger.info('[🚀 DEV] CyberWallet 2025 - Iniciando aplicación en modo desarrollo');
  console.log('🔵 [MAIN] Logger inicializado para desarrollo');
} else if (process.env.NODE_ENV === 'test') {
  logger.info('[🧪 TEST] CyberWallet - Entorno de testing iniciado');
} else if (process.env.NODE_ENV === 'production') {
  logger.info('[⚡ PROD] CyberWallet - Aplicación web iniciada');
}

// 🎯 FIX RESPONSIVE: Asegurar viewport y CSS consistente en prod
const metaViewport = document.querySelector('meta[name="viewport"]');
if (!metaViewport) {
  const viewport = document.createElement('meta');
  viewport.name = 'viewport';
  viewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no';
  document.head.appendChild(viewport);
}

// 🎯 CSS CRÍTICO: Estilos base para responsive
const criticalStyles = document.createElement('style');
criticalStyles.innerHTML = `
  /* Reset y base responsive */
  * {
    box-sizing: border-box;
  }
  
  html {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    font-size: 16px;
  }
  
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  #root {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  /* Asegurar que las imágenes sean responsive */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  /* Media query helpers */
  @media screen and (max-width: 599px) {
    html { font-size: 14px; }
  }
  
  @media screen and (min-width: 600px) and (max-width: 899px) {
    html { font-size: 15px; }
  }
  
  @media screen and (min-width: 900px) {
    html { font-size: 16px; }
  }
`;
document.head.appendChild(criticalStyles);

// 🔍 DEBUG: Verificar DOM
const rootElement = document.getElementById('root');
console.log('🔵 [MAIN] Root element encontrado:', !!rootElement);

if (!rootElement) {
  console.error('🔴 [MAIN] ERROR: No se encontró el elemento root en el DOM');
  throw new Error('Root element not found');
}

console.log('🔵 [MAIN] Creando React root...');
const root = ReactDOM.createRoot(rootElement);

console.log('🔵 [MAIN] Iniciando renderizado de la aplicación...');

try {
  // 🌐 Configuración de routing para GitHub Pages
  const isDev = process.env.NODE_ENV === 'development';
  // Aseguramos que el basename sea correcto para GitHub Pages
  const basename = isDev ? '' : '/CyberWallet-Web';
  
  console.log('🔵 [MAIN] Router basename configurado:', basename);
  console.log('🔵 [MAIN] URL actual:', window.location.href);
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter basename={basename}>
          <UnifiedThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </LocalizationProvider>
          </UnifiedThemeProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  console.log('🟢 [MAIN] Renderizado iniciado exitosamente');
} catch (error) {
  console.error('🔴 [MAIN] ERROR en renderizado:', error);
  
  // Renderizado de emergencia
  root.render(
    <div style={{ padding: '20px', color: 'white', backgroundColor: '#333' }}>
      <h1>Error de Renderizado</h1>
      <p>Error: {error instanceof Error ? error.message : 'Error desconocido'}</p>
      <p>Revisa la consola para más detalles</p>
    </div>
  );
}