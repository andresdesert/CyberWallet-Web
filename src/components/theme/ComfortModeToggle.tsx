// 🎛️ COMFORT MODE TOGGLE - Alternador de modo de confort visual
import React from 'react';
import { 
    Switch, 
    FormControlLabel, 
    Box, 
    Typography, 
    Paper,
    useTheme,
    alpha
} from '@mui/material';
import { Visibility as ComfortIcon } from '@mui/icons-material';

interface ComfortModeToggleProps {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
}

const ComfortModeToggle: React.FC<ComfortModeToggleProps> = ({ enabled, onChange }) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                background: alpha(theme.palette.background.paper, 0.6),
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                borderRadius: 2,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ComfortIcon sx={{ color: theme.palette.primary.main }} />
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                        Modo Confort Visual
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Reduce la intensidad visual para una experiencia más cómoda
                    </Typography>
                </Box>
                <FormControlLabel
                    control={
                        <Switch
                            checked={enabled}
                            onChange={(e) => onChange(e.target.checked)}
                            color="primary"
                        />
                    }
                    label=""
                    sx={{ m: 0 }}
                />
            </Box>
        </Paper>
    );
};

export default ComfortModeToggle;
