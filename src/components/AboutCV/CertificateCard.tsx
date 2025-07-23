import React from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/utils/githubPagesConfig';


const CertificateCard: React.FC = () => {
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
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Card
                        sx={{
                            background: (theme) =>
                                theme.palette.mode === 'dark'
                                    ? 'linear-gradient(145deg, #1e1e1e, #2a2a2a)'
                                    : 'linear-gradient(145deg, rgba(99, 179, 237, 0.08), rgba(168, 85, 247, 0.05), rgba(255, 255, 255, 0.95))',
                            boxShadow: (theme) =>
                                theme.palette.mode === 'dark'
                                    ? '0 0 20px rgba(76, 145, 240, 0.3)'
                                    : '0 8px 32px rgba(99, 179, 237, 0.15), 0 4px 16px rgba(168, 85, 247, 0.1)',
                            borderRadius: 4,
                            p: 3,
                            textAlign: 'center',
                            border: (theme) =>
                                theme.palette.mode === 'dark'
                                    ? `1px solid ${theme.palette.divider}`
                                    : '1px solid rgba(99, 179, 237, 0.2)',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: (theme) =>
                                    theme.palette.mode === 'dark'
                                        ? '0 0 30px rgba(76, 145, 240, 0.4)'
                                        : '0 12px 40px rgba(99, 179, 237, 0.2), 0 6px 20px rgba(168, 85, 247, 0.15)',
                            },
                        }}
                    >
                        <Box sx={{ mb: 3 }}>
                            <img 
                                src={getAssetPath('assets/images/istqb-badge.jpg')} 
                                alt="ISTQB Badge" 
                                style={{ 
                                    height: '120px', 
                                    width: 'auto',
                                    borderRadius: '8px',
                                    objectFit: 'contain'
                                }} 
                            />
                        </Box>
                        <CardContent>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                Certificación ISTQB
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                Certificado ISTQB Foundation Level 4.0
                            </Typography>
                            <Typography variant="body2" mt={1}>
                                Validado internacionalmente. Emitido a nombre de Andrés Simahan.
                            </Typography>
                            <Box mt={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<VerifiedIcon />}
                                    href="https://scr.istqb.org/?name=Andres+Simahan&number=25-CTFL+4-256945-81"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        background: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? 'linear-gradient(45deg, #2563eb, #1d4ed8)'
                                                : 'linear-gradient(45deg, #3b82f6, #1e40af)',
                                        '&:hover': {
                                            background: (theme) =>
                                                theme.palette.mode === 'dark'
                                                    ? 'linear-gradient(45deg, #1d4ed8, #1e3a8a)'
                                                    : 'linear-gradient(45deg, #1e40af, #1e3a8a)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)'
                                        }
                                    }}
                                >
                                    Verificar Certificación
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </motion.div>
            </Box>
        </Box>
    );
};

export default CertificateCard;
