import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Box,
  Chip,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { cvData } from './data';

// Components
import CVDownloadButton from './PDFDownload';

// Styled components
const GlassmorphicHover = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ transition: 'all 0.3s ease' }}>
    {children}
  </Box>
);

const FloatingCard = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ transition: 'all 0.3s ease' }}>
    {children}
  </Box>
);

const CVPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={4}>
          {/* Header Section */}
          <Grid component="div" item xs={12}>
            <Paper elevation={3} sx={{ p: 4, position: 'relative', overflow: 'hidden' }}>
              <Grid component="div" container spacing={3} alignItems="center">
                <Grid component="div" item xs={12} md={3}>
                  <Avatar
                    src="/profile-photo.jpg"
                    sx={{
                      width: 200,
                      height: 200,
                      margin: 'auto',
                      border: `4px solid ${theme.palette.primary.main}`,
                    }}
                  />
                </Grid>
                <Grid component="div" item xs={12} md={9}>
                  <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                    {cvData.personalInfo.name}
                  </Typography>
                  <Typography variant="h5" color="primary" gutterBottom>
                    {cvData.personalInfo.title}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {cvData.highlights.map((highlight, index) => (
                      <Chip
                        key={index}
                        label={highlight}
                        sx={{ m: 0.5 }}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <CVDownloadButton />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Professional Summary */}
          <Grid item xs={12}>
            <GlassmorphicHover>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                  Perfil Profesional
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {cvData.professionalSummary}
                </Typography>
              </Paper>
            </GlassmorphicHover>
          </Grid>

          {/* Experience */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                Experiencia Profesional
              </Typography>
              <Grid container spacing={3}>
                {cvData.experience.map((exp, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        '&:hover': {
                          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
                        },
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        {exp.role}
                      </Typography>
                      <Typography variant="subtitle1" color="primary" gutterBottom>
                        {exp.company} | {exp.period}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {exp.location}
                      </Typography>
                      {exp.description.map((desc, idx) => (
                        <Typography key={idx} variant="body2" paragraph sx={{ ml: 2 }}>
                          • {desc}
                        </Typography>
                      ))}
                      <Box sx={{ mt: 2 }}>
                        {exp.tools.map((tool, idx) => (
                          <Chip
                            key={idx}
                            label={tool}
                            size="small"
                            sx={{ m: 0.5 }}
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Skills */}
          <Grid item xs={12}>
            <GlassmorphicHover>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                  Habilidades Técnicas
                </Typography>
                <Grid container spacing={3}>
                  {cvData.skills.map((skillGroup, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Typography variant="h6" gutterBottom>
                        {skillGroup.category}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {skillGroup.items.map((skill, idx) => (
                          <Chip
                            key={idx}
                            label={skill.name}
                            color={
                              skill.level === 'advanced' ? 'success' :
                              skill.level === 'intermediate' ? 'primary' :
                              skill.level === 'learning' ? 'warning' : 'default'
                            }
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </GlassmorphicHover>
          </Grid>

          {/* Contact */}
          <Grid item xs={12}>
            <FloatingCard>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                  Contacto Profesional
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                  <Button
                    variant="contained"
                    startIcon={<LinkedInIcon />}
                    href={cvData.personalInfo.linkedin}
                    target="_blank"
                  >
                    LinkedIn
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<GitHubIcon />}
                    href={cvData.personalInfo.github}
                    target="_blank"
                  >
                    GitHub
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<EmailIcon />}
                    href={`mailto:${cvData.personalInfo.email}`}
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

// Re-export CV components and data
export { default as CVDownloadButton } from './PDFDownload';
export { cvData } from './data';
export { default as CVPDFDocument } from './CVPDFDocument';

export default CVPage;
