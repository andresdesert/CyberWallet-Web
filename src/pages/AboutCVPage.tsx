import React from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import Hero from '../components/AboutCV/Hero';
import CertificateCard from '../components/AboutCV/CertificateCard';
import Experience from '../components/AboutCV/Experience';
import Skills from '../components/AboutCV/Skills';
import Footer from '../components/AboutCV/Footer';
import ScrollToTopButton from '../components/common/ScrollToTopButton';

const AboutCVPage: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleBackToLanding = () => {
        navigate('/');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                position: 'relative',
                px: { xs: 2, sm: 3, md: 4 }
            }}
        >
            <Box sx={{ py: 2, position: 'relative', zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <IconButton
                        onClick={handleBackToLanding}
                        sx={{
                            color: 'text.primary',
                            background: (theme) => theme.palette.mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.1)'
                                : 'rgba(0, 0, 0, 0.05)',
                            backdropFilter: 'blur(10px)',
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.mode === 'dark'
                                    ? 'rgba(255, 255, 255, 0.15)'
                                    : 'rgba(0, 0, 0, 0.08)',
                                transform: 'translateX(-5px)',
                                transition: 'all 0.3s ease'
                            },
                        }}
                    >
                        <ArrowBack />
                    </IconButton>
                </motion.div>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Hero />
                <CertificateCard />
                <Experience />
                <Skills />
            </Box>

            <Footer />
            <ScrollToTopButton />
        </Box>
    );
};

export default AboutCVPage;
