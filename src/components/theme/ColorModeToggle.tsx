// src/components/theme/ColorModeToggle.tsx

import React from 'react';
import { Box, IconButton, Fade } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SpaIcon from '@mui/icons-material/Spa';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useColorMode } from '@/context/ColorModeContext';
// Importa useTheme aquí junto con styled y alpha
import { styled, alpha, useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

const modes = [
  { value: 'light', icon: <Brightness7Icon />, label: 'Claro' },
  { value: 'comfort', icon: <SpaIcon />, label: 'Confort' },
  { value: 'dark', icon: <Brightness4Icon />, label: 'Oscuro' },
];

// Estilo neumórfico sutil mejorado
const ModeButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: '50%',
  // AJUSTE: Sombras neumórficas usando los nuevos tokens del tema
  boxShadow: `
    inset 2px 2px 4px ${alpha(theme.palette.custom?.neumoDarkShadow || '#00000055', 0.5)},
    inset -2px -2px 4px ${alpha(theme.palette.custom?.neumoLightShadow || '#ffffff88', 0.5)},
    4px 4px 10px ${alpha(theme.palette.custom?.neumoDarkShadow || 'rgba(0,0,0,0.1)', 0.2)}
  `,
  margin: '0 4px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: theme.palette.action.hover,
    // AJUSTE: Sombra más pronunciada al hover
    boxShadow: `
      inset 2px 2px 6px ${alpha(theme.palette.custom?.neumoDarkShadow || '#00000055', 0.6)},
      inset -2px -2px 6px ${alpha(theme.palette.custom?.neumoLightShadow || '#ffffff88', 0.6)},
      6px 6px 15px ${alpha(theme.palette.custom?.neumoDarkShadow || 'rgba(0,0,0,0.1)', 0.3)}
    `,
  },
  '&.active': {
    backgroundColor: theme.palette.primary.main, // Color primario del tema
    color: '#fff',
    // AJUSTE: Sombra activa para un efecto "presionado" o "resaltado"
    boxShadow: `
      inset 1px 1px 3px ${alpha(theme.palette.custom?.neumoLightShadow || '#ffffff88', 0.8)},
      inset -1px -1px 3px ${alpha(theme.palette.custom?.neumoDarkShadow || '#00000055', 0.8)},
      2px 2px 5px ${alpha(theme.palette.custom?.neumoDarkShadow || 'rgba(0,0,0,0.1)', 0.1)}
    `,
  },
}));


const ColorModeToggle: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  // ¡Aquí es donde debemos obtener el tema!
  const theme = useTheme();

  // No hay modo actual ni setMode, solo toggle
  // Se puede mostrar un solo botón para alternar

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 16, sm: 24 },
        right: { xs: 16, sm: 24 },
        display: 'flex',
        alignItems: 'center',
        zIndex: (theme) => theme.zIndex.tooltip + 10,
        backdropFilter: 'blur(10px)',
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        borderRadius: 12,
        padding: '6px 12px',
        boxShadow: `0 4px 12px ${alpha(theme.palette.custom?.neumoDarkShadow || 'rgba(0,0,0,0.1)', 0.3)}`,
        transition: 'all 0.4s ease',
      }}
    >
      <Fade in timeout={500}>
        <Tooltip title="Alternar modo de color" arrow>
          <ModeButton
            onClick={toggleColorMode}
            size="small"
            aria-label="Alternar modo de color"
          >
            <Brightness4Icon />
          </ModeButton>
        </Tooltip>
      </Fade>
    </Box>
  );
};

export default ColorModeToggle;