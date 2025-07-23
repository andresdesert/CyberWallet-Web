// src/hooks/useCotizaciones.ts
import useSWR from 'swr';
import { cotizacionesMock } from '@/mocks/cotizacionesMock';

// 💰 Tipo de cotización
export interface DollarRate {
  nombre: string;
  compra: number;
  venta: number;
  variacion: number;
  timestamp: string;
}

// Hook para obtener cotizaciones simuladas
export const useCotizaciones = () => {
  const { data: cotizaciones, error, isValidating: isLoading } = useSWR<DollarRate[]>(
    'cotizaciones',
    () => Promise.resolve(cotizacionesMock),
    {
      refreshInterval: 300000, // Refrescar cada 5 minutos
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    cotizaciones: cotizaciones ?? [],
    isLoading,
    isError: !!error,
  };
};
