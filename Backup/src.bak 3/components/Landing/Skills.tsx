import React from 'react';
import { Box, Typography, LinearProgress, Tooltip, alpha, useTheme } from '@mui/material';

interface SkillProps {
    name: string;
    value: number;
    description: string;
}

const Skill: React.FC<SkillProps> = ({ name, value, description }) => {
    const theme = useTheme();

    return (
        <Tooltip
            title={description}
            arrow
            placement="right"
            componentsProps={{
                tooltip: {
                    sx: {
                        bgcolor: theme.palette.mode === 'dark'
                            ? alpha(theme.palette.background.paper, 0.9)
                            : alpha(theme.palette.background.paper, 0.95),
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
                        color: theme.palette.text.primary,
                        fontSize: '0.875rem',
                        p: 1.5,
                        maxWidth: 300,
                        '& .MuiTooltip-arrow': {
                            color: theme.palette.mode === 'dark'
                                ? alpha(theme.palette.background.paper, 0.9)
                                : alpha(theme.palette.background.paper, 0.95),
                        }
                    }
                }
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    p: 2,
                    borderRadius: 2,
                    background: theme.palette.mode === 'dark'
                        ? alpha(theme.palette.background.paper, 0.2)
                        : alpha(theme.palette.background.paper, 0.5),
                    border: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateX(4px)',
                        background: theme.palette.mode === 'dark'
                            ? alpha(theme.palette.background.paper, 0.3)
                            : alpha(theme.palette.background.paper, 0.6),
                    }
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, alignItems: 'center' }}>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 500,
                            color: theme.palette.mode === 'dark'
                                ? theme.palette.primary.light
                                : theme.palette.primary.main
                        }}
                    >
                        {value}%
                    </Typography>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={value}
                    sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: theme.palette.mode === 'dark'
                            ? alpha(theme.palette.primary.main, 0.1)
                            : alpha(theme.palette.primary.main, 0.05),
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                        }
                    }}
                />
            </Box>
        </Tooltip>
    );
};

export default Skill;
