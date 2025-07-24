#!/usr/bin/env node

/**
 * Script simplificado para deploy en GitHub Pages
 */

const { execSync } = require('child_process');

console.log('🚀 Iniciando deploy para GitHub Pages...');

try {
  // 1. Limpiar
  console.log('🧹 Limpiando...');
  execSync('npm run clean', { stdio: 'inherit' });

  // 2. Build para GitHub Pages
  console.log('🏗️ Construyendo para GitHub Pages...');
  execSync('npm run build-github', { 
    stdio: 'inherit',
    env: { 
      ...process.env, 
      NODE_ENV: 'production',
      GITHUB_PAGES: 'true'
    }
  });

  // 3. Deploy
  console.log('📤 Desplegando...');
  execSync('npm run deploy', { stdio: 'inherit' });

  console.log('🎉 ¡Deploy completado exitosamente!');
  console.log('🌐 Visita: https://andresdesert.github.io/CyberWallet-Web/');

} catch (error) {
  console.error('❌ Error durante el deploy:', error.message);
  process.exit(1);
} 