// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import compression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const isGitHubPages = !isDev;
  
  return {
    // 🌐 GitHub Pages configuration - only in production
    base: isGitHubPages ? '/CyberWallet-Web/' : '/',
    
    plugins: [
      react({
        // Configuración optimizada para React
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      // 🗜️ COMPRESIÓN GZIP/BROTLI: Reduce transferencia en ~70%
      compression({
        algorithm: 'gzip',
        threshold: 1024, // Solo comprimir archivos > 1KB
        deleteOriginFile: false,
      }),
      compression({
        algorithm: 'brotliCompress',
        threshold: 1024,
        deleteOriginFile: false,
        ext: '.br',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // Configuración de desarrollo
    server: {
      port: 5173,
      host: true,
      proxy: {
        // Proxy para el backend
        '/api/v1': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          timeout: 15000,
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('🔴 [Proxy Error]:', err.message);
            });
            proxy.on('proxyReq', (_proxyReq, req, _res) => {
              console.log('🔵 [Proxy Request]:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('🟢 [Proxy Response]:', proxyRes.statusCode, req.url);
            });
          },
        },
      },
    },
    // Configuración optimizada de CSS
    css: {
      devSourcemap: isDev,
      // Optimizaciones de CSS en producción
      postcss: !isDev ? {
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
      } : undefined,
    },
    // Optimizaciones avanzadas de dependencias
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@mui/material',
        '@mui/icons-material',
        'react-router-dom',
        'axios',
        'framer-motion',
        'motion',
      ],
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        // Optimizaciones de JSX en desarrollo
        jsx: 'automatic',
      },
    },
    // 🚀 BUILD OPTIMIZATIONS: Configuración de producción agresiva
    build: {
      target: 'es2020',
      minify: 'terser', // Cambiar a terser para mejor compresión
      terserOptions: {
        compress: {
          drop_console: true, // Eliminar console.logs
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'], // Eliminar funciones específicas
          passes: 2, // Múltiples pasadas de optimización
        },
        mangle: {
          safari10: true, // Compatibilidad Safari
        },
        format: {
          comments: false, // Sin comentarios
        },
      },
      cssMinify: true,
      reportCompressedSize: true,
      rollupOptions: {
        // 🌳 TREE SHAKING AGRESIVO: Eliminación de código no utilizado
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
          unknownGlobalSideEffects: false, // Más agresivo
        },
        output: {
          // Optimización de chunks más granular
          manualChunks: {
            // Separar vendor libraries
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'mui-core': ['@mui/material', '@mui/system'],
            'mui-icons': ['@mui/icons-material'],
            'animation': ['framer-motion', 'motion'],
            'utils': ['axios', 'date-fns', 'loglevel'],
          },
          // Optimizar nombres de archivos
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId 
              ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '') 
              : 'chunk';
            return `assets/${facadeModuleId}-[hash].js`;
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split('.') || [];
            const ext = info[info.length - 1];
            if (/\.(css)$/.test(assetInfo.name || '')) {
              return `assets/css/[name]-[hash].${ext}`;
            }
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) {
              return `assets/images/[name]-[hash].${ext}`;
            }
            return `assets/[name]-[hash].${ext}`;
          },
        },
        external: ['crypto'],
      },
      // Optimizaciones adicionales
      assetsInlineLimit: 4096, // Inline assets menores a 4KB
      cssCodeSplit: true, // Separar CSS por componente
    },
    // Variables de entorno
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '2.0.0'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
  };
});