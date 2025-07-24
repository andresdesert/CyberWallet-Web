import React from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Avatar,
  Card,
  CardContent,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import {
  ArrowBack,
  Work,
  School,
  Psychology,
  Security,
  Code,
  BugReport,
  TrendingUp,
  LinkedIn,
  GitHub,
  LocationOn,
  Download,
  Verified,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getAssetPath } from '../utils/pathUtils';

const AboutMePage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleBackToLanding = () => {
    navigate('/');
  };

  const skills = [
    { name: 'Quality Assurance', icon: <BugReport />, level: 95 },
    { name: 'Testing Automation', icon: <Code />, level: 88 },
    { name: 'Performance Testing', icon: <TrendingUp />, level: 85 },
    { name: 'Agile Methodologies', icon: <Psychology />, level: 92 },
    { name: 'Manual Testing', icon: <Work />, level: 90 },
    { name: 'Security Testing', icon: <Security />, level: 82 },
  ];

  const experience = [
    {
      period: 'Ene 2025 - Presente',
      role: 'QA Engineer – Seal Team (Blueprint Project)',
      company: 'BOZ IT Development / Intermex',
      description: 'Líder en diseño, análisis y ejecución de casos de prueba desde el Sprint 0, aplicando metodologías avanzadas de Left Shift Testing y colaborando en el desarrollo de arquitecturas cloud-native.',
    },
    {
      period: 'May 2023 - Ene 2025',
      role: 'Sr. QA Analyst – Proyecto Payers',
      company: 'BOZ IT Development / Intermex',
      description: 'Especialista en pruebas de sistemas de pagos críticos, validando transacciones en tiempo real y asegurando la integridad de procesos financieros complejos.',
    },
    {
      period: 'Jun 2022 - May 2023',
      role: 'QA Analyst – Proyecto Homologaciones',
      company: 'Qualis Lab',
      description: 'Responsable de la validación y certificación de productos bancarios, asegurando cumplimiento con regulaciones financieras y estándares de calidad internacionales.',
    },
    {
      period: 'Oct 2021 - Jun 2022',
      role: 'QA Specialist',
      company: 'Penta Security Solutions',
      description: 'Especialista en pruebas de seguridad y funcionales para soluciones de ciberseguridad y billeteras virtuales, garantizando la protección de datos sensibles.',
    },
    {
      period: 'Mar 2021 - Oct 2021',
      role: 'QA Analyst – Proyecto "Vendo cheques y facturas"',
      company: 'Tata Consultancy Services',
      description: 'Analista de calidad especializado en validación de sistemas bancarios, enfocado en aplicaciones de office banking mobile y procesos de homologación.',
    },
    {
      period: 'Mar 2020 - Mar 2021',
      role: 'Desarrollador Java Junior',
      company: 'Defensoría del Pueblo de la Nación',
      description: 'Desarrollador full-stack especializado en aplicaciones web para gestión de denuncias ciudadanas, implementando soluciones Java con Spring Framework.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header con botón de regreso */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton
            onClick={handleBackToLanding}
            size="large"
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ArrowBack />
          </IconButton>
        </Box>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            mb: 6,
            textAlign: 'center',
            background: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                fontSize: '3rem',
                fontWeight: 700,
                mb: 2,
              }}
              src={getAssetPath("/profile-photo.png")}
            >
              AS
            </Avatar>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Andrés Simahan
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.secondary,
              mb: 3,
              fontWeight: 500,
            }}
          >
            Sr. QA Analyst & Performance Testing Specialist
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            Especialista en calidad de software certificado en ISTQB Foundation Level 4.0, con amplia experiencia 
            en pruebas funcionales, manuales y de sistemas en entornos ágiles. Actualmente perfeccionándome en 
            automatización, pruebas de rendimiento con K6 y especializándome en ciberseguridad.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 4 }}>
            <Chip
              icon={<LocationOn />}
              label="Buenos Aires, Argentina"
              variant="outlined"
            />
            <Chip
              icon={<Work />}
              label="QA Specialist"
              variant="outlined"
            />
            <Chip
              icon={<Verified />}
              label="ISTQB Foundation 4.0"
              variant="outlined"
            />
          </Box>

          {/* Botones de acción */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<Download />}
              component="a"
              href={getAssetPath("/CV-QA-Simahan.pdf")}
              download="CV-QA-Simahan.pdf"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            >
              Descargar CV
            </Button>
            <Button
              variant="outlined"
              startIcon={<LinkedIn />}
              onClick={() => window.open('https://www.linkedin.com/in/andres-simahan/', '_blank')}
            >
              LinkedIn
            </Button>
            <Button
              variant="outlined"
              startIcon={<GitHub />}
              onClick={() => window.open('https://github.com/andresdesert', '_blank')}
            >
              GitHub
            </Button>
          </Box>
        </Card>
      </motion.div>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Columna Izquierda - Experiencia */}
        <Box sx={{ flex: { md: 2 } }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card
              sx={{
                mb: 4,
                borderRadius: 3,
                background: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: theme.palette.text.primary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Work sx={{ color: theme.palette.primary.main }} />
                  Experiencia Profesional
                </Typography>

                {experience.map((exp, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        mb: 1,
                      }}
                    >
                      {exp.role}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                        mb: 1,
                      }}
                    >
                      {exp.company}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.secondary,
                        display: 'block',
                        mb: 2,
                      }}
                    >
                      {exp.period}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                      }}
                    >
                      {exp.description}
                    </Typography>
                    {index < experience.length - 1 && (
                      <Divider sx={{ my: 3 }} />
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        {/* Columna Derecha - Certificaciones y Habilidades */}
        <Box sx={{ flex: { md: 1 } }}>
          {/* Certificación ISTQB */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card
              sx={{
                mb: 4,
                borderRadius: 3,
                background: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: theme.palette.text.primary,
                  }}
                >
                  Certificación ISTQB®
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <img
                    src={getAssetPath("/istqb-badge.jpg")}
                    alt="ISTQB Badge"
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 12,
                      marginBottom: 16,
                      objectFit: 'cover',
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      mb: 1,
                    }}
                  >
                    Foundation Level 4.0
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 1,
                    }}
                  >
                    iSQI Group
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.secondary,
                      display: 'block',
                      mb: 3,
                    }}
                  >
                    Enero 2025 - ID: 25-CTFL 4-256945-81
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => window.open('https://scr.istqb.org/?name=Andres+Simahan&number=25-CTFL+4-256945-81&orderBy=relevancy&orderDirection=&dateStart=&dateEnd=&expiryStart=&expiryEnd=&certificationBody=&examProvider=&certificationLevel=&country=', '_blank')}
                >
                  Verificar Certificación
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Habilidades */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card
              sx={{
                borderRadius: 3,
                background: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: theme.palette.text.primary,
                  }}
                >
                  Habilidades Principales
                </Typography>

                {skills.map((skill, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ color: theme.palette.primary.main, mr: 1 }}>
                          {skill.icon}
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {skill.name}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 600,
                        }}
                      >
                        {skill.level}%
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: '100%',
                        height: 6,
                        backgroundColor: theme.palette.action.hover,
                        borderRadius: 3,
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          width: `${skill.level}%`,
                          height: '100%',
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          borderRadius: 3,
                          transition: 'width 1s ease-in-out',
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutMePage;

