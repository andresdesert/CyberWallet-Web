import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Font,
  Link
} from '@react-pdf/renderer';
import { cvData } from './data';

// Registrar fuentes
Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
  fontWeight: 'normal',
});

Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2',
  fontWeight: 'bold',
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
    marginBottom: 20,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  contact: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    backgroundColor: '#f5f5f5',
    padding: 4,
  },
  expTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  expSubtitle: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 2,
    paddingLeft: 10,
  },
  skillCategory: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  skillList: {
    fontSize: 10,
    color: '#444',
    marginBottom: 8,
  },
  certification: {
    fontSize: 10,
    marginBottom: 4,
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    marginVertical: 10,
  },
});

export const CVPDFDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{cvData.personalInfo.name}</Text>
        <Text style={styles.title}>{cvData.personalInfo.title}</Text>
        <Text style={styles.contact}>{cvData.personalInfo.location} | {cvData.personalInfo.phone}</Text>
        <Text style={styles.contact}>{cvData.personalInfo.email}</Text>
        <Text style={styles.contact}>
          <Link src={cvData.personalInfo.linkedin} style={styles.link}>LinkedIn</Link>
          {' | '}
          <Link src={cvData.personalInfo.github} style={styles.link}>GitHub</Link>
        </Text>
      </View>

      {/* Professional Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Perfil Profesional</Text>
        <Text style={styles.bulletPoint}>{cvData.professionalSummary}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experiencia Profesional</Text>
        {cvData.experience.map((exp, index) => (
          <View key={index} style={{ marginBottom: 12 }}>
            <Text style={styles.expTitle}>{exp.role}</Text>
            <Text style={styles.expSubtitle}>
              {exp.company} | {exp.period} | {exp.location}
            </Text>
            {exp.description.map((desc, i) => (
              <Text key={i} style={styles.bulletPoint}>• {desc}</Text>
            ))}
            <Text style={{ ...styles.skillList, marginTop: 4 }}>
              Tecnologías: {exp.tools.join(', ')}
            </Text>
            {index < cvData.experience.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habilidades Técnicas</Text>
        {cvData.skills.map((skillGroup, index) => (
          <View key={index} style={{ marginBottom: 8 }}>
            <Text style={styles.skillCategory}>{skillGroup.category}</Text>
            <Text style={styles.skillList}>
              {skillGroup.items
                .sort((a, b) => {
                  const levelOrder = { advanced: 3, intermediate: 2, basic: 1, learning: 0 };
                  return levelOrder[b.level] - levelOrder[a.level];
                })
                .map(skill => skill.name)
                .join(' • ')}
            </Text>
          </View>
        ))}
      </View>

      {/* Certifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certificaciones</Text>
        {cvData.certifications.map((cert, index) => (
          <Text key={index} style={styles.certification}>
            • {cert.name} - {cert.issuer} ({cert.date})
            {cert.status === 'in progress' ? ' (En curso)' : ''}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default CVPDFDocument;
