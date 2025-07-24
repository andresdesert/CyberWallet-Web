import React from 'react';
import {
  Container,
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Header Section */}
          <Box>
            <Paper elevation={3} sx={{ p: 4, position: 'relative', overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center' }}>
                <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 25%' } }}>
                  <Avatar
                    src={process.env.NODE_ENV === 'development' ? "/profile-photo.png" : "/CyberWallet-Web/profile-photo.png"}
                    sx={{
                      width: 200,
                      height: 200,
                      margin: 'auto',
                      border: `4px solid ${theme.palette.primary.main}`,
                    }}
                  />
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 75%' } }}>
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
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Professional Summary */}
          <Box>
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
          </Box>

          {/* Experience */}
          <Box>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                Experiencia Profesional
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {cvData.experience.map((exp, index) => (
                  <Box key={index}>
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
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>

          {/* Skills */}
          <Box>
            <GlassmorphicHover>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                  Habilidades Técnicas
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {cvData.skills.map((skillGroup, index) => (
                    <Box 
                      key={index} 
                      sx={{ 
                        width: { 
                          xs: '100%', 
                          md: 'calc(33.33% - 2rem)' 
                        }, 
                        flexGrow: 1 
                      }}
                    >
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
                    </Box>
                  ))}
                </Box>
              </Paper>
            </GlassmorphicHover>
          </Box>

          {/* Contact */}
          <Box>
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
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

// Re-export CV components and data
export { default as CVDownloadButton } from './PDFDownload';
export { cvData } from './data';
export { default as CVPDFDocument } from './CVPDFDocument';

export default CVPage;
