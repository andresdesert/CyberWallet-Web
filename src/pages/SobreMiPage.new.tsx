import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Button,
  Avatar,
  Card,
  CardContent,
  Grid as MuiGrid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
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
  Email,
  LocationOn,
  CalendarToday,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  GlassmorphicHover,
  FloatingCard,
  GradientText,
  ViewportReveal
} from '@/components/ui/MicroInteractions';
import { getActiveTokens } from '../theme/tokens/colorTokens';

const Grid = MuiGrid as React.ComponentType<any>;

interface TechSkill {
  name: string;
  level: 'Advanced' | 'Intermediate' | 'Learning';
}

interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  achievements?: string[];
}

const SobreMiPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme<Theme>();
  const isDark = theme.palette.mode === 'dark';
  const semanticTokens = getActiveTokens(isDark);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const summaryData = {
    title: "QA Engineer con Enfoque Full-Stack",
    highlights: [
      "ISTQB Certified Tester con especialización en calidad integral",
      "Experiencia internacional en fintech y sistemas de pago",
      "Experto en automatización y pruebas de rendimiento",
      "Formación en ciberseguridad y testing de seguridad",
      "Dominio de pruebas de API y microservicios"
    ],
    skills: [
      { name: 'Quality Assurance', icon: <BugReport />, level: 90 },
      { name: 'API Testing', icon: <Code />, level: 85 },
      { name: 'Performance Testing', icon: <TrendingUp />, level: 80 },
      { name: 'Test Automation', icon: <Psychology />, level: 82 },
      { name: 'Manual Testing', icon: <Work />, level: 90 },
      { name: 'Security Testing', icon: <Security />, level: 75 }
    ]
  } as const;

  const technicalStack: Record<string, TechSkill[]> = {
    testing: [
      { name: 'Selenium', level: 'Advanced' },
      { name: 'Playwright', level: 'Intermediate' },
      { name: 'K6', level: 'Advanced' },
      { name: 'JMeter', level: 'Intermediate' },
      { name: 'Postman', level: 'Advanced' },
      { name: 'SoapUI', level: 'Advanced' }
    ],
    automation: [
      { name: 'Python', level: 'Intermediate' },
      { name: 'JavaScript', level: 'Intermediate' },
      { name: 'TypeScript', level: 'Intermediate' }
    ],
    databases: [
      { name: 'SQL Server', level: 'Advanced' },
      { name: 'MongoDB', level: 'Intermediate' },
      { name: 'MySQL', level: 'Advanced' }
    ],
    tools: [
      { name: 'Azure DevOps', level: 'Advanced' },
      { name: 'Jira', level: 'Advanced' },
      { name: 'Git', level: 'Advanced' },
      { name: 'GitHub', level: 'Advanced' }
    ],
    security: [
      { name: 'BurpSuite', level: 'Intermediate' },
      { name: 'OWASP Testing', level: 'Intermediate' },
      { name: 'Security Testing', level: 'Learning' }
    ]
  };

  const experience: Experience[] = [
    {
      period: 'Ene 2025 - Presente',
      role: 'Senior QA Analyst',
      company: 'BOZ',
      description: 'Implementación de Left Shift Testing desde Sprint 0, desarrollo de estrategias de prueba con .NET Aspire, y ejecución de pruebas de carga con K6. Especialización en Playwright para automatización de pruebas end-to-end.',
      achievements: ['Optimización de procesos de QA', 'Implementación de pruebas tempranas', 'Mejora en la detección de defectos']
    },
    {
      period: 'May 2023 - Ene 2024',
      role: 'Senior QA Analyst',
      company: 'BOZ IT Development',
      description: 'Liderazgo en pruebas de servicios de pago en tiempo real, gestión de ambientes y resolución de incidencias críticas. Experiencia con Postman, SoapUI y Azure DevOps.',
      achievements: ['Mejora en eficiencia operativa', 'Optimización de procesos de prueba']
    }
  ];

  const certification = {
    name: 'ISTQB Foundation Level',
    issueDate: '2023',
    issuer: 'International Software Testing Qualifications Board',
    badgeUrl: '/istqb-badge.jpg'
  } as const;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={4}>
          {/* Profile Header */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4, background: semanticTokens.surface.primary }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={3}>
                  <Avatar
                    src="/profile-photo.jpg"
                    sx={{ width: 150, height: 150, margin: 'auto' }}
                  />
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography variant="h4" gutterBottom>
                    <GradientText>
                      {summaryData.title}
                    </GradientText>
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {summaryData.highlights.map((highlight, index) => (
                      <Chip
                        key={index}
                        label={highlight}
                        sx={{ m: 0.5 }}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Technical Skills */}
          <Grid item xs={12}>
            <GlassmorphicHover>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Stack Tecnológico
                </Typography>
                <Grid container spacing={3}>
                  {Object.entries(technicalStack).map(([category, skills]) => (
                    <Grid item xs={12} md={4} key={category}>
                      <Card elevation={0} sx={{ height: '100%' }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom color="primary">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </Typography>
                          {skills.map((skill, index) => (
                            <Chip
                              key={index}
                              label={`${skill.name} - ${skill.level}`}
                              sx={{ m: 0.5 }}
                              color={
                                skill.level === 'Advanced' ? 'success' :
                                skill.level === 'Intermediate' ? 'primary' : 'default'
                              }
                            />
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </GlassmorphicHover>
          </Grid>

          {/* Experience Timeline */}
          <Grid item xs={12}>
            <ViewportReveal>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Experiencia Profesional
                </Typography>
                <Box sx={{ mt: 3 }}>
                  {experience.map((exp, index) => (
                    <Card key={index} sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle2" color="primary">
                          {exp.period}
                        </Typography>
                        <Typography variant="h6">
                          {exp.role} - {exp.company}
                        </Typography>
                        <Typography variant="body1" paragraph>
                          {exp.description}
                        </Typography>
                        {exp.achievements && (
                          <Box sx={{ mt: 1 }}>
                            {exp.achievements.map((achievement, idx) => (
                              <Chip
                                key={idx}
                                label={achievement}
                                size="small"
                                sx={{ m: 0.5 }}
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Paper>
            </ViewportReveal>
          </Grid>

          {/* Certification */}
          <Grid item xs={12}>
            <FloatingCard>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                  Certificación
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                  <img 
                    src={certification.badgeUrl} 
                    alt="ISTQB Badge" 
                    style={{ width: 100, height: 100 }}
                  />
                  <Box>
                    <Typography variant="h6">
                      {certification.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {certification.issuer}
                    </Typography>
                    <Typography variant="body2">
                      Emitido: {certification.issueDate}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </FloatingCard>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12}>
            <FloatingCard>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                  Contacto
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    startIcon={<LinkedIn />}
                    variant="contained"
                    color="primary"
                    href="https://www.linkedin.com/in/tu-perfil"
                    sx={{ m: 1 }}
                  >
                    LinkedIn
                  </Button>
                  <Button
                    startIcon={<GitHub />}
                    variant="contained"
                    color="secondary"
                    href="https://github.com/andresdesert?tab=repositories"
                    sx={{ m: 1 }}
                  >
                    GitHub
                  </Button>
                  <Button
                    startIcon={<Email />}
                    variant="contained"
                    color="info"
                    href="mailto:tu@email.com"
                    sx={{ m: 1 }}
                  >
                    Email
                  </Button>
                </Box>
              </Paper>
            </FloatingCard>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default SobreMiPage;
