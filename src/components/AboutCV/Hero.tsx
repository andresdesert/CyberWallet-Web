import React from 'react';
import { Box, Typography, Avatar, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { getAssetPath } from '../../utils/pathUtils';

import { useGlassmorphing } from '@/hooks/useGlassmorphing';
import DownloadIcon from '@mui/icons-material/Download';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

const Hero: React.FC = () => {
    const glass = useGlassmorphing();

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
                {/* Contenedor principal del Hero con glassmorphing fintech */}
                <Box
                    sx={{
                        ...glass.hero,
                        p: { xs: 4, sm: 6 },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            gap: 3,
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Avatar
                                alt="Andrés Simahan"
                                src={getAssetPath('profile-photo.png')}
                                sx={{ 
                                    width: 140, 
                                    height: 140, 
                                    boxShadow: 3,
                                    border: '3px solid',
                                    borderColor: 'primary.main'
                                }}
                            />
                        </motion.div>

                        <Box>
                            <Typography
                                variant="h4"
                                component="h1"
                                fontWeight="bold"
                                sx={{ color: 'text.primary', mb: 1 }}
                            >
                                Andrés Simahan
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ color: 'text.secondary', mb: 2 }}
                            >
                                SR. QA Analyst • ISTQB Certified • Ciberseguridad en formación
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ color: 'text.secondary', mb: 4 }}
                            >
                                Buenos Aires, Argentina
                            </Typography>

                            {/* Botones de acción con glassmorphing */}
                            <Stack 
                                direction={{ xs: 'column', sm: 'row' }} 
                                spacing={2} 
                                sx={{ mb: 4, justifyContent: 'center' }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<DownloadIcon />}
                                    href={getAssetPath('CV-QA-Simahan.pdf')}
                                    download="CV-QA-Andres-Simahan.pdf"
                                    sx={{
                                        borderRadius: 2,
                                        px: 3,
                                        py: 1.5,
                                        fontWeight: 600,
                                        minWidth: 160,
                                        fontSize: '0.95rem',
                                        textTransform: 'none',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            transition: 'all 0.3s ease',
                                        },
                                    }}
                                >
                                    Descargar CV
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<LinkedInIcon />}
                                    href="https://linkedin.com/in/andres-simahan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        ...glass.button,
                                        px: 3,
                                        py: 1.5,
                                        fontWeight: 600,
                                        minWidth: 140,
                                        fontSize: '0.95rem',
                                        textTransform: 'none',
                                    }}
                                >
                                    LinkedIn
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<GitHubIcon />}
                                    href="https://github.com/andresdesert"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        ...glass.button,
                                        px: 3,
                                        py: 1.5,
                                        fontWeight: 600,
                                        minWidth: 120,
                                        fontSize: '0.95rem',
                                        textTransform: 'none',
                                    }}
                                >
                                    GitHub
                                </Button>
                            </Stack>

                            {/* Información de contacto con links */}
                            <Stack 
                                direction={{ xs: 'column', sm: 'row' }} 
                                spacing={3} 
                                sx={{ justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Box 
                                    component="a"
                                    href="https://wa.me/5491125144387"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: 1,
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            transition: 'all 0.3s ease',
                                        },
                                    }}
                                >
                                    <WhatsAppIcon sx={{ color: '#25D366', fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        WhatsApp
                                    </Typography>
                                </Box>
                                <Box 
                                    component="a"
                                    href="mailto:deluxogvc@gmail.com"
                                    sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: 1,
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            transition: 'all 0.3s ease',
                                        },
                                    }}
                                >
                                    <EmailIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        deluxogvc@gmail.com
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Hero;
