// src/components/ui/UnifiedAccordion.tsx
import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  useMediaQuery,
  alpha,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import { motion } from 'motion/react';
import log from 'loglevel';

interface UnifiedAccordionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  variant?: 'default' | 'mobile-only' | 'desktop-only';
  elevation?: number;
  showIcon?: boolean;
  customStyles?: React.CSSProperties;
  onToggle?: (expanded: boolean) => void;
}

const UnifiedAccordion: React.FC<UnifiedAccordionProps> = ({
  title,
  icon,
  children,
  defaultExpanded = false,
  variant = 'default',
  elevation = 0,
  showIcon = true,
  customStyles = {},
  onToggle,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [expanded, setExpanded] = useState(defaultExpanded);

  // 🎯 Renderizado condicional basado en variant y tamaño de pantalla
  const shouldRender = () => {
    switch (variant) {
      case 'mobile-only':
        return isMobile;
      case 'desktop-only':
        return isDesktop;
      default:
        return true;
    }
  };

  // 🎯 Logging para desarrollo
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      log.debug(`[DEV][UnifiedAccordion] Renderizando "${title}". Variant: ${variant}. Es móvil: ${isMobile}. Default Expanded: ${defaultExpanded}.`);
    }
  }, [title, variant, isMobile, defaultExpanded]);

  // 🎯 Handler para cambios de expansión
  const handleAccordionChange = (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
    
    if (process.env.NODE_ENV === 'development') {
      log.info(`[DEV][UnifiedAccordion] Sección "${title}" ${isExpanded ? 'expandida' : 'colapsada'}.`);
    }
    
    onToggle?.(isExpanded);
  };

  // 🎯 Si no debe renderizarse, mostrar children directamente
  if (!shouldRender()) {
    return <Box sx={{ mb: 3 }}>{children}</Box>;
  }

  // 🎯 Si es móvil y variant es mobile-only, usar acordeón
  if (isMobile && variant === 'mobile-only') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          sx={{
            borderRadius: 4,
            mb: 2,
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px) saturate(180%)',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: `0 8px 20px ${alpha(theme.palette.common.black, 0.1)}`,
            transition: 'all 0.3s ease-in-out',
            ...customStyles,
          }}
        >
          <Accordion
            defaultExpanded={defaultExpanded}
            elevation={elevation}
            sx={{ 
              backgroundColor: 'transparent', 
              boxShadow: 'none',
              '&:before': { display: 'none' },
            }}
            onChange={handleAccordionChange}
          >
            <AccordionSummary
              expandIcon={showIcon ? <ExpandMoreIcon /> : null}
              sx={{
                px: 2,
                py: 1.5,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1.5,
                },
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              {icon && (
                <Box sx={{ color: theme.palette.primary.main }}>
                  {icon}
                </Box>
              )}
              <Typography variant="subtitle1" fontWeight={600}>
                {title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pb: 2 }}>
              {children}
            </AccordionDetails>
          </Accordion>
        </Box>
      </motion.div>
    );
  }

  // 🎯 Para desktop o variant default, usar acordeón con estilos mejorados
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Accordion
        defaultExpanded={defaultExpanded}
        elevation={elevation}
        onChange={handleAccordionChange}
        sx={{
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderRadius: 2,
          mb: 2,
          '&:before': { display: 'none' },
          '&:hover': {
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
          },
          transition: 'all 0.3s ease',
          ...customStyles,
        }}
      >
        <AccordionSummary
          expandIcon={showIcon ? <ExpandMoreIcon /> : null}
          sx={{
            px: 3,
            py: 2,
            '& .MuiAccordionSummary-content': {
              alignItems: 'center',
              gap: 2,
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          {icon && (
            <Box sx={{ 
              color: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
            }}>
              {icon}
            </Box>
          )}
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 3, pb: 3 }}>
          {children}
        </AccordionDetails>
      </Accordion>
    </motion.div>
  );
};

export default UnifiedAccordion; 