// Archivo: src/components/common/ScrollToTopButton.tsx
import React, { useEffect, useState } from 'react';
import { Fab, useTheme } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const toggleVisibility = () => {
    // Mostrar solo cuando estás cerca del final de la página
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
    setVisible(scrolledToBottom);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return visible ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.1, rotate: 360 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        bottom: 96, // Subido desde 24 a 96 para no tapar footer
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999}}
    >
      <Fab
        onClick={handleClick}
        aria-label="scroll back to top"
        sx={{
          // 🎨 Diseño elegante centrado
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.9))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9))',
          
          // 💎 Borde adaptativo
          border: theme.palette.mode === 'dark'
            ? '2px solid rgba(76, 145, 240, 0.3)'
            : '2px solid rgba(76, 145, 240, 0.25)',
          
          // ✨ Sombras para flotación
          boxShadow: theme.palette.mode === 'dark'
            ? `
                0 8px 25px rgba(0, 0, 0, 0.6),
                0 4px 12px rgba(76, 145, 240, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `
            : `
                0 6px 20px rgba(0, 0, 0, 0.12),
                0 3px 8px rgba(76, 145, 240, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.8)
              `,
          
          // 🎯 Color del icono
          color: 'text.primary',
          
          // 🌟 Hover effect
          '&:hover': {
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(76, 145, 240, 0.2), rgba(56, 125, 210, 0.15))'
              : 'linear-gradient(135deg, rgba(76, 145, 240, 0.1), rgba(99, 164, 255, 0.08))',
            
            border: theme.palette.mode === 'dark'
              ? '2px solid rgba(76, 145, 240, 0.5)'
              : '2px solid rgba(76, 145, 240, 0.4)',
            
            boxShadow: theme.palette.mode === 'dark'
              ? `
                  0 12px 35px rgba(0, 0, 0, 0.7),
                  0 6px 18px rgba(76, 145, 240, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.15)
                `
              : `
                  0 8px 28px rgba(0, 0, 0, 0.15),
                  0 4px 12px rgba(76, 145, 240, 0.25),
                  inset 0 1px 0 rgba(255, 255, 255, 0.9)
                `},
          
          // 📱 Tamaño adaptativo
          width: { xs: 48, sm: 56 },
          height: { xs: 48, sm: 56 },
          
          // ⚡ Transiciones suaves
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'}}
      >
        <KeyboardArrowUp sx={{ fontSize: { xs: 20, sm: 24 } }} />
      </Fab>
    </motion.div>
  ) : null;
};

export default ScrollToTopButton;
