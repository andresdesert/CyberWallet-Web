// src/components/ParticleBackground.tsx
import React, { useRef, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';

// 🎯 Componente de partículas optimizado para performance y tendencias 2025
const ParticleBackground: React.FC = () => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    opacity: number;
    size: number;
    color: string;
    connectionRadius: number;
  }>>([]);

  // Optimización: usar useCallback para funciones que no cambian
  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 40; // Aumentado para más densidad visual
    
    particlesRef.current = [];
    
    // 🎨 Colores mejorados y más vibrantes
    const colors = theme.palette.mode === 'dark' 
      ? [
          'rgba(59, 130, 246, 0.8)',   // Azul brillante
          'rgba(139, 92, 246, 0.8)',   // Púrpura brillante
          'rgba(16, 185, 129, 0.8)',   // Verde esmeralda
          'rgba(244, 63, 94, 0.8)',    // Rosa vibrante
          'rgba(245, 158, 11, 0.8)',   // Ámbar dorado
        ]
      : [
          'rgba(59, 130, 246, 0.6)',   // Azul
          'rgba(139, 92, 246, 0.6)',   // Púrpura
          'rgba(16, 185, 129, 0.6)',   // Verde
          'rgba(244, 63, 94, 0.6)',    // Rosa
          'rgba(245, 158, 11, 0.6)',   // Ámbar
        ];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2, // Velocidad aumentada
        vy: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.8 + 0.3, // Opacidad más alta
        size: Math.random() * 3 + 1.5, // Tamaño aumentado
        color: colors[Math.floor(Math.random() * colors.length)],
        connectionRadius: Math.random() * 100 + 80, // Radio de conexión aumentado
      });
    }
  }, [theme.palette.mode]);

  const drawConnections = useCallback((ctx: CanvasRenderingContext2D, particles: typeof particlesRef.current) => {
    const maxDistance = 150; // Distancia aumentada
    const connectionOpacity = theme.palette.mode === 'dark' ? 0.25 : 0.15; // Opacidad aumentada
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * connectionOpacity;
          ctx.globalAlpha = opacity;
          
          // 🌈 Gradiente en las líneas de conexión
          const gradient = ctx.createLinearGradient(
            particles[i].x, particles[i].y,
            particles[j].x, particles[j].y
          );
          
          if (theme.palette.mode === 'dark') {
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.6)');
            gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.6)');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0.6)');
          } else {
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
            gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.4)');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0.4)');
          }
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.2; // Líneas más gruesas
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }, [theme.palette.mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detectar capabilities del dispositivo
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    // No renderizar en dispositivos muy limitados
    if (isMobile && isLowEnd) return;

    // Configurar canvas con high DPI support
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      ctx.scale(dpr, dpr);
      
      initParticles(canvas);
    };

    resizeCanvas();

    // Animación optimizada con throttling inteligente
    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      lastTime = currentTime;
      
      const rect = canvas.getBoundingClientRect();
      
      // Limpiar canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      const particles = particlesRef.current;

      // Actualizar y dibujar partículas
      particles.forEach(particle => {
        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around con suavizado
        if (particle.x < -10) particle.x = rect.width + 10;
        if (particle.x > rect.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = rect.height + 10;
        if (particle.y > rect.height + 10) particle.y = -10;

        // Dibujar partícula con glow effect
        ctx.globalAlpha = particle.opacity;
        
        // Glow exterior
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        
        // Partícula principal
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
      });

      // Dibujar conexiones (solo en desktop para performance)
      if (!isMobile) {
        drawConnections(ctx, particles);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Iniciar animación
    animationRef.current = requestAnimationFrame(animate);

    // Manejar resize con debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [initParticles, drawConnections]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: theme.palette.mode === 'dark' ? 0.6 : 0.4,
        mixBlendMode: theme.palette.mode === 'dark' ? 'screen' : 'multiply',
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
