import React from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid'; // Importación directa del componente Grid

const TestComponent: React.FC = () => {
  return (
    <Box>
      {/* Usar el enfoque de Box como alternativa a Grid */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ flexGrow: 1, width: { xs: '100%', md: '48%' } }}>
          Contenido 1
        </Box>
        <Box sx={{ flexGrow: 1, width: { xs: '100%', md: '48%' } }}>
          Contenido 2
        </Box>
      </Box>
    </Box>
  );
};

export default TestComponent;
