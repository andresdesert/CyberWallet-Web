import React from 'react';
import { Box, Paper, Typography, Skeleton } from '@mui/material';
import { useCotizaciones } from '@/hooks/useCotizaciones';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const ExchangeRates: React.FC = () => {
  const { cotizaciones, isLoading, isError } = useCotizaciones();

  if (isError) {
    return (
      <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.paper' }}>
        <Typography color="error">Error al cargar cotizaciones</Typography>
      </Paper>
    );
  }

  if (isLoading) {
    return (
      <Paper sx={{ p: 2, mb: 2, bgcolor: 'background.paper' }}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="rectangular" height={118} />
      </Paper>
    );
  }

  return (
    <Paper sx={{ 
      p: 2, 
      mb: 2, 
      bgcolor: 'background.paper',
      borderRadius: '16px',
      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)'
    }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        Cotizaciones del Dólar
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {cotizaciones?.map((rate) => (
          <Box
            key={rate.nombre}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1.5,
              borderRadius: '12px',
              bgcolor: 'background.default',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {rate.variacion > 0 ? (
                <TrendingUpIcon color="success" />
              ) : rate.variacion < 0 ? (
                <TrendingDownIcon color="error" />
              ) : (
                <TrendingFlatIcon color="action" />
              )}
              <Typography variant="subtitle1">{rate.nombre}</Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                ${rate.venta.toFixed(2)}
              </Typography>
              <Typography variant="caption" color={
                rate.variacion > 0 ? 'success.main' : 
                rate.variacion < 0 ? 'error.main' : 
                'text.secondary'
              }>
                {rate.variacion > 0 ? '+' : ''}{rate.variacion}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default ExchangeRates;
