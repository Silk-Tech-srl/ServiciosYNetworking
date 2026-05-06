/**
 * HeroSection — Tech Precision design
 * Fondo: imagen de red con overlay oscuro
 * Título: animación de split text con Framer Motion
 * Botones: degradado azul-celeste + outline
 */
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  IconArrowRight,
  IconMessageCircle,
  IconShieldCheck,
  IconServer,
  IconWifi,
} from "@tabler/icons-react";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663633773983/5zcBxqSSzJnS84BVKAe4dU/hero-network-Pqz8tLmb8M23DHTxjh7hLG.webp";

const titleWords = ["Conectividad", "que", "impulsa", "tu", "negocio."];

const stats = [
  { icon: IconServer, value: "500+", label: "Proyectos" },
  { icon: IconShieldCheck, value: "99.9%", label: "Uptime" },
  { icon: IconWifi, value: "24/7", label: "Soporte" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <img
          src={HERO_IMAGE}
          alt="Red de infraestructura tecnológica"
          className="w-full h-full object-cover scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0d2044]/80 to-[#1E3A5F]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 via-transparent to-transparent" />
      </div>

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-7xl pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-cyan-300 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wider uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Infraestructura Tecnológica End-to-End
          </motion.div>

          {/* Animated title */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6"
            style={{ fontFamily: "Syne, sans-serif", perspective: "600px" }}
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-3"
                style={{ display: "inline-block" }}
              >
                {word === "negocio." ? (
                  <span
                    style={{
                      background: "linear-gradient(135deg, #38BDF8, #60A5FA)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {word}
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={0.8}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-blue-100/80 mb-10 max-w-xl leading-relaxed"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Diseñamos, desplegamos y mantenemos redes empresariales de alto
            rendimiento. Equipamiento Cisco, Meraki, Fortinet y más — con
            soporte técnico especializado.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={1.0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => handleScroll("#tienda")}
              className="group flex items-center gap-2 gradient-brand text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-900/30 hover:opacity-90 transition-all hover:shadow-xl hover:shadow-blue-900/40 hover:-translate-y-0.5"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Ver Catálogo
              <IconArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => handleScroll("#contacto")}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-all"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              <IconMessageCircle size={18} />
              Consultar
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            custom={1.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/10"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Icon size={20} className="text-cyan-400" />
                </div>
                <div>
                  <div
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {value}
                  </div>
                  <div className="text-xs text-blue-200/70 uppercase tracking-wider">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
