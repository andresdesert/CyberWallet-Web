import { CVData } from './types';

export const cvData: CVData = {
  personalInfo: {
    name: "Andrés Simahan",
    title: "SR. QA Analyst",
    location: "Buenos Aires, Argentina",
    phone: "+54 9 11 2514 4387",
    email: "deluxogvc@gmail.com",
    linkedin: "https://www.linkedin.com/in/andres-simahan",
    github: "https://github.com/andresdesert?tab=repositories"
  },
  professionalSummary: `Especialista en calidad de software certificado en ISTQB Foundation Level 4.0, con sólida experiencia en pruebas funcionales, manuales y de sistemas en entornos ágiles. Poseo un robusto bagaje en testing, validación e integración de procesos críticos en sectores financieros y tecnológicos. Además, cuento con experiencia temprana en desarrollo Java (backend y frontend), habiendo contribuido significativamente en proyectos de billeteras virtuales. Actualmente, me perfecciono en automatización, pruebas de rendimiento con K6 y ciberseguridad, impulsando la mejora continua y la optimización de procesos en proyectos de alta complejidad.`,
  highlights: [
    "Certificado ISTQB Foundation Level 4.0",
    "Experto en Testing y Control de Calidad",
    "Especialista en Pruebas de Performance",
    "Experiencia en Desarrollo Full Stack",
    "Enfoque en Automatización y DevOps"
  ],
  experience: [
    {
      company: "BOZ IT DEVELOPMENT / INTERMEX",
      role: "QA Engineer – Seal Team (Blueprint Project)",
      period: "Ene 2025 – Actualidad",
      location: "México – En remoto",
      description: [
        "Diseñé, analicé y ejecuté casos de prueba desde el Sprint 0, aplicando un enfoque Left Shift Testing (pruebas estáticas y dinámicas).",
        "Colaboré en el desarrollo de un blueprint estratégico utilizando .NET Aspire con Scalar, optimizando procesos a nivel empresarial.",
        "Implementé pruebas de carga con K6 para load testing y baseline, y adquirí fundamentos en Playwright."
      ],
      tools: ["Postman", "Swagger", "Docker", "Azure DevOps", "K6", "Playwright"]
    },
    {
      company: "BOZ IT DEVELOPMENT / INTERMEX",
      role: "Sr. QA Analyst – Proyecto Payers",
      period: "May 2023 – Ene 2025",
      location: "México – En remoto",
      description: [
        "Ejecuté pruebas manuales especializadas para servicios de pagos y validación de transacciones en tiempo real.",
        "Gestioné ambientes de pruebas y coordiné la resolución de errores en producción.",
        "Implementé mejoras en la eficiencia del proceso de testing, respaldado por certificaciones."
      ],
      tools: ["Postman", "SoapUI", "SQL", "Azure DevOps"]
    },
    {
      company: "MINISTERIO PÚBLICO FISCAL",
      role: "Técnico en Informática",
      period: "Nov 2021 – May 2023",
      location: "Buenos Aires, Argentina",
      description: [
        "Administré y mantuve sistemas informáticos del ministerio, asegurando su funcionamiento óptimo.",
        "Brindé soporte técnico a usuarios y resolví incidencias de hardware y software.",
        "Implementé mejoras en procesos internos de IT y documenté procedimientos."
      ],
      tools: ["Windows Server", "Active Directory", "Office 365", "Help Desk"]
    },
    {
      company: "DEFENSORÍA DEL PUEBLO",
      role: "Asistente Técnico",
      period: "Mar 2020 – Oct 2021",
      location: "Buenos Aires, Argentina",
      description: [
        "Colaboré en proyectos de modernización tecnológica de la institución.",
        "Realicé testing manual de aplicaciones internas y sistemas de gestión.",
        "Participé en la migración de sistemas legacy y capacitación de usuarios."
      ],
      tools: ["Testing Manual", "Documentación", "Sistemas Internos", "Capacitación"]
    },
    {
      company: "FREELANCE",
      role: "Desarrollador Junior",
      period: "2019 – 2020",
      location: "Buenos Aires, Argentina",
      description: [
        "Desarrollé aplicaciones web pequeñas usando Java y tecnologías frontend.",
        "Realicé testing y debugging de aplicaciones propias y de terceros.",
        "Adquirí experiencia en el ciclo completo de desarrollo de software."
      ],
      tools: ["Java", "HTML", "CSS", "JavaScript", "MySQL", "Git"]
    }
  ],
  skills: [
    {
      category: "QA & Testing",
      items: [
        { name: "Pruebas manuales", level: "advanced" },
        { name: "Pruebas de regresión", level: "advanced" },
        { name: "Pruebas de integración", level: "advanced" },
        { name: "UAT", level: "advanced" },
        { name: "Performance Testing", level: "intermediate" },
        { name: "Automatización", level: "learning" }
      ]
    },
    {
      category: "Herramientas",
      items: [
        { name: "Selenium", level: "intermediate" },
        { name: "Playwright", level: "learning" },
        { name: "K6", level: "intermediate" },
        { name: "Postman", level: "advanced" },
        { name: "Azure DevOps", level: "advanced" },
        { name: "Docker", level: "intermediate" }
      ]
    },
    {
      category: "Desarrollo",
      items: [
        { name: "Python", level: "intermediate" },
        { name: "Java", level: "intermediate" },
        { name: "JavaScript", level: "basic" },
        { name: "SQL", level: "advanced" }
      ]
    }
  ],
  certifications: [
    {
      name: "ISTQB Foundation Level 4.0",
      issuer: "iSQI Group",
      date: "2025",
      status: "completed" as const
    },
    {
      name: "Especialización en Ciberseguridad",
      issuer: "EducacionIT",
      date: "2025",
      status: "in progress" as const
    },
    {
      name: "Certificación Agile",
      issuer: "Tata Consultancy Services",
      date: "2023",
      status: "completed" as const
    }
  ]
};
