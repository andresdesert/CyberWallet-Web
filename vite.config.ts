// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import compression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const isGitHubPages = mode === 'production';
  
  console.log('🔵 [VITE] Build mode:', mode);
  console.log('🔵 [VITE] GitHub Pages mode:', isGitHubPages);
  
  return {
    // 🌐 GitHub Pages configuration - OPTIMIZED
    base: isGitHubPages ? '/CyberWallet-Web/' : '/',
    
    plugins: [
      react({
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      // 🗜️ COMPRESIÓN GZIP/BROTLI: Reduce transferencia en ~70%
      compression({
        algorithm: 'gzip',
        threshold: 1024,
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
        '/api/v1': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          timeout: 15000,
          configure: (proxy: any, _options: any) => {
            proxy.on('error', (err: any, _req: any, _res: any) => {
              console.log('🔴 [Proxy Error]:', err.message);
            });
            proxy.on('proxyReq', (_proxyReq: any, req: any, _res: any) => {
              console.log('🔵 [Proxy Request]:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes: any, req: any, _res: any) => {
              console.log('🟢 [Proxy Response]:', proxyRes.statusCode, req.url);
            });
          },
        },
      },
    },
    
    // Configuración optimizada de CSS - CONSISTENTE dev/prod
    css: {
      devSourcemap: isDev,
      postcss: {
        plugins: [
          autoprefixer({
            grid: 'autoplace',
            flexbox: 'no-2009'
          }),
          ...(isDev ? [] : [cssnano({
            preset: ['default', {
              discardComments: { removeAll: true },
              normalizeWhitespace: false
            }]
          })])
        ],
      },
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
        jsx: 'automatic',
      },
    },
    
    // 🚀 BUILD OPTIMIZATIONS: GitHub Pages específico
    build: {
      target: 'es2020',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: isDev,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: !isDev,
          drop_debugger: !isDev,
          pure_funcs: isDev ? [] : ['console.log', 'console.info'],
          passes: 2,
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: isDev,
        },
      },
      cssMinify: true,
      reportCompressedSize: true,
      rollupOptions: {
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
          unknownGlobalSideEffects: false,
        },
        output: {
          // 🎯 GitHub Pages optimized chunks
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'mui-core': ['@mui/material', '@mui/system'],
            'mui-icons': ['@mui/icons-material'],
            'animation': ['framer-motion', 'motion'],
            'utils': ['axios', 'date-fns', 'loglevel'],
          },
          // Optimizar nombres de archivos para GitHub Pages
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId 
              ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '') 
              : 'chunk';
            return `assets/js/${facadeModuleId}-[hash].js`;
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
          entryFileNames: 'assets/js/[name]-[hash].js'
        },
        external: ['crypto'],
      },
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
    },
    
    // Variables de entorno
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '2.0.0'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
  };
});
