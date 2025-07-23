// 🌟 GLASS CARD FINTECH - Componente de contenedor con glassmorphing profesional
import React from 'react';
import { Box, SxProps, Theme, useTheme } from '@mui/material';

interface GlassCardProps {
    children: React.ReactNode;
    variant?: 'hero' | 'card' | 'subtle';
    sx?: SxProps<Theme>;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, variant = 'card', sx = {} }) => {
    const theme = useTheme();
    
    const getVariantStyles = () => {
        const baseStyles = {
            p: 3,
            borderRadius: 3,
            backdropFilter: 'blur(20px)',
        };

        switch (variant) {
            case 'hero':
                return {
                    ...baseStyles,
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.6))'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.6))',
                    backdropFilter: 'blur(40px)',
                    border: theme.palette.mode === 'dark'
                        ? '1px solid rgba(148, 163, 184, 0.3)'
                        : '1px solid rgba(203, 213, 225, 0.4)',
                    borderRadius: 4,
                };
            case 'subtle':
                return {
                    ...baseStyles,
                    background: theme.palette.mode === 'dark'
                        ? 'rgba(51, 65, 85, 0.6)'
                        : 'rgba(248, 250, 252, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: theme.palette.mode === 'dark'
                        ? '1px solid rgba(71, 85, 105, 0.4)'
                        : '1px solid rgba(226, 232, 240, 0.6)',
                    borderRadius: 2,
                };
            default: // 'card'
                return {
                    ...baseStyles,
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(100, 116, 139, 0.12), rgba(107, 115, 255, 0.08))'
                        : 'linear-gradient(135deg, rgba(99, 179, 237, 0.12), rgba(168, 85, 247, 0.08), rgba(255, 255, 255, 0.9))',
                    border: theme.palette.mode === 'dark'
                        ? '1px solid rgba(100, 116, 139, 0.2)'
                        : '1px solid rgba(99, 179, 237, 0.25)',
                    boxShadow: theme.palette.mode === 'dark'
                        ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 16px rgba(107, 115, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        : '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 16px rgba(99, 179, 237, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                };
        }
    };
    
    return (
        <Box
            sx={{
                ...getVariantStyles(),
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

export default GlassCard;
