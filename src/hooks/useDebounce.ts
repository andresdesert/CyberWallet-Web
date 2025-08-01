import { useState, useEffect } from 'react';

/**
 * Hook personalizado para debounce
 * @param value El valor a debounce
 * @param delay El delay en milisegundos
 * @returns El valor debounced
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}; 