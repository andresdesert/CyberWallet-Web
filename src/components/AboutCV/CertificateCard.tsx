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
import { getAssetPath } from '@/utils/pathUtils';

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
                                    : 'linear-gradient(145deg, #f0f0f0, #e0e0e0)',
                            boxShadow: (theme) =>
                                theme.palette.mode === 'dark'
                                    ? '0 0 20px rgba(76, 145, 240, 0.3)'
                                    : '0 0 10px rgba(76, 145, 240, 0.15)',
                            borderRadius: 4,
                            p: 3,
                            textAlign: 'center',
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        <Box 
                            sx={{ 
                                mb: 3,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <img
                                src={getAssetPath('istqb-badge.jpg')}
                                alt="ISTQB Badge"
                                style={{ 
                                    height: 120, 
                                    width: 120,
                                    objectFit: 'contain',
                                    borderRadius: '50%',
                                    boxShadow: '0 4px 12px rgba(76, 145, 240, 0.3)'
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
                                    href="https://atsqa.org/validate"
                                    target="_blank"
                                    rel="noopener noreferrer"
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
