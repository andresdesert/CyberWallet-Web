import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  PDFDownloadLink,
  Font 
} from '@react-pdf/renderer';
import { Button } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { cvData } from './data';

// Registrar fuentes
Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
});

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Inter',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 18,
    marginBottom: 5,
    color: '#666666',
  },
  content: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 20,
  },
});

// Componente del CV en PDF
const CVDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.section}>
        <Text style={styles.header}>{cvData.personalInfo.name}</Text>
        <Text style={styles.subheader}>{cvData.personalInfo.title}</Text>
        <Text style={styles.contact}>
          {cvData.personalInfo.location} | {cvData.personalInfo.phone} | {cvData.personalInfo.email}
        </Text>
      </View>

      {/* Professional Summary */}
      <View style={styles.section}>
        <Text style={styles.subheader}>Perfil Profesional</Text>
        <Text style={styles.content}>{cvData.professionalSummary}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.subheader}>Experiencia Profesional</Text>
        {cvData.experience.map((exp, index) => (
          <View key={index} style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{exp.role}</Text>
            <Text style={{ fontSize: 12, color: '#666666' }}>
              {exp.company} | {exp.period}
            </Text>
            {exp.description.map((desc, i) => (
              <Text key={i} style={styles.listItem}>• {desc}</Text>
            ))}
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.subheader}>Habilidades Técnicas</Text>
        {cvData.skills.map((skillGroup, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{skillGroup.category}</Text>
            <Text style={styles.content}>
              {skillGroup.items.map(skill => skill.name).join(', ')}
            </Text>
          </View>
        ))}
      </View>

      {/* Certifications */}
      <View style={styles.section}>
        <Text style={styles.subheader}>Certificaciones</Text>
        {cvData.certifications.map((cert, index) => (
          <Text key={index} style={styles.listItem}>
            • {cert.name} - {cert.issuer} ({cert.date})
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

// Componente del botón de descarga
const CVDownloadButton: React.FC = () => (
  <PDFDownloadLink
    document={<CVDocument />}
    fileName="Andres_Simahan_CV.pdf"
  >
    {({ loading }) => (
      <Button
        variant="contained"
        color="primary"
        startIcon={<GetAppIcon />}
        disabled={loading}
        sx={{
          py: 2,
          px: 4,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: '1.1rem',
          fontWeight: 600,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
          },
        }}
      >
        {loading ? 'Generando PDF...' : 'Descargar CV en PDF'}
      </Button>
    )}
  </PDFDownloadLink>
);

export default CVDownloadButton;
