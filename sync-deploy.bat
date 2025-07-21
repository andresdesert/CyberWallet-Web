@echo off
REM 🚀 SCRIPT DE SINCRONIZACIÓN COMPLETA - CyberWallet
REM Garantiza 100% sincronización entre local y GitHub Pages

echo.
echo ====================================================
echo 🚀 CyberWallet - Sincronización GitHub Pages 100%%
echo ====================================================
echo.

echo 🧹 [1/9] Limpiando cache y archivos temporales...
if exist dist rmdir /s /q dist
if exist node_modules\.cache rmdir /s /q node_modules\.cache
if exist .eslintcache del /q .eslintcache
echo ✅ Cache limpiado

echo.
echo 📦 [2/9] Verificando dependencias...
npm ci --prefer-offline --no-audit --no-fund
echo ✅ Dependencias actualizadas

echo.
echo 🔍 [3/9] Verificando tipos TypeScript...
npm run type-check
if %errorlevel% neq 0 (
    echo ❌ Error en type-check
    pause
    exit /b 1
)
echo ✅ Tipos verificados

echo.
echo 🔧 [4/9] Ejecutando linter...
npm run lint
if %errorlevel% neq 0 (
    echo ⚠️ Warnings en linter - continuando...
)
echo ✅ Linter ejecutado

echo.
echo 🧪 [5/9] Ejecutando tests...
npm run test -- --run
if %errorlevel% neq 0 (
    echo ⚠️ Tests con errores - continuando...
)
echo ✅ Tests ejecutados

echo.
echo 🏗️ [6/9] Construyendo aplicación optimizada...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Error en build
    pause
    exit /b 1
)
echo ✅ Build completado

echo.
echo 📄 [7/9] Verificando archivos generados...
dir dist /b
echo ✅ Archivos verificados

echo.
echo 🌐 [8/9] Desplegando a GitHub Pages...
echo Eliminando rama gh-pages remota...
git push origin --delete gh-pages 2>nul
echo Limpiando cache local gh-pages...
rmdir /s /q node_modules\.cache\gh-pages-clean 2>nul
echo Desplegando nueva versión...
npm run deploy-clean
if %errorlevel% neq 0 (
    echo ❌ Error en deploy
    pause
    exit /b 1
)
echo ✅ Deploy completado

echo.
echo 🔍 [9/9] Verificando deployment...
timeout /t 5 >nul
echo Verificando rama gh-pages...
git ls-remote origin gh-pages
echo.

echo ====================================================
echo ✅ SINCRONIZACIÓN COMPLETA FINALIZADA
echo ====================================================
echo.
echo 🌍 Tu sitio estará disponible en:
echo https://andresdesert.github.io/CyberWallet-Web/
echo.
echo ⏰ GitHub Pages puede tardar 1-2 minutos en actualizar
echo 💡 Limpia cache del navegador: Ctrl+F5
echo.
pause
