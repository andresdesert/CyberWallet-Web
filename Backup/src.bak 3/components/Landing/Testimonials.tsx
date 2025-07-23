// src/components/Testimonials.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Rating,
  Avatar,
  useTheme,
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// estilos de Swiper
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatarColor: string;
}

const testimonials: Testimonial[] = [
  // Grupo 1
  {
    name: "Daniela Perez",
    role: "Scrum Master",
    comment:
      "Como Scrum Master, valoro enormemente la metodología ágil aplicada en el desarrollo de CyberWallet. La transparencia y colaboración del equipo son excepcionales.",
    rating: 5,
    avatarColor: "#1976d2"
  },
  {
    name: "Facundo Fernandez",
    role: "Infraestructura",
    comment:
      "La arquitectura de CyberWallet es robusta y escalable. La implementación de infraestructura como código garantiza estabilidad y confiabilidad.",
    rating: 5,
    avatarColor: "#9c27b0"
  },
  {
    name: "Daniel Boullon",
    role: "DevOps",
    comment:
      "Los pipelines de CI/CD y la automatización implementada son ejemplares. CyberWallet demuestra las mejores prácticas de DevOps en el sector fintech.",
    rating: 5,
    avatarColor: "#2e7d32"
  },
  // Grupo 2
  {
    name: "Carlos Rodriguez",
    role: "Empresario",
    comment:
      "La seguridad y velocidad de CyberWallet me dan tranquilidad total en mis transacciones diarias. La interfaz es intuitiva y moderna.",
    rating: 5,
    avatarColor: "#ed6c02"
  },
  {
    name: "Ana Martinez",
    role: "Product Manager",
    comment:
      "La experiencia de usuario es excepcional. Cada funcionalidad está pensada para maximizar la eficiencia y minimizar la fricción.",
    rating: 5,
    avatarColor: "#d32f2f"
  },
  {
    name: "Luis Gonzalez",
    role: "Inversor",
    comment:
      "La facilidad de uso combinada con características avanzadas hace que CyberWallet destaque. Excelente para gestionar finanzas personales.",
    rating: 4,
    avatarColor: "#7b1fa2"
  },
  // Grupo 3
  {
    name: "Sofia Chen",
    role: "UX Designer",
    comment:
      "El diseño de CyberWallet es elegante y funcional. La consistencia visual y la usabilidad son de primera clase.",
    rating: 5,
    avatarColor: "#1565c0"
  },
  {
    name: "Roberto Silva",
    role: "Security Analyst",
    comment:
      "Las medidas de seguridad implementadas son comprensivas y efectivas. CyberWallet establece el estándar para wallets digitales seguros.",
    rating: 5,
    avatarColor: "#388e3c"
  },
  {
    name: "Elena Vargas",
    role: "Financial Advisor",
    comment:
      "Recomiendo CyberWallet a todos mis clientes. La plataforma combina innovación tecnológica con solidez financiera.",
    rating: 5,
    avatarColor: "#f57c00"
  }
];

const Testimonials: React.FC = () => {
  const theme = useTheme();
  const swiperRef = useRef<SwiperType | null>(null);
  const [isInView, setIsInView] = useState(false);

  // ✅ SOLUCIÓN: Reiniciar autoplay cuando el componente esté visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
          // Reiniciar autoplay cuando esté visible
          if (swiperRef.current && swiperRef.current.autoplay) {
            swiperRef.current.autoplay.start();
          }
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.3 }
    );

    const testimonialSection = document.getElementById('testimonials-section');
    if (testimonialSection) {
      observer.observe(testimonialSection);
    }

    return () => observer.disconnect();
  }, []);

  // ✅ SOLUCIÓN: Forzar reinicio del autoplay cada 15 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current && isInView) {
        // Verificar si el autoplay está funcionando, si no, reiniciarlo
        if (swiperRef.current.autoplay && !swiperRef.current.autoplay.running) {
          console.log('🔄 Reiniciando autoplay de testimonios...');
          swiperRef.current.autoplay.start();
        }
      }
    }, 15000); // Cada 15 segundos

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <Box
      id="testimonials-section"
      sx={{
        py: 'clamp(3rem, 8vw, 6rem)',
        // 🎯 CRÍTICO: Constraints para evitar stretching en producción
        width: '100%',
        maxWidth: '100vw',
        aspectRatio: 'auto',
        boxSizing: 'border-box',
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(180deg, ${alpha(
                theme.palette.primary.main,
                0.05
              )} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${alpha(
                theme.palette.primary.main,
                0.03
              )} 0%, transparent 100%)`
      }}
    >
      <Container maxWidth="lg">
        {/* — Título y subtítulo — */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
              fontFamily: "InterVariable, sans-serif"
            }}
          >
            Lo que dicen nuestros usuarios
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 600,
              mx: "auto",
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              fontWeight: 400,
              lineHeight: 1.6,
              letterSpacing: '0.015em',
              fontFamily: "InterVariable, sans-serif"
            }}
          >
            Testimonios reales de clientes satisfechos con nuestra plataforma
          </Typography>
        </Box>

        {/* — Carrusel swipeable con autoplay mejorado — */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{
            delay: 3000, // 3 segundos
            disableOnInteraction: false, // No se deshabilita al interactuar
            pauseOnMouseEnter: true, // Se pausa al hacer hover
            stopOnLastSlide: false, // Continúa después del último slide
            waitForTransition: true, // Espera a que termine la transición
            reverseDirection: false, // Dirección normal
          }}
          loop={true}
          loopAdditionalSlides={2} // ✅ Mejora la fluidez del loop
          centeredSlides={false}
          grabCursor={true}
          spaceBetween={theme.spacing(4)}
          speed={800} // ✅ Velocidad de transición más fluida
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            600: { slidesPerView: 2, spaceBetween: 20 },
            900: { slidesPerView: 3, spaceBetween: 24 },
            1200: { slidesPerView: 3, spaceBetween: 32 }
          }}
          onAutoplayTimeLeft={(swiper, time, progress) => {
            // ✅ Log para debugging (solo en desarrollo)
            if (process.env.NODE_ENV === 'development' && time % 1000 < 100) {
              console.log(`⏱️ Autoplay: ${Math.ceil(time/1000)}s restantes`);
            }
          }}
          onSlideChange={(swiper) => {
            // ✅ Verificar que el autoplay sigue activo
            if (process.env.NODE_ENV === 'development') {
              console.log(`📊 Slide ${swiper.activeIndex + 1}/${testimonials.length}`);
            }
          }}
          style={{ 
            padding: `0 ${theme.spacing(2)}`,
            // ✅ Asegurar que el contenedor mantenga altura
            minHeight: '350px',
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={t.name}>
              <motion.div
                style={{ height: "100%", perspective: 1000 }}
                whileHover={{ rotateX: 2, rotateY: 2, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <Paper
                  elevation={0}
                  component="article"
                  aria-label={`Testimonio de ${t.name}, ${t.role}`}
                  tabIndex={0}
                  sx={{
                    width: "100%",
                    height: 320, // Altura fija para uniformidad
                    display: "flex",
                    flexDirection: "column",
                    background: alpha(theme.palette.background.paper, 0.6),
                    backdropFilter: "blur(12px)",
                    borderRadius: 4,
                    border: `1px solid ${alpha(
                      theme.palette.primary.main,
                      0.1
                    )}`,
                    boxShadow: `0 8px 24px ${alpha(
                      theme.palette.primary.main,
                      0.1
                    )}`,
                    transition: "all 0.3s ease-in-out",
                    "&:focus-visible": {
                      outline: `2px solid ${theme.palette.primary.main}`
                    }
                  }}
                >
                  {/* — Header: Avatar + Datos — */}
                  <Box
                    sx={{
                      p: theme.spacing(3),
                      pb: theme.spacing(2),
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      borderBottom: `1px solid ${alpha(
                        theme.palette.divider,
                        0.1
                      )}`
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: t.avatarColor,
                        width: 56,
                        height: 56,
                        border: `2px solid ${alpha(
                          t.avatarColor,
                          0.5
                        )}`,
                        boxShadow: `0 0 15px ${alpha(
                          t.avatarColor,
                          0.3
                        )}`
                      }}
                    >
                      {t.name[0]}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "InterVariable, sans-serif",
                          fontWeight: 600,
                          mb: 0.5
                        }}
                      >
                        {t.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontFamily: "InterVariable, sans-serif" }}
                      >
                        {t.role}
                      </Typography>
                    </Box>
                  </Box>

                  {/* — Cuerpo: Rating + Comentario — */}
                  <Box
                    sx={{
                      p: theme.spacing(3),
                      pt: theme.spacing(2),
                      flex: 1,
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <Rating
                      value={t.rating}
                      readOnly
                      sx={{
                        mb: 2,
                        "& .MuiRating-iconFilled": {
                          color: theme.palette.warning.main
                        }
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        position: "relative",
                        fontStyle: "italic",
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                        flex: 1,
                        pl: 3,
                        fontFamily: "Georgia, serif",
                        "&::before": {
                          content: '"\\201C"',
                          position: "absolute",
                          left: 0,
                          top: -8,
                          fontSize: "3rem",
                          lineHeight: 1,
                          color: alpha(theme.palette.primary.main, 0.2)
                        }
                      }}
                    >
                      {t.comment}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default Testimonials;
