/**
 * ServicesSection — Tech Precision design
 * Tarjetas con efecto tilt, iconos Tabler, animaciones Framer Motion
 * Fondo: blanco hueso con patrón de red sutil
 */
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconTopologyRing,
  IconPresentation,
  IconTool,
  IconHeadset,
  IconRefresh,
  IconArrowRight,
} from "@tabler/icons-react";

const SERVICES_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663633773983/5zcBxqSSzJnS84BVKAe4dU/services-bg-YkUNaoM9b28aZjqrtgQSy2.webp";

const services = [
  {
    icon: IconTopologyRing,
    number: "01",
    title: "Diseño de Red y Arquitectura",
    description:
      "Planificación y diseño de infraestructuras de red escalables, seguras y de alto rendimiento adaptadas a las necesidades de tu organización.",
    tags: ["LAN/WAN", "SD-WAN", "MPLS", "BGP/OSPF"],
    color: "from-blue-600 to-blue-800",
    accent: "#1D4ED8",
  },
  {
    icon: IconPresentation,
    number: "02",
    title: "Preventa y Consultoría Técnica",
    description:
      "Asesoramiento experto en la selección de tecnologías y fabricantes. Elaboramos propuestas técnicas detalladas y análisis de ROI.",
    tags: ["Cisco", "Meraki", "Fortinet", "Aruba"],
    color: "from-sky-500 to-blue-600",
    accent: "#0EA5E9",
  },
  {
    icon: IconTool,
    number: "03",
    title: "Instalación On-site y Despliegue",
    description:
      "Implementación profesional in-situ con certificación de instalación, pruebas de rendimiento y documentación técnica completa.",
    tags: ["Cableado", "Rack", "Wireless", "Testing"],
    color: "from-blue-700 to-indigo-700",
    accent: "#3730A3",
  },
  {
    icon: IconHeadset,
    number: "04",
    title: "Post-venta, Soporte y Mantenimiento",
    description:
      "Contratos de soporte SLA con atención 24/7, monitoreo proactivo de red y mantenimiento preventivo y correctivo.",
    tags: ["SLA 24/7", "NOC", "Monitoreo", "Tickets"],
    color: "from-cyan-500 to-sky-600",
    accent: "#06B6D4",
  },
  {
    icon: IconRefresh,
    number: "05",
    title: "Actualización (Retrofitting) de Infraestructura",
    description:
      "Modernización de infraestructuras legacy con migración sin interrupciones, optimizando la inversión existente.",
    tags: ["Migración", "Legacy", "Upgrade", "Zero-downtime"],
    color: "from-blue-500 to-cyan-500",
    accent: "#38BDF8",
  },
];

function TiltCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered ? "transform 0.1s ease" : "transform 0.4s ease",
        }}
        className="relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full"
      >
        {/* Gradient accent top bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${service.color}`} />

        <div className="p-7">
          {/* Number + Icon row */}
          <div className="flex items-start justify-between mb-5">
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${service.color} shadow-md`}
            >
              <Icon size={26} className="text-white" />
            </div>
            <span
              className="text-5xl font-extrabold text-slate-100 select-none"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {service.number}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-lg font-bold text-slate-800 mb-3 leading-snug"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm text-slate-500 leading-relaxed mb-5"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            {service.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA link */}
          <button
            className="flex items-center gap-1.5 text-sm font-semibold transition-colors group"
            style={{ color: service.accent, fontFamily: "DM Sans, sans-serif" }}
            onClick={() => {
              const el = document.querySelector("#contacto");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Solicitar servicio
            <IconArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Hover glow */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${service.accent}10, transparent 70%)`,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="servicios"
      className="relative py-24 overflow-hidden"
      style={{ background: "#F5F5F3" }}
    >
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${SERVICES_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Section header */}
        <div ref={ref} className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <span className="w-8 h-0.5 bg-blue-700" />
            Servicios End-to-End
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Soluciones completas{" "}
            <span className="gradient-brand-text">de red</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-500"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Desde el diseño inicial hasta el soporte continuo, cubrimos cada
            etapa del ciclo de vida de tu infraestructura tecnológica.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <TiltCard key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
