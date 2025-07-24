import React, { useState, useRef, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';
import { getAssetPath } from '@/utils/pathUtils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  borderRadius?: string | number;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  sx?: React.CSSProperties;
  style?: React.CSSProperties;
  skipBasePath?: boolean; // Para casos donde ya se incluye la ruta completa
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = '100%',
  height = 'auto',
  objectFit = 'cover',
  borderRadius = 0,
  loading = 'lazy',
  placeholder,
  sx = {},
  style = {},
  skipBasePath = false,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // 🎯 FIX: Manejar rutas correctamente para GitHub Pages
  const getImageSrc = () => {
    if (skipBasePath || !src) return src;
    
    // Si la ruta ya es absoluta o externa, no modificar
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {
      return src;
    }
    
    // Para rutas que empiezan con /, asegurar que funcionen en GitHub Pages
    if (src.startsWith('/')) {
      const basePath = import.meta.env.PROD ? '/CyberWallet-Web' : '';
      return `${basePath}${src}`;
    }
    
    // Para rutas relativas, dejarlas como están
    return src;
  };

  const imageSrc = getImageSrc();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Load image 50px before it comes into view
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
    console.error(`Failed to load image: ${imageSrc}`);
  };

  return (
    <Box
      ref={imgRef}
      sx={{
        position: 'relative',
        width,
        height,
        borderRadius,
        overflow: 'hidden',
        ...sx,
      }}
      style={style}
      {...props}
    >
      {!loaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius,
          }}
        />
      )}
      
      {(isInView || loading === 'eager') && (
        <img
          src={error ? 
               (placeholder ? 
                (typeof placeholder === 'string' && !placeholder.includes('http') && !placeholder.includes('data:') ? 
                 getAssetPath(placeholder) : placeholder) : 
                getAssetPath('/placeholder.png')) : 
               imageSrc}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            transition: 'opacity 0.3s ease',
            opacity: loaded ? 1 : 0,
            borderRadius,
          }}
        />
      )}
    </Box>
  );
};

export default OptimizedImage;
