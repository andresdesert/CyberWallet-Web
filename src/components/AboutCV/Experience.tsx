import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { experiences } from './data/experienceData';
import GlassCard from './GlassCard';

const Experience: React.FC = () => {
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
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
                            Experiencia Profesional
                        </Typography>
                    </Box>

                    <Box 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: 3,
                            alignItems: 'stretch' // Para que todas las tarjetas tengan el mismo ancho
                        }}
                    >
                        {experiences.map((exp, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <GlassCard>
                                    <Box sx={{ minHeight: '120px' }}> {/* Altura mínima para consistencia */}
                                        <Typography variant="h6" fontWeight="bold" sx={{ color: 'primary.main', mb: 1 }}>
                                            {exp.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 600, mb: 1 }}>
                                            {exp.company} – {exp.location}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                                            {exp.date}
                                        </Typography>
                                        <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
                                            {exp.details.map((detail, i) => (
                                                <Box component="li" key={i} sx={{ mb: 0.5, lineHeight: 1.6 }}>
                                                    {detail}
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </Box>
                </motion.div>
            </Box>
        </Box>
    );
};

export default Experience;
