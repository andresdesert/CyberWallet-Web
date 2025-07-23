// src/hooks/useCotizaciones.ts
import { useState, useEffect } from 'react';
import { cotizacionesMock } from '@/mocks/cotizacionesMock';

export interface Cotizacion {
  nombre: string;
  compra: number;
  venta: number;
  variacion: number;
  timestamp: string;
}

export const useCotizaciones = () => {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Simular carga de datos
    const loadCotizaciones = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setCotizaciones(cotizacionesMock);
      } catch (error) {
        console.error('Error loading cotizaciones:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadCotizaciones();
  }, []);

  return {
    cotizaciones,
    isLoading,
    isError,
  };
};
