import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import AppLayout from '@/layout/AppLayout';
import PageContainer from '@/layout/PageContainer';
import { getAssetPath } from '@/utils/githubPagesConfig';

const NotFoundPage: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <AppLayout>
            <PageContainer>
                <Box
                    sx={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '70vh',
                        px: 2,
                    }}
                >
                    {/* 🖼️ Imagen 404 personalizada */}
                    <Box
                        component="img"
                        src={getAssetPath('assets/images/404-not-found.jpg')}
                        alt="404 - Página no encontrada"
                        sx={{
                            maxWidth: { xs: '280px', sm: '400px' },
                            width: '100%',
                            height: 'auto',
                            mb: 3,
                            borderRadius: 2,
                            objectFit: 'contain',
                        }}
                    />
                    
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '4rem', sm: '6rem' },
                            fontWeight: 'bold',
                            mb: 2,
                            color: theme.palette.primary.main,
                            textShadow: theme.palette.mode === 'dark'
                                ? '0 0 15px rgba(168,154,246,0.25)'
                                : '0 0 10px rgba(0,0,0,0.05)',
                        }}
                    >
                        404
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                        }}
                    >
                        Página no encontrada
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            maxWidth: 500,
                            color: theme.palette.text.secondary,
                            mb: 4,
                        }}
                    >
                        Ups, la ruta que intentaste acceder no existe. Verificá la URL o volvé al inicio.
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/')}
                        sx={{
                            borderRadius: 8,
                            px: 4,
                            py: 1.5,
                            fontWeight: 600,
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 0 10px rgba(168,154,246,0.15)'
                                : '4px 4px 10px rgba(0,0,0,0.1)',
                        }}
                    >
                        Volver al inicio
                    </Button>
                </Box>
            </PageContainer>
        </AppLayout>
    );
};

export default NotFoundPage;
