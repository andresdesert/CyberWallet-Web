import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { GitHub, LinkedIn, PictureAsPdf } from '@mui/icons-material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                mt: 8,
                py: 3,
                px: 2,
                backgroundColor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider',
                textAlign: 'center',
            }}
        >
            <Typography variant="body2" sx={{ color: 'text.secondary' }} gutterBottom>
                © 2025 Andrés Simahan
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton
                    component="a"
                    href="https://github.com/andresdesert"
                    target="_blank"
                    rel="noopener"
                    aria-label="GitHub"
                    sx={{ color: 'text.primary' }}
                >
                    <GitHub />
                </IconButton>

                <IconButton
                    component="a"
                    href="https://linkedin.com/in/andres-simahan"
                    target="_blank"
                    rel="noopener"
                    aria-label="LinkedIn"
                    sx={{ color: 'text.primary' }}
                >
                    <LinkedIn />
                </IconButton>

                <IconButton
                    component="a"
                    href="/cv/CV-QA-Simahan.pdf"
                    download
                    aria-label="Descargar CV"
                    sx={{ color: 'text.primary' }}
                >
                    <PictureAsPdf />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Footer;