// 🎨 UNIFIED ACCORDION - Componente unificado de acordeón para el sistema
import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    useTheme,
    alpha,
    styled,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    background: theme.palette.mode === 'dark'
        ? alpha(theme.palette.background.paper, 0.6)
        : alpha(theme.palette.background.paper, 0.8),
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    borderRadius: theme.spacing(1),
    '&:before': {
        display: 'none',
    },
    '&.Mui-expanded': {
        margin: 0,
        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    '& .MuiAccordionSummary-content': {
        alignItems: 'center',
        '&.Mui-expanded': {
            margin: '12px 0',
        },
    },
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
    },
}));

interface UnifiedAccordionProps {
    title: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    defaultExpanded?: boolean;
    disabled?: boolean;
}

const UnifiedAccordion: React.FC<UnifiedAccordionProps> = ({
    title,
    children,
    icon,
    defaultExpanded = false,
    disabled = false,
}) => {
    const theme = useTheme();

    return (
        <StyledAccordion
            defaultExpanded={defaultExpanded}
            disabled={disabled}
            disableGutters
        >
            <StyledAccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${title.toLowerCase().replace(/\s+/g, '-')}-content`}
                id={`${title.toLowerCase().replace(/\s+/g, '-')}-header`}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {icon && (
                        <Box
                            sx={{
                                color: theme.palette.primary.main,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            {icon}
                        </Box>
                    )}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
            </StyledAccordionSummary>
            <AccordionDetails
                sx={{
                    pt: 0,
                    pb: 2,
                    px: 2,
                }}
            >
                {children}
            </AccordionDetails>
        </StyledAccordion>
    );
};

export default UnifiedAccordion;
