import React from 'react';
import { Fab, useTheme, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

import { useUnifiedTheme } from '@/context/UnifiedThemeContext';

const FloatingThemeToggle: React.FC = () => {
    const theme = useTheme();
    const { toggleColorScheme } = useUnifiedTheme();
    
    // Usar directamente theme.palette.mode para consistencia total
    const isDark = theme.palette.mode === 'dark';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{
                position: 'fixed',
                bottom: 24, // Volvemos a posición original
                right: 24,
                zIndex: 1400, // Z-index más alto para estar siempre visible
            }}
        >
            <Tooltip 
                title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} 
                placement="left"
                arrow
            >
                <Fab
                    onClick={toggleColorScheme}
                    sx={{
                        // 🎨 Diseño adaptativo ultra-elegante
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, rgba(76, 145, 240, 0.9), rgba(56, 125, 210, 0.8))'
                            : 'linear-gradient(135deg, rgba(76, 145, 240, 0.9), rgba(99, 164, 255, 0.8))',
                        
                        // 💎 Borde brillante adaptativo
                        border: theme.palette.mode === 'dark'
                            ? '2px solid rgba(255, 255, 255, 0.2)'
                            : '2px solid rgba(76, 145, 240, 0.3)',
                        
                        // ✨ Sombras dramáticas para flotación
                        boxShadow: theme.palette.mode === 'dark'
                            ? `
                                0 12px 30px rgba(0, 0, 0, 0.6),
                                0 6px 15px rgba(76, 145, 240, 0.3),
                                inset 0 1px 0 rgba(255, 255, 255, 0.2)
                            `
                            : `
                                0 8px 25px rgba(0, 0, 0, 0.15),
                                0 4px 12px rgba(76, 145, 240, 0.25),
                                inset 0 1px 0 rgba(255, 255, 255, 0.8)
                            `,
                        
                        // 🎯 Color del icono adaptativo
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
                        
                        // 🌟 Efectos de hover espectaculares
                        '&:hover': {
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(76, 145, 240, 1), rgba(56, 125, 210, 0.9))'
                                : 'linear-gradient(135deg, rgba(76, 145, 240, 1), rgba(99, 164, 255, 0.9))',
                            
                            transform: 'scale(1.1) translateY(-2px)',
                            
                            boxShadow: theme.palette.mode === 'dark'
                                ? `
                                    0 16px 40px rgba(0, 0, 0, 0.7),
                                    0 8px 20px rgba(76, 145, 240, 0.4),
                                    inset 0 1px 0 rgba(255, 255, 255, 0.3)
                                `
                                : `
                                    0 12px 35px rgba(0, 0, 0, 0.2),
                                    0 6px 18px rgba(76, 145, 240, 0.35),
                                    inset 0 1px 0 rgba(255, 255, 255, 0.9)
                                `,
                            
                            border: theme.palette.mode === 'dark'
                                ? '2px solid rgba(255, 255, 255, 0.3)'
                                : '2px solid rgba(76, 145, 240, 0.5)',
                        },
                        
                        // ⚡ Transiciones suaves
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        
                        // 📱 Tamaño adaptativo
                        width: { xs: 56, sm: 64 },
                        height: { xs: 56, sm: 64 },
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isDark ? 'dark' : 'light'}
                            initial={{ rotate: -180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 180, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isDark ? (
                                <Brightness7 sx={{ fontSize: { xs: 24, sm: 28 } }} />
                            ) : (
                                <Brightness4 sx={{ fontSize: { xs: 24, sm: 28 } }} />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </Fab>
            </Tooltip>
        </motion.div>
    );
};

export default FloatingThemeToggle;
