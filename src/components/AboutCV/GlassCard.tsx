// 🌟 GLASS CARD FINTECH - Componente de contenedor con glassmorphing profesional
import React from 'react';
import { Box } from '@mui/material';
import { useGlassmorphing } from '@/hooks/useGlassmorphing';

interface GlassCardProps {
    children: React.ReactNode;
    variant?: 'hero' | 'card' | 'subtle';
    sx?: any;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, variant = 'card', sx = {} }) => {
    const glass = useGlassmorphing();
    
    return (
        <Box
            sx={{
                ...glass[variant],
                p: 3,
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

export default GlassCard;
