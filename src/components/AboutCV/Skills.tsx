import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

const skills = [
    'Manual Testing', 'Regression', 'UAT', 'Functional Testing',
    'Performance Testing', 'Accessibility Testing', 'Postman', 'Selenium',
    'TestNG', 'JUnit', 'K6', 'Playwright', 'Java', 'React',
    'Git', 'CI/CD', 'JIRA', 'REST APIs'
];

const Skills: React.FC = () => {
    return (
        <Box
            sx={{
                py: 8,
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <Box sx={{ maxWidth: '800px', width: '100%', px: { xs: 2, sm: 4 } }}>
                {/* Contenedor del título con efecto visual */}
                <Box
                    sx={{
                        textAlign: 'center',
                        mb: 4,
                        position: 'relative',
                        py: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ 
                            color: 'text.primary',
                            position: 'relative',
                            display: 'inline-block',
                            // Efecto de subrayado adaptativo
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: -8,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '60%',
                                height: '3px',
                                background: (theme) => theme.palette.mode === 'dark'
                                    ? 'linear-gradient(90deg, transparent, rgba(76, 145, 240, 0.8), transparent)'
                                    : 'linear-gradient(90deg, transparent, rgba(76, 145, 240, 0.6), transparent)',
                                borderRadius: '2px',
                            },
                        }}
                    >
                        Habilidades Técnicas
                    </Typography>
                </Box>

                {/* Contenedor de chips mejorado */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 2.5,
                        maxWidth: '100%',
                        // 🎯 Contenedor con contraste nítido mejorado
                        background: (theme) => theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.95))'
                            : 'linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9), rgba(248, 250, 252, 0.95))',
                        borderRadius: 4,
                        p: { xs: 4, sm: 5 },
                        // 💎 Borde más prominente para definición clara
                        border: (theme) => theme.palette.mode === 'dark'
                            ? '2px solid rgba(76, 145, 240, 0.3)'
                            : '2px solid rgba(76, 145, 240, 0.25)',
                        backdropFilter: 'blur(20px)',
                        // ✨ Sombras multicapa para máxima profundidad
                        boxShadow: (theme) => theme.palette.mode === 'dark'
                            ? `
                                0 20px 40px rgba(0, 0, 0, 0.7),
                                0 8px 20px rgba(76, 145, 240, 0.15),
                                inset 0 1px 0 rgba(255, 255, 255, 0.1)
                            `
                            : `
                                0 12px 30px rgba(0, 0, 0, 0.12),
                                0 5px 15px rgba(76, 145, 240, 0.1),
                                inset 0 1px 0 rgba(255, 255, 255, 0.8)
                            `,
                        position: 'relative',
                        overflow: 'hidden',
                        // 🌟 Línea de brillo superior más prominente
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '2px',
                            background: (theme) => theme.palette.mode === 'dark'
                                ? 'linear-gradient(90deg, transparent, rgba(76, 145, 240, 0.7), transparent)'
                                : 'linear-gradient(90deg, transparent, rgba(76, 145, 240, 0.5), transparent)',
                            borderRadius: '4px 4px 0 0',
                        },
                    }}
                >
                    {skills.map((skill, index) => (
                        <Chip
                            key={index}
                            label={skill}
                            variant="outlined"
                            sx={{
                                color: 'text.primary',
                                // 🎯 CONTRASTE ULTRA NÍTIDO - Fondos más sólidos y definidos
                                background: (theme) => 
                                    theme.palette.mode === 'dark' 
                                        ? 'linear-gradient(135deg, rgba(56, 74, 95, 0.9), rgba(45, 55, 72, 0.85), rgba(56, 74, 95, 0.9))'
                                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 251, 255, 0.9), rgba(255, 255, 255, 0.95))',
                                // 💎 Bordes más prominentes para definición crystal-clear
                                border: (theme) => theme.palette.mode === 'dark'
                                    ? '2.5px solid rgba(76, 145, 240, 0.5)'
                                    : '2.5px solid rgba(76, 145, 240, 0.4)',
                                // ✨ Sombras multicapa para máxima profundidad
                                boxShadow: (theme) => theme.palette.mode === 'dark'
                                    ? `
                                        0 8px 20px rgba(0, 0, 0, 0.6),
                                        0 3px 8px rgba(76, 145, 240, 0.2),
                                        inset 0 1px 0 rgba(255, 255, 255, 0.1)
                                    `
                                    : `
                                        0 4px 15px rgba(0, 0, 0, 0.12),
                                        0 2px 6px rgba(76, 145, 240, 0.15),
                                        inset 0 1px 0 rgba(255, 255, 255, 0.8)
                                    `,
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                height: 'auto',
                                py: 1.2,
                                px: 2.5,
                                // 🌟 Hover effect dramático para máxima interactividad
                                '&:hover': {
                                    background: (theme) => theme.palette.mode === 'dark'
                                        ? 'linear-gradient(135deg, rgba(76, 145, 240, 0.25), rgba(56, 125, 210, 0.2), rgba(76, 145, 240, 0.25))'
                                        : 'linear-gradient(135deg, rgba(76, 145, 240, 0.12), rgba(99, 164, 255, 0.08), rgba(76, 145, 240, 0.12))',
                                    border: (theme) => theme.palette.mode === 'dark'
                                        ? '2.5px solid rgba(76, 145, 240, 0.8)'
                                        : '2.5px solid rgba(76, 145, 240, 0.7)',
                                    transform: 'translateY(-4px) scale(1.05)',
                                    boxShadow: (theme) => theme.palette.mode === 'dark'
                                        ? `
                                            0 12px 30px rgba(0, 0, 0, 0.7),
                                            0 6px 15px rgba(76, 145, 240, 0.35),
                                            inset 0 1px 0 rgba(255, 255, 255, 0.15)
                                        `
                                        : `
                                            0 8px 25px rgba(0, 0, 0, 0.18),
                                            0 4px 12px rgba(76, 145, 240, 0.25),
                                            inset 0 1px 0 rgba(255, 255, 255, 0.9)
                                        `,
                                    color: (theme) => theme.palette.mode === 'dark'
                                        ? 'rgba(76, 145, 240, 0.95)'
                                        : 'rgba(76, 145, 240, 0.9)',
                                },
                                // 🎯 Focus effect para accesibilidad mejorada
                                '&:focus-visible': {
                                    outline: (theme) => `3px solid ${theme.palette.primary.main}`,
                                    outlineOffset: '3px',
                                },
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Skills;