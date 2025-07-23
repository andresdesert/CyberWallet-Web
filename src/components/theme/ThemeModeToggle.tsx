// 🌓 THEME MODE TOGGLE - Alternador principal de tema claro/oscuro
import React from 'react';
import { 
    IconButton, 
    Tooltip,
    useTheme,
    alpha,
    styled
} from '@mui/material';
import { 
    LightMode as LightModeIcon, 
    DarkMode as DarkModeIcon 
} from '@mui/icons-material';
import { useUnifiedTheme } from '../../context/UnifiedThemeContext';
import { motion } from 'framer-motion';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    background: alpha(theme.palette.primary.main, 0.1),
    '&:hover': {
        background: alpha(theme.palette.primary.main, 0.2),
        transform: 'scale(1.1)',
    },
    transition: 'all 0.2s ease',
}));

const ThemeModeToggle: React.FC = () => {
    const theme = useTheme();
    const { colorScheme, toggleColorScheme } = useUnifiedTheme();

    return (
        <Tooltip 
            title={`Cambiar a modo ${colorScheme === 'dark' ? 'claro' : 'oscuro'}`}
            arrow
        >
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <StyledIconButton
                    onClick={toggleColorScheme}
                    aria-label="toggle theme"
                    size="medium"
                >
                    {colorScheme === 'dark' ? (
                        <LightModeIcon />
                    ) : (
                        <DarkModeIcon />
                    )}
                </StyledIconButton>
            </motion.div>
        </Tooltip>
    );
};

export default ThemeModeToggle;
