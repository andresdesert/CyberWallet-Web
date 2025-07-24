#!/usr/bin/env node

/**
 * Script de optimización para GitHub Pages
 * Organiza archivos y optimiza la configuración
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Optimizando para GitHub Pages...');

try {
  // 1. Limpiar directorios
  console.log('🧹 Limpiando directorios...');
  const dirsToClean = ['dist', 'node_modules/.cache', 'temp-gh-pages'];
  
  dirsToClean.forEach(dir => {
    if (fs.existsSync(dir)) {
      if (process.platform === 'win32') {
        execSync(`rmdir /s /q "${dir}"`, { stdio: 'inherit' });
      } else {
        execSync(`rm -rf "${dir}"`, { stdio: 'inherit' });
      }
      console.log(`✅ Limpiado: ${dir}`);
    }
  });

  // 2. Verificar estructura de archivos
  console.log('📁 Verificando estructura de archivos...');
  const requiredDirs = [
    'public/assets/images',
    'public/assets/documents', 
    'public/assets/icons'
  ];
  
  requiredDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Creado: ${dir}`);
    }
  });

  // 3. Verificar archivos críticos
  console.log('🔍 Verificando archivos críticos...');
  const criticalFiles = [
    'public/assets/images/profile-photo.png',
    'public/assets/images/404-not-found.jpg',
    'public/assets/images/Banner ISTQB.png',
    'public/assets/documents/CV-QA-Simahan.pdf',
    'public/assets/icons/istqb-badge.svg',
    'public/assets/icons/vite.svg',
    'public/404.html',
    'public/.nojekyll',
    'public/manifest.json'
  ];

  criticalFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ Encontrado: ${file}`);
    } else {
      console.warn(`⚠️  No encontrado: ${file}`);
    }
  });

  // 4. Instalar dependencias
  console.log('📦 Instalando dependencias...');
  execSync('npm ci --prefer-offline --no-audit --no-fund --production=false', { stdio: 'inherit' });

  // 5. Type check
  console.log('🔍 Verificando tipos...');
  execSync('npm run type-check', { stdio: 'inherit' });

  // 6. Build optimizado para GitHub Pages
  console.log('🏗️ Construyendo para GitHub Pages...');
  execSync('npm run build-github', { 
    stdio: 'inherit',
    env: { 
      ...process.env, 
      NODE_ENV: 'production',
      GITHUB_PAGES: 'true'
    }
  });

  // 7. Verificar build
  console.log('✅ Verificando build...');
  const distPath = path.join(process.cwd(), 'dist');
  const assetsPath = path.join(distPath, 'assets');
  
  if (!fs.existsSync(distPath)) {
    throw new Error('❌ El directorio dist no se creó');
  }
  
  if (!fs.existsSync(assetsPath)) {
    throw new Error('❌ El directorio assets no se creó');
  }

  // 8. Verificar archivos de build
  const buildFiles = [
    'index.html',
    'assets/js/index-',
    'assets/css/index-',
    '.nojekyll',
    '404.html'
  ];

  buildFiles.forEach(file => {
    if (file.includes('-')) {
      const dir = path.dirname(path.join(distPath, file));
      const baseName = path.basename(file, '-');
      const files = fs.readdirSync(dir).filter(f => f.startsWith(baseName));
      if (files.length === 0) {
        throw new Error(`❌ No se encontraron archivos que coincidan con: ${file}`);
      }
      console.log(`✅ Encontrados ${files.length} archivos para: ${file}`);
    } else {
      const filePath = path.join(distPath, file);
      if (!fs.existsSync(filePath)) {
        throw new Error(`❌ Archivo crítico no encontrado: ${file}`);
      }
      console.log(`✅ Encontrado: ${file}`);
    }
  });

  // 9. Optimizar imágenes (si es posible)
  console.log('🖼️  Verificando optimización de imágenes...');
  const imageFiles = [
    'public/assets/images/profile-photo.png',
    'public/assets/images/404-not-found.jpg',
    'public/assets/images/Banner ISTQB.png'
  ];

  imageFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const stats = fs.statSync(file);
      const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`📊 ${path.basename(file)}: ${sizeInMB}MB`);
    }
  });

  console.log('🎉 ¡Optimización completada exitosamente!');
  console.log('📁 Archivos organizados en: public/assets/');
  console.log('🚀 Build optimizado en: dist/');
  console.log('🌐 Listo para deploy en GitHub Pages');

} catch (error) {
  console.error('❌ Error durante la optimización:', error.message);
  process.exit(1);
} 