// Archivo: src/components/AboutCV/data/experienceData.ts

export interface ExperienceEntry {
    title: string;
    company: string;
    location: string;
    date: string;
    details: string[];
}

export const experiences: ExperienceEntry[] = [
    {
        title: "QA Engineer – Seal Team (Blueprint Project)",
        company: "BOZ IT DEVELOPMENT / INTERMEX",
        location: "Remoto (México)",
        date: "Ene 2025 – Actualidad",
        details: [
            "Diseñé y ejecuté casos de prueba desde el Sprint 0 con enfoque Left Shift.",
            "Implementé pruebas de carga con K6 y adquirí fundamentos en Playwright.",
            "Herramientas: Postman, Swagger, Docker, Azure DevOps, K6, Playwright."
        ]
    },
    {
        title: "Sr. QA Analyst – Proyecto Payers",
        company: "BOZ IT DEVELOPMENT / INTERMEX",
        location: "Remoto (México)",
        date: "May 2023 – Ene 2025",
        details: [
            "Validación de transacciones en tiempo real para servicios de pagos.",
            "Mejoras en la eficiencia del proceso de testing respaldadas con métricas.",
            "Herramientas: Postman, SoapUI, SQL, Azure DevOps."
        ]
    },
    {
        title: "QA Analyst – Proyecto Homologaciones",
        company: "QUALIS LAB",
        location: "Argentina",
        date: "Jun 2022 – May 2023",
        details: [
            "Certificación de productos y servicios bancarios con estándares rigurosos.",
            "Coordinación de tickets críticos y soporte al cliente.",
            "Herramientas: Postman, SQL, Jira, Swagger."
        ]
    },
    {
        title: "QA Specialist",
        company: "PENTA SECURITY SOLUTIONS",
        location: "Argentina",
        date: "Oct 2021 – Jun 2022",
        details: [
            "Testing funcional/regresión para migración de billetera virtual.",
            "Automatización con Selenium, Appium, Newman.",
            "Herramientas: Selenium, Appium, BrowserStack, Kubernetes."
        ]
    },
    {
        title: "QA Analyst – Vendo cheques y facturas",
        company: "TATA CONSULTANCY SERVICES",
        location: "Argentina",
        date: "Mar 2021 – Oct 2021",
        details: [
            "Validación manual de Office Banking Mobile.",
            "Pruebas con IQP y ALM sobre microservicios bancarios.",
            "Herramientas: Postman, SonarQube, Jira, MongoDB, OpenShift."
        ]
    },
    {
        title: "Desarrollador Java Junior (Backend y Frontend)",
        company: "DEFENSORÍA DEL PUEBLO",
        location: "Buenos Aires",
        date: "Mar 2020 – Mar 2021",
        details: [
            "Sistema para digitalizar reclamos ciudadanos usando Java + React.",
            "Reducción del 18% en errores de carga con mejoras QA.",
            "Herramientas: Java, React, Selenium, MySQL, TestRail."
        ]
    }
];
